import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 40px;

  .carousel-item {
    padding-right: 40px;
    margin-bottom: 30px;
  }

  .react-multiple-carousel__arrow--left {
    left: 15px;
    top: 10px;
  }

  .react-multiple-carousel__arrow--right {
    right: 48px;
    top: 10px;
  }

  @media (max-width: 768px) {
    padding-left: 16px;

    .carousel-item {
      padding-right: 16px;
    }

    .react-multiple-carousel__arrow--right {
      right: 20px;
    }
  }
`;

export const Title = styled.h2`
  font-size: 50px;
  font-weight: 800;
  color: #FF8F00;
  padding-bottom: 12px;
  position: relative;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 20px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 56px;
    height: 4px;
    background-color: #FF8F00;
    left: calc(50% - 28px);
  }

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

export const ContainerItems = styled.div`
    background: url('${(props) => props.imageUrl}');
    background-position: center;
    background-size: cover;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;


    display: flex;
    align-items: center;
    padding: 20px 10px;
    width: 100%;
    height: 250px;
    cursor: grab;

    

    

    p{
       
    }
`;

export const CategoryButton = styled(Link)`
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.5 );
        padding: 10px 30px;
        border-radius: 30px;
        font-size: 22.5px;
        font-weight: 500;
        margin-top: 170px;
        text-decoration: none;

        &:hover {
            background-color: #FF8F00;
        }


`;
