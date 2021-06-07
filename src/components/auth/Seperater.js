import styled from "styled-components";

const SSeperater = styled.div`
  margin-top: 20px;
  /* text-transform: uppercase; */
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 20px;
    width: 70px;
    text-align: center;
    font-weight: 600;
    color: #8e8e8e;
    font-size: 14px;
  }
`;

const Seperater = () => {
  return (
    <SSeperater>
      <div></div>
      <span>또는</span>
      <div></div>
    </SSeperater>
  );
};

export default Seperater;
