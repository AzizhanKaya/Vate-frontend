import React, { useState } from "react";
import { slides } from "./slides";
import "./slider.css";

const Slider = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [nextButton, setNextButton] = useState(false);
  const [isSliding, setSliding] = useState(false);

  const goToLogin = () => {
    setCurrentPage(0);
    setNextPage(-1);
    setSliding(true);
  };

  const goToRegister = () => {
    setCurrentPage(0); 
    setNextPage(1);
    setSliding(true);
  };

  const handleAnimationEnd = () => {
    setCurrentPage((prev) => {
      const newPage = prev + 1;
      setNextPage(newPage+1);
      console.log(newPage);
      return newPage;
    })
    setSliding(false); 
  };

  function handleNext(){
    setSliding(true);
    setNextButton(false);
  }

  const CurrentComponent = slides[currentPage];
  const NextComponent = slides[nextPage];

  return (
    <div className="slider w-full h-full p-16 flex justify-center items-center">
      
        <div
          className="absolute"
          style={{
            animation: isSliding ? 'slide-out 0.5s forwards' : ''
          }}
          onAnimationEnd={isSliding ? handleAnimationEnd : null}
        >
          <CurrentComponent
            goToLogin={goToLogin}
            goToRegister={goToRegister}
            setNextButton={setNextButton}
          />
        </div>

        {NextComponent && (
          <div
            className="absolute next-page"
            style={{
              animation: isSliding ? 'slide-in 0.5s forwards' : ''
            }}
          >
            <NextComponent />
          </div>
        )}
      

      {nextButton && (
        <button className="next-button"
          onClick={handleNext}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Slider;