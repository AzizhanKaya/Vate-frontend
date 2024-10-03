import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import '../../assets/css/shine.css';
import '../../assets/css/border.css';
import Slider from './slider';

const Modal = () => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.auth.currentAccount);
    

    React.useEffect(() => {
        if (currentAccount.priv_key) {
            return null;
        }
    }, [currentAccount.priv_key, dispatch]);

    

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
            transition: { ease: "easeInOut" }
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#090a0a] bg-opacity-75">
            
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                
            >
                <div className="bg-[#161718] rounded-xl relative r-xl cool-border shadow-box w-[550px] h-[500px] items-center justify-center">
                    <div className="w-full h-full rounded-xl">
                        <Slider />
                    </div>
                    
                </div>
            </motion.div>
            
        </div>
    );
};

export default Modal;
