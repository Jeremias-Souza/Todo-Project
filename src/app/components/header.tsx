import { LogOut } from "lucide-react";
import { useState } from "react";
import Login from "./itemFormLogin";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="headerComponent">
        <LogOut className="LogOut" onClick={() => setShowModal(true)} />
      </div>
      <Login show={showModal}></Login>
    </>
  );
}
