import { Link } from "react-router-dom";
import styled from "styled-components";


export const Container = styled.div`
    background-color: ${(props) => props.theme.mainBlack};
    width: 100%;
    height: 72px;
    padding: 0 10px;   
   
     
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; 

    width: 100%;
    max-width: 1600px;  
    margin: 0 auto;
`;
export const Navigation = styled.nav`
    display: flex;
    align-items: center;    
    justify-content: center;
    height: 72px;

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;

        hr {
            height: 24px;
            border: 1px solid #625e5e;   
            }
    }

`;
export const HeaderLink = styled(Link)`
    color: ${(props => props.$isActive ? (props) => props.theme.purple : (props) => props.theme.white)};
    border-bottom: ${(props) => (props.$isActive ? '3px solid #9758a6' : 'none')};
    padding-bottom: -1px;
    text-decoration: none;
    font-size: 25px;
    transition: color 200ms;

    &:hover {
        color: #9758a6;
    }
`;
export const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 42px;

`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;  
    font-size: 14px;

    div {
        font-size: 16px;
        color: #fff;
        line-height: 90%;
        font-weight: 300;
        
        
        span {
            font-size: 16px;
            font-weight: 700;
            color: #9758a6;
        }
    }

`;

export const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Logout = styled.button`
    font-size: 16px;
    color: #ff3205;
    text-decoration: none;
    font-weight: 700;
    background-color: transparent;
    border: none;
`;


 
