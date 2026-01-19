import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

import {
  Container,
  Content,
  SuccessIcon,
  Title,
  Message,
  Button,
} from './styles';

export function CompletePayment() {
  const navigate = useNavigate(); // Essencial para o erro de 'not defined' sumir

  const handleGoToStatus = () => {
    const orderId = localStorage.getItem('lastOrderId');

    console.log('Tentando navegar para o ID:', orderId);

    if (orderId) {
      // 1. Tentativa pelo React Router (Ideal)
      navigate('/deliveryStatus', { state: { orderId } });

      // 2. Plano B (Caso o de cima falhe por qualquer motivo técnico do React)
      setTimeout(() => {
        if (window.location.pathname !== '/deliveryStatus') {
          console.warn('React Router falhou, forçando via window.location');
          window.location.href = '/deliveryStatus';
        }
      }, 500);
    } else {
      alert('Pedido não encontrado no sistema. Refaça a compra.');
    }
  };

  return (
    <Container>
      <Content>
        <SuccessIcon>
          <FaCheckCircle />
        </SuccessIcon>
        <Title>Pagamento concluído com sucesso!</Title>
        <Message>Seu pedido foi confirmado. Acompanhe o status agora.</Message>
        <Button onClick={handleGoToStatus}>Acompanhar pedido</Button>
      </Content>
    </Container>
  );
}
