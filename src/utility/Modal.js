import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export default function Modal({ isOpen, children, closeModal }) {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 300,
    },
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModalOnOutsideClick = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div
        className="modal_backdrop"
        ref={modalRef}
        onClick={closeModalOnOutsideClick}
      >
        <animated.div style={animation}>
          <div className="modal_content">{children}</div>
        </animated.div>
      </div>
    )
  );
}
