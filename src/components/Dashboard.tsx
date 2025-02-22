import React, { useState } from 'react';
import { Youtube, FileText, History, Lightbulb } from 'lucide-react';

interface DashboardProps {
  darkMode: boolean;
}

function Dashboard({ darkMode }: DashboardProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  const previousClasses = [
    {
      title: "Introduction to Machine Learning",
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&h=300&fit=crop",
      progress: 75
    },
    {
      title: "Advanced Python Programming",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop",
      progress: 90
    }
  ];

  const suggestedClasses = [
    {
      title: "Data Structures and Algorithms",
      thumbnail: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=500&h=300&fit=crop",
      difficulty: "Intermediate"
    },
    {
      title: "Web Development Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&h=300&fit=crop",
      difficulty: "Beginner"
    }
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center mb-4">
            <Youtube className="mr-2" />
            <h2 className="text-xl font-bold">YouTube URL</h2>
          </div>
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste YouTube URL here"
          />
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Start Learning
          </button>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center mb-4">
            <FileText className="mr-2" />
            <h2 className="text-xl font-bold">Upload Document</h2>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              className="hidden"
              id="document-upload"
              accept=".pdf,.doc,.docx"
            />
            <label
              htmlFor="document-upload"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Click to upload or drag and drop
            </label>
          </div>
        </div>
      </div>

      {/* Previous Classes */}
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <History className="mr-2" />
          <h2 className="text-2xl font-bold">Previous Classes</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previousClasses.map((course, index) => (
            <div key={index} className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-2">{course.progress}% completed</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Classes */}
      <section>
        <div className="flex items-center mb-6">
          <Lightbulb className="mr-2" />
          <h2 className="text-2xl font-bold">Suggested for You</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedClasses.map((course, index) => (
            <div key={index} className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <span className="inline-block px-2 py-1 text-sm rounded bg-indigo-100 text-indigo-800">
                  {course.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;