import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume, Volume1, Volume2, VolumeX } from "lucide-react";

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
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(.5)

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
  
  function handleMutedUnmuted() {
    if(mediaRef.current) {
      mediaRef.current.muted = !isMuted
      setIsMuted(!isMuted)
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

      mediaTag.addEventListener("volumechange", () => {
        setVolume(mediaTag.volume)
      })
    }
  }, [src])

  useEffect(() => {
    if(mediaRef.current) {
      mediaRef.current.volume = volume
    }    
  }, [volume])

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
          
          <Button 
            type="button"
            size="icon"
            onClick={handleMutedUnmuted}
            title={isMuted ? "Ativar áudio" : "Desativar áudio"}
          >
            { isMuted && <VolumeX /> }
            
            { isMuted || volume === 0 && <Volume /> }
            { isMuted || volume >= .1 && volume <= .4  && <Volume1 /> }
            { isMuted || volume >= .5 && volume <= 1 && <Volume2 /> }
          </Button>
          
          <Slider
            min={0}
            max={1}
            step={.1}
            value={[volume]}
            onValueChange={value => setVolume(value[0]) }
            className="cursor-pointer"
          />

          <div>
            <span className="font-mono font-bold">{formatTime(currentTime)}</span>
            <span className="font-bold"> / </span>
            <span className="font-mono font-bold">{formatTime(totalTime)}</span>
          </div>

          <Slider
            min={0}
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

          <Button 
            type="button"
            size="icon"
            onClick={handleMutedUnmuted}
            title={isMuted ? "Ativar áudio" : "Desativar áudio"}
          >
            { isMuted && <VolumeX /> }
            
            { isMuted || volume === 0 && <Volume /> }
            { isMuted || volume >= .1 && volume <= .4  && <Volume1 /> }
            { isMuted || volume >= .5 && volume <= 1 && <Volume2 /> }
          </Button>

          <Slider
            min={0}
            max={1}
            step={.1}
            value={[volume]}
            onValueChange={value => setVolume(value[0])}
            className="cursor-pointer"
          />

          <div>
            <span className="font-mono font-bold">{formatTime(currentTime)}</span>
            <span className="font-bold"> / </span>
            <span className="font-mono font-bold">{formatTime(totalTime)}</span>
          </div>

          <Slider
            min={0}
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