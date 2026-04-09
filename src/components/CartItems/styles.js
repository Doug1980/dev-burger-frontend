import styled from 'styled-components';

export const ProductImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    color: #fff;
    border-radius: 4px;
    background-color: #9758a6;
    transition: all 0.4s;
    border: none;

    &:hover {
      background-color: #6f357c;
    }
  }
`;

export const EmptyCart = styled.p`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

export const ProductTotalPrice = styled.p`
  font-weight: bold;
`;

export const TrashImage = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.7);
  }
`;

export const MobileCard = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff;
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

export const MobileCardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  p { font-size: 14px; font-weight: 700; color: #ff8c05; margin: 0; }
  strong { font-size: 14px; color: #363636; }
`;

export const MobileCardActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const DesktopTable = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;
