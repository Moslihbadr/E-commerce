import styled from 'styled-components';
import Swal from 'sweetalert2';
import Breadcrumb from '../components/Breadcrumb';
import { useState } from 'react';
import Button from '../components/Button';
import emailjs from 'emailjs-com';

const ContactSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactBox = styled.div`
  width: clamp(100px, 90%, 1000px);
  display: flex;
  flex-wrap: wrap;
`;

const StyledMap = styled.div`
  width: 50%;
  height: 500px;

  @media only screen and (max-width: 800px) {
    width: 100%;
    border-radius: 0 0 10px 10px;
  }
`

const ContactFormWrapper = styled.div`
  width: 50%;
  padding: 8% 5% 10% 5%;
  background-color: #fdf1e9;
  border-radius: 0 10px 10px 0;

  @media only screen and (max-width: 800px) {
    width: 100%;
    border-radius: 0 0 10px 10px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  font-size: clamp(15px, 1.5vw, 18px);
`;

const TextArea = styled.textarea`
  width: 100%;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  font-size: clamp(15px, 1.5vw, 18px);
`;

const sendMessage = async (form) => {
  try {
    // Use emailjs to send the message via email
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    await emailjs.send(
      'service_vg2a0g3',
      'template_vd0rq39',
      templateParams,
      'uR-pWmuRecgQJO4mA'
    );

  } catch (error) {
    console.error('Error sending email:', error);
  }
};


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(formData);

    Swal.fire({
      icon: 'success',
      title: 'Form Submitted!',
      text: 'Thank you for reaching out. We will get back to you soon.',
    });

    // Reset the form data
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };


  return (
    <>
      <Breadcrumb />
      <h1 className='text-center my-5 px-3'>Reach Out and Connect with Us</h1>
      <ContactSection id="contact">
        <ContactBox className="contact-box">
          <StyledMap>
            <div><iframe width="100%" height="500" src="https://maps.google.com/maps?width=100%25&amp;height=443&amp;hl=en&amp;q=rahma,%20casablanca,%20morocco+(EShop)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population Estimator map</a></iframe></div>
          </StyledMap>
          <ContactFormWrapper className="contact-form-wrapper">
            <ContactForm onSubmit={handleFormSubmit}>
              <FormItem className="form-item">
                <Input
                  type="text"
                  name="sender"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  required
                />
              </FormItem>
              <FormItem className="form-item">
                <Input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  required
                />
              </FormItem>
              <FormItem className="form-item">
                <TextArea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Message"
                  required
                />
              </FormItem>
              <Button type='submit'>Send</Button>
            </ContactForm>
          </ContactFormWrapper>
        </ContactBox>
      </ContactSection>
    </>
  );
};

export default Contact;
