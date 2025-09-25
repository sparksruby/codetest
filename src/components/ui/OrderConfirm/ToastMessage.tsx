import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessageProps {
  message: string;
  type?: ToastType;
  duration?: number; // milliseconds before auto-dismiss (default: 3000)
  className?: string;
  onClose?: () => void; // callback when closed (optional)
}

const iconMap = {
  success: <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />,
  error: <XCircle className="w-5 h-5 text-red-600 mr-2" />,
  info: <Info className="w-5 h-5 text-blue-600 mr-2" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />,
};

const bgMap = {
  success: "bg-teal-50 border-teal-200 text-teal-700",
  error: "bg-red-50 border-red-200 text-red-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
};

export const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  type = "success",
  duration = 3000,
  className = "",
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;
  return (
    <div className={`border rounded-lg p-4 mb-8 flex items-center transition-opacity ${bgMap[type]} ${className}`}>
      {iconMap[type]}
      <span className="font-semibold">{message}</span>
    </div>
  );
};