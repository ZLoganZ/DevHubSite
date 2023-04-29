import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { commonColor } from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: ${(props) => props.theme.colorBg1};
  height: fit-content;
  color: ${(props) => props.theme.colorText1};

  .avatar_cover {
    .avatar {
      width: 170px;
      height: 170px;
      position: absolute;
      bottom: -6rem;
      left: 17rem;
      z-index: 1;
    }
  }
  .chat_Follow {
    .editProfile {
      .btnEditProfile {
        border: 1px solid ${(props) => props.theme.colorText1};
        color: ${(props) => props.theme.colorText1};
        border-radius: 0;
        :hover {
          border-color: ${commonColor.colorBlue1};
          color: ${commonColor.colorBlue1};
          cursor: pointer;
          transition: all 0.5s;
        }
      }
    }
  }
  .id_address_join {
    color: ${(props) => props.theme.colorText3};
    .item {
      display: inline-block;
      ::after {
        content: "•";
        margin-left: 0.5rem;
      }
    }
  }
  .description {
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
  .follow {
    color: ${(props) => props.theme.colorText3};
    .item {
      display: inline-block;
      ::after {
        content: "•";
        margin-left: 0.5rem;
      }
    }
  }
  .experience {
    font-size: 0.9rem;
    .company {
      font-weight: 600;
    }
  }
  .contact {
    .item {
      background-color: ${(props) => props.theme.colorBg3};
      :hover {
        background-color: ${(props) => props.theme.colorBg4};
        cursor: pointer;
        transition: all 0.3s;
      }
    }
  }
`;

export default StyleTotal;
