import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-custom flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" className="primary-button mt-6 inline-block">
          Back to Home
        </Link>
      </div>
    </main>
  );
}