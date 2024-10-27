"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';

const GlitchText = ({ 
  children, 
  intensity = 'medium',
  className = '',
  mono = false,
  neonColor = 'rose' // New prop for neon color
}: { 
  children: string;
   intensity?: 'low' | 'medium' | 'high' | 'extreme';
  className?: string;
  mono?: boolean;
  neonColor?: string; // Added neonColor to the type definition
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

const Scanlines = () => (
  <div className="pointer-events-none fixed inset-0 z-50 bg-scanlines opacity-10"></div>
);

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

const AnimatedGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid-scroll"></div>
  </div>
);

const ASCIICursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 12;
    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';

    for (let y = 0; y < canvas.height; y += fontSize) {
      for (let x = 0; x < canvas.width; x += fontSize) {
        const dx = x - mousePos.x;
        const dy = y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const charIndex = Math.floor(Math.random() * characters.length);
          ctx.fillText(characters[charIndex], x, y);
        }
      }
    }
  }, [mousePos]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-40" 
      style={{ mixBlendMode: 'overlay' }}
    />
  );
};

export default function MinimalCyberpunkLanding() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMTUiLz48L3N2Zz4=')] opacity-20" />
      
      {/* Snow Effect */}
      <SnowEffect />
      
      {/* Cursor Follower */}
      <CursorFollower />
      
      <ASCIICursor />
      
      <main className="relative z-30 mx-auto max-w-4xl px-4 py-16 flex-grow">
        <header className="mb-24 space-y-8 text-center">
          <GlitchText intensity="high" className="block text-5xl font-light tracking-wider">
            サイバーパンク
          </GlitchText>
          
          <GlitchText intensity="medium" className="block text-3xl font-light tracking-widest text-rose-500">
            anetrexic
          </GlitchText>

          <GlitchText intensity="low" className="block text-xl font-light tracking-wider text-gray-400">
            デジタルコア_アンダーグラウンド
          </GlitchText>
        </header>
      </main>

      {/* Social Links at the bottom */}
      <footer className="relative z-30 pb-8">
        <div className="flex justify-center space-x-12">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="group">
            <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
              sintagram
            </GlitchText>
          </a>
          <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer" className="group">
            <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
              sportify
            </GlitchText>
          </a>
          <a href="https://soundcloud.com/" target="_blank" rel="noopener noreferrer" className="group">
            <GlitchText intensity="low" className="text-gray-400 group-hover:text-violet-400 text-xl font-light tracking-widest transition-colors duration-300">
              soundcloud
            </GlitchText>
          </a>
        </div>
      </footer>
    </div>
  );
}
