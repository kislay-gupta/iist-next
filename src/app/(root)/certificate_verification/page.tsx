"use client"
import { useEffect } from "react";
const CertificatePage = () => {
  useEffect(() => {
    // Redirect to the external URL
    window.location.href =
      "https://sparkovationhub.com/Certificate_verification";
  }, []);
  return (
    <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-8 w-8 bg-black rounded-full animate-bounce" />
    </div>
  );
};

export default CertificatePage;
