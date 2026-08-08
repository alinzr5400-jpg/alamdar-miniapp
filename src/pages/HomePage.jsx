import Header from "../components/Header";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import BuySection from "../components/BuySection";
import Gallery from "../components/Gallery";
import Rules from "../components/Rules";
import About from "../components/About";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>

      <Header />

      <Hero />

      {/* Countdown + Buy */}

      <div className="mint-buy-wrapper">

        <Countdown />

        <BuySection />

      </div>

      <Gallery />

      <Rules />

      <About />

      <Footer />

    </>
  );
}

export default HomePage;