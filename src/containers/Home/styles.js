import styled from 'styled-components';
import BannerHome from '../../assets/banner-home.svg';
import Background from '../../assets/background.svg';

export const Banner = styled.div`
  background: url('${BannerHome}');
  background-size: cover;
  background-position: center;
  height: 480px;
  position: relative;

  h1 {
    font-family: "Road Rage", sans-serif;
    font-size: 80px;
    color: #f4f4ff;
    position: absolute;
    right: 20%;
    top: 10%;
  }

  @media (max-width: 768px) {
    height: 280px;

    h1 {
      font-size: 42px;
      right: 5%;
      top: 5%;
      text-align: right;
    }
  }
`;

export const Container = styled.section`
  background: linear-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.6)
  ),
  url(${Background});
  height: 100%;
`;

export const Content = styled.div``;
