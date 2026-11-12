import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Training from "./components/Training.jsx";
import FirstTime from "./components/FirstTime.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Training />
        <FirstTime />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
