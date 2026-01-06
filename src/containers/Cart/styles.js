import styled from 'styled-components';

import Background from '../../assets/background.svg';
import Texture from '../../assets/bg_login.svg';

export const CartHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 12px;
  margin: 24px 0 16px;
  padding: 0 16px;
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden; /* 🔑 ESSENCIAL */

  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  ),
  url('${Background}');
`;

export const Banner = styled.div`
  background: url('${Texture}');
  background-color: #1f1f1f;
  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 220px;

  img {
    width: 220px;
  }

  /* 📱 Mobile */
  @media (max-width: 768px) {
    height: 180px;

    img {
      width: 180px;
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 30%;
  gap: 40px;

  width: 100%;
  max-width: 1280px;
  padding: 48px;
  margin: 0 auto;

  overflow-x: auto;   /* ✅ scroll horizontal controlado */
  overscroll-behavior-x: contain;

  /* 📱 Mobile */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 24px;
  }
`;

export const BackButton = styled.button`
  background-color: #9758a6;
  color: #fff;
  border: none;

  padding: 6px 16px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;

  &:hover {
    background-color: #5c2669;
  }
`;

export const Title = styled.div`
  font-size: 50px;
  font-weight: 800;
  padding-bottom: 12px;
  color: #61a120;
  text-align: center;
  position: relative;

  &:after {
    position: absolute;
    left: calc(50% - 28px);
    bottom: 0;
    content: '';
    width: 56px;
    height: 4px;
    background-color: #61a120;
  }

  /* 📱 Mobile */
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;
