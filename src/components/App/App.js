import { Switch, Route, useHistory } from 'react-router-dom';
import { useState, } from 'react';
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

function App() {

  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ isLoggedIn });

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

  return (
    <section className="root">
      <div className="App">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route path="/movies">
              <Movies isLoggedIn={isLoggedIn} openMenu={openMenu} />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies isLoggedIn={isLoggedIn} openMenu={openMenu} />
            </Route>
            <Route path="/profile">
              <Profile openMenu={openMenu} />
            </Route>
            <Route path="/signin">
              <Login onClickRegister={onClickRegister} />
            </Route>
            <Route path="/signup">
              <Register onClickLogin={onClickLogin} />
            </Route>
            <Route path="/" exact={true}>
              <Main onClickRegister={onClickRegister} onClickLogin={onClickLogin} />
            </Route>
            <Route path="">
              <NotFound />
            </Route>
          </Switch>
          <Menu isOpen={isMenuOpen} onClose={closeMenu} />
        </CurrentUserContext.Provider>
      </div>
    </section>
  );
}

export default App;
