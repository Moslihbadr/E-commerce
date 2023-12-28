import { useContext } from "react";
import Stats from "../components/dashboard/Stats";
import { DashboardContext } from "../context/DashboardContext";
import OrdersChart from "../components/dashboard/OrdersChart";
import Button from "../components/Button";

const Dashboard = () => {

  const { users, orders, products, fetchData } = useContext(DashboardContext)

  return (
    <div className="d-flex flex-column mt-3" style={{ margin: '0 250px' }}>
      <Button className="w-25 ms-3" handleClick={() => fetchData()}>Refresh Data</Button>
      <Stats users={users} orders={orders} products={products} />
      <OrdersChart />
    </div>
  )
}

export default Dashboard;