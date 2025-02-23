import React, { useState } from 'react';
import { Youtube, FileText, History, Lightbulb } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface DashboardProps {
  darkMode: boolean;
}

function Dashboard({ darkMode }: DashboardProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  
  const previousClasses = [
    {
      title: "Neural Network Architecture",
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop",
      progress: 75
    },
    {
      title: "Quantum Computing Basics",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop",
      progress: 90
    }
  ];

  const suggestedClasses = [
    {
      title: "Advanced AI Systems",
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=500&h=300&fit=crop",
      difficulty: "Level 2"
    },
    {
      title: "Cybernetic Enhancement",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop",
      difficulty: "Level 1"
    }
  ];

  const handleProcessVideo = () => {
    if (youtubeUrl) {
      setShowVideoPlayer(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showVideoPlayer ? (
        <VideoPlayer url={youtubeUrl} darkMode={darkMode} />
      ) : (
        <>
          {/* Input Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <Youtube className="mr-2 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">YouTube URL</h2>
              </div>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter YouTube URL"
              />
              <button 
                className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={handleProcessVideo}
              >
                Process Video
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FileText className="mr-2 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Document Upload</h2>
              </div>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  className="hidden"
                  id="document-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label
                  htmlFor="document-upload"
                  className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Upload Document
                </label>
              </div>
            </div>
          </div>

          {/* Previous Classes */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <History className="mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Previous Classes</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {previousClasses.map((course, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{course.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested Classes */}
          <section>
            <div className="flex items-center mb-6">
              <Lightbulb className="mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Suggested Classes</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedClasses.map((course, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
                    <span className="inline-block px-2 py-1 text-sm rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {course.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;