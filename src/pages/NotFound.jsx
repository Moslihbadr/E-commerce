import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="d-flex py-5 align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
          <p className="lead">
            The page you’re looking for doesn’t exist.
          </p>
          <Button handleClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    </>
  )
}

export default NotFound