import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.mainBlack};
  width: 100%;
  padding: 0 10px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 10px 0;
    gap: 0;
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

  @media (max-width: 768px) {
    display: none; 
  }
`;

export const HeaderLink = styled(Link)`
  color: ${(props) => (props.$isActive ? props.theme.purple : props.theme.white)};
  border-bottom: ${(props) => (props.$isActive ? '3px solid #9758a6' : 'none')};
  text-decoration: none;
  font-size: 30px;
  transition: color 200ms;
  display: inline-block; /* 👈 adiciona isso */

  &:hover { color: #9758a6; }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;

  div {
    color: #fff;
    line-height: 1.2;
    span {
      font-weight: 700;
      color: #9758a6;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TopRow = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;

    nav {
      display: flex !important;
    }

    & > div {
      display: flex !important;
    }
  }
`;

export const BottomRow = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-top: 1px solid #333;
    padding-top: 8px;
  }
`;

export const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  border-bottom: ${(props) => (props.$isActive ? '3px solid #9758a6' : 'none')};
  padding-bottom: 3px;
  width: fit-content;

  svg {
    font-size: 22px;
    color: #fff;
    flex-shrink: 0;
  }

  span {
    font-size: 22px;
    color: #fff;
    white-space: nowrap;
    line-height: 100%;
  }

  &:hover { opacity: 0.85; }

  @media (max-width: 768px) {
    span { font-size: 14px; }
    svg { font-size: 18px; }
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    display: none;
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

  &:hover { text-decoration: underline; }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;
