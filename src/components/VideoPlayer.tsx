import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Languages, Volume2, Type } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyC27RzExtjVS0c9GxAmleRA90TkRbvCtgA');

interface VideoPlayerProps {
  url: string;
  darkMode: boolean;
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];

const SAMPLE_TRANSCRIPT = `Hello and welcome to this video!
Today we're going to discuss some interesting topics.
First, let's talk about artificial intelligence and its impact on our daily lives.
Then, we'll explore how technology is shaping the future of education.
Finally, we'll look at some practical applications of these technologies.`;

function VideoPlayer({ url, darkMode }: VideoPlayerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedTranscript, setTranslatedTranscript] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Validate YouTube URL
    setIsValidUrl(ReactPlayer.canPlay(url));
  }, [url]);

  const synthesizeAudio = async (text: string) => {
    try {
      // Create a SpeechSynthesisUtterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set the language
      utterance.lang = selectedLanguage;
      
      // Get available voices and wait for them to load
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        await new Promise<void>(resolve => {
          window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices();
            resolve();
          };
        });
      }
      
      // Find a voice for the selected language
      const voice = voices.find(v => v.lang.startsWith(selectedLanguage)) || voices[0];
      if (voice) {
        utterance.voice = voice;
      }

      // Create an audio context
      const audioContext = new AudioContext();
      const mediaStreamDest = audioContext.createMediaStreamDestination();
      
      // Create a MediaRecorder to capture the audio
      const mediaRecorder = new MediaRecorder(mediaStreamDest.stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorder.start();

      // Speak the text
      window.speechSynthesis.speak(utterance);

      // Wait for the speech to complete
      return new Promise<void>((resolve) => {
        utterance.onend = () => {
          mediaRecorder.stop();
          resolve();
        };
      });
    } catch (error) {
      console.error('Audio synthesis failed:', error);
      throw error;
    }
  };

  const handleTranslate = async () => {
    if (!isValidUrl) {
      setTranslatedTranscript('Please enter a valid YouTube URL');
      return;
    }

    setIsTranslating(true);
    try {
      // Get the model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Create a prompt for translation
      const prompt = `Translate the following text to ${
        LANGUAGES.find(lang => lang.code === selectedLanguage)?.name
      }. Maintain the original formatting and line breaks. Here's the text to translate:

${SAMPLE_TRANSCRIPT}`;

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Update the transcript
      setTranslatedTranscript(text);

      // Generate audio from the translated text
      await synthesizeAudio(text);

    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedTranscript('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Player Column */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative" style={{ paddingTop: '56.25%' }}>
              {isValidUrl ? (
                <ReactPlayer
                  url={url}
                  width="100%"
                  height="100%"
                  controls
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Please enter a valid YouTube URL
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls Column */}
        <div className="space-y-6">
          {/* Language Selection */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Languages className="mr-2 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Translation Settings
              </h3>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          </div>

          {/* Audio Player */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Volume2 className="mr-2 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Translated Audio
              </h3>
            </div>
            <audio
              ref={audioRef}
              controls
              className="w-full"
              src={audioUrl}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>

      {/* Transcript Section */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center mb-4">
          <Type className="mr-2 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Translated Transcript
          </h3>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          {translatedTranscript ? (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{translatedTranscript}</p>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">
              Translated transcript will appear here after translation
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
