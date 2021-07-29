import SearchForm from '../Movies/SearchForm/SearchForm'
import Preloader from '../Movies/Preloader/Preloader'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Header from '../Header/header';
import Footer from '../Footer/Footer';

function Movies(props) {

  const openMenu = () => {
    props.openMenu();
}

  return (
    <section className="movies">
      <Header openMenu={openMenu} />
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <div className='moviescardlist__more'>
        <button className='moviescardlist__button'>Ещё</button>
      </div>
      <Footer />
    </section>
  );
}

export default Movies;