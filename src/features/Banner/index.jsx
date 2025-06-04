import movieBanner from '../../assets/movies_banner.jpg'
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
        <img src={"https://png.pngtree.com/background/20210709/original/pngtree-the-background-of-the-movie-poster-picture-image_869718.jpg"} alt={"movie_banner"} className='movie__banner'/>
        </>
    )
}

export default Banner