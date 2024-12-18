import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { verify } from '@/wasm/wasm';
import { getPostHash } from '../utils/encoder';

export default function Verify({ post }) {

  const [showText, setShowText] = useState(false);
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    const hash = getPostHash(post);
    const isVerified = verify(post.pub_key, hash, post.sign);
    setVerified(isVerified);
  }, [post]);

  return (
    <div
      className="ml-auto relative"
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      {verified ? (
        <svg
          width="15"
          height="15"
          viewBox="8 8 84 84"
        >
          <circle cx="50" cy="50" r="40" strokeWidth="3" fill="#05995b" />
          <path
            d="M30 50 L45 65 L70 35"
            stroke="white"
            strokeWidth="9"
            fill="none"
          />
        </svg>
      ):(<svg viewBox="-20 -20 550 550" width="18" height="18">
        <circle cx="256" cy="256" r="246" fill="red" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="30"/>
        <line x1="371.47" y1="140.53" x2="140.53" y2="371.47" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="40"/>
        <line x1="371.47" y1="371.47" x2="140.53" y2="140.53" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="40"/>
    </svg>)}

      <Transition
        show={showText}
        enter="transition duration-200 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <div className="absolute text-center bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-[#090a0ac7] border border-[#2f3336] text-[#9fa3a7] text-sm rounded-l p-1">
          {verified ? "Signature verified." : "Signature not verified."}
        </div>
      </Transition>
    </div>
  );
}
