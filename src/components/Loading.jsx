import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = ({ type }) => {
    if (type === "mailCard") {
        return (
            <div className="flex m-2  bg-white rounded-xl">
                <Skeleton circle width={40} height={40} />
                <ul className="ml-2 w-full">
                    <li><Skeleton width={120} /></li>
                    <li><Skeleton width={180} /></li>
                    <li><Skeleton width={220} /></li>
                    <li><Skeleton width={150} /></li>
                </ul>
            </div>
        );
    }

    if (type === "mailBody") {
        return (
            <div className="flex m-4 bg-white rounded-xl h-fit">
                <div className="m-2">
                    <Skeleton circle width={40} height={40} />
                </div>
                <div className="mr-8 w-full">
                    <h1 className="my-2">
                        <Skeleton width={200} height={30} />
                    </h1>
                    <span className="my-2">
                        <Skeleton width={150} />
                    </span>
                    <div className="my-2">
                        <Skeleton count={5} />
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default Loader;
