
function MoviesCard(props) {

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч. ' + minutes + 'м.';
  };

  function checkLike(evt) {
    const savedMovie = evt.target.closest('.moviescard').id
    props.checkLike(_id, props.card, savedMovie)
  }


  let _id;

  props.savedMovies.forEach((element) => {
    if (element.movieId === props.card.id) {
      _id = element._id;
    }
  });

  function openTrailer() {
    window.open(props.card.trailerLink)
  }
  

  const movieLikeButtonClassName = (
    `moviescard__span ${_id ? 'moviescard__span_checked' : ' '}`
  );

  return (
    <section id = {_id} className="moviescard" >
      <div className='moviescard__description'>
        <h2 className='moviescard__title'>{props.card.nameRU}</h2>
          <span className='moviescard__timestamp'>{getTimeFromMins(props.card.duration)}</span>
        <label className='moviescard__likebutton'>
        <input type='checkbox' name='filter' visible='none' onClick={checkLike}></input>
          <span className={movieLikeButtonClassName}></span>
        </label>
      </div>
      <img className='moviescard__image' onClick={openTrailer} src={'https://api.nomoreparties.co' + props.card.image.url} alt={props.card.image.name}></img>
    </section>
  );
}

export default MoviesCard;