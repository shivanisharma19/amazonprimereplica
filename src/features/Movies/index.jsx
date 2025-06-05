import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import range from "lodash/range";
import { fetchMovies } from "./fetchMovies";
import MovieCard from "../../common/MoviesCard";
import './style.css'

const Movies = () => {
    //retrieve 10 rows in one call and then scroll down to end then another 10 and same uptill 100 rows
    const maxCount = 100; 
    const [movies_arr, setMovies] = useState([]);
    const [count, setCount] = useState(1);
    const [scrollPage , setScrollPage] = useState(1);
    const [isLoading, setIsloading] = useState();

    // for scroller
    const [canScrollLeft, setCanScrollLeft] = useState([]);
    const [canScrollRight, setCanScrollRight] = useState([]);
    const  scrollRef = useRef([]);

    // fetch movies at the mount of the component 
    useEffect(() => {
        let isMounted = true
        setIsloading(true)

        const getNextMovies = async() => {
        const countArr = range(count, count+10) // range create array from (1:10)
        try{
            const  data_arr = await(fetchMovies(countArr)) //received array of movies array [ 10 : 20 movies]
            if(isMounted) {
                setMovies((preMovies) => [...preMovies, ...data_arr]) // add on the data with prev one
                setCount(count+10) // for next iteration
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

    // once movies are fetch set the scroll button state for all rows
    useEffect(() => {
        setCanScrollLeft(new Array(movies_arr.length).fill(false));
        setCanScrollRight(new Array(movies_arr.length).fill(true));
    }, [movies_arr])


    //Scroll button handler
    const handleScroll = (scrollDirection, i) => {
        const scrollAmount = 1000;
        const sect = scrollRef.current[i] 

        if(!sect)
            return
        sect.scrollBy({
            left: scrollDirection === 'left' ? -scrollAmount : scrollAmount,
        })

        // check and update if scroll length is there on either side
        setCanScrollLeft(canScrollLeft.map((preVal, index) => {
            if(i === index)
                return sect.scrollLeft > 0
            return preVal
            }
        ))
        setCanScrollRight(canScrollRight.map((preVal, index) => {
            if(i === index)
                return sect.scrollLeft + sect.clientWidth  <= sect.scrollWidth //[left scoll value + visible area value <= total scroll width values]
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
        scrollThreshold="80%"
        >
        <section className="movies_list">
        {movies_arr && movies_arr?.map((movies, index) => (
            <div className="movie_list__buttons" key={index}>
                <button className="movies_row__left-scroll" id="leftScroll" title="left" onClick={() => handleScroll('left', index)} disabled={!canScrollLeft[index]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={canScrollLeft[index] ? "aliceblue" : "black"}>
                        <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zm1.289-15.7 1.422 1.4-4.3 4.344 4.289 4.245-1.4 1.422-5.714-5.648z"/>
                    </svg>
                </button>
                <div className="movies_row" ref={(ele) => scrollRef.current[index] = ele}>
                    {movies?.results.map((movie, index) => (
                        <MovieCard key={`${movie.id}_${index}`} title={movie.title} overview={movie.overview} poster={movie.poster_path} />
                    ))}
                </div>
                <button className="movies_row__right-scroll" id="rightScroll" title="right" onClick={() => handleScroll('right',index)} disabled={!canScrollRight[index]} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={canScrollRight[index] ? "aliceblue" : "black"}>
                    <path d="M10 20A10 10 0 1 0 0 10a10 10 0 0 0 10 10zM8.711 4.3l5.7 5.766L8.7 15.711l-1.4-1.422 4.289-4.242-4.3-4.347z"/>
                    </svg>
                </button>
            </div>
        ))}
        </section>
        </InfiniteScroll>
    )
}
export default Movies