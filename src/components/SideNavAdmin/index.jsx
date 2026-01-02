import { SignOut } from "phosphor-react";


import Logo from '../../assets/logo.svg';
import { navLinks } from "./navLinks";
import { Container, NavLink, NavLinkContainer, Footer } from "./styles";
import { useUser } from '../../hooks/UserContext';
import { useResolvedPath } from "react-router-dom";



export function SideNavAdmin() {
    const { logout } = useUser();
    const { pathname } = useResolvedPath();

    return (
        <Container>
            <img src={Logo} alt="logo dev burguer" />
            <NavLinkContainer>
                {navLinks.map(link => (
                    <NavLink
                        key={link.id} to={link.path} $isActive={pathname === link.path}>
                        {link.icon}
                        <span>
                            {link.label}
                        </span>


                    </NavLink>
                ))}
            </NavLinkContainer>
            <Footer>
                <NavLink to="/login" onClick={logout}>
                    <SignOut size={22} />
                    <span>Sair</span>
                </NavLink>
            </Footer>
        </Container>
    );
}