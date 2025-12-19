import React, {type FC, type ReactNode} from "react";
import {createPortal} from "react-dom";

const modalRoot = document.getElementById("modal-root")!;
interface ModalProps {
    children: ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    width?: number | string;
    height?: number | string;
    position?: 'center' | 'top-right';
}
const Modal: FC<ModalProps> = ({
                                   children,
                                   visible,
                                   setVisible,
                                   width,
                                   height,
                                   position = 'center' // По умолчанию центр
                               }) => {
    if(!visible) return null;

    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        setVisible(false);
    }

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    const overlayStyle: React.CSSProperties = position === 'top-right'
        ? {
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            zIndex: 1000,
        }
        : {
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
        };

    const contentStyle: React.CSSProperties = position === 'top-right'
        ? {
            position: 'absolute',
            top: '70px',
            right: '20px',
            background: '#2d2d2d',
            width: typeof width === 'number' ? `${width}px` : width || '320px',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            border: '1px solid #404040',
            animation: 'slideInFromTop 0.2s ease',
        }
        : {
            background: '#2d2d2d',
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
        };

   if(visible)  {
       return createPortal(
           <>
               <style>{`
                @keyframes slideInFromTop {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
               <div
                   style={overlayStyle}
                   onClick={handleClose}
               >
                   <div
                       style={contentStyle}
                       onClick={handleContentClick}
                   >
                       {children}
                   </div>
               </div>
           </>,
           modalRoot
       )
   }
    return null;
};

export default Modal;