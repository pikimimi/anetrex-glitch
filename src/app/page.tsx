"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';

const GlitchText = ({ 
  children, 
  intensity = 'medium',
  className = '',
  mono = false
}: { 
  children: string;
  intensity?: 'low' | 'medium' | 'high' | 'extreme';
  className?: string;
  mono?: boolean;
}) => {
  const [text, setText] = useState<string>(children);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchChars = '░█▓▒│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿';
    const intervals = {
      low: 6000,
      medium: 4000,
      high: 2000,
      extreme: 1000
    };

    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      const corrupted = children
        .split('')
        .map(char => Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
        .join('');
      setText(corrupted);

      setTimeout(() => {
        setText(children);
        setIsGlitching(false);
      }, 150);
    }, intervals[intensity]);

    return () => clearInterval(glitchInterval);
  }, [children, intensity]);

  return (
    <span className={`relative inline-block ${mono ? 'font-mono' : 'font-sans'} ${className} ${
      isGlitching ? 'after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-rose-500/50 after:to-transparent after:animate-glitch-scan' : ''
    }`}>
      {text}
    </span>
  );
};

const Snowflake = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute text-white opacity-80 pointer-events-none"
    style={style}
  >
    ❄
  </div>
);

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<React.CSSProperties[]>([]);

  const createSnowflake = useCallback(() => {
    const style: React.CSSProperties = {
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 20 + 30}s`, // Even slower: 30-50 seconds
      opacity: Math.random() * 0.5 + 0.3, // Adjusted opacity for visibility
      fontSize: `${Math.random() * 10 + 10}px`,
    };
    return style;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnowflakes((prevSnowflakes) => [...prevSnowflakes, createSnowflake()]);
    }, 3500); // Adjusted frequency (every 3.5 seconds)

    return () => clearInterval(interval);
  }, [createSnowflake]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {snowflakes.map((style, index) => (
        <Snowflake key={index} style={style} />
      ))}
    </div>
  );
};

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTrail = cursorTrailRef.current;
    if (!cursor || !cursorTrail) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;

    const updatePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

      const trailDx = cursorX - trailX;
      const trailDy = cursorY - trailY;
      trailX += trailDx * 0.1;
      trailY += trailDy * 0.1;
      cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updatePosition);
    animateCursor();

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full bg-red-500 opacity-50 mix-blend-screen blur-sm"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorTrailRef}
        className="fixed pointer-events-none z-50 w-12 h-12 rounded-full bg-red-500 opacity-30 mix-blend-screen blur-md"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

interface EyeProps {
  isVisible: boolean;
}

const Eye: React.FC<EyeProps> = ({ isVisible }) => {
  const eyeArt = `
⠤⣤⣤⣤⣄⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣠⣤⠤⠤⠴⠶⠶⠶⠶
⢠⣤⣤⡄⣤⣤⣤⠄⣀⠉⣉⣙⠒⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠴⠘⣉⢡⣤⡤⠐⣶⡆⢶⠀⣶⣶⡦
⣄⢻⣿⣧⠻⠇⠋⠀⠋⠀⢘⣿⢳⣦⣌⠳⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠞⣡⣴⣧⠻⣄⢸⣿⣿⡟⢁⡻⣸⣿⡿⠁
⠈⠃⠙⢿⣧⣙⠶⣿⣿⡷⢘⣡⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⣷⣝⡳⠶⠶⠾⣛⣵⡿⠋⠀⠀
⠀⠀⠀⠀⠉⠻⣿⣶⠂⠘⠛⠛⠛⢛⡛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠛⠀⠉⠒⠛⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⢸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢻⡁⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀ ⠀⠀⠀⠿ 
  `;

  return (
    <div 
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <pre className="text-rose-500 text-xs font-bold whitespace-pre">
        {eyeArt}
      </pre>
    </div>
  );
};

const CornerStars: React.FC = () => {
  return (
    <>
      <div className="fixed top-4 left-4 text-rose-500 text-2xl z-50">★</div>
      <div className="fixed top-4 right-4 text-rose-500 text-2xl z-50">★</div>
      <div className="fixed bottom-4 left-4 text-rose-500 text-2xl z-50">★</div>
      <div className="fixed bottom-4 right-4 text-rose-500 text-2xl z-50">★</div>
    </>
  );
};

// Define the different sections
const SECTIONS = ['none', 'about', 'projects', 'contact', 'art'] as const;
type Section = typeof SECTIONS[number];

const AboutMe: React.FC = () => (
  <section className="mb-4">
    <GlitchText intensity="medium" className="block text-xl font-light tracking-wider mb-2">
      About Me
    </GlitchText>
    <p className="text-gray-300 mb-2">
      Creating in the digital underground.
    </p>
    <p className="text-gray-300 mb-2">
      I produce breakcore and experimental electronic music, blending analog synths with glitched circuits and custom patches.
    </p>
    <p className="text-gray-300 mb-2">
      I code visuals that react to sound in real-time and design websites with that old-web energy.
    </p>
    <p className="text-gray-300">
      When I'm not making noise, I'm walking by the sea, cooking, or lost in cartoons.
    </p>
  </section>
);

const Projects: React.FC = () => (
  <section className="mb-4">
    <GlitchText intensity="medium" className="block text-xl font-light tracking-wider mb-2">
      Projects
    </GlitchText>
    <ul className="list-disc list-inside text-gray-300">
      <li>
        <a 
          href="https://citypopmidi.online" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-rose-400 transition-colors duration-300"
        >
          citypopmidi.online
        </a>
      </li>
      <li>Sample pack/drum kit <span className="text-rose-500">(coming soon)</span></li>
      <li>Album art editor <span className="text-rose-500">(coming soon)</span></li>
    </ul>
  </section>
);

const Contact: React.FC = () => (
  <section className="mb-4">
    <GlitchText intensity="medium" className="block text-xl font-light tracking-wider mb-2">
      Contact Me
    </GlitchText>
    <div className="text-gray-300">
      <p>anetrexic@gmail.com</p>
      <p>53°16'30.00" N, 9°02'57.48" W</p> {/* Replaced `&apos;` and `&quot;` with actual characters */}
    </div>
  </section>
);

const AsciiHeart: React.FC = () => (
  <pre className="text-rose-500 text-xs font-bold whitespace-pre">
{`⠀⠀⠀⠀⣠⣤⣤⣴⡿⠛⣷⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣿⡇⠀⠙⠀⢀⣿⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⡿⣦⣀⣠⡿⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠇⡁⢹⡏⠂⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠁⠀⢘⡇⠁⡃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀`}
  </pre>
);

const CyberEyes: React.FC = () => (
  <pre className="text-rose-500 text-xs font-bold whitespace-pre">
{`⠤⠤⠤⠤⠤⠤⢤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠤⠶⠶⠶⠦⠤⠤⠤⠤⠤⢤⣤⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠄⢂⣠⣭⣭⣕⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠀⠀⠀⠤⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉
⠀⠀⢀⠜⣳⣾⡿⠛⣿⣿⣿⣦⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⣤⣤⣤⣤⣤⣤⣤⣤⣍⣀⣦⠦⠄⣀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠠⣄⣽⣿⠋⠀⡰⢿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡿⠛⠛⡿⠿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣁⣂⣤⡄⠀⠀⠀⠀⠀⠀
⢳⣶⣼⣿⠃⠀⢀⠧⠤⢜⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠟⠁⠀⠀⠀⡇⠀⣀⡈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠁⠐⠀⣀⠀⠀
⠀⠙⠻⣿⠀⠀⠀⠀⠀⠀⢹⣿⣿⡝⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡿⠋⠀⠀⠀⠀⠠⠃⠁⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⡿⠋⠀⠀
⠀⠀⠀⠙⡄⠀⠀⠀⠀⠀⢸⣿⣿⡃⢼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡏⠉⠉⠻⣿⡿⠋⠀⠀⠀⠀
⠀⠀⠀⠀⢰⠀⠀⠰⡒⠊⠻⠿⠋⠐⡼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⠀⠀⠀⠀⣿⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠸⣇⡀⠀⠑⢄⠀⠀⠀⡠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢖⠠⠤⠤⠔⠙⠻⠿⠋⠱⡑⢄⠀⢠⠟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠉⠒⠒⠻⠶⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠡⢀⡵⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠦⣀⠀⠀⠀⠀⠀⢀⣤⡟⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠙⠛⠓⠒⠲⠿⢍⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
  </pre>
);

const ContentSection: React.FC<{ activeSection: Section }> = ({ activeSection }) => {
  return (
    <div className="flex h-full">
      <div className="w-4/5 space-y-6 pr-8">
        <div className={`transition-all duration-500 ${activeSection !== 'none' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <AboutMe />
        </div>
        <div className={`transition-all duration-500 ${activeSection !== 'none' && activeSection !== 'about' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Projects />
        </div>
        <div className={`transition-all duration-500 ${activeSection !== 'none' && activeSection !== 'about' && activeSection !== 'projects' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Contact />
        </div>
      </div>
      <div className="w-1/5 relative">
        <div className={`absolute top-0 right-0 h-full flex items-end transition-all duration-500 ${activeSection === 'art' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
          <div className="mb-4">
            <CyberEyes />
          </div>
        </div>
        <div className={`absolute top-1/2 -translate-y-1/2 left-0 transition-all duration-500 ${activeSection === 'none' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <AsciiHeart />
        </div>
      </div>
    </div>
  );
};

export default function MinimalCyberpunkLanding() {
  const [activeSection, setActiveSection] = useState<Section>('none');

  const cycleSection = () => {
    const currentIndex = SECTIONS.indexOf(activeSection);
    const nextIndex = (currentIndex + 1) % SECTIONS.length;
    setActiveSection(SECTIONS[nextIndex]);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMTUiLz48L3N2Zz4=')] opacity-20" />
      
      {/* Snow Effect */}
      <SnowEffect />
      
      {/* Cursor Follower */}
      <CursorFollower />
      
      {/* Static Eye */}
      <Eye isVisible={activeSection === 'none'} />
      
      {/* Corner Stars */}
      <CornerStars />
      
      {/* About Text */}
      <div 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer"
        onClick={cycleSection}
      >
        <GlitchText intensity="low" className="text-rose-500 text-lg font-light tracking-widest hover:text-rose-400 transition-colors duration-300">
          about
        </GlitchText>
      </div>
      
      <main className="relative z-30 mx-auto max-w-7xl px-4 py-12 flex-grow flex flex-col justify-between">
        <header className="mb-8 space-y-2 text-center">
          <GlitchText intensity="high" className="block text-4xl font-light tracking-wider">
            サイバーパンク
          </GlitchText>
          
          <GlitchText intensity="medium" className="block text-2xl font-light tracking-widest text-rose-500">
            anetrexic
          </GlitchText>

          <GlitchText intensity="low" className="block text-lg font-light tracking-wider text-gray-400">
            デジタルコア_アンダーグラウンド
          </GlitchText>
        </header>

        {/* Content sections with smooth transitions */}
        <ContentSection activeSection={activeSection} />

        {/* Move footer inside main for better spacing control */}
        <footer className="relative z-30 pt-8">
          <div className="flex justify-center space-x-12">
            <a href="https://www.instagram.com/anetrexic/" target="_blank" rel="noopener noreferrer" className="group">
              <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
                instagram
              </GlitchText>
            </a>
            <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" className="group">
              <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
                spotify
              </GlitchText>
            </a>
            <a href="https://soundcloud.com/anetrexic" target="_blank" rel="noopener noreferrer" className="group">
              <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
                soundcloud
              </GlitchText>
            </a>
            <a href="https://x.com/anetrexic" target="_blank" rel="noopener noreferrer" className="group">
              <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
                x
              </GlitchText>
            </a>
            <a href="https://www.youtube.com/@anetrexic" target="_blank" rel="noopener noreferrer" className="group">
              <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
                youtube
              </GlitchText>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
