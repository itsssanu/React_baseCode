import React from 'react';

export const PlusIcon = ({ fill, className, onClick, style = {}, isHovered }) => {

    return (
        <span
            className={` cursor-pointer ${className}`}
            style={style}
            onClick={onClick || (() => null)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={fill}><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
        </span>

    );
};