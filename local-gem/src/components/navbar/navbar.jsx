import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import './Navbar.scss' 

const Navbar = ({ user, handleSignout }) => (
  <Nav className="navbar-custom flex-column">
    {user ? (
      <>
        <Nav.Link as={Link} to="/" className="nav-link">{user.username}</Nav.Link>
        <Nav.Link as={Link} to="/places" className="nav-link">Places</Nav.Link>
        <Nav.Link as={Link} to="/places/new" className="nav-link">Add Place</Nav.Link>
        <Nav.Link as={Link} onClick={handleSignout} className="nav-link">Sign Out</Nav.Link>
      </>
    ) : (
      <>
        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
        <Nav.Link as={Link} to="/signin" className="nav-link">Sign In</Nav.Link>
        <Nav.Link as={Link} to="/signup" className="nav-link">Sign Up</Nav.Link>
      </>
    )}
  </Nav>
)

export default Navbar
