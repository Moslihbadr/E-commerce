import React, { useState, useContext } from 'react';
import { styled } from 'styled-components';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';
import { currentDate, generateUUID } from '../../utils/helpers';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// styled components
const StyledAddUser = styled.div`
  width: 450px;
  margin: 10px 270px;
`;

const AddUser = () => {
  const { addUser } = useContext(DashboardContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: generateUUID(),
    role: 'customer',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    created_at: currentDate(),
    updated_at: null,
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const { role, name, email, phone, password, confirmPassword } = formData;

    // Check if any field is empty
    if (!name || !email || !phone || !password || !confirmPassword || !role) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match.',
      });
      return;
    }

    // Call the addUser function from DashboardContext
    addUser(formData);
    navigate('/dashboard/users');

    setFormData({
      id: '',
      role: 'customer',
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      created_at: '',
      updated_at: null,
    });
  };

  return (
    <StyledAddUser>
      <h2 className="mb-5">Add User</h2>
      <form onSubmit={handleAddUser}>
        <div className="form-group fw-bold my-2">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="role">Role:</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group mt-4">
          <Button type="submit" className="me-2">
            Add User
          </Button>
          <Button type="reset">Cancel</Button>
        </div>
      </form>
    </StyledAddUser>
  );
};

export default AddUser;
