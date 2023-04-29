import styled, { css } from "styled-components";

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg1};
  height: fit-content;
  color: ${(props) => props.theme.colorText1};
  .btn-show {
    margin: 6px;
  }

  .popular-post-body {
    .popular-post-item {
      border-radius: 5px;
      :hover {
        background-color: ${(props) => props.theme.colorBg3};
        color: ${(props) => props.theme.colorText1};
        cursor: pointer;
        transition: all 0.5s;
      }
    }
  }
  .top-community-body {
    .top-community-item {
      border-radius: 5px;
      :hover {
        background-color: ${(props) => props.theme.colorBg3};
        color: ${(props) => props.theme.colorText1};
        cursor: pointer;
        transition: all 0.5s;
      }
    }
  }
`;

export default StyleTotal;
