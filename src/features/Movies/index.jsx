import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import range from "lodash/range";
import { fetchMovies } from "./fetchMovies";
import MovieCard from "../../common/MoviesCard";
import './style.css'
import { isDisabled } from "@testing-library/user-event/dist/utils";

const Movies = () => {
    //retrieve 10 rows in one call and then scroll down to end then another 10 and same uptill 100
    const maxCount = 100; 
    const [movies_arr, setMovies] = useState([]);
    const [count, setCount] = useState(1);
    const [scrollPage , setScrollPage] = useState(1);
    const [isLoading, setIsloading] = useState();

    // for scroller
    const [canScrollLeft, setCanScrollLeft] = useState([]);
    const [canScrollRight, setCanScrollRight] = useState([]);
    const  scrollRef = useRef([]);

    useEffect(() => {
        let isMounted = true
        setIsloading(true) //set the loading true
        const getNextMovies = async() => {
        const countArr = range(count, count+10)
        try{
            const  data_arr = await(fetchMovies(countArr)) //received array of movies array [ 10 : 20 movies]
            if(isMounted) {
                setMovies((preMovies) => [...preMovies, ...data_arr]) // add on the data
                setCount(count+10)
            }
        }
        catch{
            console.error("movies not fetched")}
        }
        if(count < maxCount){
         getNextMovies();
        }
        setIsloading(false)

        return () => {
            isMounted = false
        }

    }, [scrollPage])

    useEffect(() => {
        setCanScrollLeft(new Array(movies_arr.length).fill(false));
        setCanScrollRight(new Array(movies_arr.length).fill(true));
    }, [movies_arr])

    const handleScroll = (scrollDirection, i) => {
        const scrollAmount = 1000;
        const ele = scrollRef.current[i]
        if(!ele)
            return
        ele.scrollBy({
            left: scrollDirection === 'left' ? -scrollAmount : scrollAmount,
        })

        setCanScrollLeft(canScrollLeft.map((preVal, index) => {
            if(i === index)
                return ele.scrollLeft > 0
            return preVal
            }
        ))
        setCanScrollRight(canScrollRight.map((preVal, index) => {
            if(i === index)
                return ele.scrollLeft + ele.clientWidth  <= ele.scrollWidth
            return preVal
            }
        ))
    }

    // useEffect(() => { console.log(movies_arr)
    //     console.log(movies_arr.length);
    //     console.log(maxCount)}
    // , [movies_arr])

    return (
        <InfiniteScroll
        dataLength={movies_arr.length}
        next={() => setScrollPage(scrollPage+1)}
        hasMore={maxCount > movies_arr.length}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
        >
        <section className="movies_list">
        {movies_arr && movies_arr?.map((movies, index) => (
            <div className="movie_list__buttons" >
                <button className="movies_row__left-scroll" id="leftScroll" title="left" onClick={() => handleScroll('left', index)} disabled={!canScrollLeft[index]}> Left </button>
                <div className="movies_row" ref={(ele) => scrollRef.current[index] = ele}>
                    {movies?.results.map((movie, index) => (
                        <MovieCard key={`${movie.id}_${index}`} title={movie.title} overview={movie.overview} poster={movie.poster_path} />
                    ))}
                </div>
                <button className="movies_row__right-scroll" id="rightScroll" title="right" onClick={() => handleScroll('right',index)} disabled={!canScrollRight[index]} > Right </button>
            </div>
        ))}
        </section>
        </InfiniteScroll>
    )
}
export default Movies