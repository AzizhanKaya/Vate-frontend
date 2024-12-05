import Post from '../../components/post';
import { get_time } from '@/wasm/wasm'
import { useState, useEffect } from "react"
import SendPost from "@/components/send-post.jsx"
import { SubPostContext } from "../../contexts/sub-post";
import { useContext } from "react";

export default function Flow({ Topic }) {

  const [posts, setPosts] = useState([]);
  const { refresh, setRefresh } = useContext(SubPostContext);

  useEffect(() => {
    async function get_posts() {
      

      try {

        let url;
        let last_post;

        if (posts.length != 0) {
          last_post = posts[0];
          url = `http://192.168.1.25:3000/posts?sub=${Topic}&t=${last_post.time}&d=true`;
        } else{
          const timestamp = get_time().toString();
          url = `http://192.168.1.25:3000/posts?sub=${Topic}&t=${timestamp}&d=false`;
        }

        const response = await fetch(url, {
          method: 'GET'
        });

        if (response.ok) {

          let data = await response.json();

          if (posts.length !== 0) {
            const merged_posts = [...data, ...posts];
            setPosts(merged_posts);
          } else {
            setPosts(data);
          }
          
        }

        else if(response.status == 404){
          console.log("No posts found on", Topic);
        }

        else {
          console.log("Server error while getting posts:", await response.text());
        }
        
      } catch (e) {
        console.log("Error while getting posts:", e.message);
      }
    }

    get_posts();
  }, [Topic, refresh]);

  const handlePostSent = () => {
    setRefresh((prev) => !prev);
  }

  return (
      <>

      <div className='mx-5 my-3'>
        <SendPost Topic={Topic} onPostSent={handlePostSent} />
      </div>

      <div className='flex flex-col gap-3 px-5 pb-5'>
        {!!posts && posts.map((post, index) => (
            <Post post={post} key={index} />
        ))}
      </div>
      
    </>
  );
}