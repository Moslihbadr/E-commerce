import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';

// styled components
const StyledCategories = styled.div`
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

const Categories = () => {
  const { categories, deleteCategory } = useContext(DashboardContext);

  return (
    <StyledCategories>
      <h2 className="mb-4">All Categories</h2>
      <Link className='text-reset text-decoration-none' to={'/dashboard/categories/add'}><Button className='my-4'>Add Categories</Button></Link>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <StyledTh>#</StyledTh>
              <StyledTh>Name</StyledTh>
              <StyledTh>Description</StyledTh>
              <StyledTh>Actions</StyledTh>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                <StyledTd>{index + 1}</StyledTd>
                <StyledTd>{category.name}</StyledTd>
                <StyledTd>{category.description.length > 30 ? `${category.description.slice(0, 30)}...` : category.description}</StyledTd>
                <StyledTd>
                  <Link to={`/dashboard/categories/edit/${category.id}`} className="me-2 fs-5">
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <span
                    className='ms-3 fs-5'
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteCategory(category.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className='text-danger' />
                  </span>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledCategories>
  );
};

export default Categories;
