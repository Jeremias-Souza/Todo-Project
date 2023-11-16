import { Input } from "@/components/ui/input";
import { LogOut, Menu } from "lucide-react";
import { auth } from "@/server/firebase.config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type HeaderProps = {
  filter: string;
  setFilter: (val: string) => void;
};

const signOut = () => {
  return auth.signOut();
};

export default function HeaderFilter({ filter, setFilter }: HeaderProps) {
  return (
    <div className="flex items-center w-full left-0 headerComponent z-50">
      <a className="logOut mr-1" onClick={signOut}>
        LogOut <LogOut />
      </a>
      <a className="ml-4 fixed flex cursor-pointer scale-150">
        <Sheet>
          <SheetTrigger></SheetTrigger>
        </Sheet>
      </a>

      <Input
        className="inputFilter"
        value={filter}
        onChange={(val) => setFilter(val.target.value)}
        placeholder="Pesquisar Card:"
      />
    </div>
  );
}
