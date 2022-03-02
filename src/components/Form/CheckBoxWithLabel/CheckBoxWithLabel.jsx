import './CheckBoxWithLabel.css'
import React from 'react'

const CheckBoxWithLabel = ({data, name, onChange, label, styleClass}) => {

    return (
        <div className="CheckBoxWithLabel ">
            {label && <label className="label-title" htmlFor={name}>{label}</label>}
            <div className="CheckBoxWithLabel row">
                {
                    data?.map(el =>
                        <div className={`form-check ${styleClass ? styleClass : 'col'}`}>
                            <input className="form-check-input" type="checkbox" name={el} id={el} value={el} onChange={onChange} />
                            <label className="form-check-label" htmlFor={el}>{el}</label>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CheckBoxWithLabel
