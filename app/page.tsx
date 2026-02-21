// // //
import Link from "next/link";
import { Button } from "./_ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-background overflow-hidden">
      <div className="flex gap-5 items-center justify-center">
        <Link href="/universities">
          <Button size="lg" className="group">
            Find Universities
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        <Link href="/api-test">
          <Button size="md" className="group">
            Api Test
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
