import { func } from "prop-types";
import { Container, HeaderLink, LinkContainer, Logout, Navigation, Options, Profile, Content } from "./styles";
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate, useResolvedPath } from "react-router-dom";

import { useUser } from "../../hooks/UserContext";



export function Header() {
    const navigate = useNavigate();
    const { logout, userInfo } = useUser();

    const { pathname } = useResolvedPath();

    function logoutUser() {
        logout();
        navigate('/login');
    }


    console.log(userInfo);
    return (
        <Container>
            <Content>
                <Navigation>
                    <div>
                        <HeaderLink to="/" $isActive={pathname === '/'}>Home</HeaderLink>
                        <hr></hr>
                        <HeaderLink to="/cardapio" $isActive={pathname === '/cardapio'}>Carpápio</HeaderLink>
                    </div>
                </Navigation>
                <Options>
                    <Profile>
                        <FaUserCircle color="#fff" size={35} />
                        <div>
                            <p>Olá <span>{userInfo.name}</span>
                            </p>
                            <Logout onClick={logoutUser}>Sair</Logout>
                        </div>
                    </Profile>
                    <LinkContainer>
                        <TiShoppingCart color="#fff" size={24} />
                        <HeaderLink to="/carrinho">Carrinho</HeaderLink>
                    </LinkContainer>
                </Options>

            </Content>
        </Container>
    );
}