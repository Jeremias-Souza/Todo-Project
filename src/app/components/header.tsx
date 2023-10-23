import { Input } from "@/components/ui/input";
import { LogOut } from "lucide-react";
import { auth } from "@/server/firebase.config";

export type HeaderProps = {
  filter: string;
  setFilter: (val: string) => void;
};

const signOut = () => {
  return auth.signOut();
};

export default function Header({ filter, setFilter }: HeaderProps) {
  return (
    <div className="headerComponent">
      <a className="logOut" onClick={signOut}>
        LogOut <LogOut />
      </a>
      <Input
        className="inputFilter"
        value={filter}
        onChange={(val) => setFilter(val.target.value)}
        placeholder="Digite a palavra a ser filtrada:"
      />
    </div>
  );
}
