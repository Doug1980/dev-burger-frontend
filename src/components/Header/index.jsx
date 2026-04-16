import { useNavigate, useResolvedPath } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';
import { MdDeliveryDining } from 'react-icons/md';
import { useUser } from '../../hooks/UserContext';
import { useCart } from '../../hooks/CartContext';
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
  const { cartProducts } = useCart();
  const { pathname } = useResolvedPath();

  const cartCount = cartProducts?.length || 0;
  const activeOrdersCount = parseInt(
    localStorage.getItem('activeOrdersCount') || '0',
    10,
  );

  async function logoutUser() {
    await logout();
    navigate('/login', { replace: true });
  }

  const IconWithBadge = ({ icon: Icon, count }) => (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <Icon size={22} color="#fff" />
      {count > 0 && (
        <span
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            background: '#ff4400',
            color: 'white',
            fontSize: 9,
            fontWeight: 700,
            padding: '1px 4px',
            borderRadius: 10,
            minWidth: 14,
            textAlign: 'center',
            lineHeight: '14px',
          }}
        >
          {count}
        </span>
      )}
    </div>
  );

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
          {/* Desktop */}
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
              <IconWithBadge icon={TiShoppingCart} count={cartCount} />
              <span>Carrinho</span>
            </LinkContainer>
            <LinkContainer
              to="/deliveryStatus"
              $isActive={pathname === '/deliveryStatus'}
            >
              <IconWithBadge
                icon={MdDeliveryDining}
                count={activeOrdersCount}
              />
              <span>Status do pedido</span>
            </LinkContainer>
          </ActionsContainer>

          {/* Mobile — linha 1 */}
          <TopRow>
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

          {/* Mobile — linha 2 */}
          <BottomRow>
            <LinkContainer to="/carrinho" $isActive={pathname === '/carrinho'}>
              <IconWithBadge icon={TiShoppingCart} count={cartCount} />
              <span>Carrinho</span>
            </LinkContainer>
            <LinkContainer
              to="/deliveryStatus"
              $isActive={pathname === '/deliveryStatus'}
            >
              <IconWithBadge
                icon={MdDeliveryDining}
                count={activeOrdersCount}
              />
              <span>Status do pedido</span>
            </LinkContainer>
          </BottomRow>
        </Options>
      </Content>
    </Container>
  );
}
