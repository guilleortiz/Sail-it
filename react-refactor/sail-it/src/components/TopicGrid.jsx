import { Link } from 'react-router-dom';
import TopicCard from './TopicCard';
import { 
  RumbosIcon, 
  SailboatIcon, 
  RudderIcon, 
  ShipIcon, 
  KnotIcon,
  MotorIcon,
  BoatEngineIcon,
  PropellerIcon,
  AnchorIcon,
  DimensionsIcon
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
    // Card de partes del motor
    {
      id: 'motor-partes',
      icon: BoatEngineIcon,
      title: 'Partes del motor',
      description: 'Arrastra el nombre de la parte del motor a la posición correcta en la imagen.',
      href: '/exercise?topic=partes-del-motor',
      isNew: true
    },
    // Card de partes de la hélice
    {
      id: 'propeller-partes',
      icon: PropellerIcon,
      title: 'Partes de la hélice',
      description: 'Arrastra el nombre de la parte de la hélice a la posición correcta en la imagen.',
      href: '/exercise?topic=partes-de-la-helice',
      isNew: true
    },
    // Nueva card en cuarta posición
    {
      id: 'anchor-partes',
      icon: AnchorIcon,
      title: 'Partes del ancla',
      description: 'Arrastra el nombre de la parte del ancla a la posición correcta en la imagen.',
      href: '/exercise?topic=partes-del-ancla',
      isNew: true
    },
    // Card de dimensiones del buque
    {
      id: 'dimensiones-buque',
      icon: DimensionsIcon,
      title: 'Dimensiones del Buque',
      description: 'Arrastra el nombre de la dimensión del buque a la posición correcta en la imagen.',
      href: '/exercise?topic=dimensiones-del-buque',
      isNew: true
    },
    { 
      id: '6', 
      icon: MotorIcon, 
      title: 'Tipos de Motor', 
      description: 'Clasifica las características de motores a 2 tiempos y motores a 4 tiempos.',
      href: '/exercise?topic=tipos-de-motor',
      isNew: true
    },
    { 
      id: '2', 
      icon: SailboatIcon, 
      title: 'Elementos del Barco', 
      description: 'Conoce los diferentes elementos que componen un barco y sus funciones.',
      href: '/elementos-del-barco'
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