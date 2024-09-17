import Link from "next/link";

export default function Header() {

	return (
		<header className="sticky top-0 w-full h-auto text-white flex flex-col md:flex-row gap-5 justify-between items-center px-8 py-6">
			<Link href='/'>
				<h1 className="cursor-pointer text-2xl font-semibold">
					Cross
					<span className="text-blue-500">Play</span>
				</h1>
			</Link>
			<ul className={`flex gap-4 items-center`}>
				<li className="cursor-pointer hover:underline hover:underline-offset-4"><Link href="/dashboard">Dashboard</Link></li>
				<li className="cursor-pointer hover:underline hover:underline-offset-4"><Link href="/history">History</Link></li>
			</ul>
		</header>
	)
}