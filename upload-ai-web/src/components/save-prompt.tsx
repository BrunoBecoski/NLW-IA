import { useEffect, useState } from "react";

import { DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface SavePromptProps {
  prompt: string
}

export function SavePrompt({ prompt }: SavePromptProps) {
  const [title, setTitle] = useState("")
  const [template, setTemplate] = useState("")

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(title),
    console.log(template)
  }

  useEffect(() => { setTemplate(prompt) }, [prompt])

  return (
    <DialogContent className="max-w-[80vw]">
      <DialogHeader>
        <DialogTitle>Você quer salvar esse Prompt?</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleCreate} className="flex flex-col">
        <Label htmlFor="title" className="mt-4 mb-2">
          Título
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          />

        <Label htmlFor="template" className="mt-4 mb-2">
          Prompt
        </Label>
        <Textarea
          id="template"
          value={template}
          onChange={(event) => setTemplate(event.target.value)}
          className="h-[50vh] resize-none p-4 leading-relaxed font-normal "
        />

        <div className="flex justify-between gap-4 mt-4">
          <DialogTrigger className="w-1/2">
            <Button 
              className="w-full"
              variant="secondary"
            >
              Cancelar
            </Button>
          </DialogTrigger>

          <Button className="w-1/2" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}