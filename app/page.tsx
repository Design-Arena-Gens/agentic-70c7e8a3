'use client'

import { useState } from 'react'
import VideoGenerator from '@/components/VideoGenerator'
import VideoPreview from '@/components/VideoPreview'

export default function Home() {
  const [generatedVideo, setGeneratedVideo] = useState<any>(null)

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            AI YouTube Shorts Generator
          </h1>
          <p className="text-xl text-gray-300">
            Create engaging short-form videos automatically with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <VideoGenerator onVideoGenerated={setGeneratedVideo} />
          </div>
          <div>
            {generatedVideo && <VideoPreview video={generatedVideo} />}
          </div>
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">1. Enter Topic</h3>
              <p className="text-gray-300 text-sm">
                Provide a topic or idea for your YouTube Short
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold mb-2">2. AI Generation</h3>
              <p className="text-gray-300 text-sm">
                Our AI creates a script, generates visuals, and assembles the video
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg font-semibold mb-2">3. Download & Upload</h3>
              <p className="text-gray-300 text-sm">
                Download your video and upload directly to YouTube Shorts
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
