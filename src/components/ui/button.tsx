import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * @function Custom button
 * @param {ButtonProps} param0
 * @returns {JSX.Element}
 */
const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
}): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
