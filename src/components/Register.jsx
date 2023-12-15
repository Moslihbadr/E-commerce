import axios from 'axios';
import { useState } from 'react';
import { styled } from 'styled-components';
import { currentDate, generateUUID } from '../utils/helpers';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// styled components
const StyledRegister = styled.div`
  max-width: 350px;
  margin: 10px auto;
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin: 3.5rem 0;
`;

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegistration = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (name && email && phone && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          // Check if email is already used
          const emailCheckResponse = await axios.get(
            `http://localhost:3000/users?email=${email}`
          );
          if (emailCheckResponse.data.length > 0) {
            Swal.fire({
              title: 'Error',
              text: 'Email is already used.',
              icon: 'error',
            });
            return;
          }

          // Check if phone is already used
          const phoneCheckResponse = await axios.get(
            `http://localhost:3000/users?phone=${phone}`
          );
          if (phoneCheckResponse.data.length > 0) {
            Swal.fire({
              title: 'Error',
              text: 'Phone number is already used.',
              icon: 'error',
            });
            return;
          }

          // If both email and phone are unique, proceed with registration
          const userData = {
            id: generateUUID(),
            role: 'customer',
            name: name,
            email: email,
            phone: phone,
            password: password,
            created_at: currentDate(),
            updated_at: null,
          };

          const response = await axios.post(
            'http://localhost:3000/users',
            userData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          
          if (response.status === 201) { // 201 indicates that the request has succeeded and has led to the creation of a resource 
            setIsRegistered(true)
            Swal.fire({
              title: 'Registration successful!',
              text: 'Redirecting to login...',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });

            // Redirect to the home page after a delay
            setTimeout(() => {
              // Use window.location.href for redirecting
              // window.location.href = '/login';
            }, 1500);
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Registration failed.',
              icon: 'error',
            });
          }
        } catch (error) {
          setIsRegistered(false);
          console.error('Error during registration:', error);
          Swal.fire({
            title: 'Error',
            text: 'An error occurred during registration.',
            icon: 'error',
          });
        }
      } else {
        setIsRegistered(false);
        Swal.fire({
          title: 'Error',
          text: 'Passwords do not match.',
          icon: 'error',
        });
      }
    } else {
      setIsRegistered(false);
      Swal.fire({
        title: 'Error',
        text: 'Please fill in all the fields.',
        icon: 'error',
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
      <StyledHeading>Create Your Account and Start Exploring</StyledHeading>
      <StyledRegister>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="form-label">
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
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormChange}
          />
        </div>

        {!isRegistered ? (
          <button
            className="btn btn-primary mb-4 w-100"
            onClick={handleRegistration}
          >
            Sign up
          </button>
        ) : null}
        <p className="text-center">
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </StyledRegister>
    </>
  );
};

export default Register;
