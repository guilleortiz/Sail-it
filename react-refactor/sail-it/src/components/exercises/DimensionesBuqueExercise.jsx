import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import React from 'react';

// Detectar si es dispositivo táctil de manera más robusta
const isTouchDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

// Elegir el backend apropiado
const getBackend = () => {
  const isTouch = isTouchDevice();
  const backend = isTouch ? TouchBackend : HTML5Backend;
  return backend;
};

// Configurar opciones según el backend
const getBackendOptions = () => {
  if (isTouchDevice()) {
    return {
      enableMouseEvents: true,
      delayTouchStart: 0,
      delay: 0,
      tolerance: 5,
      enableKeyboardEvents: false,
      enableHoverOutsideTarget: true
    };
  }
  // Para HTML5Backend, no necesitamos opciones especiales
  return {};
};

const PARTES = [
  { id: 'puntal', label: 'Puntal', hotspot: { top: '6%', left: '0%' } },
  { id: 'calado', label: 'Calado', hotspot: { top: '12%', left: '6%' } },
  { id: 'eslora-flotacion', label: 'Eslora en flotación', hotspot: { top: '20%', left: '50%' } },
  { id: 'eslora-maxima', label: 'Eslora máxima', hotspot: { top: '25%', left: '40%' } },
  { id: 'manga-maxima', label: 'Manga máxima', hotspot: { top: '35%', left: '5%' } },
  { id: 'manga-flotacion', label: 'Manga de flotación', hotspot: { top: '35%', left: '51%' } },
];

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

const DraggableLabel = ({ label, id, isDragging, currentId }) => {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  
  const [{ isDragging: dragging }, drag] = useDrag(() => ({
    type: 'parte',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: currentId === id,
  }), [id, currentId]);

  // Manejar el movimiento del drag
  React.useEffect(() => {
    if (dragging) {
      const handleMouseMove = (e) => {
        setDragPosition({ x: e.clientX, y: e.clientY });
      };
      
      const handleTouchMove = (e) => {
        if (e.touches[0]) {
          setDragPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    } else {
      // Reset position when not dragging
      setDragPosition({ x: 0, y: 0 });
    }
  }, [dragging]);

  return (
    <>
      <div
        ref={drag}
        className={`cursor-move px-4 py-2 rounded-lg shadow-lg bg-sky-600 text-white text-base sm:text-lg font-bold mb-4 mx-auto select-none transition-opacity ${dragging ? 'opacity-40' : ''}`}
        style={{ 
          width: 'fit-content', 
          opacity: isDragging ? 0.4 : 1,
          touchAction: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
          userSelect: 'none'
        }}
      >
        {label}
      </div>
      {dragging && (
        <div
          className="fixed pointer-events-none z-50 px-4 py-2 rounded-lg shadow-lg bg-sky-600 text-white text-base sm:text-lg font-bold"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: 'translate(-50%, -50%)',
            opacity: 0.8
          }}
        >
          {label}
        </div>
      )}
    </>
  );
};

const Hotspot = ({ id, position, onDrop, isAnswered, isCurrent }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'parte',
    drop: (item) => onDrop(item.id, id),
    canDrop: (item) => item.id === id && isCurrent,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [id, isCurrent]);

  return (
    <div
      ref={drop}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)',
        width: 'clamp(32px, 7vw, 44px)',
        height: 'clamp(32px, 7vw, 44px)',
        borderRadius: '50%',
        border: isAnswered ? '3px solid #22c55e' : isOver && canDrop ? '3px solid #0ea5e9' : '3px dashed #0ea5e9',
        background: isAnswered ? 'rgba(34,197,94,0.15)' : isOver && canDrop ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.7)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border 0.2s, background 0.2s',
        boxShadow: isAnswered ? '0 0 8px #22c55e55' : '',
        pointerEvents: isAnswered ? 'none' : 'auto',
        touchAction: 'pan-y',
      }}
      aria-label={id}
    >
      {isAnswered && (
        <span role="img" aria-label="correcto" style={{ fontSize: 'clamp(20px, 4vw, 28px)', color: '#22c55e' }}>✔️</span>
      )}
    </div>
  );
};

const DimensionesBuqueExercise = () => {
  const [order] = useState(() => shuffle(PARTES));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answered, setAnswered] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentParte = order[currentIdx];

  const handleDrop = (dragId, dropId) => {
    if (dragId === dropId && !answered[dropId]) {
      setAnswered(ans => ({ ...ans, [dropId]: true }));
      if (currentIdx + 1 < order.length) {
        setCurrentIdx(idx => idx + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleRestart = () => {
    setAnswered({});
    setCurrentIdx(0);
    setShowResults(false);
  };

  return (
    <DndProvider backend={getBackend()} options={getBackendOptions()}>
      <div className="flex flex-col items-center px-2 sm:px-4 py-4 sm:py-8">
        <div className="w-full max-w-md sm:max-w-2xl mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-2xl font-semibold text-slate-800 mb-2 sm:mb-4 text-center">Dimensiones del Buque</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 text-center">
              Arrastra el nombre de la dimensión del buque al círculo correspondiente en la imagen.
            </p>
            {showResults ? (
              <div className="flex flex-col items-center py-8 sm:py-12">
                <h4 className="text-xl sm:text-2xl font-bold text-green-700 mb-4">¡Ejercicio completado!</h4>
                <button
                  onClick={handleRestart}
                  className="mt-6 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-base"
                >
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              <>
                <DraggableLabel
                  key={currentParte.id}
                  id={currentParte.id}
                  label={currentParte.label}
                  isDragging={false}
                  currentId={currentParte.id}
                />
                <div className="relative mx-auto w-full" style={{ aspectRatio: '480/680', maxWidth: 480 }}>
                  <img
                    src="/assets/dimensiones.png"
                    alt="Dimensiones del buque"
                    className="w-full h-auto rounded-lg shadow select-none"
                    draggable={false}
                    style={{ 
                      userSelect: 'none', 
                      touchAction: 'pan-y',
                      WebkitUserSelect: 'none',
                      WebkitTouchCallout: 'none'
                    }}
                  />
                  {PARTES.map(parte => (
                    <Hotspot
                      key={parte.id}
                      id={parte.id}
                      position={parte.hotspot}
                      onDrop={handleDrop}
                      isAnswered={!!answered[parte.id]}
                      isCurrent={parte.id === currentParte.id}
                    />
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 text-slate-700 text-center text-sm sm:text-base">
                  {currentIdx + 1} de {order.length} dimensiones
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DimensionesBuqueExercise;
