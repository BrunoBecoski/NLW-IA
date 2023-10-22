import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { formatTime } from "../utils/format-time";

import { Button } from "./ui/button";

type FileTypes = 'audio/mpeg' | 'video/mp4'

interface PlayerProps {
  src: string
  type: FileTypes
}

export function Player({ src, type }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState('00:00')

  const mediaRef = useRef<HTMLVideoElement>(null)

  function handlePlay() {    
    mediaRef.current?.play()
    setIsPlaying(true)
  }

  function handlePause() {
    mediaRef.current?.pause()
    setIsPlaying(false)
  }

  useEffect(() => {
    const mediaTag = mediaRef.current
    
    if (mediaTag) {
      mediaTag.addEventListener("loadedmetadata", () => {
        setIsPlaying(false)
        setDuration(formatTime(mediaTag.duration))
      });
    }
  }, [src])

  if(type === 'audio/mpeg') {
    return (
      <div>
        <audio
          src={src}
          ref={mediaRef}
        />

        <div className="flex items-center gap-4">          
          {
            isPlaying ? (
              <Button 
                onClick={handlePause}
                size="icon"
                type="button"
                title="Parar"
              >
                <Pause/>
              </Button>
            ) : (
              <Button 
                onClick={handlePlay}
                size="icon"
                type="button"
                title="Reproduzir"
              >
                <Play/>
              </Button>
            )
          }

          <div>
            <span className="font-mono font-bold">00:00</span>
            <span className="font-bold"> / </span>
            <span className="font-mono font-bold">{duration}</span>
          </div>
        </div>
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

        <div className="flex items-center gap-4">          
          {
            isPlaying ? (
              <Button 
                onClick={handlePause}
                size="icon"
                type="button"
                title="Parar" 
              >
                <Pause/>
              </Button>
            ) : (
              <Button 
                onClick={handlePlay}
                size="icon"
                type="button"
                title="Reproduzir"
              >
                <Play/>
              </Button>
            )
          }

        <div>
            <span className="font-mono font-bold">00:00</span>
            <span className="font-bold"> / </span>
            <span className="font-mono font-bold">{duration}</span>
          </div>
        </div>
      </div>
    )
  }
}