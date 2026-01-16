import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ocupa a altura total da tela */
  width: 100%;
`;

export const MainContent = styled.main`
  flex: 1; /* Estica para preencher o espaço vazio entre Header e Footer */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  background-color: #f0f0f0; /* Cor de fundo para destacar o card branco */
`;
