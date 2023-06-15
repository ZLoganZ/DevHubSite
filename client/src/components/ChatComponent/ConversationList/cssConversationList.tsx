import styled from 'styled-components';
import { commonColor, custom_scrollBar } from '../../../util/cssVariable';

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg1};
  .searchChat {
    .userChat {
      .userItem {
        :hover {
          background-color: ${(props) => props.theme.colorBg2};
          cursor: pointer;
          transition: all 0.5s;
        }
      }
    }
  }
  .userChat {
    ${custom_scrollBar}
  }
`;

export default StyleTotal;
