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

  @media (max-width: 768px) {
    .swal2-popup {
      width: 80% !important;
      padding: 20px !important;
    }

    .swal2-title {
      font-size: 18px !important;
    }

    .swal2-html-container {
      font-size: 13px !important;
    }

    .swal2-icon {
      width: 60px !important;
      height: 60px !important;
      margin: 16px auto !important;
    }

    .swal2-icon .swal2-icon-content {
      font-size: 30px !important;
    }

    .swal2-confirm {
      font-size: 13px !important;
      padding: 8px 20px !important;
    }
  }
`;

export default globalStyles;
