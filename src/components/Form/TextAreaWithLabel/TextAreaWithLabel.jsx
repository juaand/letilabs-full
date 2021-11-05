import './TextAreaWithLabel.css'
import React from 'react'

function TextAreaWithLabel({onChange, value, name, rows, className, placeholder, label, tabindex}) {
    return (

        <div className="TextAreaWithLabel form-group">
            <label className="label" htmlFor={name}>{label}</label>
            <textarea name={name} type="text" className={className} id={name}
                placeholder={placeholder} value={value} rows={rows} onChange={onChange} tabindex={tabindex} />
        </div>
    )
}

export default TextAreaWithLabel
