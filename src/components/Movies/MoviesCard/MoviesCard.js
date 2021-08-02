import Card1 from '../../../images/card1.svg';
import { useState, useEffect } from 'react';

function MoviesCard(props) {

  const [isLiked, setIsLiked] = useState(false);

  function checkLike() {
    setIsLiked(!isLiked);
  }

  return (
    <section className="moviescard">
      <img className='moviescard__image' src={Card1} alt='Card1'></img>
      <div className='moviescard__description'>
        <h2 className='moviescard__title'>{props.card.nameRU}</h2>
        <label className='moviescard__likebutton'>
        <input type='checkbox' name='filter' visible='none' onInput={checkLike}></input>
          <span className='moviescard__span'></span>
      </label>
      </div>
      <div className='moviescard__time'>
        <span className='moviescard__timestamp'>1ч42м</span>
      </div>
    </section>
  );
}

export default MoviesCard;