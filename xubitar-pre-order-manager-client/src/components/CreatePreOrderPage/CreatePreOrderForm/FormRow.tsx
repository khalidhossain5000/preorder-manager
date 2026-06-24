import React, { ReactNode } from 'react';

interface FormRowProps {
  title: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
  noBorder?: boolean;
}

export const FormRow: React.FC<FormRowProps> = ({ 
  title, 
  description, 
  required, 
  children, 
  noBorder = false 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-6 ${noBorder ? '' : 'border-b border-gray-100'}`}>
      <div className="md:col-span-1">
        <label className="block text-sm font-semibold text-gray-900">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
        {description && (
          <p className="mt-1 text-xs text-gray-500 leading-relaxed pr-4">
            {description}
          </p>
        )}
      </div>
      <div className="md:col-span-2 flex items-center">
        {children}
      </div>
    </div>
  );
};