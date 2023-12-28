// Styled Components - Theme Provider
import { ThemeProvider } from "styled-components";

// contexts
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { DashboardProvider } from "./context/DashboardContext";

// react router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import AuthRoute from "./components/AuthRoute";
import Contact from "./pages/Contact";

// dashboard
import Dashboard from "./dashboard/Dashboard";
import ProductsDashboard from "./dashboard/products/ProductsDashboard";
import AddProduct from "./dashboard/products/AddProduct";
import EditProduct from "./dashboard/products/EditProduct";
import Users from "./dashboard/users/Users";
import AddUser from "./dashboard/users/AddUser";
import Categories from "./dashboard/categories/Categories";
import AddCategory from "./dashboard/categories/AddCategory";
import EditCategory from "./dashboard/categories/EditCategory";
import Orders from "./dashboard/orders/Orders";
import OrderDetails from "./dashboard/orders/OrderDetails";

// layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:productID" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" exact element={<NotFound />} />

      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<ProductsDashboard />} />
        <Route path="/dashboard/products/add" element={<AddProduct />} />
        <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/add" element={<AddUser />} />
        <Route path="/dashboard/categories" element={<Categories />} />
        <Route path="/dashboard/categories/add" element={<AddCategory />} />
        <Route path="/dashboard/categories/edit/:id" element={<EditCategory />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/orders/:id" element={<OrderDetails />} />
      </Route>
      <Route path="*" exact element={<NotFound />} />
    </Route>
  )
);

const App = () => {

  // global thmeme
  const theme = {
    mainColor: '#ff5921',
    mainColorLight: '#FF9800',
    mainColorLighter: '#e1dbd3',
    textColor: '#474747',
    bgColor: '#fdf1e9',
    bgDark: '#1f1a1a',
    borderColor: '#ffd7ba',
    headingColor: '#2a2828',
    buttonBg: '#ff9800',
    buttonText: '#ffffff',
    transition: 'all 0.3s ease-in-out',
    raduis: '.3rem',
    footerHeadingColor: '#1D1D1D',
    footerText: '#e7e0da',
  };

  return (
    <AuthProvider>
      <DashboardProvider>
        <CartProvider>
          <WishlistProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router}>
              </RouterProvider>
            </ThemeProvider>
          </WishlistProvider>
        </CartProvider>
      </DashboardProvider>
    </AuthProvider>
  )
}

export default App
