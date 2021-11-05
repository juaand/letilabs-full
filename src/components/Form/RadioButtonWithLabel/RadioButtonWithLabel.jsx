import './RadioButtonWithLabel.css'
import React from 'react'

export default function RadioButtonWithLabel({data, name, onChange, label, tabindex}) {
    return (
        <div className="RadioButtonWithLabel form-group">
            <p className="RadioButtonWithLabel__label">{label}</p>
            <div className="RadioButtonWithLabel__radio-buttons">
                {
                    data?.sort().map(el =>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name={name} id={el} value={el} onChange={onChange} tabindex={tabindex}/>
                            <label className="form-check-label" htmlFor={el}>{el}</label>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
