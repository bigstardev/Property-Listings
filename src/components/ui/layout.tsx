import { ReactNode } from "react";
import Navbar from "@components/ui/navbar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
