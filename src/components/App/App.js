import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import './App.css';
import Menu from '../Menu/Menu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/header';

function App() {

  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenPreloader, setIsOpenPreloader] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Загрузка...', email: 'Загрузка...' });
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortMovie, setShortMovie] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setIsOpenPreloader(true);
      const movies = JSON.parse(localStorage.getItem('movies'));
      if (movies) {
        setFilteredMovies(movies);
      }
      Promise.all([auth.authorization(), auth.getSavedMovies()])
        .then(([user, savedmovies]) => {
          setCurrentUser({ name: user.name, email: user.email })
          setSavedMovies(savedmovies)
        }).then(() => setIsOpenPreloader(false)).catch(err => console.log(err));

    }
  }, [isLoggedIn]);

    
  useEffect(() => {
    tokenCheck();
  }, []);


  function onRegister(registerData) {
    return auth.onRegister(registerData).then(() => {
      history.push('/signin');
    });
  }

  function onLogin(loginData) {
    return auth.onLogin(loginData).then((jwt) => {
      localStorage.setItem('jwt', jwt.jwt);
      setIsLoggedIn(true);
      history.push('/movies');
      setIsOpenPreloader(false);
    }).then(() => history.push('/movies'));
  };

  function tokenCheck() {

    return auth.authorization()
      .then((data) => {
        setCurrentUser({ name: data.name, email: data.email })
        setIsLoggedIn(true);
        setIsOpenPreloader(false);
      }).then(() => {
        if (location.pathname.includes('/movies')) {
          history.push('/movies');
        }
        if (location.pathname.includes('/saved-movies')) {
          history.push('/saved-movies');
        }
        if (location.pathname.includes('/profile')) {
          history.push('/profile');
        }
      }).catch(err => console.log(err));

  };

  const onUpdateUser = (data) => {
    auth.editUser(data.name, data.email)
      .then((data) => {
        setCurrentUser(data);
      });
  };

  const onLogOut = () => {
    auth.onLogOut().then(() => {
      history.push('/');
      setIsLoggedIn(false);
    }).catch(err => console.log(err));

  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const openMenu = () => {
    setIsMenuOpen(true);
  }

  const onClickLogin = () => {
    history.push('/signin');
  }

  const onClickRegister = () => {
    history.push('/signup');
  }
  const openProfile = () => {
    history.push('/profile');
    setIsMenuOpen(false);
  }

  const handleSearchSaved = (data) => {
    let filtered = [];
    if (shortMovie) {
      filtered = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(data)).filter(movie => movie.duration <= 40);
    } else {
      filtered = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(data));
    }
    setSavedMovies(filtered);
  };

  

  const handleSearch = (data) => {
    setFilteredMovies([]);
    moviesApi.getMovies().then((movies) => {
      let filtered = [];
      if (shortMovie) {
        filtered = movies.filter(movie => movie.nameRU.toLowerCase().includes(data)).filter(movie => movie.duration <= 40);
      } else {
        filtered = movies.filter(movie => movie.nameRU.toLowerCase().includes(data));
      }
      setFilteredMovies(filtered)
      localStorage.setItem('movies', JSON.stringify(filtered));
    })
      .catch((err) => console.log(err))
  }

  const createMovies = (data) => {
    return auth.createMovies(data).then((data) => {
      auth.getSavedMovies().then((data) => setSavedMovies(data));
      return data;
    })
      .catch(err => err.json().then((err) => alert(err.validation.body.message)));
  }

  const deleteMovie = (data) => {
    console.log(data)
    return auth.deleteMovie(data).then((data) => 
    {auth.getSavedMovies().then((data) => setSavedMovies(data));
    return data;
    })
      .catch(err => console.log(err));
      
  }

  function checkLike(isLiked, card, savedmovie) {
    if (!isLiked) {
      createMovies(card).then((newCard) => {
        if (newCard.movieId) {
        setFilteredMovies((state) => state.map((c) => c.id === newCard.movieId ? card : c)); }
      }).catch(err => console.log(err));
    }
    else {
      deleteMovie(savedmovie).then((newCard) => {
        setFilteredMovies((state) => state.map((c) => c.id === newCard.movieId ? card : c));
      }).catch(err => console.log(err));
    }
  }

const handleMovieLike = (savedMovies) => {
  const movies = JSON.parse(localStorage.getItem('movies'));
  console.log(movies)
  for (let i=0; i < savedMovies.length; i += 1) {
    const isLiked = movies.moviesId.some(i => i === savedMovies.moviesId[i]);
    if (isLiked) {return isLiked}
  }


}

  return (
    <section className="root">
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <Header isOpenHeader={isOpenHeader} isLoggedIn={isLoggedIn} openMenu={openMenu} />
          <Preloader isOpen={isOpenPreloader} />
          <Switch>
            <ProtectedRoute exact path="/movies" setShortMovie={setShortMovie} createMovies={createMovies} savedMovies={savedMovies} isLoggedIn={isLoggedIn} isOpenPreloader={isOpenPreloader} setIsOpenHeader={setIsOpenHeader} handleSearch={handleSearch}
              openMenu={openMenu} checkLike={checkLike} deleteMovie={deleteMovie} isLiked={handleMovieLike} filteredMovies={filteredMovies} component={Movies}
            />
            <ProtectedRoute exact path="/saved-movies"
              isLoggedIn={isLoggedIn} handleSearchSaved={handleSearchSaved} deleteMovie={deleteMovie} setShortMovie={setShortMovie} savedMovies={savedMovies} isOpenPreloader={isOpenPreloader} setIsOpenHeader={setIsOpenHeader} openMenu={openMenu} component={SavedMovies} /> ||
            <ProtectedRoute path="/profile" isOpenPreloader={isOpenPreloader} setIsOpenHeader={setIsOpenHeader} isLoggedIn={isLoggedIn} onUpdateUser={onUpdateUser}
              openMenu={openMenu} onLogOut={onLogOut} component={Profile} />
            <Route path="/signin">
              <Login onClickRegister={onClickRegister} onLogin={onLogin} />
            </Route>
            <Route path="/signup">
              <Register onClickLogin={onClickLogin} onRegister={onRegister} />
            </Route>
            <Route path="/" exact={true}>
              <Main onClickRegister={onClickRegister} setIsOpenHeader={setIsOpenHeader} isOpenPreloader={isOpenPreloader} onClickLogin={onClickLogin} />
            </Route>
            <Route path="">
              <NotFound />
            </Route>
          </Switch>
          <Menu isOpen={isMenuOpen} openProfile={openProfile} onClose={closeMenu} />
        </CurrentUserContext.Provider>
      </div>
    </section>
  );
}

export default App;
