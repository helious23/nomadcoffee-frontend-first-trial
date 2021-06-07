import { useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AppContainer from "../components/auth/AppContainer";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import LoginFooter from "../components/auth/LoginFooter";
import PageTitle from "../components/auth/PageTitle";
import Seperater from "../components/auth/Seperater";
import { FatLink, Title } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

const FacebookLogin = styled.a`
  margin-top: 20px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 6px 0px;
  font-weight: 600;
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  padding: 8px 0px;
  span {
    margin-left: 5px;
  }
`;

const Form = styled.form`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const { register, formState, handleSubmit, setError, getValues } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history.push(routes.home, {
      message: "가입되었습니다. 로그인해주세요.",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: { ...data },
    });
  };

  return (
    <>
      <AuthLayout>
        <PageTitle title="회원 가입" />
        <FormBox>
          <HeaderContainer>
            <Title>NomadCoffee</Title>
            <Subtitle>
              개발자들의 카페 사진과 정보를 보려면 가입하세요.
            </Subtitle>
          </HeaderContainer>
          <FacebookLogin href="https://www.facebook.com/" target="_blank">
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span> Facebook으로 로그인</span>
          </FacebookLogin>
          <Seperater />
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("username", {
                required: "사용자 이름이 필요합니다.",
              })}
              type="text"
              placeholder="사용자 이름"
              hasError={Boolean(formState?.errors?.username?.message)}
            />
            <FormError message={formState?.errors?.username?.message} />
            <Input
              {...register("name", {
                required: "성명이 필요합니다.",
              })}
              type="text"
              placeholder="성명"
              hasError={Boolean(formState?.errors?.name?.message)}
            />
            <FormError message={formState?.errors?.name?.message} />
            <Input
              {...register("email", {
                required: "이메일이 필요합니다.",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일 양식에 맞지 않습니다.",
                },
              })}
              type="email"
              placeholder="이메일"
              hasError={Boolean(formState?.errors?.email?.message)}
            />
            <FormError message={formState?.errors?.email?.message} />
            <Input
              {...register("password", {
                required: "비밀번호가 필요합니다.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 6자리 이상입니다.",
                },
              })}
              type="password"
              placeholder="비밀번호"
              hasError={Boolean(formState?.errors?.password?.message)}
            />
            <FormError message={formState?.errors?.password?.message} />
            <Button
              type="submit"
              value={loading ? "로딩 중..." : "가입"}
              disabled={!formState.isValid || loading}
            />
            <FormError message={formState?.errors?.result?.message} />
          </Form>
        </FormBox>
        <BottomBox
          cta="계정이 있으신가요?"
          linkText="로그인"
          link={routes.home}
        />
        <AppContainer />
      </AuthLayout>
      <LoginFooter />
    </>
  );
};

export default SignUp;
