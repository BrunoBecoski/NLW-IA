import { useState } from "react";
import { useCompletion } from "ai/react";

import { Dialog } from "./components/ui/dialog";


import { ThemeProvider } from "./contexts/theme-provider";

import { SavePrompt } from "./components/save-prompt";
import { PromptForm } from "./components/prompt-form";
import { Aside } from "./components/aside";
import { Header } from "./components/header";

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
      <div className="min-h-screen flex flex-col">

        <Header />

        <main className="flex-1 p-6 flex gap-6">
        
          <Dialog>
            <SavePrompt
              prompt={input}
              />

            <PromptForm
              input={input}
              handleInputChange={handleInputChange}
              completion={completion}
              />
          </Dialog>

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
    </ThemeProvider>
  )
}