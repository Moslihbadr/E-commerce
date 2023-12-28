import { useLocation, Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledContainer = styled.div`
  background-color: ${props => props.theme.borderColor};
  padding: 1rem;
  border-radius: ${props => props.theme.raduis};
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.mainColor};
`
function Breadcrumb() {
  const location = useLocation();
  const { pathname } = location
  const pathnames = pathname.split('/').filter((pathname) => pathname !== '');

  return (
    <StyledContainer className='container mb-4'>
      <nav aria-label="breadcrumb d-flex align-items-center"  style={{
        '--bs-breadcrumb-divider': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E")`,
      }}>
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item">
            <StyledLink className='fw-bold text-decoration-none' to="/">Home</StyledLink>
          </li>
          {pathnames.map((pathname, index) => (
            <li className="breadcrumb-item" key={pathname}>
              {index === pathnames.length - 1 ? (
                <span className="active text-capitalize fw-bold">{pathname}</span>
              ) : (
                <StyledLink className='text-capitalize fw-bold text-decoration-none' to={`/${pathnames.slice(0, index + 1).join('/')}`}>{pathname}</StyledLink>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </StyledContainer>
  );
}

export default Breadcrumb;