import styled from 'styled-components';

export const Container = styled.div``;

export const ProductImage = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;

`;

export const EditButton = styled.button`
    border: 0;
    background-color: ${(props) => props.theme.darkWhite};
    height: 50px;
    width: 50px;
    border-radius: 8px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;


     svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.white};    
  }

    &:hover {
        background-color: ${(props) => props.theme.purple};
    }

   
`;
