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
} from './styles';

export function Header() {
  const navigate = useNavigate();
  const { logout, userInfo } = useUser();
  const { pathname } = useResolvedPath();

  async function logoutUser() {
    await logout(); // Executa a limpeza dos dados no LocalStorage e Contexto
    navigate('/login', { replace: true }); // Redireciona e substitui a Home no histórico
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
          <Profile>
            <FaUserCircle color="#fff" size={35} />
            <div>
              {/* Usamos a interrogação para evitar erros se o userInfo for nulo no segundo do logout */}
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
              <span>Status do pedido</span>
            </LinkContainer>
          </ActionsContainer>
        </Options>
      </Content>
    </Container>
  );
}