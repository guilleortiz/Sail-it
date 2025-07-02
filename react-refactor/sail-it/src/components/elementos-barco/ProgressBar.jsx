import BoatIcon from './BoatIcon';

const ProgressBar = ({ progress = 0, total = 1, windActive = false, windCorrect = true }) => {
  // Ajuste: el barco debe tapar la boya al llegar al final
  // El ancho de la boya y el barco deben considerarse para el cálculo
  const boatWidth = 64; // px (w-16)
  const buoyWidth = 64; // px (w-16)
  const barWidth = 3 / 4 * window.innerWidth; // w-3/4
  // El offset es el porcentaje del ancho de la barra que representa la mitad de la boya
  const offsetPercent = (buoyWidth / 2) / barWidth * 100;
  // El barco nunca debe llegar a 100%, sino a (100 - offsetPercent)% para que su centro coincida con el centro de la boya
  const percent = total > 1 ? (progress / (total - 1)) * (100 - offsetPercent) : 0;
  return (
    <div className="progress-container relative w-3/4 mx-auto h-6 my-6 bg-transparent rounded-lg">
      {/* Boya al final de la barra, detrás del barco */}
      <div className="absolute top-[-1.5rem] right-0 z-10 flex items-center justify-end buoy" style={{ pointerEvents: 'none' }}>
        <img src="/assets/buoy.png" alt="Boya" className="w-16 h-16" draggable={false} />
      </div>
      {/* Barco por encima de la boya */}
      <div
        className="boat absolute top-[-1.5rem] z-20 transition-all duration-1000"
        style={{ left: `calc(${percent}% )`, transform: 'translateX(-50%)' }}
      >
        <BoatIcon />
      </div>
      {/* <div className="absolute left-0 top-0 w-full h-full border border-sky-200 rounded-lg z-0" /> */}
    </div>
  );
};

export default ProgressBar; 