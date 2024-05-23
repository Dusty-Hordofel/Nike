import { nike, nikeFutura } from "@/assets/fonts/nike/nike";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className={cn("bg-success text-bg-hover-inverse")}>
      <h1 className={`${nike.className} text-9xl `}>ÇA VA CHAUFFER</h1>
      <Link href="/about">About</Link>
      <Link href="/about" className={`${nikeFutura} text-9xl`}>
        About
      </Link>
    </div>
  );
}
