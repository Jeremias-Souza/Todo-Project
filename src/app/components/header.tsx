import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import Login from "./itemFormLogin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-select";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const tags = Array.from({ length: 5 }).map(
    (_, i, a) => `User${a.length - i}`
  );

  return (
    <>
      <div className="headerComponent">
        <LogOut className="LogOut" onClick={() => setShowModal(true)} />
        <Sheet>
          <SheetTrigger>
            <Menu className="w-9 h-9" />
          </SheetTrigger>
          <SheetContent className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Acessos:</SheetTitle>
              <SheetDescription>
                Acompanhe quem está a online no momento.
                <br></br>
                <br></br>
                <ScrollArea className="h-auto w-auto rounded-md border ">
                  <div className="p-4 ">
                    <h4 className="mb-4 text-sm font-medium leading-none">
                      Usuarios Online:
                      <br></br>
                      <br></br>
                    </h4>

                    {tags.map((tag) => (
                      <>
                        <div key={tag} className="pl-12 text-left">
                          {tag}
                        </div>
                        <Avatar className="relative bottom-8">
                          <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>

                        <br></br>
                        <Separator className="my-2" />
                      </>
                    ))}
                  </div>
                </ScrollArea>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <Login show={showModal}></Login>
    </>
  );
}
