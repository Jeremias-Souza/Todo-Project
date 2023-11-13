import { LogOut, Menu } from "lucide-react";
import { auth } from "@/server/firebase.config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarLine from "./sidebarLine";

const signOut = () => {
  return auth.signOut();
};

export default function Header() {
  return (
    <div className="flex items-center w-full left-0 headerComponent z-50">
      <a className="logOut mr-1" onClick={signOut}>
        LogOut <LogOut />
      </a>
      <a className="ml-4 fixed flex cursor-pointer scale-150">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SidebarLine></SidebarLine>
          </SheetContent>
        </Sheet>
      </a>
    </div>
  );
}
