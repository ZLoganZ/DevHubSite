import styled from 'styled-components';
import { commonColor } from '../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.colorBg1};

  .btnNext {
    bottom: 10%;
    right: 0%;
    border-radius: 1.5rem;
  }
`;

export default StyleTotal;
