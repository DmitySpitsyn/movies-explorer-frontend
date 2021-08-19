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
  const [getMoviesServer, setGetMoviesServer] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesDubble, setSavedMoviesDubble] = useState([]);
  const [shortMovie, setShortMovie] = useState(false);
  const [dataForSearch, setDataForSearch] = useState('');
  const [fileteredMoviesShort, setFilteredMoviesShort] = useState([]);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    if (isLoggedIn) {
      setIsOpenPreloader(true);
      const getMovies = JSON.parse(localStorage.getItem('movies'));
      moviesApi.getMovies().then((data) => {
        setGetMoviesServer(data);
        if (!getMovies) {
          localStorage.setItem('movies', JSON.stringify(data));
        }
      }).catch((err) => console.log(err));

      Promise.all([auth.authorization(), auth.getSavedMovies()])
        .then(([user, savedmovies]) => {
          setCurrentUser({ name: user.name, email: user.email, message: '' })
          setSavedMovies(savedmovies);
          setSavedMoviesDubble(savedmovies);
          localStorage.setItem('savedMovies', JSON.stringify(savedmovies));
        }).then(() => setIsOpenPreloader(false)).catch(err => console.log(err));

    }
  }, [isLoggedIn]);

 

  useEffect(() => {
    tokenCheck();
  }, []);


  function onRegister(registerData) {
    return auth.onRegister(registerData).then(() => {
     onLogin({email: registerData.email, password: registerData.password})
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


  
 
/*
  const handleSearchShort = () => {
    console.log('ok')
    setIsOpenPreloader(true);
    let shortMovies = [];
    if (location.pathname.includes('/movies')) {
      if (shortMovie) {
        shortMovies = movies.filter(movie => movie.duration <= 40);
      } else {
        shortMovies = JSON.parse(localStorage.getItem('movies'));;
      }
      console.log(shortMovies)
      setMovies(shortMovies);
    }
    if (location.pathname.includes('/saved-movies')) {
      let tempMovies = JSON.parse(localStorage.getItem('savedMovies'));
      let shortMovies = [];
      if (shortMovie) {
        shortMovies = savedMovies.filter(movie => movie.duration <= 40);
        setSavedMovies(shortMovies);
      } else {
        setSavedMovies(tempMovies);
      }
    };
    setIsOpenPreloader(false);
  };
  
*/
/*
useEffect(() => {
  let localMovies = JSON.parse(localStorage.getItem('movies'));
  console.log(localMovies)
  if (localMovies) {
    setMovies(localMovies);
  }
}, [])
*/
/*
useEffect(() => {
  setMovies(filteredMovies)
}, [filteredMovies, shortMovie, dataForSearch])
*/
  useEffect(() => {
    console.log(shortMovie, dataForSearch)
    if (dataForSearch === '') {
      return;
    }
    setIsOpenPreloader(true);
    let filtered = [];
    if (shortMovie) {
      filtered = getMoviesServer.filter(movie => movie.nameRU.toLowerCase().includes(dataForSearch))
        .filter(movie => movie.duration <= 40);
    } else {
      filtered = getMoviesServer.filter(movie => movie.nameRU.toLowerCase().includes(dataForSearch)); 
    }
    setFilteredMovies(filtered);
    console.log(filtered)
    setIsOpenPreloader(false);
  }, [shortMovie, dataForSearch]);


/*
  function handleSearch(data) {
    setIsOpenPreloader(true);
    if (data) {
      console.log(data)
      setDataForSearch(data);
    }
    if (location.pathname.includes('/movies')) {
        if (shortMovie) {
         let filtered = getMoviesServer.filter(movie => movie.nameRU.toLowerCase().includes(dataForSearch))
            .filter(movie => movie.duration <= 40);
          setFilteredMovies(filtered);
        } else {
          let filtered = getMoviesServer.filter(movie => movie.nameRU.toLowerCase().includes(dataForSearch));
          setFilteredMovies(filtered);
        }
    }

    if (location.pathname.includes('/saved-movies')) {
      let filtered = [];
      let filteredShort = [];
      filtered = savedMoviesDubble.filter(movie => movie.nameRU.toLowerCase().includes(data));
      filteredShort = savedMoviesDubble.filter(movie => movie.nameRU.toLowerCase().includes(data)).filter(movie => movie.duration <= 40);
      localStorage.setItem('savedMovies', JSON.stringify(filtered));
      if (shortMovie) {
        setSavedMovies(filteredShort);
      } else {
        setSavedMovies(filtered);
      }
    }
    setIsOpenPreloader(false);
  }
*/

  const createMovies = (data) => {
    return auth.createMovies(data).then((data) => {
      setIsOpenPreloader(true);
      auth.getSavedMovies().then((data) => {
        setSavedMovies(data)
        setSavedMoviesDubble(data)
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
        setSavedMoviesDubble(data)
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
            savedMovies={savedMovies} isOpenPreloader={isOpenPreloader} setIsOpenHeader={setIsOpenHeader} openMenu={openMenu} component={SavedMovies} /> ||
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
