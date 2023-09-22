import { useEffect, useState } from "react";

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Você quer salvar esse Prompt?</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleCreate}>
        <Label>
          Título
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Label>
        <Label>
          Prompt
          <Textarea
            value={template}
            onChange={(event) => setTemplate(event.target.value)}
            className="resize-none p-4 leading-relaxed font-normal "
          />
        </Label>

        <Button type="submit">
          Salvar
        </Button>
      </form>
    </DialogContent>
  )
}