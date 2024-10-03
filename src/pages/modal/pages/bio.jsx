import { useEffect, useState } from 'react';
import styles from './assets/Bio.module.css';

export default function Bio({ setNextButton }) {
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [warning, setWarning] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        const lines = value.split('\n');

        if (lines.length <= 4) {
            setBio(value);
        } else {
            const newBio = lines.slice(0, 4).join('\n');
            setBio(newBio);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    function checkUserName() {

        if (username == '') {setWarning('Username can not be empty'); return false;}

        if (username.length < 3) {setWarning('Username lenght is too short'); return false;}

        if (username.includes(' ')) {setWarning('Username can not contain whitespaces'); return false;}


        return true;
    }
    
    function checkBio() {

        if (bio == '') {setWarning('Bio can not be empty'); return false;}
        return true;
    }

    useEffect(() => {
        if (checkUserName() && checkBio()) {
            setNextButton(true);
        }
        else{
            
        }
    }, [username, bio]);


    return (
        <div className="flex flex-col">
            <div className="font-[Vate] p-5 -mt-5 text-[20px] text-center w-full">
                Biraz kendinden bahset!
            </div>
            <div className="flex border-t-2 border-[#2f3336]">
                <div>
                    <div className={`${styles['profile-img']} mt-5`}></div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    <input 
                        className="w-[320px] h-8 bg-[#1b1d1f] text-white border text-[18px] border-[#2f3336] rounded px-2 focus:outline-none" 
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        maxLength={20}
                    />
                    <textarea
                        className="w-[320px] h-[100px] bg-[#1b1d1f] text-white border text-[16px] border-[#2f3336] rounded p-2 focus:outline-none resize-none srollbar-hidden"
                        style={{ scrollbarWidth: 'none' }}
                        placeholder="Your Biography"
                        value={bio}
                        onChange={handleInputChange}
                        rows={4}
                        maxLength={130}
                    />
                </div>
            </div>
        </div>
    );
}
