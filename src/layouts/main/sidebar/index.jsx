import Logo from "./logo";
import Menu from "./menu";

export default function Sidebar() {
	return (
		<div>
			<div className="sticky top-0">
				<aside className="w-[270px] max-h-screen px-2 flex flex-col mt-3">
					<Logo />
					<Menu />
				</aside>
			</div>
		</div>
	)
}