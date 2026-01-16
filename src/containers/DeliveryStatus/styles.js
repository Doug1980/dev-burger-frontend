import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%; /* Use 100% em vez de 100vw para evitar conflito com a barra vertical */
  overflow-x: hidden; /* Corta qualquer transbordamento acidental lateral */
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100vw; /* Garante que o conteúdo não passe da largura da janela */
  padding: 40px 10px; /* Reduzimos um pouco o padding lateral */
`;

export const OrderInfo = styled.div`
  text-align: center;
  margin: 50px 0 50px;
  h2 { color: #333; margin-bottom: 30px; font-size: 50px;}
  p { color: #666; font-size: 20px;font-weight: 800; } // Troquei span por p para bater com seu index
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1300px;
  margin: 20px auto; /* Centraliza o container na página */
  padding: 0 40px;
`;

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px; /* O PULO DO GATO: Largura fixa para cada passo */
  position: relative;
  z-index: 2;

  .circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${(props) => (props.active ? '#9758a6' : '#bebebe')};
    color: white;
    display: flex;
    font-size: 25px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: background 0.3s ease;
  }

  p {
    margin-top: 10px;
    font-size: 13px;
    text-align: center; /* Garante que o texto fique no meio do círculo */
    color: ${(props) => (props.active ? '#9758a6' : '#666')};
    font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
    /* Remova o white-space: nowrap se o texto for muito grande */
  }
`;

export const Line = styled.div`
  height: 4px;
  flex: 1; /* Faz a linha ocupar o espaço entre os Steps */
  background: ${(props) => (props.active ? '#9758a6' : '#bebebe')};
  
  /* Ajuste de alinhamento vertical para ficar no meio do círculo */
  margin-bottom: 30px; 
  
  /* Margens negativas pequenas para "encostar" nos círculos se necessário */
  margin-left: -40px;
  margin-right: -40px;
  
  z-index: 1;
  transition: background 0.3s ease;
`;

// Animação para a mensagem de sucesso aparecer suavemente
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const FeedbackContainer = styled.div`
  margin-top: -24px;
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  border: 2px solid #28a745;
  animation: ${fadeIn} 0.8s ease-out;
  width: 75%;

  h3 {
    color: #28a745;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 18px;
    line-height: 1.5;
  }

  strong {
    color: #9758a6;
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 250px;
  height: 48px;
  background: #9758a6;
  border-radius: 5px;
  border: none;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #eeeeee;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;
