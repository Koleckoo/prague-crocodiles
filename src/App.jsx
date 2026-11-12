import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Training from "./components/Training.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Training />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
