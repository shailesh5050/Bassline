import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    isLoading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-700/50 shadow-2xl animate-scale-in">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full border border-red-500/30">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                    <p className="text-gray-400 leading-relaxed">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all duration-300 border border-gray-600/50 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-300 border border-red-500/30 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                Deleting...
                            </span>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;