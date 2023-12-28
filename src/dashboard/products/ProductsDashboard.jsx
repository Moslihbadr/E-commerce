import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';

// styled components
const StyledProducts = styled.div`
  margin: 20px;
  margin-left: 250px;
  margin-right: auto;
`;

const StyledTh = styled.th`
  padding: 10px 25px!important;
`

const StyledTd = styled.th`
  padding: 10px 25px!important;
  font-weight: 400;
`

const ProductDashboard = () => {
  const { products, deleteProduct, fetchData } = useContext(DashboardContext);

  return (
    <StyledProducts>
      <h2 className="mb-4">All Products</h2>
      <Link className='text-reset text-decoration-none' to={'/dashboard/products/add'}><Button className='my-4'>Add Products</Button></Link>
      <Button handleClick={() => fetchData()} className='ms-2 my-4'>Refresh Data</Button>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <StyledTh>#</StyledTh>
              <StyledTh>Image</StyledTh>
              <StyledTh>Title</StyledTh>
              <StyledTh>Description</StyledTh>
              <StyledTh>Price</StyledTh>
              <StyledTh>Category</StyledTh>
              <StyledTh>Quantity</StyledTh>
              <StyledTh>Featured</StyledTh>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <StyledTd>{index + 1}</StyledTd>
                <StyledTd>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ Width: '100px', maxHeight: '50px', objectFit: 'cover' }}
                    />
                  )}
                </StyledTd>
                <StyledTd>{product.title}</StyledTd>
                <StyledTd>{product.description.length > 30 ? `${product.description.slice(0, 30)}...` : product.description}</StyledTd>
                <StyledTd>{product.price}</StyledTd>
                <StyledTd>{product.category}</StyledTd>
                <StyledTd>{product.quantity_stock}</StyledTd>
                <StyledTd>{product.featured ? 'Yes' : 'No'}</StyledTd>
                <td>
                  <Link to={`/dashboard/products/edit/${product.id}`} className="me-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <span
                    className='ms-3'
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteProduct(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className='text-danger' />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledProducts>
  );
};

export default ProductDashboard;
