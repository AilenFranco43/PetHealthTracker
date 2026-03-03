

import React from 'react'


const InputForm = ({ id, label, type = 'text', value, onChange, placeholder = '', labelIcon = null, inputIcon = null }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-gray-700 flex items-center gap-2 mb-2">
        {labelIcon && <span>{labelIcon}</span>}
        <span>{label}</span>
      </label>

      <div className="relative">
        {inputIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{inputIcon}</span>}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground
dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-xl border px-3 py-3 text-base bg-gray-100
transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm 
file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm

focus-visible:px-4 focus-visible:py-2
focus-visible:border-gray-400 
focus-visible:ring-[4px] focus-visible:ring-gray-300/40

aria-invalid:border-destructive aria-invalid:ring-destructive/20 
${inputIcon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
};


export default InputForm;

