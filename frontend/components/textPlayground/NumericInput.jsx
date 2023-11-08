"use client";

export default function NumericInput({ value, placeholder, disabled, callback, className}) {

    const minValue = value.min;
    const maxValue = value.max;
    const currentValue = value.value;

    const handleValueChange = (e) => {
        let value = e.target.value;

        if (isNaN(value)) { value = ""; } 
        else if (value > maxValue) { value = maxValue; }
        
        callback({ min: minValue, max: maxValue, value: value });
    };

    const handleValueBlur = (e) => {
        let value = e.target.value;

        if (isNaN(value) || value === "") { value = placeholder; }
        else if (value < minValue) { value = minValue; }
        else if (value > maxValue) { value = maxValue; }
        
        callback({ min: minValue, max: maxValue, value: value });
    };

    return (
        <div className={className}>
            <input
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                type="text"
                value={currentValue}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleValueChange}
                onBlur={handleValueBlur}
            />
        </div>
    );
};