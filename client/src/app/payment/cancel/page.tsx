import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="container-custom flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-lg rounded-2xl border bg-white p-10 text-center shadow-sm">
        <div className="mb-5 text-5xl">!</div>
        <h1 className="text-3xl font-bold">Payment Cancelled</h1>
        <p className="my-4 text-gray-600">
          Your payment was not completed. You can try again whenever you are ready.
        </p>
        <Link href="/pricing" className="primary-button mt-4 inline-block">
          Back to Pricing
        </Link>
      </div>
    </main>
  );
}