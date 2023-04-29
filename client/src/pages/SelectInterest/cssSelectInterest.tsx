import styled from "styled-components";
import { commonColor } from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.colorBg1};
  .selectInterest {
    .content {
      .interest {
        .interestItem {
          &.active {
            background-color: ${commonColor.colorBlue3};
          }
          background-color: ${(props) => props.theme.colorBg2};
          color: ${(props) => props.theme.colorText2};
          border-radius: 1.5rem;
          :hover {
            background-color: ${commonColor.colorBlue3};
            cursor: pointer;
            transition: all 0.5s;
          }
        }
      }
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
    }
  }
`;

export default StyleTotal;
