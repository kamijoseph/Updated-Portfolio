/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cyber-black': '#050505',
                'terminal-green': '#00ff41',
                'neon-blue': '#00f3ff',
            },
            fontFamily: {
                'mono': ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
                // We'll trust the user to load a pixel font or use a fallback
                'pixel': ['"Press Start 2P"', 'monospace'],
            },
        },
    },
    plugins: [],
}
