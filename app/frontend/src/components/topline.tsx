import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { mutationLogout } from "features/auth/services";
import { queryProfile } from "features/users/service";

const Topline: React.FC = () => {
    const client = useQueryClient();

    const { data: profile } = useQuery(queryProfile());
    const { mutateAsync: mutateLogout } = useMutation(mutationLogout());

    const handleLogout = async () => {
        await mutateLogout();
        await client.resetQueries(["profile"]);
    };

    return (
        <div className="tw-fixed tw-top-0 tw-left-0 tw-z-30 tw-right-0 tw-bg-[#09011B]">
            <div className="container tw-mx-auto tw-flex tw-h-8 tw-items-center tw-justify-end tw-space-x-4">
                <div className="tw-text-sm">Hello, {profile?.username ?? "Anonymous"}</div>
                <div className="tw-text-sm tw-text-[#ED2863] tw-cursor-pointer tw-select-none" onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default Topline;
