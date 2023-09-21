import { useState } from "react";
import { Github } from "lucide-react";
import { useCompletion } from "ai/react";

import { ThemeProvider } from "./components/theme-provider";
import { Separator } from "./components/ui/separator";
import { Button } from "./components/ui/button";
import { Dialog } from "./components/ui/dialog";

import { ModeToggle } from "./components/mode-toggle";
import { PromptForm } from "./components/prompt-form";
import { Aside } from "./components/aside";

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

          <Aside
            setVideoId={setVideoId}
            handleSubmit={handleSubmit}
            setInput={setInput}
            setTemperature={setTemperature}
            temperature={temperature}
            isLoading={isLoading}
          />
        </main>
      </div>
      </Dialog>
    </ThemeProvider>
  )
}