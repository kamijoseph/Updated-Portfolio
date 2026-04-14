

export function About() {
    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h3 className="text-xl text-neon-blue font-mono">// WHO_AM_I</h3>
                <p className="text-gray-400 font-mono leading-relaxed">
                    I am a ML Engineer, Data Scientist, and AI Engineer based in Nairobi, Kenya.
                    I specialize in transforming raw data into actionable insights and building
                    deployable machine learning models & AI Agents for diverse sectors including business,
                    health, agriculture, education, and security.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="border border-gray-800 p-4 bg-gray-900/50">
                        <h4 className="text-terminal-green text-sm mb-2 font-pixel">Experience</h4>
                        <ul className="text-xs text-gray-500 space-y-2 font-mono">
                            <li>2+ Years Freelance AI Engineer</li>
                            <li>1 Year ML Engineer at Fate Dynamics</li>
                            <li>Data Analyst Intern at Ministry of Youths</li>
                        </ul>
                    </div>
                    <div className="border border-gray-800 p-4 bg-gray-900/50">
                        <h4 className="text-terminal-green text-sm mb-2 font-pixel">Core_Stack</h4>
                        <ul className="text-xs text-gray-500 space-y-2 font-mono">
                            <li>Python / Pandas/ Numpy</li>
                            <li>Pytorch / SQL / Jax</li>
                            <li>Langchain / Langgraph</li>
                            <li>Streamlit / FastAPI</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-terminal-green/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
                <div className="relative border border-gray-800 bg-black/80 p-6 font-mono text-xs">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-gray-500">user_profile.json</span>
                    </div>
                    <pre className="text-terminal-green overflow-x-auto">
                        {`{
  "Name": "Kiarie Kami Josephat",
  "Role": "ML & AI Engineer / Data Scientist",
  "Location": "Nairobi, Kenya",
  "Status": "Available for hire",
  "Interests": [
    "Data Science",
    "ML Engineering",
    "AI Engineering",
    "Python Development",
    "Systems Design"
  ]
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
}
