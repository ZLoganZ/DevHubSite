import styled from 'styled-components';
import { commonColor } from '../../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  .header {
    .displayShare {
      color: ${(props) => props.theme.colorText3};
      :hover {
        color: ${(props) => props.theme.colorText1};
        transition: all .5s;
      }
    }
  }
`;

export default StyleTotal;
