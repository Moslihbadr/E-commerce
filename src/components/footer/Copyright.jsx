import { styled } from "styled-components";

const Copieright = () => {

  const StyledCopieright = styled.section`
    border-top: 1px solid #DDD;
  `

  return (
    <StyledCopieright className="text-center p-3">
      © {new Date().getFullYear()} All Rights Reserved : 
      <a
        className="text-reset fw-bold text-decoration-none ms-1"
        href="https://github.com/Moslihbadr"
        rel="noreferrer"
        target="_blank"
      >HOLAZOMI Team</a>
    </StyledCopieright>
  );
};

export default Copieright;
