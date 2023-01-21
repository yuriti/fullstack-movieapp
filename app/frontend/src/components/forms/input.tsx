import classNames from "classnames";

interface Props extends React.ComponentProps<"div"> {
    native: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    error?: string;
}

const FormInput: React.FC<Props> = ({ className, native, error, children, ...props }) => {
    const { className: classNameInput, ...input } = native;

    return (
        <div className={classNames(className)} {...props}>
            <label className="tw-relative tw-block">
                <input
                    className={classNames(
                        classNameInput,
                        "tw-peer tw-h-16 tw-w-full tw-border tw-bg-[#09011b] tw-pl-3 tw-text-lg tw-text-white tw-caret-[#1B72EA]",
                        input.disabled && "tw-pointer-events-none tw-cursor-not-allowed tw-opacity-60",
                        !!(children || input.placeholder) && "tw-pt-3.5 tw-placeholder-transparent",
                        error
                            ? "tw-border-[#FF5E5E] tw-transition-colors tw-duration-300"
                            : "tw-border-[#09011b] focus:tw-border-[#2C6BD9]"
                    )}
                    {...input}
                    placeholder={!!children ? "input" : input.placeholder}
                />
                {!!(children || input.placeholder) && (
                    <span className="tw-absolute tw-top-0 tw-bottom-0 tw-left-3 tw-flex -tw-translate-y-1/4 tw-select-none tw-items-center tw-text-[.6875rem] tw-text-[#949BB6] tw-transition-all tw-will-change-transform peer-placeholder-shown:tw-translate-y-0 peer-placeholder-shown:tw-text-lg peer-focus:-tw-translate-y-1/4 peer-focus:tw-text-[.6875rem]">
                        {children || input.placeholder}
                    </span>
                )}
            </label>
            {!!error && (
                <div className="tw-mt-1 tw-text-[.6875rem] tw-text-[#FF5E5E] tw-text-opacity-90 first-letter:tw-capitalize">
                    {error}
                </div>
            )}
        </div>
    );
};

export default FormInput;
