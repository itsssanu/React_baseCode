import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '.';
import { classNames } from '../../../utilities';

export const CarePlanLoader = (
    {
        id,
        className,
        name,
        onClick,
    }
) => {
    const navigate = useNavigate();
    return (
        <div
            className={classNames('logo cursor-pointer flex items-center', className ? className : '')}
            id={id}
            name={name}
            onClick={onClick ? onClick : () => navigate('/')}
        >
            {/* <LogoIcon id={id} className={'pr-2'} /> */}
            <Text type={'span'} className={'text insight-text pr-2'}>Careplan</Text><Text type={'span'} className={'text'}>Loading</Text>
        </div>
    )
}

