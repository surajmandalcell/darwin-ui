import { Button } from "@smc/darwin-ui";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center max-w-4xl px-4 gap-8">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
          <span className="text-white/70">v1.1.0 Available Now</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Darwin UI
        </h1>

        <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
          A beautiful macOS-inspired dark theme React component library with glass-morphism aesthetic.
          Built for modern web applications.
        </p>

        <div className="flex flex-row gap-4 items-center">
          <Link href="/docs/getting-started/introduction">
            <Button size="lg" className="rounded-full px-8">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://github.com/surajmandalcell/darwin-ui" target="_blank">
            <Button variant="secondary" size="lg" className="rounded-full px-8">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </Link>
        </div>
      </main>

      <div className="absolute top-0 w-full h-[50vh] bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 w-full h-[50vh] bg-purple-500/10 blur-[100px] pointer-events-none" />
    </div>
  );
}
