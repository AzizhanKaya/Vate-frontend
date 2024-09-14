import { topics } from "../../../store/topic"
import Topic from "./topic"

export default function Topics(){

    return(
        <section className="mb-4 rounded-2xl border border-[#2f3336] shadow-box">
            <h5 className="py-4 px-5 text-xl font-extrabold flex items-center text ">Topics</h5>
            <div className="grid">
            {topics.map((topic, index) => <Topic item={topic} key={index} />)}
            </div>
            
        </section>
    )
}