import { useRef } from "react";
import { Play } from "lucide-react";

import { Button } from "./ui/button";

interface PlayerProps {
  src: string
  type: string
}

export function Player({ src, type }: PlayerProps) {

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  function handleVideoPlay() {
    videoRef.current?.play()
  }

  function handleAudioPlay() {
    audioRef.current?.play()
  }

  if(type === 'audio/mpeg') {
    return (
      <div>
        <audio
          src={src}
          ref={audioRef}
        />

        <Button 
          onClick={handleAudioPlay}
          size="icon"
          type="button"
          >
          <Play/>
        </Button>
      </div>
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
          onClick={handleVideoPlay}
          size="icon"
          type="button"
        >
          <Play/>
        </Button>
      </div>
    )
  }
}