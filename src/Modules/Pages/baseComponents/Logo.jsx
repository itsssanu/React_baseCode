import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '.';
import { classNames } from '../../../utilities';

export const Logo = (
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
            className={classNames('logo flex items-center justify-center', className ? className : '')}
            id={id}
            name={name}
            // onClick={onClick ? onClick : ""}
        >
            {/* <LogoIcon id={id} className={'mr-2'}/>
            <div className=''>
                <div type={'span'} className={"text insight-text pr-2"}>INSIGHT</div>
                <div type={'span'} className={"text"}>HEALTH</div>
            </div> */}

            {/* <NewInsightIcon id={id} className={'mr-2'}/> */}
            {/* <div className="text-2xl font-medium text-[#2F004B]">Wow Hostel</div> */}

        </div>
    )
}

