import StickyHeader from "../../components/sticky-header";
import Flow from "./flow";
import { useState } from "react";
import { SubPostContext } from "../../contexts/sub-post";
import SubPost from '../../components/sub-post';
import { useEffect } from "react";

export default function Home(){

    const [Topic, setTopic] = useState('Welcome');
    const [refresh, setRefresh] = useState(true);
    const [subPost, setSubPost] = useState(null);

    return(

        <>
            <StickyHeader title={Topic} />

            <SubPostContext.Provider value={{subPost, setSubPost, refresh, setRefresh}}>
                <div className="overflow-hidden z-1 relative min-h-screen">
                    {!subPost ? <Flow Topic={Topic} /> : <SubPost />}
                </div>
            </SubPostContext.Provider>
        </>
    )
}