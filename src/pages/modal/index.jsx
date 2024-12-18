import React from 'react';
import { motion } from 'framer-motion';
import '../../assets/css/shine.css';
import '../../assets/css/border.css';
import Slider from './slider';
import { useState, useRef, useEffect } from 'react';


const Modal = ({unMountModal}) => {

    const [exitModal, setExitModal] = useState(false);
    const modalRef = useRef(null);

    
    
    const modalVariants = {
        hidden: {
            y: "-100vh",
        },
        visible: {
            y: "-10vh",
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 20,
            }
        },
        exit: {
            y: "100vh",
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 20,
            }
        }
    };

    useEffect(() => {
        if (exitModal) {
            if (modalRef.current) {
                modalRef.current.style.opacity = "0";
            }
            const timer = setTimeout(() => {
                unMountModal(true);
            }, 500);
    
          
          return () => clearTimeout(timer);
        }
      }, [exitModal, unMountModal]);


    return (
        <div ref={modalRef} className="fixed inset-0 flex items-center justify-center bg-[#090a0a] bg-opacity-75 transition-opacity duration-500">
            
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate= {exitModal ?  "exit" : "visible"}
                exit="exit"
            >
                <div className="bg-[#161718] rounded-xl relative r-xl cool-border shadow-box w-[550px] h-[500px] items-center justify-center">
                    <div className="w-full h-full rounded-xl">
                        <Slider setExitModal={setExitModal}/>
                    </div>
                    
                </div>
            </motion.div>
            
        </div>
    );
};

export default Modal;
