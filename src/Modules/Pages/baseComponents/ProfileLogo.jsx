import React from "react";
import { Image } from ".";
import { classNames, profileName } from "../../../utilities";
import { Camera } from "lucide-react";

export const ProfileLogo = ({
    base64Image = null,
    name = "? ?",
    className,
    type = 'logo'
}) => {    
    return (
        <>
            {base64Image ? (
                <div
                    className={classNames(
                        "profile-picture",
                        className ? className : ""
                    )}
                >
                    <Image
                        className=""
                        src={base64Image}
                        alt="user"
                    />
                </div>
            ) : (
                type === 'profile-image' ? (
                    <div
                        className={classNames(
                            "relative w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer group", // Added `group` class
                            className ? className : ""
                        )}
                    >
                        {/* Name/Initials with hover effect */}
                        <div className="group-hover:opacity-30 transition-opacity duration-500">
                            {name && profileName(name)}
                        </div>

                        {/* Camera Icon */}
                        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <Camera size={50} />
                        </div>
                    </div>
                ) : (
                    <span
                        className={classNames(
                            "flex justify-center items-center",
                            className ? className : ""
                        )}
                    >
                        {name && profileName(name)}
                    </span>
                )
            )}
        </>
    );
};

