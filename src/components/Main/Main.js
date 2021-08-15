import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import Portfolio from './Portfolio/Portgolio';
import Footer from '../Footer/Footer';

function Main(props) {

  props.setIsOpenHeader(true);

  return (
    <section className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
      <Footer />
    </section>
)
};

export default Main;