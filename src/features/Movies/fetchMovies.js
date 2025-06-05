const auth_key = "yourAPIkey";

// call arrays of API with Promise.all
// return arrays of 20 movies data
export const fetchMovies = async(pages) => {
    const promises = pages.map((page) => fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${auth_key}&page=${page}`))
    try{
    const responses = await Promise.all(promises); //{ [resul1, result2, result3]}
    const data = await Promise.all(responses.map((res) => res.json()))
    return data;
    } catch {
        console.error("something is not working");
    }
}