import { useState } from 'react'

interface Task {
  id: string
  title: string
  category: string
  isCompleted: boolean
}

export default function Dashboard() {
  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Contact funeral home', category: 'Funeral Arrangements', isCompleted: false },
    { id: '2', title: 'Obtain death certificate', category: 'Documentation', isCompleted: false },
    { id: '3', title: 'Notify immediate family', category: 'Notifications', isCompleted: false },
    { id: '4', title: 'Contact insurance company', category: 'Financial', isCompleted: false },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-purple-900">My Checklist</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tasks Column */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tasks</h2>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          aria-label={`Mark ${task.title} as complete`}
                          title={`Mark ${task.title} as complete`}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-sm text-gray-500">{task.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources Column */}
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Resources</h2>
                <div className="space-y-4">
                  {['Financial Assistance', 'Funeral Arrangements', 'Legal Support', 'Emotional Support'].map(
                    (resource) => (
                      <button
                        key={resource}
                        className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                      >
                        <p className="text-sm font-medium text-gray-900">{resource}</p>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-gray-50">
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 