import { useState } from "react";
import globalStyles from "./styles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import About from "./components/About";
import Services from "./components/Services";
import PaintProducts from "./components/PaintProducts";
import TextureTypes from "./components/TextureTypes";
import KeyFeatures from "./components/KeyFeatures";
import Gallery from "./components/Gallery";
import BeforeAfter from "./components/BeforeAfter";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
//import WhatsAppButton from "./components/WhatsAppButton";
import ProjectsPage from "./components/ProjectsPage";

export default function App() {
  const [page, setPage] = useState("home"); // "home" | "projects"

  const goToProjects = () => {
    setPage("projects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If on projects page → go home first, then scroll after sections mount
  const scrollTo = (id) => {
    if (page === "projects") {
      setPage("home");
      window.scrollTo({ top: 0 });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // wait for home sections to mount
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* Navbar always visible */}
      <Navbar scrollTo={scrollTo} onProjectsClick={goToProjects} />

      {page === "home" && (
        <>
          <Hero scrollTo={scrollTo} />
          <StatsBar />
          <About />
          <Services />
          <PaintProducts />
          <TextureTypes />
          <KeyFeatures />
          <Gallery />
          <BeforeAfter />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}

      {page === "projects" && (
        <ProjectsPage onBack={goHome} />
      )}

      {/* Replace 91XXXXXXXXXX with your actual WhatsApp number e.g. 919876543210 */}
      {/* <WhatsAppButton phoneNumber="91XXXXXXXXXX" /> */}
    </>
  );
}