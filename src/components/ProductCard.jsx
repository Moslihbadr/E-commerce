import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProductCard = ({ image, title, price, id }) => {
  return (
    <Wrapper>
      <div className='container my-3'>
        <img src={image} alt={title} className='img-fluid' />
        <Link to={`/products/${id}`} className='link'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link>
      </div>
      <footer className='mb-4'>
        <h5>{title}</h5>
        <p>{price} <small>MAD</small></p>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .container {
    position: relative;
    border-radius: ${props => props.theme.radius};
    overflow: hidden;
    width: 100%;
  }

  img {
    width: 100%;
    display: block;
    border-radius: ${props => props.theme.raduis};
    transition: ${props => props.theme.transition};
  }

  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background:  ${props => props.theme.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: ${props => props.theme.transition};
    opacity: 0;
    cursor: pointer;

    svg {
      font-size: 1.25rem;
      color: ${props => props.theme.mainColor};
    }
  }

  .container:hover img {
    opacity: 0.5;
  }

  .container:hover .link {
    opacity: 1;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  footer h5,
  footer p {
    padding: 0 .7rem;
    margin-bottom: 0;
  }

  footer p {
    color: ${props => props.theme.mainColor};
    letter-spacing: 2px;
  }
`;

export default ProductCard;
