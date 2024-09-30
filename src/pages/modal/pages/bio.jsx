import styles from './assets/Bio.module.css';
import { useState } from 'react';

export default function Bio() {
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');

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

    return (
        <div className="w-full h-full relative">
            <div className="font-[Vate] absolute left-1/2 transform -translate-x-1/2 p-5 -mt-5 text-[20px] text-center w-full">
                Biraz kendinden bahset!
            </div>
            <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-10 border-t-2 border-[#2f3336]">
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
