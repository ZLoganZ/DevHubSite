import styled from "styled-components";
import { commonColor } from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.colorBg1};

  .btnNext {
    background-color: ${commonColor.colorBlue2};
    bottom: 10%;
    right: 0%;
    :hover {
      background-color: ${commonColor.colorBlue3};
      cursor: pointer;
      transition: all 0.5s;
    }
  }
`;

export default StyleTotal;
