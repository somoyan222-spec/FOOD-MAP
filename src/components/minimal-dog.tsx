import React from "react";

export const MinimalDogIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="10" r="4" />
      <path d="M8 14a5 5 0 0 1 8 0" />
      <circle cx="10" cy="9" r="0.5" fill="currentColor" />
      <circle cx="14" cy="9" r="0.5" fill="currentColor" />
      <path d="M9 12h6" />
    </svg>
  );
};

export const MinimalPawPrint: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 20, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <circle cx="12" cy="14" r="3" fill="currentColor" opacity="0.15" stroke="none" />
      <circle cx="7" cy="10" r="2" fill="currentColor" opacity="0.15" stroke="none" />
      <circle cx="17" cy="10" r="2" fill="currentColor" opacity="0.15" stroke="none" />
      <circle cx="9" cy="7" r="1.5" fill="currentColor" opacity="0.15" stroke="none" />
      <circle cx="15" cy="7" r="1.5" fill="currentColor" opacity="0.15" stroke="none" />
    </svg>
  );
};
