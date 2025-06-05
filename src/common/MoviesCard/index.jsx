import './style.css'

const MovieCard = ({title, id, overview, poster}) => {
    return (
      <div className='movie-card' key={id}>
        {/* <h5> {title} </h5> */}
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} className="movie-card__poster" loading='lazy'/>
        {/* <p className='card-desc' style={{wordWrap:"break-word"}}> {overview} </p> */}
      </div>
    )
}

export default MovieCard