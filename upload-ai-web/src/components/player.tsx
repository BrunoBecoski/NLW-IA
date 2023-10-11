interface PlayerProps {
  src: string
  type: string
}

export function Player({ src, type }: PlayerProps) {

  if(type === 'audio/mpeg') {
    return (
      <audio
        controls
        src={src}
      />
    )
  } 

  if (type === 'video/mp4') {
    return (
      <video
        controls
        src={src}
      />
    )
  }
}