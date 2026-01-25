import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "Multiple Diseases Diagnosis",
        desc: "ML powered disease diagnosis WebApp.",
        tech: ["Streamlit", "ML"],
        link: "https://multiple-disease-diagnosis-prediction.streamlit.app",
        github: "https://github.com/kamijoseph/Multiple-Disease-Diagnosis-Prediction-WebApp",
        type: "Healthcare"
    },
    {
        title: "Datascope +",
        desc: "Automatic & interactive Data analyzer.",
        tech: ["Python", "Pandas"],
        link: "https://datascope-plus.streamlit.app",
        github: "https://github.com/kamijoseph/Datascope",
        type: "Tooling"
    },
    {
        title: "Shambani - Crop Recommender",
        desc: "Intelligent Crop Recommendation System.",
        tech: ["ML", "Agriculture"],
        link: "https://crops-recomendation-system.streamlit.app/",
        github: "https://github.com/kamijoseph/Crops-Recomendation-System",
        type: "AgriTech"
    },
    {
        title: "Personalised Fitness",
        desc: "Personalised Health and Fitness WebApp.",
        tech: ["Streamlit", "Health"],
        link: "https://health-and-fitness.streamlit.app",
        github: "https://github.com/kamijoseph/Personalised-Health-and-Fitness",
        type: "Health"
    },
    {
        title: "Cat Vs. Dog",
        desc: "MobileNetV2 Powered Classification.",
        tech: ["TensorFlow", "Computer Vision"],
        link: "https://cat-dog-moilenetv2-classifier.streamlit.app",
        github: "https://github.com/kamijoseph/Cat-Vs.-Dog-",
        type: "CV"
    },
    {
        title: "Walmart Sales Analysis",
        desc: "MySQL end-to-end Walmart Sales Analysis.",
        tech: ["SQL", "Analytics"],
        link: null,
        github: "https://github.com/kamijoseph/Walmart-Sales-Analysis",
        type: "Analytics"
    },
    {
        title: "Credit Card Fraud Detection",
        desc: "Fraud detection model and research.",
        tech: ["Scikit-learn", "Anomaly Detection"],
        link: null,
        github: "https://github.com/kamijoseph/Credit-Card-Fraud-Detection",
        type: "Finance"
    },
    {
        title: "Air Quality",
        desc: "Air Quality Prediction WebApp.",
        tech: ["Streamlit", "ML"],
        link: "https://air-quality-webapp.streamlit.app/",
        github: "https://github.com/kamijoseph/Air-Quality",
        type: "Environment"
    },
    {
        title: "EV Analysis Dashboard",
        desc: "Tableau EV Vehicle Dashboard.",
        tech: ["Tableau", "Analytics"],
        link: "https://public.tableau.com/app/profile/kami.joseph/viz/CarProject_17658690449330/EVdataanalysis",
        github: null,
        type: "Analytics"
    },
    {
        title: "Mall Customer Segmentation",
        desc: "Mall Customer Segmentation Analysis.",
        tech: ["Python", "Clustering"],
        link: null,
        github: "https://github.com/kamijoseph/Mall-Customer-Segmentation",
        type: "Analytics"
    },
    {
        title: "Human Emotions Classifier",
        desc: "Image and Text emotions detection.",
        tech: ["Deep Learning", "NLP"],
        link: "https://github.com/kamijoseph/Text-Emotions-Detection",
        github: "https://github.com/kamijoseph/FER2013-Emotion-Detection",
        type: "AI Research"
    },
    {
        title: "Resume Screener",
        desc: "Automatic NLP Resume Screener.",
        tech: ["NLP", "Python"],
        link: "https://resumescreeningwebapp.streamlit.app",
        github: "https://github.com/kamijoseph/Resume-Screener",
        type: "HR Tech"
    }
];

export function Projects() {
    return (
        <div className="w-full">
            <div className="flex justify-between items-end mb-12">
                <h3 className="text-xl text-neon-blue font-mono">// DEPLOYED_SYSTEMS</h3>
                <div className="text-xs font-mono text-gray-500">
                    Total Nodes: {projects.length}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        className="group relative bg-gray-900/30 border border-gray-800 hover:border-terminal-green/50 transition-all duration-300 p-6 flex flex-col h-full overflow-hidden cursor-pointer"
                    >
                        {/* Hover Glitch Effect Background */}
                        <div className="absolute inset-0 bg-terminal-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        <div className="flex items-start justify-between mb-4">
                            <span className="text-xs font-pixel text-gray-500 group-hover:text-terminal-green transition-colors">
                                0{idx + 1}
                            </span>
                            <span className="text-[10px] font-mono border border-gray-800 px-2 py-0.5 rounded text-gray-400">
                                {project.type}
                            </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                            {project.title}
                        </h4>

                        <p className="text-sm text-gray-400 font-mono mb-6 flex-grow">
                            {project.desc}
                        </p>

                        <div className="flex items-center justify-between text-xs font-mono mb-6">
                            <div className="flex gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="text-gray-600">#{t}</span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-auto z-10">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-terminal-green transition-colors">
                                    <ExternalLink size={16} />
                                    Live
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <Github size={16} />
                                    Code
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
