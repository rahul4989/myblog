'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GenerateVideo() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerateVideo = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:3001/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const { videoUrl } = await response.json();
      setVideoUrl(videoUrl);
    } else {
      console.error('Video generation failed');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800">Generate Your Video</h1>
        <textarea
          className="w-full p-4 text-lg text-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows={5}
          placeholder="Enter your script here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex justify-center">
          <button
            onClick={handleGenerateVideo}
            disabled={loading}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate Video'}
          </button>
        </div>
        {videoUrl && (
          <div className="mt-8">
            <video src={videoUrl} controls className="w-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
