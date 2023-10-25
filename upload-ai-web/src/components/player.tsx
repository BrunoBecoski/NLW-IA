import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { formatTime } from "../utils/format-time";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

type FileTypes = 'audio/mpeg' | 'video/mp4'

interface PlayerProps {
  src: string
  type: FileTypes
}

export function Player({ src, type }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const mediaRef = useRef<HTMLVideoElement>(null)

  function handlePlayPause() {    
    if(isPlaying) {
      mediaRef.current?.pause()
    } else {
      mediaRef.current?.play() 
    }
  }

  function handleUpdateTime(value: number[]) {
    if (mediaRef.current) {
      mediaRef.current.currentTime = value[0]
    }
  }

  useEffect(() => {
    const mediaTag = mediaRef.current

    if (mediaTag) {      
      mediaTag.addEventListener("loadedmetadata", () => {
        setIsPlaying(false)
      });

      mediaTag.addEventListener("timeupdate", () => {
        setCurrentTime(Math.floor(mediaTag.currentTime))
      })

      mediaTag.addEventListener("ended", () => {
        setIsPlaying(false)
      })

      mediaTag.addEventListener("durationchange", () => {
        setTotalTime(Math.floor(mediaTag.duration))
      })

      mediaTag.addEventListener("pause", () => {
        setIsPlaying(false)
      })

      mediaTag.addEventListener("play", () => {
        setIsPlaying(true)
      })
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
          <Button 
            onClick={handlePlayPause}
            size="icon"
            type="button"
            title={isPlaying ? "Parar" : "Reproduzir" }
          >
            {
              isPlaying
                ? <Pause /> 
                : <Play/>
            }
          </Button>

          <div>
            <span className="font-mono font-bold">{formatTime(currentTime)}</span>
            <span className="font-bold"> / </span>
            <span className="font-mono font-bold">{formatTime(totalTime)}</span>
          </div>

          <Slider
            max={totalTime}
            value={[currentTime]}
            onValueChange={handleUpdateTime}
            className="cursor-pointer"
          />
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
          <Button 
            onClick={handlePlayPause}
            size="icon"
            type="button"
            title={isPlaying ? "Parar" : "Reproduzir" }
          >
            {
              isPlaying
                ? <Pause /> 
                : <Play/>
            }
          </Button>

          <div>
            <span className="font-mono font-bold">{formatTime(currentTime)}</span>
            <span className="font-bold"> / </span>
            <span className="font-mono font-bold">{formatTime(totalTime)}</span>
          </div>

          <Slider
            max={totalTime}
            value={[currentTime]}
            onValueChange={handleUpdateTime}
            className="cursor-pointer"
          />
        </div>
      </div>
    )
  }
}