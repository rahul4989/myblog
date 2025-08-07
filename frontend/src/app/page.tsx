import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800">AI Video Avatar Generator</h1>
        <p className="text-lg text-center text-gray-600">
          Create your own personalized AI avatar and generate videos with it.
        </p>
        <div className="flex justify-center">
          <Link href="/create" className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
