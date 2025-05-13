import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

type SecurityItemProps = {
  isRecommended: boolean;
  children: React.ReactNode;
};

export const SecurityItem = ({ isRecommended, children }: SecurityItemProps) => {
  return (
    <div className="flex items-start gap-2 mb-2">
      {isRecommended ? (
        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      )}
      <div className="text-slate-800 dark:text-slate-300">{children}</div>
    </div>
  );
}; 