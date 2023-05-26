import styled from 'styled-components';
import { commonColor } from '../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  .ql-toolbar {
    border: none;
    svg {
      filter: ${(props) => props.theme.colorEditor};
    }
  }
  .ql-editor {
    font-size: 14px;
  }
  .ql-editor::before {
    color: ${(props) => props.theme.colorText3};
    font-style: normal;
  }

  .ql-container {
    border: none;
  }
`;

export default StyleTotal;
