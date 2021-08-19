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
import AutorizationRoute from '../AutorizationRoute/AutorizationRoute';

function App() {

  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenPreloader, setIsOpenPreloader] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Загрузка...', email: 'Загрузка...' });
  const [isOpenHeader, setIsOpenHeader] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortMovie, setShortMovie] = useState(false);
  const [dataForSearch, setDataForSearch] = useState('');
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  let shortMovieDuration = 40;

  useEffect(() => {
    if (isLoggedIn) {
      setIsOpenPreloader(true);
      const getMovies = JSON.parse(localStorage.getItem('movies'));
      moviesApi.getMovies().then((data) => {
        setMovies(data);
        if (!getMovies) {
          localStorage.setItem('movies', JSON.stringify(data));
        }
      }).catch((err) => console.log(err));

      Promise.all([auth.authorization(), auth.getSavedMovies()])
        .then(([user, savedmovies]) => {
          setIsOpenPreloader(true);
          setCurrentUser({ name: user.name, email: user.email, message: '' })
          setSavedMovies(savedmovies);
          setIsOpenPreloader(false);
        }).catch(err => console.log(err));
        
    }
  }, [isLoggedIn]);

 

  useEffect(() => {
    tokenCheck();
  }, []);


  function onRegister(registerData) {
    return auth.onRegister(registerData).then(() => {
     onLogin({email: registerData.email, password: registerData.password})
     .then(() => history.push('/movies'))

    });
    
  }

  function onLogin(loginData) {
    return auth.onLogin(loginData).then((jwt) => {
      setIsOpenPreloader(true);
      localStorage.setItem('jwt', jwt.jwt);
      setIsLoggedIn(true);
    }).then(() => {
      setIsOpenPreloader(false);
      history.push('/movies')
    });
  };

  function tokenCheck() {
    return auth.authorization()
      .then((data) => {
        setIsOpenPreloader(true);
        setCurrentUser({ name: data.name, email: data.email })
        setIsLoggedIn(true);
        setIsOpenPreloader(false);
      }).then(() => {
        setIsOpenPreloader(false);
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
    setIsOpenPreloader(true);
    auth.editUser(data.name, data.email).then((data) => {
      setCurrentUser({ name: data.name, email: data.email, message: 'Данные пользователя обновлены!' });
      setIsOpenPreloader(false);
    }).catch((err) => {
      setCurrentUser({ message: 'Произошла ошибка при обновлении!' });
      setIsOpenPreloader(false);
    })
  };

  const onLogOut = () => {
    auth.onLogOut().then(() => {
      setIsOpenPreloader(false);
      history.push('/');
      setIsLoggedIn(false);
    }).then(() => setIsOpenPreloader(false))
      .catch(err => console.log(err));
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

useEffect(() => {
  const getMovies = JSON.parse(localStorage.getItem('movies'));
  if (getMovies) {
    setFilteredMovies(getMovies);
  }
  setFilteredSavedMovies(savedMovies);
  console.log(savedMovies)
}, [savedMovies]);


  useEffect(() => {
    handleSearch();
  }, [shortMovie, dataForSearch]);



  function handleSearch() {
    setIsOpenPreloader(true);
    let filtered = [];
    if (location.pathname.includes('/movies')) {
      if (dataForSearch === '') {
        if(!shortMovie) { 
          setFilteredMovies(movies);
          setIsOpenPreloader(false);
          return; }
        filtered = movies.filter(movie => (movie.duration <= shortMovieDuration));
        setFilteredMovies(filtered);
        setIsOpenPreloader(false);
        return;
      }
      if (!shortMovie) {
        filtered = movies.filter(movie => movie.nameRU.toLowerCase().includes(dataForSearch));
      } else {
        filtered = movies.filter(movie => (movie.duration <= shortMovieDuration) && (movie.nameRU.toLowerCase().includes(dataForSearch)));
      }
      setFilteredMovies(filtered);
      localStorage.setItem('movies', JSON.stringify(filtered));
    }
    if (location.pathname.includes('/saved-movies')) {
      if (dataForSearch === '') {
        if(!shortMovie) { 
          setFilteredSavedMovies(savedMovies);
          setIsOpenPreloader(false);
          return; }
        filtered = savedMovies.filter(movie => (movie.duration <= shortMovieDuration));
        setFilteredSavedMovies(filtered);
        setIsOpenPreloader(false);
        return;
      }
      if (!shortMovie) {
        filtered = savedMovies.filter(movie => movie.nameRU.toLowerCase().includes(dataForSearch));
      } else {
        filtered = savedMovies.filter(movie => (movie.duration <= shortMovieDuration) && (movie.nameRU.toLowerCase().includes(dataForSearch)));
      }
      setFilteredSavedMovies(filtered);
    }
    setIsOpenPreloader(false);
  }

  const createMovies = (data) => {
    return auth.createMovies(data).then((data) => {
      setIsOpenPreloader(true);
      auth.getSavedMovies().then((data) => {
        setSavedMovies(data)
      });
      setIsOpenPreloader(false);
      return data;
    })
      .catch(err => err.json().then((err) => {
        setIsOpenPreloader(false);
        alert(err.validation.body.message)
      }));
  }

  const deleteMovie = (data) => {
    setIsOpenPreloader(true);
    return auth.deleteMovie(data).then((data) => {
      auth.getSavedMovies().then((data) => {
        setSavedMovies(data)
      });
      setIsOpenPreloader(false)
      return data;
    })
      .catch(err => console.log(err));
  }



  function checkLike(isLiked, card, savedmovie) {

    setIsOpenPreloader(true);
    if (!isLiked) {
      createMovies(card).then((newCard) => {
        if (newCard.movieId) {
          setMovies((state) => state.map((c) => c.id === newCard.movieId ? card : c));
          setIsOpenPreloader(false)
        }
      }).catch(err => console.log(err));
    }
    else {
      deleteMovie(savedmovie).then((newCard) => {
        setMovies((state) => state.map((c) => c.id === newCard.movieId ? card : c));
        setIsOpenPreloader(false)
      }).catch(err => console.log(err));
    }
  }

  return (
    <section className="root">
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <Header isOpenHeader={isOpenHeader} isLoggedIn={isLoggedIn} openMenu={openMenu} />
          <Preloader isOpen={isOpenPreloader} />
          <Switch>
            <ProtectedRoute exact path="/movies" setShortMovie={setShortMovie} createMovies={createMovies} savedMovies={savedMovies} isLoggedIn={isLoggedIn} 
            isOpenPreloader={isOpenPreloader} setIsOpenHeader={setIsOpenHeader} handleSearch={setDataForSearch}
              openMenu={openMenu} checkLike={checkLike} deleteMovie={deleteMovie} filteredMovies={filteredMovies} component={Movies}
            />
            <ProtectedRoute exact path="/saved-movies" isLoggedIn={isLoggedIn} handleSearch={setDataForSearch} deleteMovie={deleteMovie} setShortMovie={setShortMovie} 
            savedMovies={filteredSavedMovies} isOpenPreloader={isOpenPreloader} setIsOpenHeader={setIsOpenHeader} openMenu={openMenu} component={SavedMovies} /> ||
            <ProtectedRoute path="/profile" isOpenPreloader={isOpenPreloader} setIsOpenHeader={setIsOpenHeader} isLoggedIn={isLoggedIn} onUpdateUser={onUpdateUser}
              openMenu={openMenu} onLogOut={onLogOut} component={Profile} />
            <AutorizationRoute path="/signin" isLoggedIn={isLoggedIn} onClickRegister={onClickRegister} onLogin={onLogin} component={Login} />
            <AutorizationRoute path="/signup" isLoggedIn={isLoggedIn} onClickLogin={onClickLogin} onRegister={onRegister} component={Register} />
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
