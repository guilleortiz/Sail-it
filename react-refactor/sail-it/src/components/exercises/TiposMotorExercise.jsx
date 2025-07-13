import { useState, useEffect, useRef } from 'react';

const TiposMotorExercise = () => {
  const [definiciones, setDefiniciones] = useState([]);
  const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);
  const [motor2Tiempos, setMotor2Tiempos] = useState([]);
  const [motor4Tiempos, setMotor4Tiempos] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragTarget, setDragTarget] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchElement, setTouchElement] = useState(null);
  const draggedElementRef = useRef(null);

  useEffect(() => {
    initializeExercise();
  }, []);

  const initializeExercise = () => {
    const allDefiniciones = [
      { id: '1', text: 'Utiliza aceite mezclado con el combustible', tipo: '2tiempos' },
      { id: '2', text: 'Más contaminante', tipo: '2tiempos' },
      { id: '3', text: 'Menor peso y tamaño', tipo: '2tiempos' },
      { id: '4', text: 'Sistema de lubricación independiente', tipo: '4tiempos' },
      { id: '5', text: 'Mayor potencia en relación al peso', tipo: '2tiempos' },
      { id: '6', text: 'Tiene un ciclo con admisión, compresión, combustión y escape separados', tipo: '4tiempos' },
      { id: '7', text: 'Tiene un ciclo en dos movimientos del pistón: compresión y combustión/escape', tipo: '2tiempos' },
      { id: '8', text: 'Más común en automóviles y motores grandes', tipo: '4tiempos' }
    ];

    // Mezclar las definiciones
    const shuffledDefiniciones = allDefiniciones.sort(() => 0.5 - Math.random());
    setDefiniciones(shuffledDefiniciones);
    setCurrentDefinitionIndex(0);
    setMotor2Tiempos([]);
    setMotor4Tiempos([]);
    setShowResults(false);
    setResultMessage('');
    setDragTarget(null);
    setIsDragging(false);
  };

  // Mouse events
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    setIsDragging(true);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragOver = (e, targetType) => {
    e.preventDefault();
    setDragTarget(targetType);
  };

  const handleDragLeave = () => {
    setDragTarget(null);
  };

  const handleDrop = (e, targetType) => {
    e.preventDefault();
    if (!draggedItem) return;

    // Agregar a la columna correspondiente
    if (targetType === '2tiempos') {
      setMotor2Tiempos(prev => [...prev, draggedItem]);
    } else if (targetType === '4tiempos') {
      setMotor4Tiempos(prev => [...prev, draggedItem]);
    }

    // Avanzar a la siguiente definición
    setCurrentDefinitionIndex(prev => prev + 1);
    setDraggedItem(null);
    setDragTarget(null);
    setIsDragging(false);
  };

  // Touch events
  const handleTouchStart = (e, item) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchElement(item);
    setDraggedItem(item);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!touchStart || !isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    
    // Prevenir scroll si estamos arrastrando
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !isDragging) return;

    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element) {
      const dropZone = element.closest('[data-drop-zone]');
      if (dropZone) {
        const targetType = dropZone.getAttribute('data-drop-zone');
        handleDrop(e, targetType);
      }
    }
    
    setTouchStart(null);
    setTouchElement(null);
    setDraggedItem(null);
    setIsDragging(false);
  };

  const handleReturnToOriginal = (item, fromType) => {
    // Remover de la columna
    if (fromType === '2tiempos') {
      setMotor2Tiempos(prev => prev.filter(i => i.id !== item.id));
    } else if (fromType === '4tiempos') {
      setMotor4Tiempos(prev => prev.filter(i => i.id !== item.id));
    }

    // Retroceder el índice
    setCurrentDefinitionIndex(prev => Math.max(0, prev - 1));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    let totalItems = motor2Tiempos.length + motor4Tiempos.length;

    // Verificar motor 2 tiempos
    motor2Tiempos.forEach(item => {
      if (item.tipo === '2tiempos') correctCount++;
    });

    // Verificar motor 4 tiempos
    motor4Tiempos.forEach(item => {
      if (item.tipo === '4tiempos') correctCount++;
    });

    const allCorrect = correctCount === totalItems;
    setIsCorrect(allCorrect);
    
    if (allCorrect) {
      setResultMessage('¡Excelente! Has clasificado correctamente todas las características de los tipos de motor.');
    } else {
      setResultMessage(`Tienes ${correctCount} de ${totalItems} clasificaciones correctas. Revisa las características y vuelve a intentarlo.`);
    }
    
    setShowResults(true);
  };

  const getDropZoneStyle = (type) => {
    const baseStyle = 'border-2 border-dashed transition-all duration-200 rounded-xl p-4 sm:p-6 min-h-[100px] sm:min-h-[120px] flex items-center justify-center';
    
    if (!draggedItem) {
      return `${baseStyle} bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300`;
    }
    
    // Siempre mantener el mismo estilo sin importar si es correcto o incorrecto
    return `${baseStyle} bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300`;
  };

  const getItemStyle = (item, showCorrect = false) => {
    const baseStyle = 'p-3 sm:p-4 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md';
    
    if (!showResults) {
      return `${baseStyle} bg-white border border-slate-200 hover:border-sky-300`;
    }
    
    const isInCorrectColumn = 
      (item.tipo === '2tiempos' && motor2Tiempos.includes(item)) ||
      (item.tipo === '4tiempos' && motor4Tiempos.includes(item));
    
    return isInCorrectColumn 
      ? `${baseStyle} bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-sm` 
      : `${baseStyle} bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-sm`;
  };

  const currentDefinition = definiciones[currentDefinitionIndex];
  const isExerciseComplete = currentDefinitionIndex >= definiciones.length;

  return (
    <div className="flex flex-col items-center px-2 sm:px-4 lg:px-6">
      <div className="w-full max-w-5xl mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">Tipos de Motor</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
            Arrastra cada definición a la columna correcta según corresponda a motores a 2 tiempos o motores a 4 tiempos.
          </p>
          
          {/* Progress Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-2">
              <span>Progreso</span>
              <span>{currentDefinitionIndex} de {definiciones.length}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3">
              <div 
                className="bg-gradient-to-r from-sky-500 to-sky-600 h-2 sm:h-3 rounded-full transition-all duration-300"
                style={{ width: `${(currentDefinitionIndex / definiciones.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Definición actual */}
          {currentDefinition && (
            <div className="mb-6 sm:mb-8">
              <h4 className="text-base sm:text-lg font-semibold text-slate-700 mb-3 sm:mb-4 text-center">Definición actual:</h4>
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, currentDefinition)}
                onTouchStart={(e) => handleTouchStart(e, currentDefinition)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="p-4 sm:p-6 bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 rounded-lg sm:rounded-xl cursor-move hover:shadow-lg transition-all duration-200 text-center touch-manipulation"
                style={{ userSelect: 'none' }}
              >
                <p className="text-base sm:text-lg font-medium text-slate-800">{currentDefinition.text}</p>
              </div>
            </div>
          )}

          {/* Columnas de clasificación */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Motor a 2 Tiempos */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-sky-700 mb-3 sm:mb-4 text-center">Motor a 2 Tiempos</h4>
              <div
                data-drop-zone="2tiempos"
                className={getDropZoneStyle('2tiempos')}
                onDragOver={(e) => handleDragOver(e, '2tiempos')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, '2tiempos')}
              >
                {motor2Tiempos.length === 0 ? (
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Arrastra aquí las características de motores a 2 tiempos</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3 w-full">
                    {motor2Tiempos.map((item) => (
                      <div
                        key={item.id}
                        className={getItemStyle(item, true)}
                        onClick={() => !showResults && handleReturnToOriginal(item, '2tiempos')}
                      >
                        <p className="text-sm sm:text-base text-slate-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Motor a 4 Tiempos */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-sky-700 mb-3 sm:mb-4 text-center">Motor a 4 Tiempos</h4>
              <div
                data-drop-zone="4tiempos"
                className={getDropZoneStyle('4tiempos')}
                onDragOver={(e) => handleDragOver(e, '4tiempos')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, '4tiempos')}
              >
                {motor4Tiempos.length === 0 ? (
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">Arrastra aquí las características de motores a 4 tiempos</p>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3 w-full">
                    {motor4Tiempos.map((item) => (
                      <div
                        key={item.id}
                        className={getItemStyle(item, true)}
                        onClick={() => !showResults && handleReturnToOriginal(item, '4tiempos')}
                      >
                        <p className="text-sm sm:text-base text-slate-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center">
            <button
              onClick={checkAnswers}
              disabled={!isExerciseComplete}
              className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Verificar Respuestas
            </button>
            <button
              onClick={initializeExercise}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Reiniciar Ejercicio
            </button>
          </div>

          {/* Resultado */}
          {showResults && (
            <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg ${isCorrect ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200' : 'bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200'}`}>
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl mb-3 sm:mb-4 ${isCorrect ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isCorrect ? '🎉' : '📝'}
                </div>
                <p className={`font-semibold text-base sm:text-lg ${isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                  {resultMessage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TiposMotorExercise; 