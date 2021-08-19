import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  console.log(props.savedMovies)
  return (
    <section className="moviescardlist">
        {
        (props.savedMovies.length === 0) ? <span>Ничего не найдено</span> :
        props.savedMovies.map((card) => (<MoviesCard
          key={card._id}
          card={card}
          deleteMovie={props.deleteMovie}
          />))
      }
    </section>
  );
}

export default MoviesCardList;
