import { useState, useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import * as placeService from '../../services/placeService'; // Updated to use placeService
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
      {places.length > 0 ? (
        <ListGroup>
          {places.map((place) => (
            <ListGroup.Item key={place._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{place.placeName}</Card.Title>
                  <Card.Text>{place.description}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>You have not made any places yet.</p>
      )}
    </Container>
  );
};

export default UserProfile;
