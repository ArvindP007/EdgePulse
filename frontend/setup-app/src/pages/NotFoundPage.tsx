import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold tracking-tight">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Button asChild className="mt-6">
        <Link to="/">
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}