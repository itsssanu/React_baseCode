import React from 'react'
import { classNames } from '../../../utilities'

export const Button = (
    {
        type,
        children,
        id,
        name,
        className,
        isLoading,
        disabled = false,
        onClick
    }
) => {
    return (
        <button
            type={type}
            id={id}
            name={name}
            className={classNames('btn text-[#fff]', className ? className : '', disabled || isLoading ? `disabled-${name}-btn` : '')}
            disabled={disabled || isLoading ? true : false}
            onClick={onClick}
        >
        </button>
    )
}