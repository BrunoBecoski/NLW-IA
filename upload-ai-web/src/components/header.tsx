import { Github } from "lucide-react";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="px-6 flex items-center justify-between border-b h-[15vh]">
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
    </header>
  )
}