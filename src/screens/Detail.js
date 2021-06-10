import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import styled from "styled-components";
import AddLayout from "../components/add/AddLayout";
import Input from "../components/add/Input";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import PageTitle from "../components/auth/PageTitle";
import Delete from "../components/Delete";

const AddFormBox = styled(FormBox)``;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddTitle = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;
const FInput = styled(Input)`
  all: unset;
`;

const CategoryContainer = styled.div``;

const Category = styled.div`
  margin: 10px;
  text-align: center;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioInput = styled.input``;

const EDIT_COFFEESHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $latitude: String
    $longitude: String
    $categories: [String]
    $photos: Upload
  ) {
    editCoffeeShop(
      id: $id
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { register, formState, handleSubmit, setError } = useForm();
  const onCompleted = (data) => {
    console.log(data);
    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
  };
  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEESHOP_MUTATION, {
    onCompleted,
  });

  const onValid = (data) => {
    editCoffeeShop({
      variables: {
        id: parseInt(id, 10),
        latitude: data.latitude,
        longitude: data.longitude,
        categories: data.categories,
        // photos: data.photos[0], ?????
      },
    });
  };

  return (
    <>
      <AddLayout>
        <PageTitle title="Add" />
        <AddFormBox>
          <AddTitle>카페 정보를 수정하세요!</AddTitle>
          <Form onSubmit={handleSubmit(onValid)}>
            <FInput
              {...register("photos")}
              type={"file"}
              placeholder="카페 사진"
            />
            <Input {...register("latitude")} type="text" placeholder="위도" />
            <Input {...register("longitude")} type="text" placeholder="경도" />
            <CategoryContainer>
              <Category>카테고리를 선택하세요</Category>
              <LabelContainer>
                <div>
                  <RadioInput
                    {...register("categories")}
                    id="coffee"
                    value="coffee"
                    type="checkbox"
                  />
                  <label htmlFor="coffee">Coffee</label>
                </div>
                <div>
                  <RadioInput
                    {...register("categories")}
                    id="bakery"
                    value="bakery"
                    type="checkbox"
                  />
                  <label htmlFor="bakery">Bakery</label>
                </div>
                <div>
                  <RadioInput
                    {...register("categories")}
                    id="beverage"
                    value="beverage"
                    type="checkbox"
                  />
                  <label htmlFor="beverage">Beverage</label>
                </div>
                <div>
                  <RadioInput
                    {...register("categories")}
                    id="brunch"
                    value="brunch"
                    type="checkbox"
                  />
                  <label htmlFor="brunch">Brunch</label>
                </div>
                <div>
                  <RadioInput
                    {...register("categories")}
                    id="liqour"
                    value="liqour"
                    type="checkbox"
                  />
                  <label htmlFor="liqour">Liqour</label>
                </div>
                <div>
                  <RadioInput
                    {...register("categories")}
                    id="hotfood"
                    value="hotfood"
                    type="checkbox"
                  />
                  <label htmlFor="hotfood"> Hot Food</label>
                </div>
              </LabelContainer>
            </CategoryContainer>
            <Button type="submit" value={loading ? "등록 중..." : "수정"} />
          </Form>
          <FormError message={formState?.errors?.result?.message} />
          <Delete id={id} />
        </AddFormBox>
      </AddLayout>
    </>
  );
};

export default Detail;
