import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <Link href="/" className="text-accent hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
