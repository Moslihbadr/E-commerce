import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import Button from '../Button';
import { WishlistContext } from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

const WishlistItem = ({ id, image, title, price }) => {

  const { removeItem } = useContext(WishlistContext)
  const navigate = useNavigate()

  return (
    <Wrapper className='row'>
      <div className="title col-md-3 col-4 ">
        <img src={image} alt={title} /> <br className='d-block d-md-none' />
        <div style={{ width: '200px' }}>
          <h5 className="name">{title}</h5>
          <h5 className="price d-block d-md-none">{price.toFixed(2)} MAD</h5>
        </div>
      </div>
      <h5 className="price d-none d-md-block col">{price.toFixed(2)} MAD</h5>
      <div className="addToCart d-md-block col">
          <Button className="col-2 col-md w-75" handleClick={() => navigate(`/products/${id}`)}>
            More Details
          </Button>
      </div>
      <button className="remove-btn col-2 col-md-2" onClick={() => removeItem(id)}>
        <FontAwesomeIcon className='text-danger' icon={faTrash} />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;

  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }

  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: ${props => props.theme.raduis};
    object-fit: cover;
  }

  h5 {
    font-size: 1rem;
    margin-bottom: 0;
  }

  .price {
    width: 110%;
    color: ${props => props.theme.mainColorLight};
  }

  .addToCart {
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .remove-btn {
    border: transparent;
    background-color: transparent;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default WishlistItem;