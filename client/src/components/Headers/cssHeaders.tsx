import styled, { css } from 'styled-components';

const StyleTotal = styled.div`
  .messageButton,
  .notiButton,
  .avatarButton {
    &:hover {
      background-color: ${(props) => props.theme.colorBg4};
    }
  }

  .animated-word {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .letter {
    transition: 0.4s;
    transform: translateX(0);
    color: ${(props) => props.theme.colorText1};
  }

  .letter:hover {
    transform: translateY(-1rem);
    background: -webkit-linear-gradient(120deg, hsl(19, 90%, 52%), hsl(56, 100%, 50%));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .ant-notification-notice-icon {
  }

  .ant-notification-notice-message {
  }

  .ant-notification-notice-description {
  }

  .ant-notification-notice-btn {
  }
`;

export default StyleTotal;
