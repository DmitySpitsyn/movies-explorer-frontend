import SearchForm from "../Movies/SearchForm/SearchForm";
import Preloader from "../Movies/Preloader/Preloader";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Header from "../Header/header";
import Footer from "../Footer/Footer";

function SavedMovies(props) {

  const openMenu = () => {
    props.openMenu();
}

  return (
    <section className="movies">
      <Header openMenu={openMenu} />
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <Footer />
    </section>
  );
}

export default SavedMovies;