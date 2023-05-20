import styled, { css } from 'styled-components';
import { commonColor, flex_center_column, flex_center_row } from '../../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg2};
  max-height: calc(100vh - 5rem);

  .postDetail {
    /* .commentTotal { */
    &::-webkit-scrollbar {
      display: none;
    }
    /* } */
  }
`;

export default StyleTotal;
