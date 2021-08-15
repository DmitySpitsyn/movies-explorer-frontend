
function MoviesCard(props) {

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч. ' + minutes + 'м.';
  };

  function checkLike() {
      props.deleteMovie(props.card._id);
};

function openTrailer() {
  window.open(props.card.trailerLink)
}

  return (
    <section className="moviescard">
      <div className='moviescard__description'>
        <h2 className='moviescard__title'>{props.card.nameRU}</h2>
        <span className='moviescard__timestamp'>{getTimeFromMins(props.card.duration)}</span>
        <label className='moviescard__likebutton'>
          <input type='checkbox' name='filter' visible='none' onClick={checkLike}></input>
          <span className='moviescard__span moviescard__span_type_delete'></span>
        </label>
      </div>
      <img className='moviescard__image' onClick={openTrailer} src={props.card.image} alt={`Фото ${props.card.image}`}></img>
    </section>
  );
}

export default MoviesCard;