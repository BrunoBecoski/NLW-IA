import { useRef } from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "./ui/button";

interface PlayerProps {
  src: string
  type: string
}

export function Player({ src, type }: PlayerProps) {
  const mediaRef = useRef<HTMLMediaElement>(null)

  function handlePlay() {
    mediaRef.current?.play()
  }

  function handlePause() {
    mediaRef.current?.pause()
  }
  
  if(type === 'audio/mpeg') {
    return (
      <div>
        <audio
          src={src}
          ref={mediaRef}
        />

        <Button 
          onClick={handlePlay}
          size="icon"
          type="button"
        >
          <Play/>
        </Button>

        <Button 
          onClick={handlePause}
          size="icon"
          type="button"
        >
          <Pause/>
        </Button>
      </div>
    )
  } 

  if (type === 'video/mp4') {
    return (
      <div>
        <video
          src={src}   
          ref={mediaRef}
        />  

        <Button 
          onClick={handlePlay}
          size="icon"
          type="button"
        >
          <Play/>
        </Button>

        <Button 
          onClick={handlePause}
          size="icon"
          type="button"
        >
          <Pause/>
        </Button>
      </div>
    )
  }
}