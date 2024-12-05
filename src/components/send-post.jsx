import { useAccount } from '@/store/auth/hooks';
import { get_time, sign, get_hash } from '@/wasm/wasm';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { base64ToHex, timestampToDate, hexToBase64, getPostHash, formatPost, getSubPostHash } from '@/utils/encoder';
import { get_user_posts } from '@/utils/requests';

export default function SendPost({ Topic, onPostSent, sub_post }) {
    const [timestamp, setTimestamp] = useState(get_time().toString());
    const [postButton, setPostButton] = useState(false);
    const [postText, setPost] = useState('');
    const [cursorStyle, setCursorStyle] = useState('default');
    const textareaRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(get_time().toString());
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        adjustTextareaHeight();
    }, [postText]);

    const account = useAccount();

    if (account?.profile_pic == null) return;

    const handleCopy = (copy) => {
        navigator.clipboard.writeText(copy)
        .then(() => {
            setCursorStyle('default');
            setTimeout(() => {
                setCursorStyle('copy');
            }, 1000);
        })
        .catch(err => {
            console.error('Failed to copy text:', err);
        });
    };

    function handlePost(postContent) {
        setPost(postContent);
        setPostButton(postContent.trim() !== '');

    }

    async function handlePostButton() {
        if (!postText.trim()) return;

        try {
            
            let post = {
                past_hash: null,
                pub_key: account.pub_key,
                subject: Topic,
                message: postText,
                time: timestamp,
                sign: null,
            };

            
            if (sub_post) {
                post.past_hash = getSubPostHash(sub_post);
            } else {
                const user_posts = await get_user_posts(account?.pub_key);
                const last_post = formatPost(user_posts[0]);
                post.past_hash = getPostHash(last_post)
            }

            const hash = getPostHash(post);
            post.sign = sign(base64ToHex(account.priv_key), hash);

            if (sub_post) {
                post = {
                    ...sub_post,
                    post: post
                }
            }

            console.log(post);
            
            const response = await fetch('http://192.168.1.25:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.value = '';
            }
            

            if (response.ok) {
                if (onPostSent) {
                    onPostSent();
                }
                setPost('');
                setPostButton(false);
                return true;
            } else {
                const errorText = await response.text();
                console.error('Server Error while posting: ', errorText);
                return false;
            }
            
            
        } catch (error) {
            console.error('Post Error: ', error);
            return false;
        }
        
    }
    

    function adjustTextareaHeight() {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    

    return (
        <div className="px-4 pt-3 gap-3 border border-[#2f3336] flex rounded-xl relative bg-black">
            <img src={account.profile_pic} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 w-[90%]">
                <header className="leading-5 flex items-center mb-0.5 gap-2">
                    <NavLink to={`/user/${account.username}`} className="hover:underline font-bold">
                        {account?.username}
                    </NavLink>
                    <div className="text-[#585858] flex items-center gap-1.5">
                        <div
                            className="overflow-hidden whitespace-nowrap text-ellipsis w-[150px]"
                            onClick={() => handleCopy(hexToBase64(account.pub_key))}
                            style={{ cursor: cursorStyle }}
                        >
                            @{hexToBase64(account.pub_key)}
                        </div>
                        <div>‧</div>
                        <div>{timestampToDate(timestamp)}</div>
                    </div>
                </header>

                <div className="pt-1 pb-3 w-[100%] overflow-hidden">
                    <textarea
                        ref={textareaRef}
                        className="w-full bg-[#000] text-white border text-[16px] pb-10  border-[#2f3336] rounded p-2 focus:outline-none resize-none overflow-hidden"
                        placeholder="What's going on..."
                        maxLength={2000}
                        onChange={(event) => handlePost(event.target.value)}
                    />
                    <button
                        className={`transition-all duration-300 ease-in-out bg-[#3b82f6] text-white rounded absolute left-[510px] bottom-7 px-4 ${
                            postButton ? 'opacity-100 max-h-[50px] visible' : 'opacity-0 max-h-0 invisible'
                        }`}
                        style = {{
                            padding: '0.15rem 1rem',
                            borderRadius: '0.25rem'
                        }}
                        onClick={handlePostButton}
                    >
                        Post
                    </button>
                    
                </div>
            </div>
        </div>
    );
}
