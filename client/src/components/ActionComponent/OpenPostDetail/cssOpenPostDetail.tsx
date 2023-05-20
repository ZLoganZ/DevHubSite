import styled from 'styled-components';
import { commonColor } from '../../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg1};
  min-height: calc(100vh - 5rem);
  max-height: calc(100vh - 5rem);
  color: ${(props) => props.theme.colorText1};

  .input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .sendComment {
    position: relative;
    left: -5.5rem;
    z-index: 1;
  }
`;

export default StyleTotal;
