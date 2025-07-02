const Hero = () => {
  return (
    <div 
      id="inicio"
      className="relative bg-cover bg-center bg-no-repeat h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[calc(100vh-4rem)] flex items-center"
      style={{ backgroundImage: "url('/assets/sailboat.png')" }}
      role="banner"
    >
      <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            Ejercicios de<br />Navegación
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl">
            Aprende las técnicas esenciales de navegación a vela de forma interactiva
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero; 