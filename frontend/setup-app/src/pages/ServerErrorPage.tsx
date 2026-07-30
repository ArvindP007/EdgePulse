import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ServerErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold tracking-tight">500</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Server Error
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Something went wrong on our end. Please try again later.
      </p>

      <Button asChild className="mt-6">
        <Link to="/">
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}