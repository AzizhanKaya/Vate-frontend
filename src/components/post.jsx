import '../assets/css/fade.css';
import Verify from './verify'
import SubPost from './sub-post';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { hexToBase64 } from '@/utils/encoder'
import { timestampToDate, formatPost } from '../utils/encoder';
import { useContext } from 'react';
import { SubPostContext } from '../contexts/sub-post';


export default function Post({ post }) {

    const [ cursorStyle, setCursorStyle ] = useState('default');
    const { subPost , setSubPost } = useContext(SubPostContext);


    if (!post.account || !post.message) {
      return;
    }

    let img_src;
    if (post.account.img_type != null) {
      img_src = `http://192.168.1.25:3000/${post.account.pub_key}/pp.${post.account.img_type}`
    } else {
      img_src = `/profile-image.png`
    }

    const handleCopy = (copy) => {
      navigator.clipboard.writeText(copy)
          .then(() => {
              setCursorStyle('copy');

              
              setTimeout(() => {
                  setCursorStyle('default');
              }, 500);
          })
          .catch(err => {
              console.error('Failed to copy text:', err);
          });
    };

    function handleSubPost() {
      
      if (!subPost) {
        setSubPost(post);
      }
      else {
        setSubPost(prevSubPost => ({
          ...prevSubPost,
          post: post
        }));
      }
    }

    
  
    return (
      <div className="px-4 pt-3 gap-3 border border-[#2f3336] flex rounded-xl bg-black z-10">
        <img src={img_src} className="w-10 h-10 rounded-full object-cover" alt="" />
        <div className="flex-1 max-w-[%90]">
            <header className="leading-5 flex gap-2 items-center mb-0.5">
                <NavLink to={`/user/${post.account.username}`} className="hover:underline font-bold">
                    {post.account.username}
                </NavLink>
                <div className="text-[#585858] flex items-center gap-1.5">
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis w-[150px]"
                      onClick={() => handleCopy(hexToBase64(post.account.pub_key))}
                      style={{ cursor: cursorStyle }}
                      onMouseEnter={() => {setCursorStyle('pointer')}}
                    >
                        @{hexToBase64(post.account.pub_key)}
                    </div>
                    <div>‧</div>
                    <div>{timestampToDate(post.time)}</div>
                </div>
                
                <Verify post={formatPost(post)} />
                
            </header>
            <div className="break-words hyphens-manual">

              {post.message}

            </div>

            <div className="flex -ml-1.5 mt-1.5">
              <div className="flex-1 group flex items-center gap-px" onClick={() => handleSubPost()}>
                <div className="w-8 h-8 transition-colors flex items-center justify-center rounded-full">
                  <svg viewBox="0 0 24 24" className="h-[1.172rem]">
                    <path
                      fill="#71767b"
                      d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
                    />
                  </svg>
                </div>
                <span className="text-[14px] transition-colors text-[#71767b] group-hover:text-[#1d9bf0]">{post.posts}</span>
              </div>
              <div className="flex-1 group flex items-center gap-px">
                <div
                  className="w-8 h-8 transition-colors flex items-center justify-center rounded-full group-hover:text-[#f91880]">
                  <svg viewBox="0 0 24 24" className="h-[1.172rem]">
                    <path
                      fill="#71767b"
                      d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                    />
                  </svg>
                </div>
                <span className="text-[14px] transition-colors text-[#71767b] group-hover:text-[#f91880]">{post.likes}</span>
              </div>
              <div className="w-[2.172rem] h-[2.172rem] transition-colors flex items-center justify-center hover:bg-[#1d9bf01a] rounded-full hover:text-[#1d9bf0]">
                <svg viewBox="0 0 24 24" className="h-[1.172rem]">
                  <path
                    fill="#71767b"
                    d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
                  />
                </svg>
              </div>
            </div>
        </div>
      </div>
    );
  }