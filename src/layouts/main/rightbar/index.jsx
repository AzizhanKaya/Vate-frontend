import Account from "./account"
import Topics from "./topics"
export default function Rightbar(){

    return(
        <aside className="w-[350px] px-5">
            <Account />
            <Topics />
        </aside>
    )
}