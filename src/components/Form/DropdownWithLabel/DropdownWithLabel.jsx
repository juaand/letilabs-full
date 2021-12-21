import './DropdownWithLabel.css'
import React from 'react'

function DropdownWithLabel({label, placeholder, name, onChange, onBlur, className, data, list}) {

    return (
        <div className="form-group mt-5 DropdownWithLabel">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                placeholder={placeholder}
                list={list}
                name={name}
                id={name}
                onBlur={onBlur}
                onChange={onChange}
                className={className} />
            <datalist id={list}>
                {data.map(item => <option value={item} />)}
            </datalist>
        </div>
    )
}

export default DropdownWithLabel
