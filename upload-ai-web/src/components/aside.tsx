import { Wand2 } from "lucide-react";

import { ScrollArea } from "./ui/scroll-area";
import { Label } from "./ui/label";
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

import { PromptSelect } from "./prompt-select";
import { VideoInputForm } from "./video-input-form";

interface AsideProps {
  setVideoId: (videoId: string) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setInput: (value: string) => void
  setTemperature: (temperature: number) => void
  temperature: number
  isLoading: boolean
}

export function Aside({ 
  setVideoId,
  handleSubmit,
  setInput,
  setTemperature,
  temperature,
  isLoading
}: AsideProps) {
  return (
    <ScrollArea className="w-fit h-[80vh] pr-4">
      <aside className="w-80 space-y-6">
        <VideoInputForm onVideoUploaded={setVideoId} />
    
        <Separator />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Prompt</Label> 

            <PromptSelect onPromptSelected={setInput} />
          </div>

          <div className="space-y-2">
            <Label>Modelo</Label> 
            <Select disabled defaultValue="gpt3.5">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
              </SelectContent>
            </Select>
            <span className="block text-xs text-muted-foreground italic">
              Você poderá customizar essa opção em breve
            </span>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Temperatura</Label>
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={value => setTemperature(value[0])}
              title={String(temperature)}
            />
            <span className="block text-xs text-muted-foreground italic leading-relaxed">
              Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
            </span>
          </div>

          <Separator />

          <Button disabled={isLoading} type="submit" className="w-full">
            Executar
            <Wand2 className="w-4 h-4 ml-2" />
          </Button>

        </form>
      </aside>
    </ScrollArea>
  )
}