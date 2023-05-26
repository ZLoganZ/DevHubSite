import styled, { css } from 'styled-components';
import { commonColor } from '../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg2};
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
    color: ${(props) => props.theme.colorBg3};
    font-style: normal;
  }

  .ql-container {
    border: none;
  }

  .newPostBody {
    .name_avatar {
      .name {
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
  .newPostFooter {
    .newPostFooter__left {
      .emoji,
      .code {
        color: ${(props) => props.theme.colorText3};
        :hover {
          cursor: pointer;
          color: ${(props) => props.theme.colorText2};
          transition: all 0.5s;
        }
      }
    }
    .newPostFooter__right {
      .createButton {
        background-color: ${commonColor.colorBlue1};
        :hover {
          background-color: ${commonColor.colorBlue3};
          transition: all 0.5s;
        }
      }
    }
  }
`;

export default StyleTotal;
