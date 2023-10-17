import React from "react";
import { auth } from "@/server/firebase.config";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ItemFormDialogProps = {
  show: boolean;
};

export default function Blocker() {
  const signOut = () => {
    return auth.signOut();
  };

  return (
    <div className="iconButton">
      {
        <Button onClick={signOut}>
          <LogOut />
          LogOut
        </Button>
      }
    </div>
  );
}
