import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentDate } from '../../utils/helpers';

// styled components
const StyledEditCategory = styled.div`
  width: 450px;
  margin: 10px 270px;
`;

const EditCategory = () => {
  const { updateCategory } = useContext(DashboardContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    created_at: '',
    updated_at: null,
  });

  useEffect(() => {
    // Fetch product details by ID and set the form data
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/${id}`);
        const productData = response.data;

        setFormData({
          id: productData.id,
          name: productData.name,
          description: productData.description,
          created_at: productData.created_at,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
  
    const { name, description } = formData;
  
    // Check if any field is empty
    if (!name || !description) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }
  
    // Update the updated_at field with the current date
    const updatedCategory = {
      ...formData,
      updated_at: currentDate(),
    };
  
    // Call the updateProduct function from DashboardContext
    await updateCategory(formData.id, updatedCategory);
    navigate('/dashboard/categories');
  };
  

  return (
    <StyledEditCategory>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdateCategory}>
        <div className="form-group fw-bold my-2">
          <label htmlFor="name">Name :</label>
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
          <Button type="submit" className="me-2">
            Update Category
          </Button>
          <Button type="reset">Cancel</Button>
        </div>
      </form>
    </StyledEditCategory>
  );
};

export default EditCategory;
