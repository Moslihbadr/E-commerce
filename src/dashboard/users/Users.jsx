import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';

// styled components
const StyledUsers = styled.div`
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

const Users = () => {
  const { users, deleteUser, fetchData } = useContext(DashboardContext);

  // Separate users by role
  const customers = users.filter((user) => user.role === 'customer');
  const admins = users.filter((user) => user.role === 'admin');

  return (
    <StyledUsers>
      <h2 className="mb-4">All Users</h2>
      <Link className='text-reset text-decoration-none' to={'/dashboard/users/add'}><Button className='my-3'>Add Users</Button></Link>
      <Button handleClick={() => fetchData()} className='ms-2 my-4'>Refresh Data</Button>
      <h3 className="mb-3 mt-4">Customers</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <StyledTh>#</StyledTh>
              <StyledTh>Name</StyledTh>
              <StyledTh>Email</StyledTh>
              <StyledTh>Phone</StyledTh>
              <StyledTh>Delete</StyledTh>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <StyledTd>{index + 1}</StyledTd>
                <StyledTd>{customer.name}</StyledTd>
                <StyledTd>{customer.email}</StyledTd>
                <StyledTd>{customer.phone}</StyledTd>
                <StyledTd  className='text-center fs-5'>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteUser(customer.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className='text-danger' />
                  </span>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 mt-4">Admins</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <StyledTh>ID</StyledTh>
              <StyledTh>Name</StyledTh>
              <StyledTh>Email</StyledTh>
              <StyledTh>Phone</StyledTh>
              <StyledTh>Delete</StyledTh>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <StyledTd>{admin.id}</StyledTd>
                <StyledTd>{admin.name}</StyledTd>
                <StyledTd>{admin.email}</StyledTd>
                <StyledTd>{admin.phone}</StyledTd>
                <StyledTd className='text-center fs-5'>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteUser(admin.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className='text-danger' />
                  </span>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledUsers>
  );
};

export default Users;
