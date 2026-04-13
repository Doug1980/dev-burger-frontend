import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useUser } from '../../hooks/UserContext';
import Swal from 'sweetalert2';
import {
  Container,
  StatusContainer,
  Step,
  Line,
  OrderInfo,
  Content,
  FeedbackContainer,
  FeedbackContainer1,
  Button,
  CancelReason,
  CancelLink,
} from './styles';

export const DeliveryStatus = () => {
  const { userInfo } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const orderIdFromState =
    location.state?.orderId || localStorage.getItem('lastOrderId');

  const statusMap = [
    { label: 'Pedido Realizado', value: 'Pedido Realizado' },
    { label: 'Em Preparação', value: 'Em Preparação' },
    { label: 'Pedido Pronto', value: 'Pedido Pronto' },
    { label: 'Pedido à Caminho', value: 'Pedido à Caminho' },
    { label: 'Pedido Entregue', value: 'Pedido Entregue' },
  ];

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orderStatus', orderIdFromState],
    queryFn: async () => {
      const token = userInfo?.token;
      if (!token) throw new Error('Token não encontrado');

      const response = await api.get(`/orders/${orderIdFromState}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    },
    enabled: !!userInfo?.id && !!orderIdFromState,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (
        data?.status === 'Pedido Entregue' ||
        data?.status === 'Pedido Cancelado'
      ) {
        return false;
      }
      return 5000;
    },
  });

  if (isLoading) {
    return (
      <Container>
        <p style={{ marginTop: '100px' }}>Carregando status do pedido...</p>
      </Container>
    );
  }

  if (!orderIdFromState || error || (!isLoading && !order)) {
    return (
      <Container>
        <p
          style={{ marginTop: '100px', marginBottom: '50px', fontSize: '25px' }}
        >
          Nenhum pedido realizado.
        </p>
        <Button onClick={() => navigate('/cardapio')}>
          Ir para o Cardápio
        </Button>
      </Container>
    );
  }

  const currentStepIndex = statusMap.findIndex((s) => s.value === order.status);
  const displayId = order._id || order.id;

  async function handleClientCancel() {
    const { isConfirmed } = await Swal.fire({
      title: 'Cancelar pedido?',
      text: 'Tem certeza que deseja cancelar seu pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, cancelar',
      cancelButtonText: 'Voltar',
      confirmButtonColor: '#b71c1c',
      cancelButtonColor: '#888',
    });

    if (!isConfirmed) return;

    try {
      await api.put(`/orders/${orderIdFromState}`, {
        status: 'Pedido Cancelado',
        cancelReason: 'Cancelado pelo cliente',
      });
      localStorage.removeItem('lastOrderId');
      navigate('/cardapio');
    } catch (err) {
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível cancelar o pedido. Tente novamente.',
        icon: 'error',
        confirmButtonColor: '#FF8F00',
      });
    }
  }

  return (
    <Container>
      <OrderInfo>
        <h2>Acompanhe seu Pedido</h2>
        <p>ID: {displayId}</p>
      </OrderInfo>

      <StatusContainer>
        {statusMap.map((step, index) => (
          <React.Fragment key={step.value}>
            <Step active={index <= currentStepIndex}>
              <div className="circle">{index + 1}</div>
              <p>{step.label}</p>
            </Step>
            {index < statusMap.length - 1 && (
              <Line active={index < currentStepIndex} />
            )}
          </React.Fragment>
        ))}
      </StatusContainer>

      {order?.status !== 'Pedido Entregue' &&
        order?.status !== 'Pedido Cancelado' && (
          <CancelLink
            onClick={handleClientCancel}
            disabled={
              order?.status !== 'Pedido Realizado' &&
              order?.status !== 'Pedido realizado'
            }
          >
            Cancelar pedido
          </CancelLink>
        )}

      <Content>
        {order?.status === 'Pedido Entregue' && (
          <FeedbackContainer>
            <h3>✅ Pedido entregue com sucesso!</h3>
            <p>
              Obrigado pela sua preferência, <strong>{userInfo?.name}</strong>!
              <br />
              Sua confirmação é muito importante para nós. Volte sempre!
            </p>
            <Button
              onClick={() => {
                localStorage.removeItem('lastOrderId');
                navigate('/cardapio');
              }}
            >
              Pedir novamente
            </Button>
          </FeedbackContainer>
        )}

        {order?.status === 'Pedido Cancelado' && (
          <FeedbackContainer1>
            <h3>❌ Pedido Cancelado</h3>
            <p>
              Olá <strong>{userInfo?.name}</strong>, seu pedido foi cancelado.
            </p>
            {order?.cancelReason && (
              <CancelReason>
                <span className="cancel-reason-label">Motivo</span>
                <span className="cancel-reason-text">{order.cancelReason}</span>
              </CancelReason>
            )}
            <p>Dúvidas? Entre em contato conosco pelo telefone ou Whatsapp.</p>
            <Button
              onClick={() => {
                localStorage.removeItem('lastOrderId');
                navigate('/cardapio');
              }}
            >
              Voltar ao cardápio
            </Button>
          </FeedbackContainer1>
        )}
      </Content>
    </Container>
  );
};
