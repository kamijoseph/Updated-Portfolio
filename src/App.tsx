import { Layout } from './components/Layout';
import { NeuralGraph } from './components/NeuralNetwork/NeuralGraph';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

function App() {
  return (
    <Layout>
      {/* Hero Section with Neural Network */}
      <section id="home" className="h-[85vh] w-full relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <NeuralGraph />
        </div>

        {/* Overlay Title - optional, but helps immediate context */}
        <div className="relative z-10 pointer-events-none text-center mt-32 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4 drop-shadow-lg opacity-80 mix-blend-difference">
            KAMI.ML
          </h1>
          <p className="text-terminal-green font-mono text-sm tracking-[0.2em] animate-pulse">
            ML ENGINEER | DATA SCIENTIST | PYTHON DEVELOPER
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-32">
        <section id="about" className="pt-20">
          <About />
        </section>

        <section id="projects" className="pt-20">
          <Projects />
        </section>

        <section id="contact" className="pt-20 pb-20">
          <Contact />
        </section>
      </div>
    </Layout>
  )
}

export default App
