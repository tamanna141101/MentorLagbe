export default function Loading() {
  return (
    <main className="container-custom flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-gray-600">Loading MentorLagbe...</p>
      </div>
    </main>
  );
}