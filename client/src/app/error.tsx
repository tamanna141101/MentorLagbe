"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container-custom flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Something went wrong!</h1>
        <p className="my-4 text-gray-600">
          Please try again.
        </p>
        <button onClick={reset} className="primary-button">
          Try Again
        </button>
      </div>
    </main>
  );
}