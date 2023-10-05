import { Input } from "@/components/ui/input";
import Blocker from "./blocker";

export type HeaderProps = {
  filter: string;
  setFilter: (val: string) => void;
};

export default function Header({ filter, setFilter }: HeaderProps) {
  return (
    <div className="headerComponent">
      <Blocker></Blocker>
      <Input
        className="inputFilter"
        value={filter}
        onChange={(val) => setFilter(val.target.value)}
        placeholder="Digite a palavra a ser filtrada:"
      />
    </div>
  );
}
