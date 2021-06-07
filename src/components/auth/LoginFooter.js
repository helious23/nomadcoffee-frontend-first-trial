import styled from "styled-components";

const Container = styled.footer`
  width: 100%;
  color: ${(props) => props.theme.footerColor};
`;
const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  span {
    margin-right: 15px;
    cursor: pointer;
  }
`;
const Bottom = styled.div`
  text-align: center;
  margin-top: 25px;
  font-size: 12px;
`;

const LoginFooter = () => {
  return (
    <Container>
      <Top>
        <span>소개</span>
        <span>블로그</span>
        <span>채용 정보</span>
        <span>도움말</span>
        <span>API</span>
        <span>개인정보처리방침</span>
        <span>약관</span>
        <span>인기 카페</span>
        <span>해시태그</span>
        <span>위치</span>
      </Top>
      <Bottom>
        <div>
          &copy; {new Date().getFullYear()} NomadCoffee from Nomadcoders
        </div>
      </Bottom>
    </Container>
  );
};

export default LoginFooter;
