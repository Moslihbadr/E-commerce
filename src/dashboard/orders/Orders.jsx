import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';

// styled components
const StyledOrders = styled.div`
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

const StyledSelectWrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  label {
    width: 170px;
  }
`;

const StyledSelect = styled.select`
  width: 200px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  margin-right: 8px;

  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
  }
`;

const Orders = () => {
  const { orders, updateOrderStatus, fetchData } = useContext(DashboardContext);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.order_status === selectedStatus);

  return (
    <StyledOrders>
      <h2 className="mb-4">All Orders</h2>
      <Button handleClick={() => fetchData()} className='me-3 my-4'>Refresh Data</Button>
      <StyledSelectWrapper>
        <label htmlFor="orderStatusFilter" className="me-2">
          Filter by Status :
        </label>
        <StyledSelect
          id="orderStatusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="me-2 form-select"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </StyledSelect>
      </StyledSelectWrapper>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <StyledTh>#</StyledTh>
              <StyledTh>Name</StyledTh>
              <StyledTh>Address</StyledTh>
              <StyledTh>Phone</StyledTh>
              <StyledTh>Status</StyledTh>
              <StyledTh style={{ minWidth: '205px' }}>Delivery Company</StyledTh>
              <StyledTh>Date</StyledTh>
              <StyledTh style={{ minWidth: '145px' }}>Order Total</StyledTh>
              <StyledTh style={{ minWidStyledTh: '155px' }}>Change Status</StyledTh>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <StyledTd>{index + 1}</StyledTd>
                <StyledTd>{order.name}</StyledTd>
                <StyledTd>{order.shipping_address}</StyledTd>
                <StyledTd>{order.phone}</StyledTd>
                <StyledTd>{order.order_status}</StyledTd>
                <StyledTd>{order.delivery_company}</StyledTd>
                <StyledTd>{order.created_at}</StyledTd>
                <StyledTd>{order.order_total.toFixed(2)}</StyledTd>
                <StyledTd>
                  {order.order_status != 'delivered' ?
                    <select
                      value={order.order_status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="canceled">Canceled</option>
                    </select> : 'delivered'}
                </StyledTd>
                <StyledTd>
                  <Link to={`/dashboard/orders/${order.id}`} className="text-center fs-5">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledOrders>
  );
};

export default Orders;
