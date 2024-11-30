import { RefreshCcwDot } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-44 text-gray-300">
      <RefreshCcwDot size={48} className="animate-spin" />
    </div>
  );
}
