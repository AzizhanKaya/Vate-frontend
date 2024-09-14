import Logo from "./logo";
import Menu from "./menu";

export default function Sidebar() {
	return (
		<aside className="w-[270px] max-h-screen min-h-screen px-2 flex flex-col sticky">
			<Logo />
			<Menu />
			
		</aside>
	)
}