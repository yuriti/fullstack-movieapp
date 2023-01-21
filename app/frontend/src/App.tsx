import { queryMoviePreferred, queryMovieRandom, queryMovieTrailer } from "features/movies/services";
import { useMutation, useQuery } from "@tanstack/react-query";

import AuthForm from "features/auth/components/form";
import Button from "components/button";
import { MOVIE_RATE } from "features/movies/enums";
import React from "react";
import Topline from "components/topline";
import YoutubeFrame from "components/youtube-frame";
import classNames from "classnames";
import { mutationMovieRate } from "./features/movies/services";
import { queryProfile } from "features/users/service";
import { useEffect } from "react";

const App: React.FC = () => {
    const { isSuccess: isProfileSuccess, isFetched: isProfileFetched } = useQuery(queryProfile());

    const {
        data: movie,
        refetch,
        isSuccess: isMovieSuccess,
        isLoading: isMovieLoading,
    } = useQuery({ ...(isProfileSuccess ? queryMoviePreferred() : queryMovieRandom()), enabled: isProfileFetched });

    const {
        data: tailer,
        isError: isTrailerError,
        isSuccess: isTrailerSuccess,
    } = useQuery({
        ...queryMovieTrailer({ movieId: movie?.id ?? -1 }),
        enabled: isMovieSuccess,
    });

    const { mutateAsync: mutateRate } = useMutation(mutationMovieRate());

    // The general status of the loading, taking into account the movie and trailer
    const isLoading = isMovieLoading || !isTrailerSuccess;

    // We make a repeat request if the trailer was not found
    useEffect(() => {
        if (!isMovieLoading && isTrailerError) {
            refetch();
        }
    }, [isMovieLoading, isTrailerError, refetch]);

    const handleRate = async (value: MOVIE_RATE) => {
        if (!isMovieSuccess) {
            return;
        }

        await mutateRate({ movieId: movie?.id, value });

        refetch();
    };

    return (
        <div className="tw-relative tw-min-h-screen tw-flex tw-justify-center tw-items-center tw-from-[#FFFFFF00] tw-to-[#ed28635c] tw-bg-gradient-to-b">
            {!isProfileSuccess && (
                <div className="tw-from-[#000000ba] tw-flex tw-items-center tw-justify-center tw-to-[#ed2863ba] tw-bg-gradient-to-b tw-fixed tw-inset-0 tw-z-20">
                    <AuthForm className="tw-w-[28rem]" />
                </div>
            )}

            {!isLoading && !!movie?.backdropPath && (
                <div className="tw-fixed tw-opacity-20 tw-inset-0 tw-z-0">
                    <img
                        className="tw-w-full tw-h-full tw-object-cover tw-object-bottom"
                        src={`https://image.tmdb.org/t/p/original/${movie.backdropPath}`}
                        alt={movie.title}
                    />
                </div>
            )}

            <Topline />

            <div className="tw-relative tw-space-y-6 container tw-w-full tw-z-10">
                <div className="tw-flex tw-w-full tw-space-x-12">
                    <div className="tw-w-64 tw-flex-none"></div>
                    <div className="tw-flex tw-justify-between tw-space-x-12 tw-items-end tw-w-full tw-min-w-0">
                        {isLoading ? (
                            <>
                                <div className="tw-animate-pulse tw-bg-[#09011B] tw-rounded-xl tw-h-14 tw-w-4/6"></div>
                                <div className="tw-animate-pulse tw-bg-[#09011B] tw-rounded-xl tw-h-14 tw-w-1/6"></div>
                            </>
                        ) : (
                            <>
                                <h1 className="tw-truncate tw-text-4xl tw-font-black">{movie?.title ?? "..."}</h1>
                                <div className="tw-text-base tw-flex-none tw-whitespace-nowrap tw-bg-[#8565CD] tw-uppercase tw-bg-opacity-30 tw-rounded-xl tw-px-4 tw-py-1">
                                    TMDB Rating: {movie?.score ?? 0} / 10
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="tw-flex tw-w-full tw-space-x-12">
                    <div
                        className={classNames(
                            "tw-w-64 tw-relative tw-flex-none tw-bg-[#09011B] tw-rounded-3xl tw-overflow-hidden tw-shadow-[0_8px_16px_rgba(0,0,0,0.2)]",
                            isLoading && "tw-animate-pulse"
                        )}
                    >
                        {!isLoading && !!movie?.posterPath && (
                            <>
                                <img
                                    className="tw-w-full tw-absolute tw-z-0 tw-inset-0 tw-h-full tw-object-cover tw-scale-150 tw-blur-md tw-object-center"
                                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                    alt="Background Blur"
                                />
                                <img
                                    className="tw-w-full tw-relative tw-z-10 tw-h-full tw-object-contain tw-object-center"
                                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                    alt={movie.title}
                                />
                            </>
                        )}
                    </div>

                    <div className="tw-aspect-video tw-w-full tw-rounded-3xl tw-overflow-hidden tw-shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
                        {isLoading ? (
                            <div className="tw-animate-pulse tw-bg-[#09011B] tw-w-full tw-h-full"></div>
                        ) : (
                            <div className="tw-bg-[#09011B] tw-w-full tw-h-full">
                                <YoutubeFrame
                                    title={movie?.title}
                                    src={tailer?.key}
                                    autoplay={false}
                                    mute
                                    className="tw-w-full tw-h-full"
                                ></YoutubeFrame>
                            </div>
                        )}
                    </div>
                </div>

                <div className="tw-flex tw-w-full tw-space-x-12">
                    <div className="tw-w-64 tw-flex-none"></div>
                    <div className="tw-flex tw-justify-around tw-w-full">
                        <Button
                            isLoading={isLoading}
                            className="tw-bg-[#8565CD] tw-w-48"
                            onClick={() => handleRate(MOVIE_RATE.DISLIKE)}
                        >
                            Dislike
                        </Button>
                        <Button isLoading={isLoading} className="tw-bg-[#6E6E6E] tw-w-48" onClick={() => refetch()}>
                            Refresh
                        </Button>
                        <Button
                            isLoading={isLoading}
                            className="tw-bg-[#ED2863] tw-w-48"
                            onClick={() => handleRate(MOVIE_RATE.LIKE)}
                        >
                            Like
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
