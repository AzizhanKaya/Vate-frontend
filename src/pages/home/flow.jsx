import Post from '../../components/post';
import { get_time } from '@/wasm/wasm'
import { useState, useEffect, useRef } from "react"
import SendPost from "@/components/send-post.jsx"

export default function Flow({ Topic }) {

  const [posts, setPosts] = useState([]);
  const prevTopicRef = useRef();
  

  async function get_posts(reset) {

    try {

      let url;
      let last_post;

      if (posts.length == 0 || reset) {
        const timestamp = get_time().toString();
        url = `http://192.168.1.25:3000/posts?sub=${Topic}&t=${timestamp}&d=false`;
      } else{
        last_post = posts[0];
        url = `http://192.168.1.25:3000/posts?sub=${Topic}&t=${last_post.time}&d=true`;
      }

      const response = await fetch(url, {
        method: 'GET'
      });

      if (response.ok) {

        let data = await response.json();

        if (posts.length == 0 || reset) {
          setPosts(data);
        } else {
          const merged_posts = [...data, ...posts];
          setPosts(merged_posts);
        }
        
      }

      else if(response.status == 404){
        console.log("No posts found on", Topic);

        if(reset) {
          setPosts([]);
        }
      }

      else {
        console.log("Server error while getting posts:", await response.text());
      }
      
    } catch (e) {
      console.log("Error while getting posts:", e.message);
    }
  }

  useEffect(() => {

    if (prevTopicRef.current !== Topic) {
        get_posts(true);
        return;
    }

    prevTopicRef.current = Topic;
    get_posts(false);

  }, [Topic]);

  function handlePostSent() {
    get_posts();
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