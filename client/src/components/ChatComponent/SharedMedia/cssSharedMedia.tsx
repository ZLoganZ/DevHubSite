import styled from 'styled-components';
import { commonColor } from '../../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  .shared {
    .extension {
      .extensionItem {
        color: ${(props) => props.theme.colorText3};
        :hover {
          color: ${(props) => props.theme.colorText1};
          cursor: pointer;
          transition: all 0.5s;
        }
      }
    }
  }
`;

export default StyleTotal;
