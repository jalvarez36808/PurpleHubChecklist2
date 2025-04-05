import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-purple-primary">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-900">Page not found</p>
        <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-primary hover:bg-purple-secondary"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
} 