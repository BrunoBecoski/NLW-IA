interface PlayerProps {
  src: string
}

export function Player({ src }: PlayerProps) {
  return (
    <video
      autoPlay
      controls
      className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
      src={src}
    />
  )
}