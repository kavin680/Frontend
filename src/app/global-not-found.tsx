import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-7xl font-bold text-gray-900 dark:text-gray-100">404</h1>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Page Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
