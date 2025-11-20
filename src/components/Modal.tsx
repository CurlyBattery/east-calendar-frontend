import React, {type FC, type ReactNode} from "react";

interface ModalProps {
    children: ReactNode;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const Modal: FC<ModalProps> = ({ children, visible, setVisible }) => {
    const containerStyle: React.CSSProperties = {
        display: visible ? 'flex' : 'none',
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
    };

    const contentStyle: React.CSSProperties = {
        background: 'white',
        width: 300,
        height: 300,
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    };

    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        setVisible(false);
    }

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    return (
        <div
            style={containerStyle}
            onClick={handleClose}
        >
            <div
                style={contentStyle}
                onClick={handleContentClick} // Клик на содержимое не закрывает
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;