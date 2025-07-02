import { Link } from 'react-router-dom';
import TopicCard from './TopicCard';
import { 
  RumbosIcon, 
  SailboatIcon, 
  RudderIcon, 
  ShipIcon, 
  KnotIcon 
} from './IconComponents';

const TopicGrid = () => {
  // Función para generar slug del título
  const generateTopicSlug = (title) => {
    if (!title) return '';
    return title
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const topicsData = [
    { 
      id: '1', 
      icon: RumbosIcon, 
      title: 'Rumbos', 
      description: 'Nombre de los rumbos según el viento.',
      href: '/exercise?topic=rumbos'
    },
    { 
      id: '2', 
      icon: SailboatIcon, 
      title: 'Elementos del Barco', 
      description: 'Conoce los diferentes elementos que componen un barco y sus funciones.',
      href: '/elementos-del-barco',
      isNew: true
    },
    { 
      id: '3', 
      icon: RudderIcon, 
      title: 'Maniobras', 
      description: 'Las diferentes maniobras de navegación.',
      href: '/exercise?topic=maniobras'
    },
    { 
      id: '4', 
      icon: ShipIcon, 
      title: 'Características del Buque', 
      description: 'Aprende las características esenciales que debe tener un buque.',
      href: '/exercise?topic=caracteristicas-del-buque'
    },
    { 
      id: '5', 
      icon: KnotIcon, 
      title: 'Nudos', 
      description: 'Conocer los nudos de los cabos.',
      href: '/exercise?topic=nudos'
    }
  ];

  return (
    <section id="temas" className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="temas-heading">
      <h2 id="temas-heading" className="sr-only">Temas de Navegación</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {topicsData.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
};

export default TopicGrid; 