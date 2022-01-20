import './InputFile.css'
import React from 'react'

export default function InputFile({onChange, name, type, className}) {
    return (
        <div className="form-group">
            <input
                onChange={onChange}
                name={name}
                type={type}
                className={`custom-file-input ${className}`}
            />
        </div>
    )
}

