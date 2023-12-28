import { useState, useContext } from 'react';
import { styled } from 'styled-components';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';
import { currentDate, generateUUID } from '../../utils/helpers';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// styled components
const StyledCategories = styled.div`
  width: 450px;
  margin: 10px 270px;
`;

const AddCategory = () => {
  const { addCategory } = useContext(DashboardContext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id: generateUUID(),
    name: '',
    description: '',
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


  const handleAddCategoy = async (e) => {
    e.preventDefault();
    
    const { name, description } = formData
    
    // Check if any field is empty
    if (!name || !description) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      }); 
      return;
    }

    console.log(formData);
    addCategory(formData);
    navigate('/dashboard/categories')
    setFormData({
      id: '',
      name: '',
      description: '',
      created_at: '',
      updated_at: null,
    });
  };

  return (
    <StyledCategories>
      <h2 className='mb-5'>Add Category</h2>
      <form onSubmit={handleAddCategoy}>
        <div className="form-group fw-bold my-2">
          <label htmlFor="title">Name :</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="description">Description :</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className="form-group mt-4">
          <Button type="submit" className="me-2">Add Category</Button>
          <Button type="reset">Cancel</Button>
        </div>
      </form>
    </StyledCategories>
  );
};

export default AddCategory;