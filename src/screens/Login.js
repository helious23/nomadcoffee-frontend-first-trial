import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const Title = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div``;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>Log In</button>
      <button onClick={() => darkModeVar(true)}>Dark Mode</button>
      <button onClick={() => darkModeVar(false)}>White Mode</button>
    </Container>
  );
};

export default Login;
