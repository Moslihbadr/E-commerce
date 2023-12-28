import { styled } from "styled-components"

const Button = ({ children, className, handleClick, type }) => {
  return (
    <StyledButton type={type ? type : null} className={`${className} btn`} onClick={handleClick}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  transition: ${(props) => props.theme.transition};
  background-color: ${(props) => props.theme.buttonText};
  color: ${(props) => props.theme.buttonBg};
  border: ${(props) => props.theme.borderColor} 2px solid;
  padding: 0.5rem 1rem;

  &:hover {
    color: ${(props) => props.theme.buttonText};
    background-color: ${(props) => props.theme.buttonBg};
  }
`;

export default Button