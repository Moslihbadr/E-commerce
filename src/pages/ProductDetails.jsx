import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../components/Button';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import Breadcrumb from '../components/Breadcrumb';

const SingleProductPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(0);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${productID}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productID]);

  useEffect(() => {
    setSubTotal(quantity * product?.price);
  }, [quantity, product]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  console.log(productID);

  if (!product) {
    return <Spinner />;
  }

  const { id, image, title, price, old_price, description, category, quantity_stock } = product;

  return (
    <Wrapper className='container section-center page'>
      <Breadcrumb />
      <Link to='/products' className='text-muted text-decoration-none'>
        <FontAwesomeIcon icon={faArrowLeft} className='me-1' /> Back to products
      </Link>
      <div className='product-center row'>
        <div className='col-md-6 mb-3'>
          <img src={image} alt={title} className='product-image' />
        </div>
        <div className='col-md-6 content'>
          <h1>{title}</h1>
          <h5 className='price me-2 d-inline'>{price} MAD</h5>
          {old_price && <h6 className='old-price d-inline'>{old_price} MAD</h6>}
          <p className='desc my-3'>{description}</p>
          <div className='info'>
            <p>
              <span>Category : </span>
              {category}
            </p>
            <p>
              <span>Available : </span>
              {quantity_stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          <div className='quantity-toggle'>
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity === 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              disabled={quantity_stock <= quantity}
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
          {
            isAuthenticated ?
              <div className='buttons'>
                {quantity_stock > 0 &&
                  <Button handleClick={() => addToCart({ id, image, title, price,quantity_stock, quantity, subTotal })}>
                    Add to Cart
                  </Button>}
                <Button handleClick={() => addToWishlist({ id, image, title, price })}>
                  <FontAwesomeIcon icon={faHeart} />
                </Button>
              </div>
              : <Button className='my-4' handleClick={() => navigate('/login')}>login</Button>
          }
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    margin-top: 2rem;
  }

  .product-image {
    max-width: 100%;
    height: auto;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => props.theme.radius};
  }

  .content {
    h2 {
      color: ${(props) => props.theme.mainColor};
    }

    .price {
      color: ${(props) => props.theme.mainColor};
      font-size: 1.3rem;
    }

    .old-price {
      color: ${(props) => props.theme.textColor};
      text-decoration: line-through;
      font-size: .9rem;
    }

    .desc {
      line-height: 1.8;
      color: ${(props) => props.theme.textColor};
    }

  .info {
    text-transform: capitalize;
    span {
      font-weight: 700;
      color: ${(props) => props.theme.textColor};
    }
  }

  .buttons {
    margin-top: 1rem;
    button {
      margin-right: 1rem;
    }
  }
  .quantity-toggle {
    display: flex;
    align-items: center;

    button {
      padding: 0.5rem 1rem;
      margin: 0 0.25rem;
      font-size: 1rem;
      cursor: pointer;
      background-color: ${(props) => props.theme.mainColor};
      color: #fff;
      border: none;
      border-radius: 4px;
      outline: none;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    span {
      margin: 0 0.5rem;
      font-weight: bold;
      font-size: 20px;
    }
  }
  }
`;

export default SingleProductPage;