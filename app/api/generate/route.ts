import { NextRequest } from 'next/server'
import { generateScript, generateScenes, createVideoData } from '@/lib/videoGenerator'

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { topic, style, duration } = await req.json()

        // Send progress update
        const sendProgress = (message: string) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ progress: message })}\n\n`)
          )
        }

        // Step 1: Generate script
        sendProgress('🎬 Generating script...')
        const scriptData = await generateScript(topic, style, parseInt(duration))

        // Step 2: Generate scenes
        sendProgress('🎨 Creating visual scenes...')
        const scenes = await generateScenes(scriptData.script, parseInt(duration))

        // Step 3: Create video data
        sendProgress('🎥 Assembling video...')
        const videoData = await createVideoData(scriptData, scenes)

        // Send final result
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ video: videoData, progress: '✅ Video ready!' })}\n\n`)
        )

        controller.close()
      } catch (error) {
        console.error('Error:', error)
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ error: 'Failed to generate video', progress: '❌ Generation failed' })}\n\n`)
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
