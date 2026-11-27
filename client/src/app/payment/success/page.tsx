import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="container-custom flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-lg rounded-2xl border bg-white p-10 text-center shadow-sm">
        <div className="mb-5 text-5xl">✓</div>
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="my-4 text-gray-600">
          Thank you! Your payment process has been completed.
        </p>
        <Link href="/dashboard" className="primary-button mt-4 inline-block">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}