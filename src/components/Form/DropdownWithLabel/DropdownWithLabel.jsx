import './DropdownWithLabel.css'
import React from 'react'

function DropdownWithLabel({label, name, onChange, onBlur, className, data, list}) {
    return (
        <div className="form-group mt-5 DropdownWithLabel">
            <label for={name} className="label">
                {label}
            </label>
            <input
                list={list}
                name={name}
                id={name}
                onBlur={onBlur}
                onChange={onChange}
                className={className} />
            <datalist id={list}>
                {data.map(item => <option value={item.name} />)}
            </datalist>
        </div>
    )
}

export default DropdownWithLabel
