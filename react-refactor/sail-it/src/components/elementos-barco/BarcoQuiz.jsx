import { useState, useRef } from 'react';
import ProgressBar from './ProgressBar';
import './elementosBarco.css';

const quizData = [
  {
    question: '¿Cuál es la parte delantera del barco?',
    options: ['Proa', 'Popa', 'Babor', 'Estribor'],
    answer: 'Proa',
  },
  {
    question: '¿Cómo se llama la parte trasera del barco?',
    options: ['Proa', 'Popa', 'Babor', 'Estribor'],
    answer: 'Popa',
  },
  {
    question: '¿Qué lado es babor?',
    options: ['Derecha', 'Izquierda', 'Arriba', 'Abajo'],
    answer: 'Izquierda',
  },
  {
    question: '¿Qué lado es estribor?',
    options: ['Izquierda', 'Derecha', 'Proa', 'Popa'],
    answer: 'Derecha',
  },
  {
    question: '¿Cómo se llama la pieza que dirige el barco?',
    options: ['Timón', 'Vela', 'Mástil', 'Ancla'],
    answer: 'Timón',
  },
  {
    question: '¿Qué elemento se usa para detener el barco en el agua?',
    options: ['Ancla', 'Vela', 'Proa', 'Popa'],
    answer: 'Ancla',
  },
];

const TOTAL_PROGRESS = 6; // 100% cuando progreso llega a 6 (puedes ajustar este valor)

const BarcoQuiz = () => {
  const [progress, setProgress] = useState(0); // progreso real y visual
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showWind, setShowWind] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timeoutRef = useRef();
  const [current, setCurrent] = useState(() => Math.floor(Math.random() * quizData.length));

  const handleOption = (option) => {
    if (selected !== null || finished) return;
    setSelected(option);
    const correct = option === quizData[current].answer;
    setIsCorrect(correct);
    setFeedback(correct ? 'correct' : 'incorrect');
    setShowWind(true);
    setTimeout(() => {
      setShowWind(false);
      setFeedback(null);
      setSelected(null);
      if (correct) {
        setScore(s => s + 1);
        setProgress(p => {
          const next = Math.min(p + 1, TOTAL_PROGRESS);
          if (next >= TOTAL_PROGRESS) setFinished(true);
          return next;
        });
      } else {
        setProgress(p => {
          const next = Math.max(p - 1, 0);
          return next;
        });
      }
      // Selecciona una nueva pregunta aleatoria
      setCurrent(Math.floor(Math.random() * quizData.length));
    }, 1200);
  };

  const handleRestart = () => {
    setProgress(0);
    setSelected(null);
    setFeedback(null);
    setShowWind(false);
    setScore(0);
    setFinished(false);
    setCurrent(Math.floor(Math.random() * quizData.length));
    clearTimeout(timeoutRef.current);
  };

  const q = quizData[current];
  const progressValue = progress;

  return (
    <div className="relative">
      <ProgressBar progress={progressValue} total={TOTAL_PROGRESS} />
      {!finished ? (
        <div className="question my-6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold text-sky-800 mb-4 text-center">{q.question}</h2>
          <div className="options grid grid-cols-2 gap-3 mt-2">
            {q.options.map((opt, i) => (
              <button
                key={opt}
                className={`option text-base font-medium border transition-all duration-200 text-slate-800 bg-white ${
                  selected === null
                    ? 'hover:bg-sky-50 hover:border-sky-400'
                    : opt === q.answer && feedback === 'correct' && selected === opt
                    ? 'correct'
                    : selected === opt && feedback === 'incorrect'
                    ? 'incorrect'
                    : ''
                }`}
                onClick={() => handleOption(opt)}
                disabled={selected !== null}
              >
                {opt}
              </button>
            ))}
          </div>
          {feedback && (
            <div
              className={`feedback mt-4 text-center rounded-lg font-semibold text-base sm:text-lg ${
                feedback === 'correct'
                  ? 'feedback correct'
                  : 'feedback incorrect'
              }`}
            >
              {feedback === 'correct' ? '¡Correcto!' : 'Incorrecto. Intenta la siguiente.'}
            </div>
          )}
        </div>
      ) : (
        <div className="question my-6 p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-sky-800 mb-4">¡Quiz completado!</h2>
          <p className="text-lg mb-4">Puntaje: {score}</p>
          <button
            className="mt-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-base font-semibold"
            onClick={handleRestart}
          >
            Volver a empezar
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcoQuiz; 