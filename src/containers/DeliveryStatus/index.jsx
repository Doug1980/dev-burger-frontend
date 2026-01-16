import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import {
  Container,
  StatusContainer,
  Step,
  Line,
  OrderInfo,
  Content,
  FeedbackContainer,
  Button,
} from './styles';

export const DeliveryStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera o ID do pedido (via state ou localStorage como fallback)
  const orderId =
    location.state?.orderId || localStorage.getItem('lastOrderId');

  const statusMap = [
    { label: 'Pedido Realizado', value: 'Pedido Realizado' },
    { label: 'Em Preparação', value: 'Em Preparação' },
    { label: 'Pedido Pronto', value: 'Pedido Pronto' },
    { label: 'Pedido à Caminho', value: 'Pedido à Caminho' },
    { label: 'Pedido Entregue', value: 'Pedido Entregue' },
  ];

  // Implementação do React Query
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orderStatus', orderId],
    queryFn: async () => {
      const userDataJson = localStorage.getItem('devburguer:userData');
      const userData = userDataJson ? JSON.parse(userDataJson) : null;
      const token = userData?.token;

      if (!token) throw new Error('Token não encontrado');

      const response = await api.get(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    },
    enabled: !!orderId, // Só executa se houver um orderId
    refetchInterval: (data) => {
      // Para se estiver Entregue OU Cancelado
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
        <p>Carregando status do pedido...</p>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container>
        <p>
          Erro ao carregar informações do pedido. Tente novamente mais tarde.
        </p>
      </Container>
    );
  }

  // Lógica da Timeline baseada no status vindo da API
  const currentStepIndex = statusMap.findIndex((s) => s.value === order.status);

  return (
    <Container>
      <OrderInfo>
        <h2>Acompanhe seu Pedido</h2>
        <p>ID: {orderId}</p>
      </OrderInfo>

      {/* 1. Timeline com atualização automática */}
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

      {/* 2. Conteúdo de Feedback */}
      <Content>
        {order?.status === 'Pedido Entregue' && (
          <FeedbackContainer>
            <h3>✅ Pedido entregue com sucesso!</h3>
            <p>
              Obrigado pela sua preferência, <strong>{order.user?.name}</strong>
              !
              <br />
              Sua confirmação é muito importante para nós. Volte sempre!
            </p>

            <Button
              style={{ marginTop: '25px', width: '250px' }}
              onClick={() => navigate('/cardapio')}
            >
              Pedir novamente
            </Button>
          </FeedbackContainer>
        )}

        {/* NOVO: Feedback de Cancelamento */}
        {order?.status === 'Pedido Cancelado' && (
          <FeedbackContainer style={{ border: '4px solid #ff4444' }}>
            <h3 style={{ color: '#ff4444' }}>❌ Pedido Cancelado</h3>
            <p>
              Olá <strong>{order.user?.name}</strong>, conforme a solicitado,
              seu pedido foi cancelado.
              <br />
              Dúvidas? Estamos à disposição pelo telefone ou WhatsApp. Obrigado
              pela preferência!
            </p>

            <Button
              style={{
                marginTop: '25px',
                width: '250px',
                backgroundColor: '#9758a6',
              }}
              onClick={() => navigate('/cardapio')}
            >
              Voltar ao cardápio
            </Button>
          </FeedbackContainer>
        )}
      </Content>
    </Container>
  );
};
