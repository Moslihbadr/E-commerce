import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { DashboardContext } from '../../context/DashboardContext';
import Button from '../../components/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { currentDate } from '../../utils/helpers';

// styled components
const StyledEditProduct = styled.div`
  width: 450px;
  margin: 10px 270px;
`;

const EditProduct = () => {
  const { updateProduct, categories } = useContext(DashboardContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    title: '',
    image: '',
    description: '',
    price: '',
    old_price: '',
    quantity_stock: '',
    featured: false,
    created_at: '',
    updated_at: null,
  });

  useEffect(() => {
    // Fetch product details by ID and set the form data
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        const productData = response.data;

        setFormData({
          id: productData.id,
          category: productData.category,
          title: productData.title,
          image: productData.image,
          description: productData.description,
          price: productData.price,
          old_price: productData.old_price,
          quantity_stock: productData.quantity_stock,
          featured: productData.featured,
          created_at: productData.created_at,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevForm) => ({
        ...prevForm,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
  
    const { title, description, image, price, old_price, category, quantity_stock } = formData;
  
    // Check if any field is empty
    if (!title || !description || !price || !image || !old_price || !category || !quantity_stock) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }
  
    // Update the updated_at field with the current date
    const updatedProduct = {
      ...formData,
      updated_at: currentDate(),
    };
  
    // Call the updateProduct function from DashboardContext
    await updateProduct(formData.id, updatedProduct);
    navigate('/dashboard/products');
  };
  

  return (
    <StyledEditProduct>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <div className="form-group fw-bold my-2">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="category">Category:</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          ></textarea>
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="old_price">Old Price:</label>
          <input
            type="number"
            className="form-control"
            id="old_price"
            name="old_price"
            value={formData.old_price}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-group fw-bold my-2">
          <label htmlFor="quantity_stock">Quantity in Stock:</label>
          <input
            type="number"
            className="form-control"
            id="quantity_stock"
            name="quantity_stock"
            value={formData.quantity_stock}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-check fw-bold my-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleFormChange}
          />
          <label className="form-check-label fw-bold mx-2" htmlFor="featured">
            Featured
          </label>
        </div>
        <div className="form-group my-2">
          <label htmlFor="image" className="form-label me-3 fw-bold">
            Image:
          </label>
          <input
            type="file"
            className="form-control-file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {formData.image && <img className="my-1" src={formData.image} alt="Product" width="200" />}
        </div>
        <div className="form-group mt-4">
          <Button type="submit" className="me-2">
            Update Product
          </Button>
          <Button type="reset">Cancel</Button>
        </div>
      </form>
    </StyledEditProduct>
  );
};

export default EditProduct;
