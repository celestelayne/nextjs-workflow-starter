import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
      <p className="text-lg text-muted-foreground">{site.description}</p>
      <section aria-labelledby="next-steps" className="flex flex-col gap-2">
        <h2 id="next-steps" className="text-xl font-medium">
          Next steps
        </h2>
        <ol className="list-decimal pl-5 text-foreground/80">
          <li>
            Run <code className="font-mono">/create-slice</code> to specify
            your first slice.
          </li>
          <li>
            Run <code className="font-mono">/implement-slice</code> once it is
            approved.
          </li>
          <li>
            Run <code className="font-mono">/review-slice</code> before
            archiving.
          </li>
        </ol>
      </section>
      <div>
        <Button asChild>
          <a href="https://github.com/Fission-AI/OpenSpec">OpenSpec docs</a>
        </Button>
      </div>
    </main>
  );
}
