import styled, { css } from "styled-components";
import {
  commonColor,
  flex_center_column,
  flex_center_row,
} from "../../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg2};
  .post {
    .postHeader {
      .postHeader__left {
        .name_avatar {
          .name__top {
            a {
              color: ${(props) => props.theme.colorText1};
              :hover {
                text-decoration: underline;
                transition: all 0.5s;
              }
            }
          }
        }
      }
      .postHeader__right {
        .icon {
          :hover {
            cursor: pointer;
            color: ${(props) => props.theme.colorText2};
            transition: all 0.3s;
          }
        }
      }
    }
    .postBody {
    }
    .postFooter {
      .item {
        :hover {
          cursor: pointer;
        }
      }
    }
  }
`;

export default StyleTotal;
