import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/header";
import Footer from "../Footer/Footer";

function SavedMovies(props) {

  const openMenu = () => {
    props.openMenu();
}

  const openProfile = () => {
    props.openProfile();
  }

  return (
    <section className="movies">
      <Header isLoggedIn={true} openMenu={openMenu} />
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <div className='saveddevider'></div>
      <Footer />
    </section>
  );
}

export default SavedMovies;