import { RefObject, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "./ui/button";

type FileTypes = 'audio/mpeg' | 'video/mp4'

interface PlayerProps {
  src: string
  type: FileTypes
}

export function Player({ src, type }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlay(mediaRef: RefObject<HTMLMediaElement>) {    
    mediaRef.current?.play()
    setIsPlaying(true)
  }

  function handlePause(mediaRef: RefObject<HTMLMediaElement>) {
    mediaRef.current?.pause()
    setIsPlaying(false)
  }

  if(type === 'audio/mpeg') {
    const audioRef = useRef<HTMLAudioElement>(null)

    return (
      <div>
        <audio
          src={src}
          ref={audioRef}
        />
        
        {
          isPlaying ? (
            <Button 
              onClick={() => handlePause(audioRef)}
              size="icon"
              type="button"
            >
              <Pause/>
            </Button>
          ) : (
            <Button 
              onClick={() => handlePlay(audioRef)}
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
    const videoRef = useRef<HTMLVideoElement>(null)

    return (
      <div>
        <video
          src={src}   
          ref={videoRef}
        />  

        {
          isPlaying ? (
            <Button 
              onClick={() => handlePause(videoRef)}
              size="icon"
              type="button"
            >
              <Pause/>
            </Button>
          ) : (
            <Button 
              onClick={() => handlePlay(videoRef)}
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