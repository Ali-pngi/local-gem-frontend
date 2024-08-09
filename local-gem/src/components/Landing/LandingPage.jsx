import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import './LandingPage.scss' 

const LandingPage = () => {
  return (
    <Container className="landing-page">
      <h1>Welcome to Local Gem</h1>
      <h3>Sign up for a new account, and view all the cool Local Gems around town.</h3>
      <div className="btn-container">
        <Link to="/signup">
          <Button variant="primary">Sign Up</Button>
        </Link>
        <Link to="/signin">
          <Button variant="secondary">Sign In</Button>
        </Link>
      </div>
    </Container>
  )
}

export default LandingPage
