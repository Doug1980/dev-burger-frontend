import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background-color: #FF8F00;
  color: #fff;
  box-sizing: border-box; 
  flex-shrink: 0; /* Garante que o footer não diminua de tamanho */

  p {
      color: #fff;
      font-family: "Poppins", sans-serif;
      font-size: 14px;
      font-weight: lighter;
      text-align: center;
  }
`;
