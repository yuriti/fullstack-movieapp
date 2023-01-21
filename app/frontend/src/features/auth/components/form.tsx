import * as yup from "yup";

import { mutationLogin, mutationRegister } from "features/auth/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "components/button";
import FormInput from "components/forms/input";
import { HTTP_STATUS } from "app/api";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props extends React.ComponentProps<"div"> {}

type FormValues = { username: string; password: string };

enum TAB {
    LOGIN,
    REGISTER,
}

const validationSchema = yup.object({
    username: yup
        .string()
        .matches(/^[a-zA-Z\-]+$/, { message: "Username can contain only letters or dash" })
        .min(3)
        .max(60)
        .required(),
    password: yup.string().min(3).max(120).required(),
});

const AuthForm: React.FC<Props> = ({ className, ...props }) => {
    const [tab, setTab] = useState(TAB.LOGIN);
    const client = useQueryClient();

    const { mutateAsync: mutateLogin } = useMutation(mutationLogin());
    const { mutateAsync: mutateRegister } = useMutation(mutationRegister());

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormValues>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (tab === TAB.LOGIN) {
            await mutateLogin(data).catch((error: Error) => {
                if (!("statusCode" in error)) {
                    setError("username", { message: "Something went wrong, try again" });
                    return false;
                }

                switch (error.statusCode) {
                    case HTTP_STATUS.NOT_FOUND:
                        setError("username", { message: "Username not found" });
                        break;

                    case HTTP_STATUS.BAD_REQUEST:
                        setError("password", { message: "Invalid password" });
                        break;
                }
            });
        } else {
            await mutateRegister(data).catch((error: Error) => {
                if ("statusCode" in error && error.statusCode === HTTP_STATUS.CONFLICT) {
                    setError("username", { message: "Username already exists" });
                } else {
                    setError("username", { message: "Something went wrong, try again" });
                }

                return false;
            });
        }

        await client.invalidateQueries(["profile"]);
    };

    return (
        <div
            {...props}
            className={classNames(
                className,
                "tw-flex-none tw-overflow-hidden tw-shadow-[0_8px_16px_rgba(0,0,0,0.2)] tw-rounded-3xl tw-bg-[#09011B] tw-from-[#2A0D2E] tw-to-[#170B28] tw-bg-gradient-to-b"
            )}
        >
            <div className="tw-flex">
                <TabItem active={tab === TAB.LOGIN} className="tw-w-full" onClick={() => setTab(TAB.LOGIN)}>
                    Sign in
                </TabItem>
                <TabItem active={tab === TAB.REGISTER} className="tw-w-full" onClick={() => setTab(TAB.REGISTER)}>
                    Sign up
                </TabItem>
            </div>
            <form className="tw-p-8 tw-space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    error={errors?.username?.message}
                    native={{ ...register("username"), className: "tw-rounded-xl", placeholder: "Username" }}
                />
                <FormInput
                    error={errors?.password?.message}
                    native={{
                        ...register("password"),
                        className: "tw-rounded-xl",
                        placeholder: "Password",
                        type: "password",
                    }}
                />
                <Button type="submit" className="tw-bg-[#ED2863] tw-w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
};

const TabItem: React.FC<{ active?: boolean } & React.ComponentProps<"div">> = ({
    children,
    className,
    active,
    ...props
}) => (
    <div
        {...props}
        className={classNames(
            className,
            "tw-border-b-4 tw-bg-opacity-10 hover:tw-bg-opacity-20 tw-cursor-pointer tw-h-24 tw-flex tw-items-center tw-justify-center tw-duration-500 tw-transition-colors",
            active
                ? "tw-border-[#ED2863] tw-bg-[#ED2863]"
                : "tw-border-[#8565CD] tw-bg-[#8565CD] tw-border-opacity-50 hover:tw-border-opacity-80"
        )}
    >
        <div className={classNames("tw-text-lg", active ? "tw-font-extrabold" : "tw-font-semibold")}>{children}</div>
    </div>
);

export default AuthForm;
