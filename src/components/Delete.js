import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./auth/Button";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import FormError from "./auth/FormError";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DELETE_COFFEESHOP_MUTATOIN = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

const Delete = ({ id }) => {
  const { handleSubmit, setError, formState } = useForm();
  const onCompleted = (data) => {
    const {
      deleteCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
  };
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEESHOP_MUTATOIN, {
    onCompleted,
  });

  const deleteOnValid = () => {
    deleteCoffeeShop({
      variables: {
        id: parseInt(id, 10),
      },
    });
  };
  return (
    <>
      <Form onSubmit={handleSubmit(deleteOnValid)}>
        <Button type="submit" value="삭제" />
      </Form>
      <FormError message={formState?.errors?.result?.message} />
    </>
  );
};

Delete.propType = {
  id: PropTypes.number.isRequired,
};

export default Delete;
