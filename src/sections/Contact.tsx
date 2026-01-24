import { Mail, Github, Linkedin, TerminalSquare } from 'lucide-react';

export function Contact() {
    return (
        <div className="max-w-2xl mx-auto text-center">
            <div className="mb-12 inline-block relative">
                <TerminalSquare className="w-16 h-16 text-terminal-green mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-pixel text-white mb-2">Initialize_Handshake</h3>
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-terminal-green to-transparent opacity-50"></div>
            </div>

            <p className="text-gray-400 font-mono mb-12">
                Open for collaborations, research opportunities, and consulting.
                <br />
                Transmitting signals from Nairobi, Kenya.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-16">
                <a
                    href="mailto:josephkiarie561@gmail.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-terminal-green transition-colors group"
                >
                    <div className="p-3 border border-gray-800 rounded bg-gray-900 group-hover:border-terminal-green/50 transition-colors">
                        <Mail size={24} />
                    </div>
                    <span className="font-mono text-sm">Send Packet</span>
                </a>

                <a
                    href="https://github.com/kamijoseph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-neon-blue transition-colors group"
                >
                    <div className="p-3 border border-gray-800 rounded bg-gray-900 group-hover:border-neon-blue/50 transition-colors">
                        <Github size={24} />
                    </div>
                    <span className="font-mono text-sm">Git Repos</span>
                </a>

                <a
                    href="https://linktr.ee/kamijoseph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group"
                >
                    <div className="p-3 border border-gray-800 rounded bg-gray-900 group-hover:border-purple-400/50 transition-colors">
                        <Linkedin size={24} />
                    </div>
                    <span className="font-mono text-sm">Network</span>
                </a>
            </div>

            <footer className="text-xs text-gray-700 font-mono py-8 border-t border-gray-900">
                <p>SYSTEM_STATUS: ONLINE // VERSION 2.0.4</p>
                <p>&copy; 2026 Kami Josephat. Built with React + Neural Systems.</p>
            </footer>
        </div>
    );
}
