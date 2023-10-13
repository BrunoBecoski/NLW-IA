import { useRef } from "react";
import { Play } from "lucide-react";

import { Button } from "./ui/button";

interface PlayerProps {
  src: string
  type: string
}

export function Player({ src, type }: PlayerProps) {

  const videoRef = useRef<HTMLVideoElement>(null)

  function handlePlay() {
    videoRef.current?.play()
  }

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
      <div>
      <video
        src={src}   
        ref={videoRef}
      />
        <Button 
          onClick={handlePlay}
          size="icon"
          type="button"
        >
          <Play/>
        </Button>
      </div>
    )
  }
}