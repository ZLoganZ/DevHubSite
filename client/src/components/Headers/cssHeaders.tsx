import styled, { css } from "styled-components";

const StyleTotal = styled.div`
  .messageButton,
  .notiButton,
  .avatarButton {
    &:hover {
      background-color: ${(props) => props.theme.colorBg4};
    }
  }
`;

export default StyleTotal;
