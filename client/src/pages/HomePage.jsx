
// import MoviesGrid from "../components/MoviesGrid";
import Layout from '../components/Layout.jsx';
import MoviesListPage from "./MoviesListPage";





export default function HomePage(){
 
    // const {movies, selectedGenre} = useMovies();
          
    return(
        <Layout>
          <MoviesListPage title="Popular Movies" />
          
    </Layout>

    )
}