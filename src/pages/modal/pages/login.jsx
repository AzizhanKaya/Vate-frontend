import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { priv_to_pub } from '@/wasm/wasm';
import { set_keys, setProfilePic, setAccount } from '@/store/auth';
import {  base64ToHex } from '@/utils/encoder';
import { clearAllLikes } from '@/utils/database';

export default function Login({setExitModal}){

    const [loginButton, setLoginButton] = useState(false);
    const [key, setKey] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();

    function handleKey(event){
      setKey(event.target.value);
      if(event.target.value){
        setLoginButton(true);
      }
    }

    async function handleLogin() {

      try{

        if (!key) return;
    
        const pub_key = priv_to_pub(base64ToHex(key));
        dispatch(set_keys({ pub_key: pub_key, priv_key: key }));
    
        if (rememberMe) {
          localStorage.setItem("privateKey", key);
        } else {
          await clearAllLikes();
        }
    
        const url = `http://192.168.1.25:3000/user/${pub_key}`;
        const response = await fetch(url, {
          method: 'GET'
        });
    
        if (response.ok){
    
          const data = await response.json();
          dispatch(setAccount({ username: data.username }));
          const img_type = data.img_type; 
          if (img_type != null) {
            dispatch(setProfilePic({ profile_pic: `http://192.168.1.25:3000/${pub_key}/pp.${img_type}`}));
          }else{
            dispatch(setProfilePic({ profile_pic: '/profile-image.png'}));
          }
          
          setExitModal(true);
        }else {
          
          console.log('Login Error:', await response.text());
        }
      }
      catch(err){
        console.log(err.message);
      }
    }

    useEffect(() => {
      const savedKey = localStorage.getItem("privateKey");
      if (savedKey) {
        setRememberMe(true);
        setKey(savedKey);
        setLoginButton(true);
      }
    }, []);

    return (
      <div className="flex flex-col items-center mt-[100px]">
      <div className="font-[Vate] p-3 text-[25px] mb-2">
        Login with your key!
      </div>
    
      <div className="border-t-2 border-[#2f3336] p-10 pb-2 flex items-center">
        <div className="w-[30px] h-[30px] text-xl relative">🔑</div>
        <input 
          className="w-[320px] h-9 bg-[#1b1d1f] text-white border border-[#2f3336] rounded px-2 focus:outline-none ml-1"
          style={{ fontFamily: 'Space Mono, monospace'}}
          type="password" 
          id="secretKeyLogin"
          onChange={handleKey}
          value={key}
        />
      </div>
    
      <div className="flex  gap-2 w-[275px]">
        <input onChange={(e) => setRememberMe(e.target.checked)} checked={rememberMe} type="checkbox" id="rememberMe" className="h-4 w-4 bg-black" />
        <label htmlFor="rememberMe" className="text-sm text-[#959697] cursor-pointer font-[Vate]">
          Remember me
        </label>
      </div>
    
      <button
        className={`next-button ${loginButton ? 'fade-in' : 'fade-out'}`}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
    
      );
}


