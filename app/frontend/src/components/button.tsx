import React from "react";
import classNames from "classnames";

interface Props extends React.ComponentProps<"button"> {
    isLoading?: boolean;
}

const Button: React.FC<Props> = ({ isLoading, className, children, ...props }) => (
    <button
        type="button"
        {...props}
        className={classNames(
            className,
            "tw-rounded-xl tw-h-16 tw-flex tw-items-center tw-justify-center",
            isLoading && "tw-animate-pulse"
        )}
    >
        <div className={classNames("tw-text-2xl tw-font-black tw-uppercase", isLoading && "tw-opacity-30")}>
            {children}
        </div>
    </button>
);

export default Button;
