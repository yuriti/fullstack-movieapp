import classNames from "classnames";
import { orderBy } from "lodash";
import { queryGenreFavorites } from "features/genres/services";
import { useQuery } from "@tanstack/react-query";

interface Props extends React.ComponentProps<"div"> {}

const FavoriteGenres: React.FC<Props> = ({ className, ...props }) => {
    const { data: genres } = useQuery({
        ...queryGenreFavorites(),
        select: (data) => orderBy(data, "score", "desc"),
    });

    if (!genres?.length) {
        return null;
    }

    return (
        <div className={classNames("tw-space-y-4", className)} {...props}>
            <div className="tw-text-2xl tw-font-black">Favorite genres:</div>
            <div className="tw-flex tw-gap-2 tw-flex-wrap">
                {genres?.map((genre) => (
                    <div
                        className="tw-whitespace-nowrap tw-bg-[#8565CD] tw-uppercase tw-bg-opacity-70 tw-rounded-xl tw-px-4 tw-py-1"
                        key={genre.id}
                    >
                        {genre.name} ({genre.score ?? 0})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteGenres;
