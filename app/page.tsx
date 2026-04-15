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
    <main className="min-h-screen bg-transparent selection:bg-black selection:text-white relative">
      <CarScene />
      <div className="relative z-10">
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
