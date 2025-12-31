interface ScriptData {
  title: string
  script: string
  scenes: Array<{ text: string; duration: number }>
}

export async function generateScript(
  topic: string,
  style: string,
  duration: number
): Promise<ScriptData> {
  // Simulate AI script generation
  // In production, this would call OpenAI API
  const numberOfScenes = Math.ceil(duration / 5)

  const stylePrompts: Record<string, string> = {
    motivational: 'inspiring and energetic',
    educational: 'informative and clear',
    entertaining: 'fun and engaging',
    storytelling: 'narrative and captivating',
    facts: 'quick and punchy'
  }

  const sceneTexts = generateSceneTexts(topic, numberOfScenes, style)

  const title = `${topic.charAt(0).toUpperCase() + topic.slice(1)} | ${style.charAt(0).toUpperCase() + style.slice(1)} Short`

  const script = sceneTexts.map((scene, idx) =>
    `Scene ${idx + 1}: ${scene}`
  ).join('\n\n')

  const sceneDuration = duration / numberOfScenes

  return {
    title,
    script,
    scenes: sceneTexts.map(text => ({
      text,
      duration: sceneDuration
    }))
  }
}

function generateSceneTexts(topic: string, count: number, style: string): string[] {
  const scenes: string[] = []

  // Generate hook
  scenes.push(`Want to know about ${topic}? Watch this!`)

  // Generate main content scenes
  for (let i = 1; i < count - 1; i++) {
    const tips = [
      `Key point ${i}: ${topic} can transform your approach`,
      `Here's what most people don't know about ${topic}`,
      `The secret to ${topic} is consistency`,
      `This ${topic} technique is game-changing`,
      `${i}. Master this aspect of ${topic}`
    ]
    scenes.push(tips[i % tips.length])
  }

  // Generate CTA
  if (count > 1) {
    scenes.push(`Follow for more tips on ${topic}!`)
  }

  return scenes.slice(0, count)
}

export async function generateScenes(
  script: string,
  duration: number
): Promise<Array<{ text: string; image: string }>> {
  // In production, this would generate images using DALL-E or Stable Diffusion
  // For now, we'll create placeholder data

  const sceneCount = Math.ceil(duration / 5)
  const scenes: Array<{ text: string; image: string }> = []

  const scriptLines = script.split('\n\n')

  for (let i = 0; i < sceneCount; i++) {
    const sceneText = scriptLines[i] || `Scene ${i + 1}`
    scenes.push({
      text: sceneText.replace(/^Scene \d+: /, ''),
      image: `https://via.placeholder.com/1080x1920/6366f1/ffffff?text=Scene+${i + 1}`
    })
  }

  return scenes
}

export async function createVideoData(
  scriptData: ScriptData,
  scenes: Array<{ text: string; image: string }>
): Promise<{
  title: string
  script: string
  scenes: Array<{ text: string; image: string }>
  videoUrl: string | null
}> {
  // In production, this would:
  // 1. Generate voiceover using text-to-speech
  // 2. Create video frames with images and text overlays
  // 3. Add background music
  // 4. Render final video
  // 5. Upload to storage and return URL

  // For demo purposes, we return the structured data
  return {
    title: scriptData.title,
    script: scriptData.script,
    scenes: scenes,
    videoUrl: null // In production, this would be the actual video URL
  }
}

// Helper function to create video canvas data (for client-side rendering demo)
export function createVideoCanvas(
  scenes: Array<{ text: string; image: string }>,
  duration: number
): any {
  const canvas = {
    width: 1080,
    height: 1920,
    fps: 30,
    duration: duration,
    scenes: scenes.map((scene, idx) => ({
      ...scene,
      startTime: (duration / scenes.length) * idx,
      endTime: (duration / scenes.length) * (idx + 1)
    }))
  }

  return canvas
}
