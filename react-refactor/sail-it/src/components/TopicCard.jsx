import { Link } from 'react-router-dom';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';

const TopicCard = ({ topic }) => {
  const { id, icon: IconComponent, title, description, href, isNew = false } = topic;

  // Normaliza el nombre del ejercicio para el evento
  const eventName = href
    .replace('/exercise?topic=', '')
    .replace('/elementos-del-barco', 'elementos_del_barco')
    .replace(/\W+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();

  const handleClick = () => {
    if (analytics && eventName) {
      logEvent(analytics, eventName);
      console.log(`[Analytics] Evento registrado: ${eventName}`);
    } else {
      console.log('[Analytics] No se pudo registrar el evento:', eventName);
    }
  };

  return (
    <Link 
      to={href}
      aria-label={`Ver ejercicio sobre ${title}`}
      className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 relative group"
      onClick={handleClick}
    >
      {isNew && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-md z-10">
          NUEVO
        </div>
      )}
      
      <article className="flex flex-col items-center text-center">
        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
          <IconComponent />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-sky-700 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {description}
        </p>
      </article>
    </Link>
  );
};

export default TopicCard; 