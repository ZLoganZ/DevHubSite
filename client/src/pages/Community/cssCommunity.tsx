import styled from "styled-components";
import { commonColor } from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg1};
  height: fit-content;
  color: ${(props) => props.theme.colorText1};

  .avatar_cover {
    .avatar {
      width: 170px;
      height: 170px;
      position: absolute;
      bottom: -7rem;
      left: 17rem;
      z-index: 1;
    }
  }
`;

export default StyleTotal;
