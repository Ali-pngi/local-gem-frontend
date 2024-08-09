import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as placesService from '../../services/placeService.js';
import CommentForm from '../CommentForm/CommentForm.jsx';
import { AuthedUserContext } from '../../App';
import './PlaceDetails.scss'; // Import the SCSS file for styling

const PlaceDetails = ({ handleDeletePlace }) => {
  // Context
  const user = useContext(AuthedUserContext);

  // State
  const [place, setPlace] = useState(null);

  // Location variables
  const { placeId } = useParams();

  useEffect(() => {
    const fetchPlace = async () => {
      const singlePlace = await placesService.show(placeId);
      setPlace(singlePlace);
    };
    fetchPlace();
  }, [placeId]);

  const handleAddComment = async (formData) => {
    const newComment = await placesService.createComment(placeId, formData);

    setPlace({
      ...place,
      comments: [...place.comments, newComment],
    });
  };

  if (!place) return <main>Loading...</main>;

  return (
    <main className="place-details">
      <header>
        <h1>{place.placeName}</h1>
        <p>
          {place.user.username} posted on {new Date(place.createdAt).toLocaleDateString()}
        </p>
      </header>

      {place.image && (
        <div className="upload-image" style={{ backgroundImage: `url(${place.image})` }}> </div>
      )}
      <p>{place.description}</p>

      {/* UPDATE/DELETE */}
      {place.user._id === user._id && (
        <section className="place-details-buttons">
          <button onClick={() => handleDeletePlace(placeId)} className="btn btn-primary">
            Delete Place
          </button>
          <Link to={`/places/${placeId}/edit`} className="btn btn-primary">
            Update Place
          </Link>
        </section>
      )}

      <section>
        <h2>Comments</h2>
        {!place.comments.length && <p>There are no comments.</p>}
        {place.comments.map((comment) => (
          <article key={comment._id} className="comment">
            <header>
              <p>
                {comment.user.username} posted on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
        <CommentForm handleAddComment={handleAddComment} />
      </section>
    </main>
  );
};

export default PlaceDetails;
