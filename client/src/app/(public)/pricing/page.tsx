import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="container-custom section-padding min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="mt-3 text-gray-500">Choose the plan that works for you.</p>
      </div>
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-8">
          <h2 className="text-2xl font-bold">Free</h2>
          <p className="my-5 text-4xl font-bold">৳0</p>
          <p className="mb-6 text-gray-600">Explore tuition opportunities and connect with mentors.</p>
          <Link href="/sign-up" className="secondary-button block text-center">Get Started</Link>
        </div>
        <div className="rounded-2xl border-2 border-blue-600 bg-white p-8">
          <h2 className="text-2xl font-bold">Pro</h2>
          <p className="my-5 text-4xl font-bold">৳499<span className="text-base font-normal"> / month</span></p>
          <p className="mb-6 text-gray-600">Unlock premium mentorship and enhanced opportunities.</p>
          <Link href="/sign-up" className="primary-button block text-center">Choose Pro</Link>
        </div>
      </div>
    </main>
  );
}