import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { create_key } from '../../../wasm/wasm';
import { div } from 'framer-motion/client';

export default function Register() {

    const [currentStep, setCurrentStep] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [keyBox, setKeyBox] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [key, setKey] = useState(get_key());
    const [copy, setCopy] = useState(false);
    const [icon, setIcon] = useState('copy');

    const dialogs = [
        "Hi! Welcome to Vate. I am your assistant, and I will help you.",
        "Vate is a web3.0 social media project. If you don't know about web3.0, don't worry. That's what I'm here for.",
        "Vate wants to offer a more decentralized structure than other social media platforms. It uses web 3.0 technology for this. Let's create a key for you",
        "When you feel ready, choose a random key. The key will be what identifies you. Remember that the secret key you choose is your only connection to Vate!",
        "Nice!! Now store the key where nobody can access. And never lose it."
    ];

    function get_key() {
        let priv_key = create_key().split(':')[1];
        const bytes = new Uint8Array(priv_key.length / 2);
        for (let i = 0; i < priv_key.length; i += 2) {
            bytes[i / 2] = parseInt(priv_key.slice(i, i + 2), 16);
        }
        const binaryString = String.fromCharCode(...bytes);
        return btoa(binaryString);
    }

    const animateText = (text) => {
        setIsAnimating(true);
        setDisplayedText('');
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index - 1]);
                index++;
            } else {
                setIsAnimating(false);
                clearInterval(interval);
            }
        }, 30);
    };

    useEffect(() => {
        if (currentStep < dialogs.length) {
            animateText(dialogs[currentStep]);
        }
    }, [currentStep]);

    const popOn = {
        hidden: {
            x: "120%",
            transition: {
                type: "spring",
                stiffness: 600,
                damping: 100,
            }
        },
        visible: {
            x: "0%",
            transition: {
                type: "spring",
                stiffness: 600,
                damping: 100,
            }
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(key).then(() => {
            setIcon('ok');
            setCopy(true);
            setCurrentStep(4);
            setTimeout(() => setIcon('copy'), 1000);
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    return (
        <div className="flex flex-col items-center mx-auto">
            <div className="flex items-center">
                <img src="/vate-rabbit.png" className="w-[150px] object-cover" alt="Rabbit" />
                <div className="grid">
                    <div className="bg-[#161718] p-4 ml-3 border border-[#fff] rounded shadow-lg relative w-[300px]">
                        <p className="text-left text-[#e6e9ec] text-[18px]">{displayedText}</p>
                    </div>
                    {currentStep === 0 && !isAnimating && (
                        <div className="flex justify-end mt-2 space-x-2">
                            <button 
                                className="flex right-2 bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setCurrentStep(1)}
                            >
                                Ok
                            </button>
                        </div>
                    )}
                    {currentStep === 1 && !isAnimating && (
                        <div className="flex justify-end mt-2 space-x-2">
                            <button 
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setCurrentStep(2)}
                            >
                                Help me
                            </button>
                            <button 
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={() => { setKeyBox(true); setCurrentStep(3); }}
                            >
                                Get a key
                            </button>
                        </div>
                    )}
                    {currentStep === 2 && !isAnimating && (
                        <div className="flex justify-end mt-2 space-x-2">
                            <button 
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={() => { setKeyBox(true); setCurrentStep(3); }}
                            >
                                Get a key
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {keyBox && (
                <div className="flex relative mt-10 items-center">
                    <div className="absolute -top-[16px] left-[30px] font-[Vate] text-[#a4a6a8] font-bold text-[13px]">Secret Key</div>
                    <div className="w-[30px] h-[30px] text-xl">🔑</div>
                    <div className="relative overflow-hidden">
                        <input 
                            className="w-[300px] h-9 bg-[#1b1d1f] text-white border border-[#2f3336] rounded px-2 focus:outline-none" 
                            type="text" 
                            id="secretKey"
                            value={key}
                            onChange={(e) => setKey(key)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        />
                        <motion.div
                            variants={popOn}
                            initial="hidden"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            animate={isHovered ? "visible" : "hidden"}
                            exit="hidden"
                            className="absolute top-1 right-1"
                        >
                            <button 
                                onClick={handleCopy}
                                className="rounded w-[28px] h-[28px] flex items-center justify-center hover:bg-[#3a3a3bfa] transition-colors bg-[#1b1d1f]"
                            >
                                {icon === 'copy' ? (
                                    <svg className="mr-0.5" viewBox="0 0 24 24" transform="matrix(-1, 0, 0, 1, 0, 0)">
                                        <path d="M15,17v3a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V8A1,1,0,0,1,4,7H7" fill="none" stroke="#959a9e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                        <rect x="7" y="3" width="12" height="14" rx="1" fill="none" stroke="#959a9e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                    </svg>
                                ) : (
                                    <svg fill="#31bd4f" viewBox="0 0 24 24">
                                        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237l-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path>
                                    </svg>

                                )}
                            </button>
                        </motion.div>
                    </div>
                    <div className="ml-1">
                        <button className="-mr-[1000px] rounded-full w-[40px] h-[40px] flex items-center justify-center hover:bg-[#eff3f427] transition-colors"
                            onClick={() => setKey(get_key())}
                        >
                            <svg className="mr-0.5" fill="#959a9e" height="28" width="28" viewBox="0 0 75 75" transform="rotate(180)">
                                <path d="M33.51,71.01c15.49,0,28.55-10.56,32.38-24.86h9.11L61.05,22,47.11,46.15h8c-3.44,8.56-11.83,14.63-21.61,14.63-12.84,0-23.28-10.44-23.28-23.28S20.66,14.22,33.5,14.22c6.6,0,12.57,2.77,16.81,7.2l5.26-9.11c-5.9-5.18-13.62-8.32-22.07-8.32C15.03,3.99,0,19.02,0,37.5S15.03,71.01,33.51,71.01Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {copy && (

                <div className="absolute right-12 bottom-7">
                    <button className="bg-blue-500 text-white px-8 py-1.5 rounded">
                        Next
                    </button>
                </div>

            )}
        </div>
    );
}
