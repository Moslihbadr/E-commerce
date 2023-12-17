import styled from 'styled-components';
import Button from './Button';

const NewsletterSection = styled.section`
  background-color: ${(props) => props.theme.bgColor};
  padding: 4rem 1rem;
  text-align: center;
`;

const NewsletterHeading = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.headingColor};
`;

const NewsletterDescription = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 1.2rem;
  margin-bottom: 3rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const EmailInput = styled.input`
  padding: 0.5rem 1rem;
  outline: 1px solid transparent;
  border: 1px solid transparent;
  border-radius: ${(props) => props.theme.radius};
  margin-right: 10px;
  width: 250px;
  
  &:focus {
    outline: 1px solid ${(props) => props.theme.borderColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => props.theme.radius};
    -moz-outline-radius: ${(props) => props.theme.radius};
  }
`;

const Newsletter = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <NewsletterSection onSubmit={handleSubmit}>
      <NewsletterHeading>Subscribe to Our Newsletter</NewsletterHeading>
      <NewsletterDescription>
        Stay updated on our latest products and promotions.
      </NewsletterDescription>
      <NewsletterForm>
        <EmailInput type="email" placeholder="Your email address" />
        <Button>Subscribe</Button>
      </NewsletterForm>
    </NewsletterSection>
  );
};

export default Newsletter;
