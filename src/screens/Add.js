import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AddLayout from "../components/add/AddLayout";
import Input from "../components/add/Input";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import PageTitle from "../components/auth/PageTitle";
import { SHOPS_FRAGMENT } from "../fragments";

const AddFormBox = styled(FormBox)``;

const Form = styled.form`
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

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: [String]!
    $photos: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      ok
      error
      shop {
        ...ShopsFragment
      }
    }
  }
  ${SHOPS_FRAGMENT}
`;

const Add = () => {
  const { register, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    console.log(data);
    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
  };
  const [createCoffeeShop, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data) => {
    console.log(data.photos[0]);
    createCoffeeShop({
      variables: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        categories: data.categories,
        // photos: data.photos[0],
      },
    });
  };

  return (
    <>
      <AddLayout>
        <PageTitle title="Add" />
        <AddFormBox>
          <AddTitle>카페를 등록하세요!</AddTitle>
          <Form onSubmit={handleSubmit(onValid)}>
            <FInput
              {...register("photos")}
              type={"file"}
              placeholder="카페 사진"
            />
            <Input
              {...register("name", {
                required: "카페 이름이 필요합니다.",
              })}
              type="text"
              placeholder="카페 이름"
              hasError={Boolean(formState?.errors?.name?.message)}
            />
            <FormError message={formState?.errors?.name?.message} />
            <Input
              {...register("latitude", {
                required: "위도가 필요합니다.",
              })}
              type="text"
              placeholder="위도"
              hasError={Boolean(formState?.errors?.latitude?.message)}
            />
            <FormError message={formState?.errors?.latitude?.message} />
            <Input
              {...register("longitude", {
                required: "경도가 필요합니다.",
              })}
              type="text"
              placeholder="경도"
              hasError={Boolean(formState?.errors?.longitude?.message)}
            />
            <FormError message={formState?.errors?.longitude?.message} />
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
            <Button
              type="submit"
              value={loading ? "등록 중..." : "등록"}
              disabled={!formState.isValid || loading}
            />
          </Form>
          <FormError message={formState?.errors?.result?.message} />
        </AddFormBox>
      </AddLayout>
    </>
  );
};

export default Add;
