import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";

const ShopContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 45vw;
`;

const ShopHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;
const EditContainer = styled.div`
  display: flex;
`;

const EditShop = styled.div`
  margin-right: 5px;
`;

const ShopSection = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoFile = styled.img`
  max-width: 100%; // image 너비에 상관없이 꽉 채움
`;

const ShopData = styled.div`
  padding: 12px 15px;
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ShopName = styled.div``;

const Location = styled.div`
  display: flex;
  div:not(:last-child) {
    margin-right: 5px;
  }
`;

const Category = styled.div`
  &:not(:first-child) {
    margin-left: 5px;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Shop = ({ id, name, latitude, longitude, user, photos, categories }) => {
  return (
    <ShopContainer key={id}>
      <ShopHeader>
        <UserContainer>
          <Avatar key={user.id} url={user.avatarUrl} />
          <Username>{user.username}</Username>
        </UserContainer>
        <EditContainer>
          <EditShop>
            <Link to={`/shop/${id}`}>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </EditShop>
        </EditContainer>
      </ShopHeader>
      <ShopSection>
        {photos.map((photo) => (
          <PhotoFile key={photo.id} src={photo.url} />
        ))}
      </ShopSection>
      <ShopData>
        <DataContainer>
          <ShopName>카페명 : {name}</ShopName>
          <Location>
            <div>위도 : {latitude}</div>
            <div>경도 : {longitude}</div>
          </Location>
        </DataContainer>
        <CategoryContainer>
          <span>카테고리 :</span>
          {categories.map((category) => (
            <Category>{category.name}</Category>
          ))}
        </CategoryContainer>
      </ShopData>
    </ShopContainer>
  );
};

Shop.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
};

export default Shop;
