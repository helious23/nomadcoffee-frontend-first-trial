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
        photos {
          url
        }
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
    // console.log(data);
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

  let photoFile;

  const onPhotoChange = (event) => {
    const {
      target: {
        files: [file],
      },
    } = event;
    photoFile = file;
  };

  const onValid = (data) => {
    console.log(data);
    createCoffeeShop({
      variables: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        categories: data.categories,
        photos: photoFile,
      },
    });
  };

  return (
    <>
      <AddLayout>
        <PageTitle title="Add" />
        <AddFormBox>
          <AddTitle>????????? ???????????????!</AddTitle>
          <Form onSubmit={handleSubmit(onValid)}>
            <FInput
              {...register("photos")}
              type="file"
              id="photos"
              name="photos"
              onChange={onPhotoChange}
              accept="image/jpg, image/png, image/jpeg"
            />
            <Input
              {...register("name", {
                required: "?????? ????????? ???????????????.",
              })}
              type="text"
              placeholder="?????? ??????"
              hasError={Boolean(formState?.errors?.name?.message)}
            />
            <FormError message={formState?.errors?.name?.message} />
            <Input
              {...register("latitude", {
                required: "????????? ???????????????.",
              })}
              type="text"
              placeholder="??????"
              hasError={Boolean(formState?.errors?.latitude?.message)}
            />
            <FormError message={formState?.errors?.latitude?.message} />
            <Input
              {...register("longitude", {
                required: "????????? ???????????????.",
              })}
              type="text"
              placeholder="??????"
              hasError={Boolean(formState?.errors?.longitude?.message)}
            />
            <FormError message={formState?.errors?.longitude?.message} />
            <CategoryContainer>
              <Category>??????????????? ???????????????</Category>
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
              value={loading ? "?????? ???..." : "??????"}
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
