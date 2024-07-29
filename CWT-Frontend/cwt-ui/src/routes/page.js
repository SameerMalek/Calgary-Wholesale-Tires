import Header from '../components/header';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center bg-white p-4 shadow-md">
        <select className="border border-gray-300 p-2 mr-2 rounded">
          <option>Year</option>
          {/* Add more options as needed */}
        </select>
        <select className="border border-gray-300 p-2 mr-2 rounded">
          <option>Model</option>
          {/* Add more options as needed */}
        </select>
        <select className="border border-gray-300 p-2 mr-2 rounded">
          <option>Make</option>
          {/* Add more options as needed */}
        </select>
        <select className="border border-gray-300 p-2 mr-2 rounded">
          <option>Diameter</option>
          {/* Add more options as needed */}
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </div>
      <main className="container mx-auto py-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Must Haves for Every Car</h1>
          <p className="text-gray-600 mb-8">Custom wheels of any size and shapes</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Discover Now</button>
        </section>
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          {Array(8).fill("Alloy Wheels").map((category, index) => (
            <div key={index} className="bg-white p-4 rounded shadow text-center">
              <img src="/path/to/wheel-image.png" alt={category} className="mx-auto mb-2" />
              <p className="text-gray-700">{category}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400">Contact</a>
            <a href="#" className="hover:text-gray-400">Privacy</a>
            <a href="#" className="hover:text-gray-400">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
