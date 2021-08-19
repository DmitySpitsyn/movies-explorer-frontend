import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

function SavedMovies(props) {

useEffect(() => {
  props.setIsOpenHeader(true);
});



  return (
    <section className="movies">
      <SearchForm handleSearch={props.handleSearch} setShortMovie={props.setShortMovie}/>
      <MoviesCardList savedMovies={props.savedMovies} deleteMovie={props.deleteMovie}/>
      <div className='saveddevider'></div>
      <Footer />
    </section>
  );
}

export default SavedMovies;