
import React from 'react';

interface ReactionButtonProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export const ReactionButton = ({ 
  icon, 
  label, 
  count, 
  active, 
  onClick 
}: ReactionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full border transition-colors ${
        active 
          ? 'bg-primary/10 border-primary/30 text-primary' 
          : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span>{icon}</span>
      <span className="text-xs font-medium">{label}</span>
      {count > 0 && (
        <span className="text-xs font-semibold bg-white px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};
