import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import SignupForm from './components/SignupForm/SignupForm.jsx'
import SigninForm from './components/SigninForm/SigninForm.jsx'
import Landing from './components/Landing/LandingPage.jsx'
import PlacesList from './components/Places/PlacesList.jsx'
import PlaceForm from './components/Places/PlaceForm.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import UserProfile from './components/UserProfile/UserProfile.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


// Services
import * as placeService from './services/placeService'
import * as authService from '../src/services/authService.js'

export const AuthedUserContext = createContext(null)

const App = () => {
  const [user, setUser] = useState(authService.getUser()) // using the method from authservice
  const [places, setPlaces] = useState([])

  // Location variables
  const navigate = useNavigate()

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  const fetchAllPlaces = async () => {
    const allPlaces = await placeService.index() // Make the API call, receive the data back from the backend server
    setPlaces(allPlaces) // Set the data to state
  }

  useEffect(() => {
    if (user) {
      fetchAllPlaces()
    }
  }, [user])

  const handleAddPlace = async (formData) => {
    const newPlace = await placeService.create(formData)
    setPlaces([newPlace, ...places])
    navigate('/places')
  }

  const handleDeletePlace = async (placeId) => {
    // Send the DELETE request via our service function
    const deletePlace = await placeService.deletePlace(placeId)
    console.log(deletePlace)
    // Update state to reflect the up to date places list
    await fetchAllPlaces()
    // Navigate to place index
    navigate('/places')
  }

  const handleUpdatePlace = async (placeId, formData) => {
    const updatedPlace = await placeService.update(placeId, formData)
    console.log(updatedPlace)
    navigate(`/places/${placeId}`)
  }

  return (
    <AuthedUserContext.Provider value={user}>
      {user ? (
        <Container>
          <Row>
            <Col xs={{ span: 2 }}>
              <Navbar user={user} handleSignout={handleSignout} />
            </Col>
            <Col xs={{ span: 9, offset: 1 }}>
              <Routes>
                <Route path="/" element={<UserProfile user={user} />} />
                <Route path="/places" element={<PlacesList places={places} />} />
                <Route path="/places/new" element={<PlaceForm handleAddPlace={handleAddPlace} />} />
                <Route path="/places/:placeId" element={<PlaceDetails handleDeletePlace={handleDeletePlace} />} />
                <Route path="/places/:placeId/edit" element={<PlaceForm handleUpdatePlace={handleUpdatePlace} />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container>
            <Row>
              <Col xs={{ span: 4, offset: 1 }}>
                <Navbar user={user} handleSignout={handleSignout} />
              </Col>
              <Col xs={{ span: 6 }}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/signup" element={<SignupForm setUser={setUser} />} />
                  <Route path="/signin" element={<SigninForm setUser={setUser} />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </AuthedUserContext.Provider>
  )
}

export default App
