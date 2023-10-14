import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { FileVideo, Upload } from "lucide-react";
import { fetchFile } from "@ffmpeg/util";

import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Player } from "./player";

import { getFFmpeg } from "@/lib/ffmpeg";
import { api } from "@/lib/axios";

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Convertendo...',
  generating: 'Transcrevendo...',
  uploading: 'Carregando...',
  success: 'Sucesso!',
}

interface VideoInputFormProps {
  onVideoUploaded: (id: string) => void
}

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  
  const promptInputRef = useRef<HTMLTextAreaElement>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('Convert started.')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', log => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', progress => {
      console.log('Convert progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg'})
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg'
    })

    console.log('Convert finished.')

    return audioFile
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!file) {
      return;
    }

    setStatus('converting')

    const audioFile = await convertVideoToAudio(file)
    const data = new FormData()

    data.append('file', audioFile)

    setStatus('uploading')

    const response = await api.post('/videos', data)
    const videoId = response.data.video.id

    setStatus('generating')

    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    })

    setStatus('success')

    onVideoUploaded(videoId)
  }

  const preview = useMemo(() => {

    if (!file) {
      return null
    }

    const preview = {
      url: URL.createObjectURL(file),
      type: file.type
    } 

    return preview
  }, [file]) 

  return(
    <form onSubmit={handleUploadVideo} className="w-full h-full flex gap-6">
      <div className="flex-1">
        {
          preview ? (
            <Player
              src={preview.url}
              type={preview.type}
            />
            ) :  (
              <label
                htmlFor="video"
                className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 "
              >
              <FileVideo className="w-4 h-4" />
              Selecione um arquivo (.mp3, .mp4) para fazer upload
            </label>
          )
        }
      </div>
      
      <input type="file" id="video" accept="audio/mp3, video/mp4" className="sr-only" onChange={handleFileSelected} /> 
      
      <Separator orientation="vertical" /> 

        <div className="space-y-2 max-w-80"> 
          <Button 
            className="w-full"
            onClick={() => document.getElementById("video")?.click()}
            type="button"
          >
            Selecione um arquivo
          </Button>

          <Button className="w-full" disabled={!file}>Salvar arquivo</Button>
        </div>
    {/*

            <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
      
        <Textarea 
          ref={promptInputRef}
          disabled={status !== 'waiting'}
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chaves mencionadas no vídeo separadas por vírgula (,)"
        />
      
        <Button
          data-success={status === 'success'}
          disabled={status !== 'waiting'}
          type="submit"
          className="w-full data-[success=true]:bg-emerald-400"
          >
          {status === 'waiting' 
            ?
            <>
                Carregar vídeo
                <Upload className="w-4 h-4 ml-2" />
              </>
            : 
            statusMessages[status]
          }
        </Button> */}
    </form>
  )
}