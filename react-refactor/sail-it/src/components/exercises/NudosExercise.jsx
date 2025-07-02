const NudosExercise = () => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6">
      <div className="w-full max-w-3xl mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Ejercicio de Nudos</h3>
          <div className="text-center">
            <p className="text-lg text-slate-600 mb-6">
              Este ejercicio estará disponible próximamente. ¡Vuelve pronto!
            </p>
            <div className="flex justify-center mb-6">
              <img src="/assets/knot.gif" alt="Nudo animado" className="w-64 h-64 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NudosExercise; 