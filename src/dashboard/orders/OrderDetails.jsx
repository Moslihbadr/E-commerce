import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContext } from '../../context/DashboardContext';
import Spinner from '../../components/Spinner';
import { styled } from 'styled-components';

const StyledOrder = styled.div`
  margin: 30px 270px;
`

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useContext(DashboardContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Find the order with the matching orderId
    const foundOrder = orders.find((o) => o.id === id);

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Handle the case where the order is not found (optional)
    }
  }, [id, orders]);

  return (
    <StyledOrder>
      <h3 className='mt-3 mb-5'>Order n° {id}</h3>
      {order ? (
        <div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Full Name : </p>
            <span>{order.name}</span>
          </div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Shipping Address : </p>
            <span>{order.shipping_address}</span>
          </div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Phone : </p>
            <span>{order.phone}</span>
          </div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Status : </p>
            <span>{order.order_status}</span>
          </div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Delivery Company : </p>
            <span>{order.delivery_company}</span>
          </div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Date : </p>
            <span>{order.created_at}</span>
          </div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Shipping Address : </p>
            <span>{order.shipping_address}</span>
          </div>
          <div className='d-flex'>
            <p className='fw-bold me-3'>Order Total : </p>
            <span>{order.order_total.toFixed(2)}</span>
          </div>
          <h3 className='mb-4 mt-5'>Order Items</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (DH)</th>
                <th>Quantity</th>
                <th>Sub-Total (DH)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.title}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.subTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </StyledOrder>
  );
};

export default OrderDetails;
