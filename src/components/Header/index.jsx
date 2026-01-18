import { useNavigate, useResolvedPath } from 'react-router-dom'; // 1. Certifique-se do import correto
import { FaUserCircle } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { MdDeliveryDining } from 'react-icons/md';

import { useUser } from '../../hooks/UserContext';
import {
  Container,
  HeaderLink,
  LinkContainer,
  Logout,
  Navigation,
  Options,
  Profile,
  Content,
  ActionsContainer, // 2. Importe o novo container
} from './styles';

export function Header() {
  const navigate = useNavigate(); // 3. Agora o erro de "not defined" vai sumir
  const { logout, userInfo } = useUser();
  const { pathname } = useResolvedPath();

  function logoutUser() {
    logout();
    navigate('/login');
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to="/" $isActive={pathname === '/'}>Home</HeaderLink>
            <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>Cardápio</HeaderLink>
          </div>
        </Navigation>

        <Options>
          <Profile>
            <FaUserCircle color="#fff" size={35} />
            <div>
              <p>Olá, <span>{userInfo?.name}</span></p>
              <Logout onClick={logoutUser}>Sair</Logout>
            </div>
          </Profile>

          <ActionsContainer>
            <LinkContainer to="/carrinho" $isActive={pathname === '/carrinho'}>
              <TiShoppingCart />
              <span>Carrinho</span>
            </LinkContainer>

            <LinkContainer to="/deliveryStatus" $isActive={pathname === '/deliveryStatus'}>
              <MdDeliveryDining />
              <span>Status do Pedido</span>
            </LinkContainer>
          </ActionsContainer>
        </Options>
      </Content>
    </Container>
  );
}