import { useNavigate, useResolvedPath } from 'react-router-dom';
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
  ActionsContainer,
  TopRow,
  BottomRow,
} from './styles';

export function Header() {
  const navigate = useNavigate();
  const { logout, userInfo } = useUser();
  const { pathname } = useResolvedPath();

  async function logoutUser() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to="/" $isActive={pathname === '/'}>
              Home
            </HeaderLink>
            <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>
              Cardápio
            </HeaderLink>
          </div>
        </Navigation>

        <Options>
          {/* Desktop — layout original */}
          <Profile>
            <FaUserCircle color="#fff" size={35} />
            <div>
              <p>
                Olá, <span>{userInfo?.name}</span>
              </p>
              <Logout onClick={logoutUser}>Sair</Logout>
            </div>
          </Profile>
          <ActionsContainer>
            <LinkContainer to="/carrinho" $isActive={pathname === '/carrinho'}>
              <TiShoppingCart />
              <span>Carrinho</span>
            </LinkContainer>
            <LinkContainer
              to="/deliveryStatus"
              $isActive={pathname === '/deliveryStatus'}
            >
              <MdDeliveryDining />
              <span>Status do pedido</span>
            </LinkContainer>
          </ActionsContainer>

          {/* Mobile — linha de perfil */}
          <TopRow>
            <Profile>
              <FaUserCircle color="#fff" size={28} />
              <div>
                <p>
                  Olá, <span>{userInfo?.name}</span>
                </p>
                <Logout onClick={logoutUser}>Sair</Logout>
              </div>
            </Profile>
          </TopRow>

          {/* Mobile — linha de ações */}
          <BottomRow>
            <LinkContainer to="/carrinho" $isActive={pathname === '/carrinho'}>
              <TiShoppingCart />
              <span>Carrinho</span>
            </LinkContainer>
            <LinkContainer
              to="/deliveryStatus"
              $isActive={pathname === '/deliveryStatus'}
            >
              <MdDeliveryDining />
              <span>Status do pedido</span>
            </LinkContainer>
          </BottomRow>
        </Options>
      </Content>
    </Container>
  );
}
