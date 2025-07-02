import { useState, useEffect } from 'react';

const CaracteristicasBuqueExercise = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    initializeExercise();
  }, []);

  const initializeExercise = () => {
    const allCaracteristicas = [
      {
        id: 'flotabilidad',
        name: 'Flotabilidad',
        description: 'Capacidad de un cuerpo para mantenerse a flote en el agua.',
        isCorrect: true
      },
      {
        id: 'estanqueidad',
        name: 'Ser estanco',
        description: 'Capacidad de mantener el agua fuera del buque, evitando filtraciones.',
        isCorrect: true
      },
      {
        id: 'habitabilidad',
        name: 'Ser Habitable',
        description: 'Condiciones adecuadas para que las personas puedan vivir y trabajar a bordo.',
        isCorrect: true
      },
      {
        id: 'navegabilidad',
        name: 'Navegabilidad',
        description: 'Capacidad de moverse por el agua de manera controlada y segura.',
        isCorrect: true
      },
      {
        id: 'estabilidad',
        name: 'Poseer estabilidad',
        description: 'Capacidad de mantener el equilibrio y recuperarse de la inclinación.',
        isCorrect: true
      },
      {
        id: 'velocidad',
        name: 'Velocidad mínima de 2 nudos',
        isCorrect: false
      },
      {
        id: 'motor',
        name: 'Poseer un motor fuera borda',
        isCorrect: false
      },
      {
        id: 'tripulantes',
        name: 'Capacidad minima de 3 tripulantes',
        isCorrect: false
      },
      {
        id: 'ancla',
        name: 'Poseer ancla',
        isCorrect: false
      },
      {
        id: 'quilla',
        name: 'Tener quilla',
        isCorrect: false
      },
      {
        id: 'camarote',
        name: 'Poseer camarote',
        isCorrect: false
      }
    ];

    // Seleccionar 5 opciones aleatorias, asegurando al menos 2 correctas
    const correctOptions = allCaracteristicas.filter(c => c.isCorrect);
    const incorrectOptions = allCaracteristicas.filter(c => !c.isCorrect);
    
    const selectedCorrect = correctOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    const selectedIncorrect = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const shuffledCaracteristicas = [...selectedCorrect, ...selectedIncorrect].sort(() => 0.5 - Math.random());
    setCaracteristicas(shuffledCaracteristicas);
    setSelectedOptions(new Set());
    setShowResults(false);
    setResultMessage('');
  };

  const handleCaracteristicaSelection = (id) => {
    if (showResults) return; // No permitir cambios después de mostrar resultados

    const newSelectedOptions = new Set(selectedOptions);
    if (newSelectedOptions.has(id)) {
      newSelectedOptions.delete(id);
    } else {
      newSelectedOptions.add(id);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const checkAnswers = () => {
    const correctAnswers = caracteristicas.filter(c => c.isCorrect).map(c => c.id);
    const incorrectAnswers = caracteristicas.filter(c => !c.isCorrect).map(c => c.id);
    
    let score = 0;
    let allCorrect = true;
    let missingCorrect = [];

    // Verificar respuestas correctas seleccionadas
    correctAnswers.forEach(id => {
      if (selectedOptions.has(id)) {
        score++;
      } else {
        allCorrect = false;
        const missingOption = caracteristicas.find(c => c.id === id);
        missingCorrect.push({
          name: missingOption.name,
          description: missingOption.description
        });
      }
    });

    // Verificar respuestas incorrectas seleccionadas
    incorrectAnswers.forEach(id => {
      if (selectedOptions.has(id)) {
        allCorrect = false;
      }
    });

    // Generar mensaje de resultado
    let messageText = '';
    if (allCorrect) {
      messageText = '¡Enhorabuena! Has identificado correctamente todas las características esenciales.';
    } else {
      messageText = 'Hay selecciones incorrectas. Las opciones en rojo no son características esenciales.';
      if (missingCorrect.length > 0) {
        messageText += '\n\nTe faltó seleccionar:';
        missingCorrect.forEach(option => {
          messageText += `\n• ${option.name}: ${option.description}`;
        });
      }
    }

    setResultMessage(messageText);
    setIsCorrect(allCorrect);
    setShowResults(true);
  };

  const getOptionStyle = (caracteristica) => {
    if (!showResults) {
      return selectedOptions.has(caracteristica.id) 
        ? 'bg-sky-50 border-sky-200 selected' 
        : 'hover:bg-slate-50';
    }

    if (caracteristica.isCorrect && selectedOptions.has(caracteristica.id)) {
      return 'bg-green-50 border-green-200';
    } else if (!caracteristica.isCorrect) {
      return 'bg-red-50 border-red-200';
    } else if (caracteristica.isCorrect && !selectedOptions.has(caracteristica.id)) {
      return 'bg-yellow-50 border-yellow-200';
    }
    return '';
  };

  const getCheckboxStyle = (caracteristica) => {
    if (!showResults) {
      return selectedOptions.has(caracteristica.id) 
        ? 'bg-sky-600 border-sky-600' 
        : 'border-slate-300';
    }

    if (caracteristica.isCorrect && selectedOptions.has(caracteristica.id)) {
      return 'bg-green-600 border-green-600';
    } else if (!caracteristica.isCorrect) {
      return 'bg-red-600 border-red-600';
    } else if (caracteristica.isCorrect && !selectedOptions.has(caracteristica.id)) {
      return 'bg-yellow-600 border-yellow-600';
    }
    return 'border-slate-300';
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-3xl mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Características del Buque</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-6">
            Selecciona las características que consideres esenciales para que un buque sea considerado como tal.
          </p>
          
          <div className="space-y-3">
            {caracteristicas.map((caracteristica) => (
              <div 
                key={caracteristica.id}
                className={`flex items-center p-3 border rounded-lg transition-colors cursor-pointer caracteristica-option ${getOptionStyle(caracteristica)}`}
                onClick={() => handleCaracteristicaSelection(caracteristica.id)}
                style={{ pointerEvents: showResults ? 'none' : 'auto' }}
              >
                <div className={`w-4 h-4 border-2 rounded mr-3 flex-shrink-0 caracteristica-checkbox ${getCheckboxStyle(caracteristica)}`}></div>
                <span className="text-sm sm:text-base font-medium text-slate-900">{caracteristica.name}</span>
              </div>
            ))}
          </div>

          {showResults && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              <p className="text-lg font-medium whitespace-pre-line">{resultMessage}</p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            {!showResults ? (
              <button 
                onClick={checkAnswers}
                className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm sm:text-base"
              >
                Comprobar Respuestas
              </button>
            ) : (
              <button 
                onClick={initializeExercise}
                className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm sm:text-base"
              >
                Volver a empezar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaracteristicasBuqueExercise; 