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
import LapFinishedIndicator from "@/components/LapFinishedIndicator";
import LapCounter from "@/components/LapCounter";
import SectionNavigator from "@/components/SectionNavigator";
import StartLights from "@/components/StartLights";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-black selection:text-white relative">
      <CarScene />
      <StartLights />
      <LapCounter />
      <SectionNavigator />
      <div className="relative z-10">
        <NavBar />
        
        <div id="hero">
          <Hero />
        </div>
        <LapFinishedIndicator lap={1} />

        <div id="proficiencies">
          <Proficiencies />
        </div>
        <LapFinishedIndicator lap={2} />

        <div id="work">
          <Work />
        </div>
        <LapFinishedIndicator lap={3} />

        <div id="education">
          <Education />
        </div>
        <LapFinishedIndicator lap={4} />

        <div id="certificates">
          <Certificates />
        </div>
        <LapFinishedIndicator lap={5} />

        <div id="projects">
          <Projects />
        </div>
        <LapFinishedIndicator lap={6} />

        <div id="contact">
          <Contact />
        </div>
        <LapFinishedIndicator lap={7} />

        <Footer />
      </div>
    </main>
  );
}
