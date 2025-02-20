import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-400 to-amber-300 flex flex-col items-center justify-center">
      <Header />
      <main className="flex flex-col items-center">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-white">Our Features</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-white">Feature 1: Description of feature 1</li>
            <li className="text-white">Feature 2: Description of feature 2</li>
            <li className="text-white">Feature 3: Description of feature 3</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-white">Our Services</h2>
          <ul className="mt-4 space-y-2">
            <li className="text-white">Service 1: Description of service 1</li>
            <li className="text-white">Service 2: Description of service 2</li>
            <li className="text-white">Service 3: Description of service 3</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App