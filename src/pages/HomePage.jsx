import Header from "../components/Header";
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import BuySection from "../components/BuySection";
import MyNfts from "../components/MyNfts";
import Showcase from "../components/Showcase";
import Martyrs from "../components/Martyrs";
import Rules from "../components/Rules";
import About from "../components/About";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />

      <div className="mint-buy-wrapper">
        <Countdown />
        <BuySection />
      </div>

      <MyNfts />
      <Showcase />
      <Martyrs />
      <Rules />
      <About />
      <Footer />
    </>
  );
}

export default HomePage;
