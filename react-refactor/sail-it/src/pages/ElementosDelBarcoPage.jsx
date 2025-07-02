import Header from '../components/Header';
import Footer from '../components/Footer';
import BarcoQuiz from '../components/elementos-barco/BarcoQuiz';

const ElementosDelBarcoPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-800 mb-6 text-center">Elementos del Barco</h1>
        <BarcoQuiz />
      </main>
      <Footer />
    </>
  );
};

export default ElementosDelBarcoPage; 