'use client'

import { useState } from 'react'

interface VideoGeneratorProps {
  onVideoGenerated: (video: any) => void
}

export default function VideoGenerator({ onVideoGenerated }: VideoGeneratorProps) {
  const [topic, setTopic] = useState('')
  const [style, setStyle] = useState('motivational')
  const [duration, setDuration] = useState('15')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState('')

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setLoading(true)
    setProgress('Generating script...')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, style, duration }),
      })

      if (!response.ok) throw new Error('Generation failed')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let result = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6))
              if (data.progress) {
                setProgress(data.progress)
              }
              if (data.video) {
                onVideoGenerated(data.video)
                result = data.video
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setProgress('Error generating video. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Create Your Short</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">
            Video Topic
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 5 morning habits that changed my life"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Video Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          >
            <option value="motivational">Motivational</option>
            <option value="educational">Educational</option>
            <option value="entertaining">Entertaining</option>
            <option value="storytelling">Storytelling</option>
            <option value="facts">Facts & Tips</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Duration (seconds)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          >
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
            <option value="45">45 seconds</option>
            <option value="60">60 seconds</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Video'
          )}
        </button>

        {loading && progress && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/20">
            <p className="text-white text-center">{progress}</p>
          </div>
        )}
      </div>
    </div>
  )
}
