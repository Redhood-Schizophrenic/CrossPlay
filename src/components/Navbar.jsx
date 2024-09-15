'use client';
import Link from "next/navigation";

export default function Navbar() {
	return (
		<nav className="text-[#fff7f7] p-5 glowing-border rounded-b-lg">
			<div className="lg:w-[80%] mx-auto flex justify-between items-center">
				<div className="logo text-4xl font-bold text-white"><Link href="/">Cross<span class="text-[#5847b6]">Play</span></Link></div>

				<ul className="hidden lg:flex text-lg gap-10 justify-center items-center">
					<li><Link href="/dashboard">DashBoard</Link></li>
					<li><Link href="/history">History</Link></li>
				</ul>

				<button className="lg:hidden">
				</button>
			</div>

			<ul
				className={`lg:hidden pt-7 text-lg flex-col gap-5 justify-center items-center`}
			>
				<li><Link href="/dashboard">DashBoard</Link></li>
				<li><Link href="/history">History</Link></li>
			</ul>
		</nav>
	)
}