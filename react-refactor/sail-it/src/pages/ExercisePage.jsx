import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CaracteristicasBuqueExercise from '../components/exercises/CaracteristicasBuqueExercise';
import RumbosExercise from '../components/exercises/RumbosExercise';
import ManiobrasExercise from '../components/exercises/ManiobrasExercise';
import NudosExercise from '../components/exercises/NudosExercise';
import TiposMotorExercise from '../components/exercises/TiposMotorExercise';
import PartesMotorExercise from '../components/exercises/PartesMotorExercise';
import PartesHeliceExercise from '../components/exercises/PartesHeliceExercise';
import PartesAnclaExercise from '../components/exercises/PartesAnclaExercise';
import DimensionesBuqueExercise from '../components/exercises/DimensionesBuqueExercise';
import JarciaFirmeExercise from '../components/exercises/JarciaFirmeExercise';

const ExercisePage = () => {
  const [searchParams] = useSearchParams();
  const [topicSlug, setTopicSlug] = useState('');
  const [exerciseTitle, setExerciseTitle] = useState('Ejercicio');
  const [exerciseDescription, setExerciseDescription] = useState('Cargando ejercicio...');

  useEffect(() => {
    const topic = searchParams.get('topic');
    setTopicSlug(topic || '');

    if (topic) {
      const formattedTopic = formatTopicName(topic);
    }
  }, [searchParams]);

  const formatTopicName = (slug) => {
    if (!slug) return "Desconocido";
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderExercise = () => {
    switch (topicSlug) {
      case 'caracteristicas-del-buque':
        return <CaracteristicasBuqueExercise />;
      case 'rumbos':
        return <RumbosExercise />;
      case 'maniobras':
        return <ManiobrasExercise />;
      case 'nudos':
        return <NudosExercise />;
      case 'tipos-de-motor':
        return <TiposMotorExercise />;
      case 'partes-del-motor':
        return <PartesMotorExercise />;
      case 'partes-de-la-helice':
        return <PartesHeliceExercise />;
      case 'partes-del-ancla':
        return <PartesAnclaExercise />;
      case 'dimensiones-del-buque':
        return <DimensionesBuqueExercise />;
      case 'jarcia-firme':
        return <JarciaFirmeExercise />;
      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-4 sm:mb-6">
              Tema de ejercicio no especificado
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              No se pudo cargar el ejercicio. Por favor, vuelve al manual y selecciona un tema.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div id="exercise-content" className="bg-white rounded-lg shadow-lg">
          <h2 id="exercise-topic-heading" className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-800 mb-6 sm:mb-8 px-6 pt-6">
            {exerciseTitle}
          </h2>
         
          {renderExercise()}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExercisePage; 