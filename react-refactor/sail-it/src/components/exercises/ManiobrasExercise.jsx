import { useState, useEffect } from 'react';

const terms = [
  {
    term: 'Orzar o Ceñir',
    desc: 'Maniobra en la que la embarcación gira su proa acercándola a la dirección desde donde sopla el viento.'
  },
  {
    term: 'Derivar',
    desc: 'Ocurre cuando el barco orienta su proa alejándola del viento, separándose del eje del viento.'
  },
  {
    term: 'Portar',
    desc: 'Situación en la que las velas están bien expuestas al viento y trabajan eficientemente, navegando con viento favorable desde la popa o alrededores.'
  },
  {
    term: 'Amurado a estribor / Amurado a babor',
    desc: 'Condición en la que el viento llega por el lado derecho (estribor) o por el lado izquierdo (babor) de la embarcación.'
  },
  {
    term: 'Virar',
    desc: 'Maniobra que implica cambiar de rumbo cruzando el eje del viento, haciendo que el viento pase de una banda a la otra.'
  }
];

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const ManiobrasExercise = () => {
  const [remainingTerms, setRemainingTerms] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    initializeExercise();
  }, []);

  const initializeExercise = () => {
    const shuffled = shuffle([...terms]);
    setRemainingTerms(shuffled);
    setCorrectCount(0);
    setShowResults(false);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedbackMessage('');
    // Mostrar la primera pregunta directamente
    const first = shuffled[0];
    const options = shuffle([first.term, ...terms.filter(t => t.term !== first.term).map(t => t.term)]);
    setCurrentTerm({ ...first, options });
  };

  const nextCard = (updatedTerms) => {
    if (updatedTerms.length === 0) {
      setShowResults(true);
      return;
    }
    const idx = Math.floor(Math.random() * updatedTerms.length);
    const current = updatedTerms[idx];
    const options = shuffle([current.term, ...terms.filter(t => t.term !== current.term).map(t => t.term)]);
    setCurrentTerm({ ...current, options });
  };

  const handleOptionClick = (selectedTerm) => {
    if (showFeedback) return;
    setSelectedOption(selectedTerm);
    setShowFeedback(true);

    if (selectedTerm === currentTerm.term) {
      setFeedbackMessage('¡Correcto!');
      setCorrectCount(prev => prev + 1);
      setTimeout(() => {
        const updatedTerms = remainingTerms.filter(t => t.term !== currentTerm.term);
        setRemainingTerms(updatedTerms);
        setSelectedOption(null);
        setShowFeedback(false);
        setFeedbackMessage('');
        nextCard(updatedTerms);
      }, 900);
    } else {
      setFeedbackMessage('Incorrecto. Intenta de nuevo.');
      setTimeout(() => {
        setSelectedOption(null);
        setShowFeedback(false);
        setFeedbackMessage('');
      }, 900);
    }
  };

  const getOptionStyle = (option) => {
    if (!showFeedback) {
      return selectedOption === option ? 'selected' : '';
    }
    if (selectedOption === currentTerm.term && option === currentTerm.term) {
      return 'correct';
    } else if (selectedOption === option) {
      return 'incorrect';
    }
    return '';
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold text-green-700 mb-4">¡Ejercicio completado!</h2>
        <p className="text-lg text-slate-700">
          Respondiste correctamente {correctCount} de {terms.length}.
        </p>
        <button 
          onClick={initializeExercise}
          className="mt-6 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-base"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (!currentTerm) return null;

  return (
    <div className="flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-3xl mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Ejercicio de Maniobras</h3>
          <div className="maniobras-card">
            <h3 className="text-xl font-bold text-sky-800 mb-6 text-center">
              Tap para unir el término correcto con la descripción
            </h3>
            <div className="bg-sky-100 border-2 border-sky-500 rounded-xl p-4 mb-6 text-sky-800 font-semibold text-lg">
              {currentTerm.desc}
            </div>
            <div className="space-y-3">
              {currentTerm.options.map((option, index) => (
                <div 
                  key={index}
                  className={`maniobras-option ${getOptionStyle(option)}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="text-sky-800 font-semibold mt-4 text-center">
              {remainingTerms.length} de {terms.length} restantes
            </div>
            {showFeedback && (
              <div className={`mt-4 text-center text-base font-medium ${
                feedbackMessage.includes('Correcto') ? 'text-green-600' : 'text-red-600'
              }`}>
                {feedbackMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .maniobras-card {
          background: #e0f2fe;
          border-radius: 22px;
          border: 2.5px dashed #0ea5e9;
          padding: 2.5rem 1.5rem 1.5rem 1.5rem;
          max-width: 600px;
          margin: 2rem auto 0 auto;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
        }
        .maniobras-option {
          background: #fff;
          border-radius: 14px;
          padding: 1.2rem 1.7rem;
          font-size: 1.13rem;
          color: #0369a1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          border: 2.5px solid #0ea5e9;
          font-weight: 600;
          transition: border 0.2s, background 0.2s;
        }
        .maniobras-option:hover {
          border-color: #38bdf8;
          background: #e0f2fe;
        }
        .maniobras-option.selected {
          border-color: #38bdf8;
          background: #e0f2fe;
        }
        .maniobras-option.correct {
          border-color: #22c55e;
          background: #dcfce7;
        }
        .maniobras-option.incorrect {
          border-color: #ef4444;
          background: #fee2e2;
        }
      `}</style>
    </div>
  );
};

export default ManiobrasExercise; 