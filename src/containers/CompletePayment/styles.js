import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.85),
      rgba(255, 255, 255, 0.85)
    ),
    ${({ theme }) => theme.background};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Content = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 50px 40px;
  max-width: 420px;
  width: 100%;
  text-align: center;

  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 25px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SuccessIcon = styled.div`
  font-size: 64px;
  color: #4caf50;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #2e2e2e;
`;

export const Message = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #6b6b6b;
`;

export const Button = styled(Link)`
  margin-top: 20px;
  padding: 14px;
  border-radius: 10px;
  background-color: #9758a6;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;

  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #6f357c;
    transform: scale(1.03);
  }
`;
