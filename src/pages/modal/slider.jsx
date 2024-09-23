import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slides } from './slides';

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const goToLogin = () => {
        setCurrentSlide(2); // Adjust to the index for the Login slide
    };

    const goToRegister = () => {
        setCurrentSlide(1); // Adjust to the index for the Register slide
    };

    const goToBio = () => {
        setCurrentSlide(3); // Adjust to the index for the Bio slide
    };

    const goToPost = () => {
        setCurrentSlide(4); // Adjust to the index for the Post slide
    };

    const slideVariants = {
        hidden: { x: "100%" },
        visible: { x: 0, transition: { type: 'spring', stiffness: 120, damping: 20 }},
        exit: { x: "-100%", transition: { type: 'spring', stiffness: 120, damping: 20 }} 
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {React.createElement(slides[currentSlide], {
                    goToLogin,
                    goToRegister,
                    goToBio,
                    goToPost,
                })}
            </motion.div>
        </AnimatePresence>
    );
}
