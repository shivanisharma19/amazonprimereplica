import './style.css'

const MovieCard = ({title, id, overview, poster}) => {
    return (
      <div className='movie-card' key={id}>
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} className="movie-card__poster" title={title} alt={overview}/>
      </div>
    )
}

export default MovieCard