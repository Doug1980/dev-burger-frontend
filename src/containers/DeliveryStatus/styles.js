import styled, { keyframes } from 'styled-components';
import Background from '../../assets/background.svg'; 

// Animação para a mensagem aparecer suavemente
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.section`
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url(${Background});
  
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
  display: flex;
  flex-direction: column;
  align-items: center;    /* Centraliza os itens horizontalmente */
  justify-content: center; /* Centraliza os itens verticalmente */
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  overflow-x: hidden;
`;

// Container principal do conteúdo (caso use fora do feedback)
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

// Estilo comum para os Cartões de Feedback (Verde e Vermelho)
const BaseFeedback = styled.div`
  padding: 40px;
  background: #ffffff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  width: 100%;
  max-width: 700px; /* Largura máxima do cartão */
  
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza título, texto e botão */
  gap: 20px;           /* Espaçamento automático entre os itens */

  h3 {
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  p {
    color: #666;
    font-size: 18px;
    line-height: 1.6;
    margin: 0;
    display: block; /* Garante que o texto flua naturalmente */
    
    strong, span {
      color: #9758a6;
      font-weight: bold;
    }
  }
`;

export const FeedbackContainer = styled(BaseFeedback)`
  border: 2px solid #28a745;
  h3 { color: #28a745; }
`;

export const FeedbackContainer1 = styled(BaseFeedback)`
  border: 2px solid #F44336;
  h3 { color: #F44336; }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 300px;
  height: 52px;
  background: #9758a6;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #7d488a;
    transform: scale(1.02);
  }

  &:active {
    opacity: 0.8;
  }
`;

// Estilos adicionais mantidos para sua compatibilidade
export const OrderInfo = styled.div`
  text-align: center;
  margin-bottom: 50px;
  h2 { color: #333; font-size: 40px; margin-bottom: 20px; }
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 40px;
`;

export const Line = styled.div`
  height: 4px;
  flex: 1;
  background: ${(props) => (props.active ? '#9758a6' : '#bebebe')};
  margin-bottom: 30px; 
  margin-left: -40px;
  margin-right: -40px;
  z-index: 1;
  transition: background 0.3s ease;
`;

// E caso o erro peça também o "Step" e "StatusContainer", adicione-os:
export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
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
  }

  p {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: ${(props) => (props.active ? '#9758a6' : '#666')};
    font-weight: bold;
  }
`;