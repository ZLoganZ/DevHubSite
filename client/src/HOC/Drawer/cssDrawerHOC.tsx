import styled, { css } from "styled-components";
import {
  commonColor,
  flex_center_column,
  flex_center_row,
} from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: red;
  .btnCancelDrawer {
    // hover
    :hover {
      background-color: ${(props) => props.theme.colorBg2};
    }
  }
`;

export default StyleTotal;
