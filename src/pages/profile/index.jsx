import { useAccount } from '@/store/auth/hooks';
import Post from '../../components/post';
import styles from "./Profile.module.css"
import { useState, useEffect } from "react";
import { hexToBase64, timestampToDate } from '@/utils/encoder'
import { getUserInfo, get_user_posts } from '@/utils/requests'
import { useParams } from 'react-router-dom';


export default function Profile(){

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const Account = useAccount();
    let { pub_key } = useParams();
    
    useEffect(() => {

        async function fetchUser(pub_key) {
            if (!pub_key) setUser(null);

            const user = await getUserInfo(pub_key);
            const posts_json = await get_user_posts(pub_key);
            
            setPosts(posts_json);
            setUser(user);
        };

        pub_key = pub_key ||  Account.pub_key;

        fetchUser(pub_key);
    }, []);

    if (user?.username == null) return;
    let img_src = `http://192.168.1.25:3000/${user.pub_key}/pp.${user.img_type}`

    return(
        <div className="w-full h-full overflow-hidden">
            <div className={styles.header}>
                <div className={styles.banner}></div>
                <img src={img_src} className={styles.profileImage}/>
                <div className={styles.user_info}>
                  <div className="flex items-end gap-1">
                    <div className={styles.username}> {user?.username} </div>
                    <div className={styles.pubkey}> @{hexToBase64(user?.pub_key)} </div>
                    <p className={styles.time}> {timestampToDate(user?.time)} </p>
                  </div>
                  <p className={styles.bio}> {user?.bio} </p>
                </div>
            </div>

            <div className='flex flex-col gap-3 px-5 py-3'>
              {posts && posts.map((post, index) => <Post post={post} key={index} />)}
            </div>

        </div>
    )
}