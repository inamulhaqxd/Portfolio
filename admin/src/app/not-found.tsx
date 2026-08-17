import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold">Page Not Found</h2>
      <Link href="/" className="text-blue-600 hover:underline">
        Go back to dashboard
      </Link>
    </main>
  )
}
