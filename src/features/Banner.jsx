import React from "react";
import movieBanner from '../../src/assets/movies_banner.jpg'
import '../features/banner.css'

const Banner = () => {

    return (
        <div className="banner">
        <nav>
            <ul>
                <li>Home</li>
                <li>Movies</li>
                <li>TV Shows</li>
                <li>Live TV</li>
                <li>Subscription</li>
            </ul>
        </nav>
        <img src={movieBanner} alt={"movie_banner"} className="banner_image"/>
        </div>
    )
}

export default Banner