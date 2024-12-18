import Post from "./post";
import { get_sub_posts } from "../utils/requests";
import { formatPost, nthPost, getSubPostHash } from "../utils/encoder"
import { useState } from "react";
import { useEffect } from "react";
import SendPost from "./send-post";
import { SubPostContext } from "../contexts/sub-post";
import { useContext } from "react";

export default function SubPost({Topic}){
    
    const { subPost, setSubPost } = useContext(SubPostContext);
    const [ posts , setPosts ] = useState([]);
    const [ refresh, setRefresh ] = useState(true);
    
    useEffect(()=>{
       
        async function sub_posts() {
            
            if (!subPost) return;
            
            const data = formatPost(subPost);
            
            let response = await get_sub_posts(data);
            
            if (response) {
                let clone_subPost = formatPost(structuredClone(subPost));
                
                response.forEach(sub_post => {
                    sub_post.past_hash = getSubPostHash(clone_subPost);
                });
                
                setPosts(response);
            } else {
                setPosts([]);
            }
        }
        sub_posts();
    }, [subPost, refresh])

    function handlePostSent() {
        setSubPost(prev => {
            
            const lastPost = nthPost(prev, -1);
            
            lastPost.posts += 1; 
            
            return prev;
        });
        setRefresh(prev => !prev);
    }

    return (
        <>
            <div className="px-3 py-5">
                <Post post={nthPost(subPost, -1)} />
            </div>
            <div className='flex flex-col gap-5 pl-8 pr-4 pb-5'>
                <SendPost Topic={Topic} sub_post={formatPost(subPost)} onPostSent={handlePostSent} />
                {posts.map((sub_post, index) => (
                    <Post post={sub_post} key={index}/>
                ))}
            </div>
        </>
    );
} 