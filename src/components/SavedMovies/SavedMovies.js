import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies(props) {


props.setIsOpenHeader(true);


  return (
    <section className="movies">
      <SearchForm handleSearch={props.handleSearchSaved} setShortMovie={props.setShortMovie}/>
      <MoviesCardList savedMovies={props.savedMovies} deleteMovie={props.deleteMovie}/>
      <div className='saveddevider'></div>
      <Footer />
    </section>
  );
}

export default SavedMovies;