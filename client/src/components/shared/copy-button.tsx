import React from "react";
import copy from "copy-to-clipboard";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CopyButton({
  label,
  copiedLabel,
  value,
  className,
  props,
}: {
  label: React.ReactNode;
  copiedLabel: React.ReactNode;
  value: string;
  className?: string;
  props?: any;
}) {
  const [isCopied, setIsCopied] = React.useState(false);

  function copyToClipboard() {
    copy(value);
    setIsCopied(true);
    toast.success("Copied to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <Button onClick={copyToClipboard} className={cn(className)} {...props}>
      {isCopied ? copiedLabel : label}
    </Button>
  );
}
