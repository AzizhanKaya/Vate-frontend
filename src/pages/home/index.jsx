import StickyHeader from "../../components/sticky-header";
import Flow from "./flow";
export default function Home(){


    return(

        <div className="overflow-hidden h-full">
            <StickyHeader title="Home Page">

            </StickyHeader>
            
            <Flow />
        </div>
    )
}