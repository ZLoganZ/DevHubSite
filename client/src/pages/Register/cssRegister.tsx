import styled, { css } from "styled-components";
import { flex_center_column, flex_center_row } from "../../util/cssVariable/cssVariable";

const StyleTotal = styled.div`
  background-color: #1f1f23;
  ${flex_center_column};
  .register {
    width: 70%;
    height: 85%;
    border-radius: 15px;
    overflow: hidden;
    background-image: url("./images/registerPage/background.jpg");
    background-size: cover;
    .cover {
      width: 100%;
      height: 100%;
      color: #d4d4d4;
      background-image: linear-gradient(
        to right,
        #161618,
        #1e1d2bf4,
        rgba(0, 0, 0, 0.5)
      );
      .content {
        width: 40%;
        .lineTop {
          ${flex_center_row};
          justify-content: space-around;
          .anyWhere {
            font-weight: 500;
            .circle {
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: #1f67e3;
            }
          }
          .home,
          .john {
            cursor: pointer;
            color: #979797;
            &:hover {
              color: #d4d4d4;
              transition: all 0.5s;
            }
          }
        }
        .account {
          .startFree {
            font-size: 1rem;
            color: #979797;
          }
          .createAccount {
            font-size: 2rem;
            font-weight: 700;
          }
          .member{
                font-size: 0.8rem;
            .memberEd{
                color: #979797;
            }
            .login{
                color: #1f67e3;
                &:hover{
                    cursor: pointer;
                    color: #1353c1;
                    transition: all 0.5s;
                }
            }
          }
          .formAccount{
            .buttonCreate{
                background-color: #1f67e3;
                color: #d4d4d4;
                font-size: 0.9rem;
                font-weight: 700;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                &:hover{
                    cursor: pointer;
                    background-color: #1353c1;
                    transition: all 0.5s;
                }
            }
          }
        }
      }
    }
  }
`;

export default StyleTotal;
