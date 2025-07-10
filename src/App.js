import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">VocaPad</h1>
      <textarea
        className="w-full max-w-2xl h-64 p-4 border border-gray-300 rounded-lg shadow-md resize-none"
        placeholder="Your voice notes will appear here..."
      ></textarea>
      <div className="flex gap-4 mt-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          🎤 Start Listening
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          💾 Save
        </button>
      </div>
    </div>
  );
}

export default App;