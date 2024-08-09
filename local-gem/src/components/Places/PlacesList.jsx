import { Link } from 'react-router-dom'
import './PlacesList.scss' 

const PlaceList = ({places}) => {
  console.log(places)


  return (
    <main className="places-list">
      {places.map((place) => (
        <Link key={place._id} to={`/places/${place._id}`} className="place-card-link">
          <article className="place-card">
            <header>
              <h2>{place.placeName}</h2>
              <p>
                {place.user.username} posted on{' '}
                {new Date(place.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{place.description}</p>
            {place.image && (
              <div className="upload-image" style={{backgroundImage: `url(${place.image})`}}> </div>
            )}
          </article>
        </Link>
      ))}
    </main>
  )
}

export default PlaceList