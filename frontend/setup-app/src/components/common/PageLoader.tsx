import { Spinner } from "@/components/ui/spinner";

export default function PageLoader() {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}