import { useState, useEffect } from 'react';
import Key from './key';
import Dialog from './dialog';

export default function Register({ setNextButton }) {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (copy) {
      setNextButton(true);
    }
  }, [copy]);

  return (
    <div className="flex flex-col items-center -mt-10">
      <div className="font-[Vate] p-3 text-[20px] mb-2">
        Hadi sana bir anahtar seçelim!
      </div>

      <div className="border-t-2 border-[#2f3336]">
        <Key setCopy={setCopy} />
      </div>

      <div className="mt-[50px]">
        <Dialog />
      </div>
    </div>
  );
}
