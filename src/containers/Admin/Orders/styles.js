import styled from 'styled-components';
import Select from 'react-select';

export const ProductImage = styled.img`
    height: 50px;
    padding: 12px;
    border-radius: 16px;
    
`;

export const SelectStatus = styled(Select)`
    width: 240px;
`;

export const Filter = styled.div`
    display: flex;
    justify-content: center;
    margin: 28px;
    gap: 50px;
`;

export const FilterOption = styled.button`
    cursor: pointer;
    background: none;
    color:${(props) => (props.$isActiveStatus ? props.theme.purple : props.theme.darkGray)} ;
    border-bottom: ${(props) => (props.$isActiveStatus ? `1px solid ${props.theme.purple}` : 'none')};
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 5px;
    border: none;    
    font-weight: bold;
    
`;
