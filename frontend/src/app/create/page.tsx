'use client';

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation';

export default function CreateAvatar() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener(
        'dataavailable',
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: { data: Blob }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, setCapturing]);

  const handleUpload = useCallback(async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const formData = new FormData();
      formData.append('video', blob, 'avatar.webm');

      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Upload successful');
        router.push('/generate');
      } else {
        console.error('Upload failed');
      }
    }
  }, [recordedChunks, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-800">Create Your AI Avatar</h1>
        <div className="relative w-full overflow-hidden rounded-lg aspect-w-16 aspect-h-9">
          <Webcam audio={true} ref={webcamRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
        <div className="p-6 bg-gray-200 rounded-lg">
          <p className="text-xl italic text-center text-gray-800">
            "The quick brown fox jumps over the lazy dog."
          </p>
        </div>
        <div className="flex justify-around">
          {capturing ? (
            <button
              onClick={handleStopCaptureClick}
              className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Stop Capture
            </button>
          ) : (
            <button
              onClick={handleStartCaptureClick}
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Start Capture
            </button>
          )}
          <button
            onClick={handleUpload}
            disabled={recordedChunks.length === 0}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
}
