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
  return (
    <Container>
      <Content>
        <SuccessIcon>
          <FaCheckCircle />
        </SuccessIcon>

        <Title>Pagamento concluído com sucesso!</Title>

        <Message>
          Seu pedido foi confirmado.
          <br />
          Acompanhe o status do seu pedido na área de pedidos.
        </Message>

        <Button to="/meus-pedidos">Acompanhar pedido</Button>
      </Content>
    </Container>
  );
}
