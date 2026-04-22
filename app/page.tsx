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
import { client } from "@/lib/sanity.client";
import { 
  projectsQuery, 
  educationQuery, 
  workQuery, 
  certificatesQuery, 
  proficienciesQuery 
} from "@/lib/sanity.queries";

export default async function Home() {
  // Fetch data in parallel
  const [projects, education, work, certificates, proficiencies] = await Promise.all([
    client.fetch(projectsQuery),
    client.fetch(educationQuery),
    client.fetch(workQuery),
    client.fetch(certificatesQuery),
    client.fetch(proficienciesQuery),
  ]);

  return (
    <main className="min-h-screen bg-transparent selection:bg-black selection:text-white relative">
      <CarScene />
      <StartLights />
      <LapCounter />
      <SectionNavigator />
      <div className="relative z-10 min-w-[470px]">
        <NavBar />

        <div id="hero">
          <Hero />
        </div>
        <LapFinishedIndicator lap={1} />

        <div id="proficiencies">
          <Proficiencies proficiencies={proficiencies} />
        </div>
        <LapFinishedIndicator lap={2} />

        <div id="work">
          <Work work={work} />
        </div>
        <LapFinishedIndicator lap={3} />

        <div id="education">
          <Education education={education} />
        </div>
        <LapFinishedIndicator lap={4} />

        <div id="certificates">
          <Certificates certificates={certificates} />
        </div>
        <LapFinishedIndicator lap={5} />

        <div id="projects">
          <Projects projects={projects} />
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
