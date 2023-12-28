import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faListAlt, faBox, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { getTodayOrders, calculateTotalSales } from '../../utils/helpers';

const StyledCard = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: ${props => props.theme.radius};
  padding: 10px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const NumberText = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  ${props => props.theme.textColor}
`;

const BottomText = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textColor};
`;

const Stats = ({ orders, users, products }) => {
  const newOrdersCount = getTodayOrders(orders).length;
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalSales = calculateTotalSales(orders);
  const todaySales = calculateTotalSales(getTodayOrders(orders));

  return (
    <div className="container mt-4">
      <div className="row gy-4" style={{ width: 'calc(100vw - 270px)' }}>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faListAlt} />
            </IconWrapper>
            <NumberText>{newOrdersCount}</NumberText>
            <BottomText>New Orders</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faUser} />
            </IconWrapper>
            <NumberText>{totalUsers}</NumberText>
            <BottomText>Total Users</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faShoppingCart} />
            </IconWrapper>
            <NumberText>{totalOrders}</NumberText>
            <BottomText>Total Orders</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faBox} />
            </IconWrapper>
            <NumberText>{totalProducts}</NumberText>
            <BottomText>Total Products</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faDollarSign} />
            </IconWrapper>
            <NumberText>{totalSales.toFixed(2)}</NumberText>
            <BottomText>Total Sales</BottomText>
          </StyledCard>
        </div>
        <div className="col-md-4">
          <StyledCard>
            <IconWrapper>
              <FontAwesomeIcon icon={faDollarSign} />
            </IconWrapper>
            <NumberText>{todaySales.toFixed(2)}</NumberText>
            <BottomText>Today&apos;s Sales</BottomText>
          </StyledCard>
        </div>
      </div>
    </div>
  );
};

export default Stats;