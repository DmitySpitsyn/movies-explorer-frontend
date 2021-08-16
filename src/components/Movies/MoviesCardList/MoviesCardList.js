import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from 'react';

function MoviesCardList(props) {

  let arr = [];
  const [amountCards, setAmountCards] = useState(16);

  useEffect(() => {
    function howCards() {
      props.resetPageCounter();
      if (window.innerWidth <= 400) {
        setAmountCards(5);
      } else {
        setAmountCards(7);
      }
    }
    howCards();
    window.addEventListener('resize', () => {
      howCards();
    });
  }, []);


  if (window.innerWidth <= 400) {
    for (let i = amountCards; i < props.filteredMovies.length; i += 5) {
      arr.push(props.filteredMovies.slice(0, i));
    };
  } else {
    if (props.pageCounter === 0) {
      arr.push(props.filteredMovies.slice(0, amountCards));
    }
    for (let i = amountCards; i < props.filteredMovies.length; i += 1) {
      arr.push(props.filteredMovies.slice(0, i));
    };
  };


  useEffect(() => {
    if (arr.length > props.pageCounter + 1) { props.hideButton(false); return; }
    props.hideButton(true);

  }, [props.pageCounter, amountCards, arr.length, props]);


  return (
    <section className='moviescardlist'>
      {
        (arr.length === 0) ? <span>Ничего не найдено</span> :
          arr[props.pageCounter].map((card) => (<MoviesCard
            key={card.id}
            card={card}
            createMovies={props.createMovies}
            savedMovies={props.savedMovies}
            deleteMovie={props.deleteMovie}
            checkLike={props.checkLike}
          />))
      }
    </section>
  );
}

export default MoviesCardList;