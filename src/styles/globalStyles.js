import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  button, a {
    cursor: pointer;
  }

  .swal2-popup {
    border-radius: 16px !important;
  }
`;

export default globalStyles;
