import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Handling Arrangements for the Loss of a Loved One
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All Resources on One Website
          </p>
          <Link
            to="/auth"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-purple-800">Key Resources</h2>
            <div className="grid gap-4">
              {['Financial Assistance', 'Funeral Arrangements', 'Notifications', 'Emotional Support'].map((topic) => (
                <div key={topic} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="font-medium text-purple-700">{topic}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-purple-800">To-Do List Overview</h2>
            <div className="grid gap-4">
              {[
                'Funeral Arrangements',
                'Financial Help',
                'Emotional Support',
                'Death Certificate Process',
                'Who to Notify'
              ].map((item) => (
                <div key={item} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="font-medium text-purple-700">{item}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Link
        to="/auth"
        className="fixed bottom-8 right-8 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
      >
        Go to My Checklist
      </Link>
    </div>
  )
} 