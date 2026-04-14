import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Proficiencies from "@/components/Proficiencies";
import Work from "@/components/Work";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CarScene from "@/components/CarScene";

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-white selection:text-black relative">
      <CarScene />
      <div className="relative z-10 pointer-events-none *:pointer-events-auto">
        <NavBar />
        <Hero />
        <Proficiencies />
        <Work />
        <Education />
        <Certificates />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
