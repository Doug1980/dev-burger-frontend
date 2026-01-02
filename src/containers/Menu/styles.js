import { Link } from "react-router-dom";
import styled from "styled-components";

import BannerHamburguer from '../../assets/banner-hamburguer.svg'
import Background from '../../assets/background.svg' 


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
  background-color: #9758a6;
  color: #fff;
  border: none;
  margin: 20px 0 0 20px;
  padding: 02px 22px;
  border-radius: 8px;
  font-size: 30px;
  font-weight: 400;
  font-family: "Poppins", sans-serif;

  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #6f357c;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
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

    

`;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 30px;

`;

export const CategoryButton = styled(Link) `
    text-decoration: none;
    background: none;
    color: ${(props) => (props.$isActiveCategory ? '#9758a6' : '#696969')} ;
    font-size: 30px;
    font-weight: 500; 
    padding-bottom: 5px;
    line-height: 30px;
    border: none;
    border-bottom: ${ (props) => props.$isActiveCategory && '3px solid #9758a6'} ;
`;

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    gap: 60px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto;

`;