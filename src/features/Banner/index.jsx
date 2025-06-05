import movieBanner from '../../assets/movies_banner.jpg'
import { useNavigate } from 'react-router'
import './style.css'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <>
        <nav>
            <ul>
                <li>Home</li>
                <li onClick={() => navigate('/')}>Movies</li>
                <li>TV Shows</li>
                <li>Live TV</li>
                <li>Subscription</li>
            </ul>
        </nav>
        <img src={movieBanner} alt={"movie_banner"} className='movie__banner'/>
        </>
    )
}

export default Banner