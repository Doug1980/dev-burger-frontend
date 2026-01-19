import styled from 'styled-components';
import { Link as ReactLink } from 'react-router-dom';

import BackgroundLogin from '../../assets/bg_login.svg';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const LeftContainer = styled.div`
  width: 50%;
  background: url(${BackgroundLogin}) no-repeat center;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 260px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightContainer = styled.div`
  width: 50%;
  background: #1f1f1f;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 60px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 24px;
  }
`;

export const Header = styled.div`
  margin-bottom: 32px;

  img {
    width: 180px;
    margin-bottom: 16px;
  }
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 28px;
  font-weight: 700;

  span {
    color: #ffb800;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #fff;
    margin-bottom: 6px;
    font-size: 14px;
  }

  input {
    height: 48px;
    border-radius: 8px;
    border: none;
    padding: 0 12px;
    font-size: 16px;
  }

  p {
    color: #fff;
    font-size: 15px;
    margin-top: 4px;
  }
`;

export const Link = styled(ReactLink)`
  color: #ffb800;
  font-weight: 600;
  margin-left: 4px;
  text-decoration: none;
  

  &:hover {
    text-decoration: underline;
  }
`;
