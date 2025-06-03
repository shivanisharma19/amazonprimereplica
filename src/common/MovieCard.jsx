import React from "react";

const MovieCard = ({title, overview}) => {
    return (
      <div className='card'>
        <h5> {title} </h5>
        {/* <p className='card-desc' style={{wordWrap:"break-word"}}> {overview} </p> */}
      </div>
    )
}

export default MovieCard