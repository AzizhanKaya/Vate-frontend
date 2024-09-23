import StickyHeader from "../../components/sticky-header";
import Flow from "./flow";
export default function Home(){


    return(

        <>
            <StickyHeader title="Home Page" />

            
            <div className="overflow-hidden z-1">
                <Flow />
            </div>
            
        </>
    )
}