import { Link } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';

import BannerHamburguer from '../../assets/banner-hamburguer.svg';
import Background from '../../assets/background.svg';

export const TopMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
  padding: 0 40px;

  /* 📱 Mobile */
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
  }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;

    background: linear-gradient(
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0.6)
        ),
        url(${Background});
        
`;

export const Button = styled.button`
  position: absolute;
  left: 40px;

  background-color: #9758a6;
  color: #fff;
  border: none;

  margin-bottom: -40px;
  padding: 3px 14px;
  border-radius: 6px;
  font-size: 25px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;

  display: inline-flex;
  align-items: center;
  gap: 6px;

  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: #5c2669;
    color: #fff;
  }

  &:active {
    transform: scale(0.96);
  }

  /* 📱 Mobile */
  @media (max-width: 768px) {
    position: relative;
    left: 0;
    margin-bottom: 20px; // <- ADICIONA ISSO AQUI
  }
`;

export const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 480px;
  width: 100%;
  position: relative;

  background: url('${BannerHamburguer}') no-repeat;
  background-color: #1f1f1f;
  background-position: center;
  background-size: cover;

  h1 {
    font-family: "Road Rage", sans-serif;
    font-size: 80px;
    line-height: 65px;
    position: absolute;
    color: #fff;
    right: 20%;
    top: 30%;
  }

  span {
    display: block;
    color: #fff;
    font-size: 20px;
  }

  /* 📱 Tablet */
  @media (max-width: 1024px) {
    height: 360px;

    h1 {
      font-size: 60px;
      right: 10%;
      top: 35%;
    }
  }

  /* 📱 Mobile */
  @media (max-width: 768px) {
    height: 280px;

    h1 {
      font-size: 44px;
      line-height: 42px;
      right: 50%;
      top: 50%;
      transform: translate(50%, -50%);
      text-align: center;
    }

    span {
      font-size: 16px;
    }
  }
`;

export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px; // <- ADICIONA ISSO AQUI
  }
`;

export const CategoryButton = styled(Link)`
  text-decoration: none;
  background: none;
  color: ${(props) => (props.$isActiveCategory ? '#9758a6' : '#696969')};
  font-size: 30px;
  font-weight: 500;
  padding-bottom: 5px;
  line-height: 30px;
  border: none;
  border-bottom: ${(props) => props.$isActiveCategory && '3px solid #9758a6'};

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  gap: 60px;
  justify-content: center;
  max-width: 1280px;
  margin: 50px auto;

  /* 💻 Tablet */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  /* 📱 Mobile */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 30px;
  }
`;
export const GlobalStyle = createGlobalStyle`
  .swal2-popup {
    border-radius: 24px !important;
  }
`;
