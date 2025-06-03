import './style.css'

const MovieCard = ({title, id, overview}) => {
    return (
      <div className='card' key={id}>
        <h5> {title} </h5>
        {/* <p className='card-desc' style={{wordWrap:"break-word"}}> {overview} </p> */}
      </div>
    )
}

export default MovieCard