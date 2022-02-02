import './TextAreaWithLabel.css'
import React from 'react'

function TextAreaWithLabel({onChange, value, name, rows, cssStyle, placeholder, label, tabIndex}) {
    return (

        <div className="TextAreaWithLabel form-group">
            <label className="label" htmlFor={name}>{label}</label>
            <textarea name={name} type="text" className={cssStyle} id={name}
                placeholder={placeholder} value={value} rows={rows} onChange={onChange} tabIndex={tabIndex} />
        </div>
    )
}

export default TextAreaWithLabel
