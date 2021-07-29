import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Portfolio from './Portfolio/Portgolio';
import Footer from '../Footer/Footer';
import Header from '../Header/header';

function Main(props) {

  function onClickRegister(evt) {
    evt.preventDefault();
    props.onClickRegister();

  }

  function onClickLogin(evt) {
    evt.preventDefault();
    props.onClickLogin();

  }

  return (
    <section className='main'>
      <Header onClickRegister={onClickRegister} onClickLogin={onClickLogin}/>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />
    </section>
)
};

export default Main;