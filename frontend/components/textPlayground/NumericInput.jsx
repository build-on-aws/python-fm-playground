"use client";

export default function NumericInput({ value, range, placeholder, disabled, callback, className}) {

    const handleValueChange = (e) => {
        let newValue = e.target.value;

        if (isNaN(newValue)) { newValue = ""; } 
        else if (newValue > range.max) { newValue = range.max; }
        
        callback(newValue);
    };

    const handleValueBlur = (e) => {
        let newValue = e.target.value;

        if (isNaN(newValue) || newValue === "") { newValue = placeholder; }
        else if (newValue < range.min) { newValue = range.min; }
        else if (newValue > range.max) { newValue = range.max; }
        
        callback(newValue);
    };

    return (
        <div className={className}>
            <input
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                type="text"
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleValueChange}
                onBlur={handleValueBlur}
            />
        </div>
    );
};