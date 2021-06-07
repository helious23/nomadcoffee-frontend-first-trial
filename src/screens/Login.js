import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Title } from "../components/shared";
import AppContainer from "../components/auth/AppContainer";
import Seperater from "../components/auth/Seperater";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/auth/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import LoginFooter from "../components/auth/LoginFooter";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import Notification from "../components/auth/Notification";

const Form = styled.form`
  margin-top: 35px;
  width: 100%;
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
`;

const FacebookLogin = styled.a`
  color: ${(props) => props.theme.facebookColor};
  margin-top: 20px;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Password = styled.div`
  margin-top: 20px;
  font-size: 12px;
  a {
    color: ${(props) => props.theme.facebookColor};
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  const { register, formState, handleSubmit, setError, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, token, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    login({
      variables: { ...data },
    });
  };
  const clearLoginError = () => {
    if (formState.errors.result) {
      clearErrors("result");
    }
  };

  return (
    <>
      <AuthLayout>
        <PageTitle title="로그인" />
        <FormBox>
          <Title>NomadCoffee</Title>
          <Notification message={location?.state?.message} />
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("username", {
                required: "사용자 이름이 필요합니다.",
              })}
              onFocus={clearLoginError}
              type="text"
              placeholder="사용자 이름"
              hasError={Boolean(formState?.errors?.username?.message)}
            />
            <FormError message={formState?.errors?.username?.message} />
            <Input
              {...register("password", {
                required: "비밀번호가 필요합니다.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자리 이상입니다.",
                },
              })}
              onFocus={clearLoginError}
              type="password"
              placeholder="비밀번호"
              hasError={Boolean(formState?.errors?.password?.message)}
            />
            <FormError message={formState?.errors?.password?.message} />
            <Button
              type="submit"
              value={loading ? "로딩 중..." : "로그인"}
              disabled={!formState.isValid || loading}
            />
          </Form>
          <FormError message={formState?.errors?.result?.message} />
          <Seperater />
          <FacebookLogin href="https://www.facebook.com/" target="_blank">
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Facebook으로 로그인</span>
          </FacebookLogin>
          <Password>
            <Link to={routes.signUp}>비밀번호를 잊으셨나요?</Link>
          </Password>
        </FormBox>
        <BottomBox
          cta="계정이 없으신가요?"
          link={routes.signUp}
          linkText="가입하기"
        />
        <AppContainer />
      </AuthLayout>
      <LoginFooter />
    </>
  );
};

export default Login;
