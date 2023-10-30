import { useEffect } from "react";

export default function Privator() {
  useEffect(() => {
    window.location.href = "/login";
  });

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    </>
  );
}
