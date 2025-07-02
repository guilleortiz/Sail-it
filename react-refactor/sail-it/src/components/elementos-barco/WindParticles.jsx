import { useEffect, useRef } from 'react';

const WindParticles = ({ active = false, isCorrect = true, count = 25 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'wind-particle';
      particle.style.top = `${Math.random() * 90 + 5}%`;
      particle.style.opacity = `${0.4 + Math.random() * 0.4}`;
      particle.style.animationDelay = `${Math.random() * 4}s`;
      particle.style.left = '0';
      particle.style.animationName = isCorrect ? 'wind-right-bar' : 'wind-left-bar';
      container.appendChild(particle);
    }
  }, [active, isCorrect, count]);

  return (
    <div
      ref={containerRef}
      className={`wind-particles absolute top-0 left-0 w-full h-full pointer-events-none z-50 ${active ? 'active' : ''}`}
      aria-hidden="true"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.3s' }}
    />
  );
};

export default WindParticles; 