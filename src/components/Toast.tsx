import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div 
      className={`toast ${type}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default Toast;