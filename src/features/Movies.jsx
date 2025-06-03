import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import range from "lodash/range";
import { fetchMovies } from "./fetchMovies";
import MovieCard from "../common/MovieCard";
import './movies.css'
import { max } from "lodash";

const Movies = () => {
    //retrieve 10 rows in one call and then scroll down to end then another 10 and same uptill 100
    const [movies_arr, setMovies] = useState([]);
    const [count, setCount] = useState(1);
    const [scrollPage , setScrollPage] = useState(1);
    const [isLoading, setIsloading] = useState();
    const maxCount = 100;

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

    useEffect(() => { console.log(movies_arr)
        console.log(movies_arr.length);
        console.log(maxCount)}
    , [movies_arr])

    return (
        <InfiniteScroll
        dataLength={movies_arr.length}
        next={() => setScrollPage(scrollPage+1)}
        hasMore={maxCount > movies_arr.length}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
        >
        <section className="movies_list">
        {movies_arr && movies_arr?.map((movies) => (
            movies?.results.map((movie) => (
            <div className="movies_row">
                <MovieCard title={movie.title} overview={movie.overview} />
            </div>
            )) 
        ))}
        </section>
        </InfiniteScroll>
    )
}
export default Movies