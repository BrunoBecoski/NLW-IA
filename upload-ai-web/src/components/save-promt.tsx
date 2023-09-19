import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function SavePrompt() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Você quer salvar esse Prompt?</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <Label>
          Título
          <Input />
        </Label>
        <Label>
          Prompt
          <Textarea />
        </Label>
      </DialogDescription>
      <Button>
        Salvar
      </Button>
    </DialogContent>
  )
}