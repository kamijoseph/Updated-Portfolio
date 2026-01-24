import { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={twMerge(
                'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent',
                isScrolled ? 'bg-cyber-black/80 backdrop-blur-md border-gray-800' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Cpu className="text-terminal-green w-8 h-8" />
                    <span className="text-xl font-bold font-pixel tracking-tighter text-white">
                        KAMI.AI
                    </span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-mono text-gray-400 hover:text-terminal-green transition-colors uppercase tracking-widest"
                        >
                            <span className="text-terminal-green opacity-50 mr-1">//</span>
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-terminal-green/50 text-terminal-green font-mono text-xs hover:bg-terminal-green/10 transition-colors uppercase"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-cyber-black/95 border-b border-gray-800 p-4 flex flex-col gap-4">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-lg font-mono text-gray-300 hover:text-terminal-green"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
