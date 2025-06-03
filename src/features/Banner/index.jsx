import movieBanner from '../../src/assets/movies_banner.jpg'
import './style.css'

const Banner = () => {

    return (
        <>
        <nav>
            <ul>
                <li>Home</li>
                <li>Movies</li>
                <li>TV Shows</li>
                <li>Live TV</li>
                <li>Subscription</li>
            </ul>
        </nav>
        <img src={movieBanner} alt={"movie_banner"}/>
        </>
    )
}

export default Banner