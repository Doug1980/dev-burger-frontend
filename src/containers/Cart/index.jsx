import { SlActionUndo } from 'react-icons/sl';
import Logo from '../../assets/Logo.svg';
import { CartItems, CartResume } from '../../components';
import { Banner, Container, Content, Title, CartHeader } from './styles';
import { useNavigate } from 'react-router-dom';

import { BackButton } from './styles';

export function Cart() {
  const navigate = useNavigate();
  return (
    <Container>
      <Banner>
        <img src={Logo} alt="logo devburguer" />
      </Banner>

      <CartHeader>
        <Title>Checkout - Pedido</Title>

        <BackButton onClick={() => navigate('/cardapio')}>
          <SlActionUndo size={16} />
          Voltar
        </BackButton>
      </CartHeader>

      <Content>
        <CartItems />
        <CartResume />
      </Content>
    </Container>
  );
}
