import React, { useEffect, useState } from "react";
import range from "lodash/range";
import { fetchMovies } from "./fetchMovies";
import MovieCard from "../common/MovieCard";

const Movies = () => {
    //retrieve 10 rows in one call and then scroll down to end then another 10 and same uptill 100
    const [movies_arr, setMovies] = useState([]);
    const [count, setCount] = useState(1);
    const [isLoading , setIsloading] = useState();
    const maxCount = 100;

    useEffect(() => {
        setIsloading(true)
        const getNextMovies = async() => {
        const countArr = range(count, count+9)
        try{
            const  data_arr = await(fetchMovies(countArr))
            setMovies((preMovies) => [...preMovies, ...data_arr])
            setCount(count+10)
        }
        catch{
            console.error("movies not fetched")}
        }
        if(count < maxCount){
         getNextMovies();
        }
        setIsloading(false)
    }, [])

    useEffect(() => console.log(movies_arr), [movies_arr])

    return (
        <section className="movies list">
        {!isLoading ? movies_arr?.map((movies) => (
            movies?.results.map((movie) => (
            <MovieCard title={movie.title} overview={movie.overview} />
        )) 
    ))
    : <p>loading...</p>}
        </section>
    )
}
export default Movies