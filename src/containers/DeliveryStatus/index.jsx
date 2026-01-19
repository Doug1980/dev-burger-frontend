import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useUser } from '../../hooks/UserContext'; // Importação necessária
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
} from './styles';

export const DeliveryStatus = () => {
  const { userInfo } = useUser(); 
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Pega o ID se o usuário acabou de vir do carrinho
  const orderIdFromState = location.state?.orderId;

  const statusMap = [
    { label: 'Pedido Realizado', value: 'Pedido Realizado' },
    { label: 'Em Preparação', value: 'Em Preparação' },
    { label: 'Pedido Pronto', value: 'Pedido Pronto' },
    { label: 'Pedido à Caminho', value: 'Pedido à Caminho' },
    { label: 'Pedido Entregue', value: 'Pedido Entregue' },
  ];

  // 2. UNIFICADO: Busca o pedido específico OU o último do usuário logado
  const { data: order, isLoading, error } = useQuery({
  queryKey: ['orderStatus', orderIdFromState, userInfo?.id],
  queryFn: async () => {
    const token = userInfo?.token;
    if (!token) throw new Error('Token não encontrado');

    // Se tiver ID do state (veio do checkout), busca o específico
    // Se não, busca na rota geral (que agora já vem filtrada pelo Back-end)
    const url = orderIdFromState ? `/orders/${orderIdFromState}` : `/orders`;

    const response = await api.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Se a resposta for um array (veio do /orders), pegamos o primeiro (mais recente)
    if (Array.isArray(response.data)) {
      return response.data[0];
    }

    return response.data;
  },
  enabled: !!userInfo?.id,
  refetchInterval: (query) => {
    const data = query.state.data;
    if (data?.status === 'Pedido Entregue' || data?.status === 'Pedido Cancelado') {
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

  if (error || !order) {
    return (
      <Container>
        <p style={{ marginTop: '100px', marginBottom: '50px',fontSize: '25px' }}>
          Nenhum pedido encontrado para este perfil.
        </p>
        <Button onClick={() => navigate('/cardapio')}>Ir para o Cardápio</Button>
      </Container>
    );
  }

  const currentStepIndex = statusMap.findIndex((s) => s.value === order.status);
  const displayId = order._id || order.id;

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

      <Content>
        {order?.status === 'Pedido Entregue' && (
          <FeedbackContainer>
            <h3>✅ Pedido entregue com sucesso!</h3>
            <p>
              Obrigado pela sua preferência, <strong>{userInfo?.name}</strong>!
              <br />
              Sua confirmação é muito importante para nós. Volte sempre!
            </p>
            <Button onClick={() => navigate('/cardapio')}>Pedir novamente</Button>
          </FeedbackContainer>
        )}

        {order?.status === 'Pedido Cancelado' && (
          <FeedbackContainer1>
            <h3>❌ Pedido Cancelado</h3>
            <p>
              Olá <strong>{userInfo?.name}</strong>, sua solicitação foi atendida. <br/>
             Dúvidas? Entre em contato conosco pelo telefone ou Whatsapp.
            </p>
            <Button onClick={() => navigate('/cardapio')}>Voltar ao cardápio</Button>
          </FeedbackContainer1>
        )}
      </Content>
    </Container>
  );
};