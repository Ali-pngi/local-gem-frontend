import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import * as placeService from '../../services/placeService';
import './UserProfile.scss';
const UserProfile = ({ user }) => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      const userPlaces = await placeService.getUserPlaces(user._id);
      setPlaces(userPlaces);
    };
    fetchPlaces();
  }, [user._id]);
  return (
    <Container className="user-profile">
      <h1>Welcome {user.username}</h1>
      <h2>Your Places</h2>
      <div className="places-list">
        {places.length > 0 ? (
          places.map((place) => (
            <div key={place._id} className="place-card-link">
              <Card className="place-card">
                <Card.Body>
                  <header>
                    <Card.Title>{place.placeName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {place.user.username} posted on{' '}
                      {new Date(place.createdAt).toLocaleDateString()}
                    </Card.Subtitle>
                  </header>
                  <Card.Text>{place.description}</Card.Text>
                  {place.image && (
                    <div
                      className="upload-image"
                      style={{ backgroundImage: `url(${place.image})` }}
                    ></div>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>You have not made any places yet.</p>
        )}
      </div>
    </Container>
  );
};
export default UserProfile;