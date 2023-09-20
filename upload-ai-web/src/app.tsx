import { useState } from "react";
import { Github, Wand2 } from "lucide-react";
import { useCompletion } from "ai/react";

import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { Dialog } from "./components/ui/dialog";

import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { ModeToggle } from "./components/mode-toggle";
import { PromptForm } from "./components/prompt-form";

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    }
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Dialog>
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Desenvolvido com 💜 no NLW da Rocketseat
            </span>

            <Separator orientation="vertical" className="h-6" />

            <Button variant="outline" onClick={() => window.open("https://github.com/rocketseat-education/nlw-ai-mastery", "_blank")}>
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>

              <ModeToggle />
            </div>
        </div>

        <main className="flex-1 p-6 flex gap-6">
          <PromptForm
            input={input}
            handleInputChange={handleInputChange}
            completion={completion}
          />

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
        </main>
      </div>
      </Dialog>
    </ThemeProvider>
  )
}