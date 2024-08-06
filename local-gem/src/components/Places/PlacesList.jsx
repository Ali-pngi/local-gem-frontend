

function PlacesList() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    fetch('/places')
      .then(response => response.json())
      .then(data => setPlaces(data))
      .catch(error => console.error('Error fetching places:', error))
  }, [])

  return (
    <div>
      <h2>Places</h2>
      <ul>
        {places.map(place => (
          <li key={place._id}>{place.nameOfPlace}</li>
        ))}
      </ul>
    </div>
  )
}

export default PlacesList
