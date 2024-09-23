import {Link} from "react-router-dom";
import '../../../assets/css/shine.css';

export default function Logo() {
	return (
		<div className="py-0.5 flex">
			<Link to="/" className="w-[3.25rem] h-[3.25rem] rounded-full flex items-center justify-center hover:bg-[#eff3f427] transition-colors effect-shine">
				<svg width="40" height="40" viewBox="13 13 74 74">

					<polygon points="50,75 75,25 25,25" fill="none" stroke="white" strokeWidth="5"/>

					<circle cx="50" cy="75" r="10" fill="black" stroke="white" strokeWidth="4"/>
					<circle cx="75" cy="25" r="10" fill="black" stroke="white" strokeWidth="4"/>
					<circle cx="25" cy="25" r="10" fill="black" stroke="white" strokeWidth="4"/>
					<circle cx="25" cy="25" r="4" fill="white" stroke="white" strokeWidth="3"/>
					<circle cx="75" cy="25" r="4" fill="white" stroke="white" strokeWidth="3"/>
					<circle cx="50" cy="75" r="4" fill="white" stroke="white" strokeWidth="3"/>
					
				</svg>
			</Link>
			<div className="items-center justify-center font-[Vate] flex text-[25px] pt-2 font-extrabold effect-shine text-[#6ba4d2]">
                Vate
            </div>
		</div>
	)
}
