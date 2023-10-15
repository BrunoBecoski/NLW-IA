import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "./ui/button";

interface PlayerProps {
  src: string
  type: string
}

export function Player({ src, type }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const mediaRef = useRef<HTMLMediaElement>(null)
  
  function handlePlay() {    
    mediaRef.current?.play()
    setIsPlaying(true)
  }

  function handlePause() {
    mediaRef.current?.pause()
    setIsPlaying(false)
  }


  if(type === 'audio/mpeg') {
    return (
      <div>
        <audio
          src={src}
          ref={mediaRef}
        />
        
        {
          isPlaying ? (
            <Button 
              onClick={handlePause}
              size="icon"
              type="button"
            >
              <Pause/>
            </Button>
          ) : (
            <Button 
              onClick={handlePlay}
              size="icon"
              type="button"
            >
              <Play/>
            </Button>
          )
        } 
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

        {
          isPlaying ? (
            <Button 
              onClick={handlePause}
              size="icon"
              type="button"
            >
              <Pause/>
            </Button>
          ) : (
            <Button 
              onClick={handlePlay}
              size="icon"
              type="button"
            >
              <Play/>
            </Button>
          )
        } 
      </div>
    )
  }
}