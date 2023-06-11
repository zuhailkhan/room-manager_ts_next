import Link from "next/link";


export default function Home() {
  return (
    <main className="overflow-hidden">
      This is main
      <Link href="/login">
        Login
      </Link>
    </main>
  )
}
