import SearchForm from '../Movies/SearchForm/SearchForm'
import Preloader from '../Movies/Preloader/Preloader'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Header from '../Header/header';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';

function Movies(props) {

  const [pageCounter, setPageCounter] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  const openMenu = () => {
    props.openMenu();
}

  function updatePage() {
    setPageCounter(pageCounter + 1)
  }

  function resetPageCounter() {
    setPageCounter(0);
  }

  function hideButton(state) {
    setButtonState(state);
  }
  console.log(buttonState)

  return (
    <section className="movies">
      <Header isLoggedIn={true} openMenu={openMenu} />
      <SearchForm />
      <Preloader />
      <MoviesCardList resetPageCounter={resetPageCounter} pageCounter = {pageCounter} hideButton = {hideButton}/>
      <div className='moviescardlist__more'>
        <button className='moviescardlist__button' disabled={buttonState} onClick={updatePage}>Ещё</button>
      </div>
      <Footer />
    </section>
  );
}

export default Movies;