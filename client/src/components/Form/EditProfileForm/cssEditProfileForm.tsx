import styled from 'styled-components';
import { commonColor } from '../../../util/cssVariable/cssVariable';

const StyleTotal = styled.div`
  .form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1rem;
    color: #fff;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      font-size: 1rem;
      cursor: text;
      top: 20px;
    }

    &:required,
    &:invalid {
      box-shadow: none;
    }
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;
  }

  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #1f57b8;
    }
    padding-bottom: 6px;
    border-width: 3px;
    /* border-image: linear-gradient(to right, #11998e, #38ef7d); */
    /* border-image: linear-gradient(to right, #111f99, #be38ef); */
    /* border-image: linear-gradient(to right, #1f57b8, #1f57b8); */
    border-color: #1f57b8;
    border-image-slice: 1;
  }

  .editProfileForm {
    .componentNoInfo {
      .btnContent {
        :hover {
          background-color: ${commonColor.colorBlue3}!important;
          transition: all 0.5s;
        }
      }
    }
    .coverSection {
      .btnChangeCover {
        background-color: ${commonColor.colorBlue2}!important;
        font-weight: 600;
        border-radius: 20rem;
        :hover {
          background-color: ${commonColor.colorBlue3}!important;
          transition: all 0.5s;
        }
      }
      .btnRemove {
        background-color: ${commonColor.colorRed1}!important;
        font-weight: 600;
        border-radius: 20rem;
        :hover {
          background-color: ${commonColor.colorRed2}!important;
          transition: all 0.5s;
        }
      }
    }
    .avatar {
      .btnChange {
        background-color: ${commonColor.colorBlue2}!important;
        font-weight: 600;
        border-radius: 20rem;
        :hover {
          background-color: ${commonColor.colorBlue3}!important;
          transition: all 0.5s;
        }
      }
    }
    .addLinks {
      .addLinks {
        :hover {
          background-color: ${(props) => props.theme.colorBg4};
          transition: all 0.5s;
        }
      }
      .item {
        background-color: ${(props) => props.theme.colorBg3};
        margin-right: 8px;
        :hover {
          background-color: ${(props) => props.theme.colorBg4};
          cursor: pointer;
          transition: all 0.3s;
        }
      }
    }
    .expertise {
      .addTags {
        :hover {
          background-color: ${(props) => props.theme.colorBg4};
          transition: all 0.5s;
        }
      }
    }
  }
  .tags {
    .item {
      border: 2px solid ${(props) => props.theme.colorText3};
      border-radius: 0.8rem;
      font-size: 0.8rem;
      font-weight: 500;
      :hover {
        cursor: pointer;
        transition: all 0.3s;
      }
    }
  }
`;

export default StyleTotal;
