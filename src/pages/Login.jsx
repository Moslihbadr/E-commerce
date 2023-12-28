import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button'
import Breadcrumb from '../components/Breadcrumb';


// styled components
const StyledLogin = styled.div`
  max-width: 350px;
  margin: 10px auto;
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin: 5rem 0;
`;

const Login = () => {
  const { isAuthenticated, login, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email && password) {
      try {
        await login(email, password).then((success) => {
          if (success) {
            // Display success message using SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Login successful!',
              showConfirmButton: false,
              timer: 1500,
            })
            // Redirect to the home page after a delay
            setTimeout(() => {
              navigate('/');
            }, 1500);
          } else {
            // Display error message using SweetAlert
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Incorrect email or password. Please try again.',
            });
          }
        });
      } catch (error) {
        console.error('Error occurred during login:', error);
      }
    } else {
      // Display error message for incomplete fields
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all the fields.',
      });
    }
  };



  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <>
      <Breadcrumb />
      <StyledHeading>Welcome Back! Log in to Your Account</StyledHeading>
      <StyledLogin>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="form1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="form2" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!isAuthenticated && (
            <Button className="mb-4 w-100" type="submit">
              Sign in
            </Button>
          )}
          <p className="text-center">
            Not a member? <Link to='/register'>Register</Link>
          </p>
        </form>
      </StyledLogin>
    </>
  );
};

export default Login;
