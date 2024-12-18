import StickyHeader from "../../components/sticky-header";
import Flow from "./flow";
import { useState } from "react";
import { SubPostContext } from "../../contexts/sub-post";
import SubPost from '../../components/sub-post';
import { useParams } from "react-router-dom";

export default function Home(){

    let { Topic } = useParams();
    const [subPost, setSubPost] = useState(null);

    Topic = Topic || "Welcome";
    
    return(
        <SubPostContext.Provider value={{subPost, setSubPost}}>
            <StickyHeader title={Topic} />
            <div className="overflow-hidden z-1 relative min-h-screen">
                {!subPost ? <Flow Topic={Topic} /> : <SubPost Topic={Topic} />}
            </div>
        </SubPostContext.Provider>
        
    )
}