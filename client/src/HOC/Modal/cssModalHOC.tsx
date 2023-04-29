import styled, { css } from "styled-components";
import {
  commonColor,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: red;
  /* .btnCancelModal {
    :hover {
      background-color: ${(props) => props.theme.colorBg2};
    }
  } */

  .btnCancel {
    background-color: red!important;
    :hover {
      background-color: ${(props) => props.theme.colorBg4}!important;
    }
  }
  .btnAccept {
    color: ${(props) => props.theme.colorText1};
    :hover {
      background-color: ${commonColor.colorBlue3}!important;
    }
  }
`;

export default StyleTotal;
