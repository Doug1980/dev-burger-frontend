import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    background-color: ${(props) => props.theme.mainBlack};
    width: 100%;
    height: 90px;
    padding: 0 10px;   
   
     
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  div a:not(:last-child)::after {
    content: '|';
    margin-left: 12px;
    color: #999;
  }

  /* 📱 MOBILE */
  @media (max-width: 768px) {
    div {
      flex-direction: column;
      align-items: flex-start;
      gap: 2px; /* ✅ espaço real entre Home e Cardápio */
    }

    div a:not(:last-child)::after {
      content: '';
      margin: 0;
    }
  }
`;

export const HeaderLink = styled(Link)`
  color: ${(props) =>
    props.$isActive ? props.theme.purple : props.theme.white};

  border-bottom: ${(props) => (props.$isActive ? '3px solid #9758a6' : 'none')};

  text-decoration: none;
  font-size: 30px;
  transition: color 200ms;

  margin-top: 0; /* ✅ REMOVE O PROBLEMA */

  &:hover {
    color: #9758a6;
  }

  /* 📱 MOBILE */
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 35px;
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
    margin-top: 30px;

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

export const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;

  color: #fff;
  text-decoration: none;
  cursor: pointer;

  svg {
    font-size: 22px;
    color: #fff;
    flex-shrink: 0;
  }

  span {
    font-size: 22px;
    color: #fff;
    white-space: nowrap;
  }

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    span {
      font-size: 16px;
    }

    svg {
      font-size: 18px;
    }
  }
`;

export const Logout = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-top: 2px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;
