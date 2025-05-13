import React from 'react';
import { SecurityItem } from './SecurityItem';
import { Card } from './ui/card';

type PracticeItem = {
  text: string;
  isRecommended: boolean;
};

type SecurityBestPracticesProps = {
  title?: string;
  items: PracticeItem[];
  className?: string;
};

export const SecurityBestPractices = ({ title, items, className = '' }: SecurityBestPracticesProps) => {
  return (
    <Card className={`p-4 dark:border-slate-700 ${className}`}>
      {title && (
        <h3 className="text-base font-semibold mb-3 dark:text-white">{title}</h3>
      )}
      <div className="space-y-0.5">
        {items.map((item, index) => (
          <SecurityItem key={index} isRecommended={item.isRecommended}>
            {item.text}
          </SecurityItem>
        ))}
      </div>
    </Card>
  );
}; 