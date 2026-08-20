import React from 'react';
import { AlertCircle, X, Check } from 'lucide-react';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Yes, Proceed",
  cancelText = "Cancel",
  isDanger = true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100 opacity-100 border border-gray-100/50">
        
        {/* Header */}
        <div className={`p-6 border-b flex items-start space-x-4 ${isDanger ? 'bg-red-50/30 border-red-100/50' : 'bg-blue-50/30 border-blue-100/50'}`}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${isDanger ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="flex-grow pt-1">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/50 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200/50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 ${
              isDanger 
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-red-500/30' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30'
            }`}
          >
            <Check className="w-4 h-4 mr-2" />
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
