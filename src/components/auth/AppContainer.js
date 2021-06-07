import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const AppText = styled.div`
  text-align: center;
  margin: 20px 0px;
`;

const SAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;

const Apple = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background-color: ${(props) => props.theme.appBgColor};
  color: ${(props) => props.theme.appFontColor};
  padding: 5px 12px;
  border-radius: 5px;
  svg {
    font-size: 30px;
    margin-right: 8px;
  }
`;

const Android = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  background-color: ${(props) => props.theme.appBgColor};
  color: ${(props) => props.theme.appFontColor};
  padding: 5px 12px;
  border-radius: 5px;
  svg {
    font-size: 20px;
    margin-right: 8px;
  }
`;

const AppleText = styled.div`
  display: flex;
  flex-direction: column;
  div {
    font-size: 12px;
    &:first-child {
      margin-bottom: 5px;
    }
  }
`;

const AndroidText = styled.div`
  display: flex;
  flex-direction: column;
  div:first-child {
    font-size: 10px;
  }
  div:last-child {
    margin-bottom: 5px;
    font-size: 15px;
  }
`;

const AppContainer = () => {
  return (
    <>
      <AppText>앱을 다운로드하세요.</AppText>
      <SAppContainer>
        <Apple href="https://www.apple.com/app-store/" target="_blank">
          <FontAwesomeIcon icon={faApple} />
          <AppleText>
            <div>App store 에서</div>
            <div>다운로드 하기</div>
          </AppleText>
        </Apple>
        <Android
          href="https://play.google.com/store/apps/details?id=co.healthpharm.maxflix"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGooglePlay} />
          <AndroidText>
            <div>다운로드 하기</div>
            <div>Google Play</div>
          </AndroidText>
        </Android>
      </SAppContainer>
    </>
  );
};

export default AppContainer;
