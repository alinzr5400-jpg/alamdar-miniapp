import Countdown from "../components/Countdown";
import About from "../components/About";
import Rules from "../components/Rules";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Wallet from "../components/Wallet";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Header />

      <Hero />

      <Countdown />

      <Wallet />

      <Gallery />

      <Rules />

      <About />

      <Footer />
    </>
  );
}

export default HomePage;