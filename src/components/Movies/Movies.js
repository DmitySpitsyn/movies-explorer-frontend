import SearchForm from '../Movies/SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';

function Movies(props) {

  const [pageCounter, setPageCounter] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    props.setIsOpenHeader(true);
  });
 
  function updatePage() {
    setPageCounter(pageCounter + 1)
  }

  function resetPageCounter() {
    setPageCounter(0);
  }

  function hideButton(state) {
    setButtonState(state);
  }

  function handleSearch(data) {
    props.handleSearch(data);
  }


  return (
    <section className="movies">
    <SearchForm handleSearch={handleSearch} resetPageCounter={resetPageCounter} setShortMovie={props.setShortMovie}/>
      <MoviesCardList checkLike={props.checkLike} deleteMovie={props.deleteMovie} savedMovies={props.savedMovies} createMovies={props.createMovies} resetPageCounter={resetPageCounter} filteredMovies={props.filteredMovies} pageCounter = {pageCounter} hideButton = {hideButton}/>
      <div className='moviescardlist__more'>
        <button className='moviescardlist__button' disabled={buttonState} onClick={updatePage}>Ещё</button>
      </div>
      <Footer />
    </section>
  );
}

export default Movies;