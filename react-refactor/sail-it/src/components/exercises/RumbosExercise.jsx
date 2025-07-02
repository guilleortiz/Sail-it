import { useState, useEffect } from 'react';

const RumbosExercise = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionOrder, setQuestionOrder] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedCircle, setSelectedCircle] = useState(null);

  const rumbos = [
    { name: 'Por la popa', angle: 90, pos: 0 },
    { name: 'Por la aleta', angle: 135, pos: 1 },
    { name: 'A un largo', angle: 157.5, pos: 2 },
    { name: 'Por el través', angle: 180, pos: 3 },
    { name: 'A un descuartelar', angle: 202.5, pos: 4 },
    { name: 'Por la amura', angle: 225, pos: 5 },
    { name: 'Por la proa', angle: 270, pos: 6 }
  ];

  useEffect(() => {
    initializeExercise();
  }, []);

  const initializeExercise = () => {
    const shuffledOrder = [...Array(rumbos.length).keys()].sort(() => Math.random() - 0.5);
    setQuestionOrder(shuffledOrder);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setShowResults(false);
    setFeedback('');
    setSelectedCircle(null);
  };

  const handleRumboSelection = (selectedPos) => {
    if (selectedCircle !== null) return; // Evitar múltiples selecciones

    const currentRumboIndex = questionOrder[currentQuestionIndex];
    const correctPos = rumbos[currentRumboIndex].pos;

    setSelectedCircle(selectedPos);

    if (selectedPos === correctPos) {
      setFeedback('¡Correcto!');
      setCorrectAnswers(prev => prev + 1);
      
      setTimeout(() => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex >= questionOrder.length) {
          setShowResults(true);
        } else {
          setCurrentQuestionIndex(nextIndex);
          setFeedback('');
          setSelectedCircle(null);
        }
      }, 1500);
    } else {
      setFeedback('Incorrecto. Intenta de nuevo.');
      
      setTimeout(() => {
        setFeedback('');
        setSelectedCircle(null);
      }, 2000);
    }
  };

  const getCurrentRumbo = () => {
    if (currentQuestionIndex >= questionOrder.length) return null;
    const currentRumboIndex = questionOrder[currentQuestionIndex];
    return rumbos[currentRumboIndex];
  };

  const getCircleStyle = (pos) => {
    if (selectedCircle === null) {
      return { fill: 'white', stroke: '#0369a1' };
    }

    const currentRumboIndex = questionOrder[currentQuestionIndex];
    const correctPos = rumbos[currentRumboIndex].pos;

    if (pos === selectedCircle) {
      if (selectedCircle === correctPos) {
        return { fill: '#22c55e', stroke: '#16a34a' }; // Verde para correcto
      } else {
        return { fill: '#ef4444', stroke: '#dc2626' }; // Rojo para incorrecto
      }
    }

    return { fill: 'white', stroke: '#0369a1' };
  };

  const renderRumboZone = (rumbo, index) => {
    const angle = rumbo.angle;
    const rad = (angle - 90) * Math.PI / 180;
    const cx = 260;
    const cy = 260;
    const x1 = cx + Math.cos(rad) * 90;
    const y1 = cy + Math.sin(rad) * 90;
    const x2 = cx + Math.cos(rad) * 210;
    const y2 = cy + Math.sin(rad) * 210;

    const circleStyle = getCircleStyle(index);

    return (
      <g key={index}>
        <line 
          x1={x2} 
          y1={y2} 
          x2={x1} 
          y2={y1} 
          stroke="#0ea5e9" 
          strokeWidth="2.5" 
          markerEnd={`url(#arrowhead${index})`}
        />
        <circle 
          className="rumbo-option cursor-pointer hover:fill-sky-100 transition-colors" 
          data-pos={index} 
          cx={x2} 
          cy={y2} 
          r="25" 
          fill={circleStyle.fill}
          stroke={circleStyle.stroke}
          strokeWidth="2"
          onClick={() => handleRumboSelection(index)}
          style={{ pointerEvents: selectedCircle !== null ? 'none' : 'auto' }}
        />
      </g>
    );
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center py-8 sm:py-16 px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4">¡Ejercicio completado!</h2>
        <p className="text-base sm:text-lg text-slate-700">
          Respondiste correctamente {correctAnswers} de {rumbos.length} rumbos.
        </p>
        <button 
          onClick={initializeExercise}
          className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm sm:text-base"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  const currentRumbo = getCurrentRumbo();
  if (!currentRumbo) return null;

  return (
    <div className="flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-md mb-0">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3 text-center px-4">
            {currentRumbo.name}
          </h3>
          <div className={`mb-2 text-center text-base sm:text-lg font-medium px-4 min-h-[1.5em] ${
            feedback
              ? feedback.includes('Correcto')
                ? 'text-green-600'
                : 'text-red-600'
              : 'text-transparent'
          }`}>
            {feedback || '\u00A0'}
          </div>
          <p className="text-sm sm:text-base text-slate-600 text-center mb-4 px-4">
            Selecciona la posición correcta en el diagrama
          </p>
          <div className="mt-4 text-center text-xs sm:text-sm text-slate-500 px-4">
            Pregunta {currentQuestionIndex + 1} de {rumbos.length}
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-[320px] sm:max-w-[520px] mx-auto h-[500px] sm:h-[560px]" id="rosa-rumbos">
        <svg viewBox="0 200 520 520" width="100%" height="100%" style={{ maxWidth: '100%', touchAction: 'none', display: 'block' }}>
          <g id="rumbos-zones">
            {rumbos.map((rumbo, index) => renderRumboZone(rumbo, index))}
          </g>
          <g id="velero-container">
            <image href="/assets/rumbo.png" x="185" y="110" width="150" height="300" />
          </g>
          <defs>
            {[0,1,2,3,4,5,6].map(i => (
              <marker 
                key={i}
                id={`arrowhead${i}`} 
                markerWidth="6" 
                markerHeight="6" 
                refX="3" 
                refY="3" 
                orient="auto" 
                markerUnits="strokeWidth"
              >
                <polygon points="0,0 6,3 0,6" fill="#0ea5e9" />
              </marker>
            ))}
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default RumbosExercise; 