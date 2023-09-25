import { useEffect } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Save } from "lucide-react";

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
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="prompt">
          Prompt 
        </Label>
      </div>

      <div className="grid grid-rows-2 gap-4 flex-1 relative">
        {
          input &&
            <DialogTrigger className="absolute right-4 top-4">
              <Button title="Salvar prompt">
                <Save />
              </Button>
            </DialogTrigger>
        }
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
  )
}