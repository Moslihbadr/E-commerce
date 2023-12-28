import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ id, image, title, price, quantity }) => {

  const { removeItem } = useContext(CartContext)

  return (
    <Wrapper className='row'>
      <div className="title col-md-3 col-4 ">
        <img src={image} alt={title} /> <br className='d-block d-md-none' />
        <div style={{ width: '200px' }}>
          <h5 className="name">{title}</h5>
          <h5 className="price d-block d-md-none">{price} MAD</h5>
        </div>
      </div>
      <h5 className="price d-none d-md-block col">{price} MAD</h5>
      <div className="amount d-none d-md-block col">
        <h5 className="quantity ms-4">{quantity}</h5>
      </div>
      <h5 className="subtotal col-4 col-md">{(price * quantity)} MAD</h5>
      <button className="remove-btn col-4 col-md" onClick={() => removeItem(id)}>
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

  .amount {
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .quantity {
      font-size: 1.25rem;
    }
  }

  .subtotal {
    width: 200px;
    font-size: 1.25rem;
    color: ${props => props.theme.mainColorLight};
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

export default CartItem;