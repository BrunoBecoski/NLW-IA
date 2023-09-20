import { DialogTrigger } from "@radix-ui/react-dialog";
import { Save } from "lucide-react";

import { SavePrompt } from "./save-prompt";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface PromptFormProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  completion: string
}

export function PromptForm({ input, handleInputChange, completion }: PromptFormProps) {
  return (
  <>
    <SavePrompt />

    <div className="flex flex-col flex-1 gap-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="prompt">
          Prompt 
        </Label>
        <DialogTrigger>
          <Button>
            <Save />
          </Button>
        </DialogTrigger>
      </div>

      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          id="prompt"
          className="resize-none p-4 leading-relaxed"
          placeholder="Inclua o prompt para a IA..."
          value={input}
          onChange={handleInputChange}
        />
        <Textarea
          className="resize-none p-4 leading-relaxed"
          placeholder="Resultado gerado pela IA..."
          readOnly
          value={completion}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a variável
        <code className="text-violet-400">{' {transcription} '}</code>
        no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
      </p>
    </div>
  </>
  )
}