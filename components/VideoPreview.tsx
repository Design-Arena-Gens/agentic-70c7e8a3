'use client'

interface VideoPreviewProps {
  video: {
    videoUrl?: string
    script?: string
    scenes?: Array<{ text: string; image: string }>
    title?: string
  }
}

export default function VideoPreview({ video }: VideoPreviewProps) {
  const handleDownload = async () => {
    if (video.videoUrl) {
      const link = document.createElement('a')
      link.href = video.videoUrl
      link.download = 'youtube-short.mp4'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Your Video</h2>

      <div className="space-y-6">
        {video.title && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Title</h3>
            <p className="text-gray-200 bg-white/5 p-4 rounded-lg">{video.title}</p>
          </div>
        )}

        {video.script && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Script</h3>
            <div className="text-gray-200 bg-white/5 p-4 rounded-lg whitespace-pre-wrap max-h-64 overflow-y-auto">
              {video.script}
            </div>
          </div>
        )}

        {video.scenes && video.scenes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Scenes Preview</h3>
            <div className="grid grid-cols-2 gap-4">
              {video.scenes.slice(0, 4).map((scene, idx) => (
                <div key={idx} className="bg-white/5 p-3 rounded-lg">
                  <div className="aspect-[9/16] bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mb-2 flex items-center justify-center text-white text-sm p-4 text-center">
                    {scene.text}
                  </div>
                  <p className="text-xs text-gray-300 truncate">Scene {idx + 1}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {video.videoUrl && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Generated Video</h3>
            <div className="aspect-[9/16] bg-black rounded-lg overflow-hidden mb-4">
              <video
                src={video.videoUrl}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            disabled={!video.videoUrl}
            className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Download Video
          </button>
          <button
            onClick={() => {
              if (video.script) {
                navigator.clipboard.writeText(video.script)
                alert('Script copied to clipboard!')
              }
            }}
            className="flex-1 bg-white/20 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            Copy Script
          </button>
        </div>

        <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            💡 <strong>Tip:</strong> Download your video and upload it to YouTube as a Short.
            Make sure the video is vertical (9:16 aspect ratio) and under 60 seconds.
          </p>
        </div>
      </div>
    </div>
  )
}
