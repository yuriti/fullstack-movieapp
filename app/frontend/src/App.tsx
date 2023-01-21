import React from "react";

// DEMO: https://www.youtube.com/watch?v=6Ij9PiehENA

const DEMO = {
    id: 133121,
    title: "Resident Evil: Damnation",
    backdropPath: "/6pRNDb0yStxlwhavn2ZqYRVFOJ5.jpg",
    posterPath: "/9T3u6laO3TRgJk4SFntt4UK1oXW.jpg",
    score: 7,
    releaseAt: "2012-09-25",
    trailer: "oOmbBrYGLBY",
};

const App: React.FC = () => {
    return (
        <div className="tw-relative tw-min-h-screen tw-flex tw-justify-center tw-items-center tw-from-[#FFFFFF00] tw-to-[#ed28635c] tw-bg-gradient-to-b">
            <div className="tw-absolute tw-opacity-20 tw-inset-0 tw-z-0">
                <img
                    className="tw-w-full tw-h-full tw-object-cover tw-object-right-bottom"
                    src="https://image.tmdb.org/t/p/original/6pRNDb0yStxlwhavn2ZqYRVFOJ5.jpg"
                    alt="Background"
                />
            </div>

            <div className="tw-relative tw-space-y-6 container tw-w-full tw-z-10">
                <div className="tw-flex tw-w-full tw-space-x-12">
                    <div className="tw-w-64 tw-flex-none"></div>
                    <div className="tw-flex tw-justify-between tw-items-end tw-w-full tw-min-w-0">
                        <h1 className="tw-truncate tw-text-4xl tw-font-black">{DEMO.title}</h1>
                        <div className="tw-text-xl tw-flex-none tw-bg-[#8565CD] tw-bg-opacity-30 tw-rounded-xl tw-px-4 tw-py-1">
                            {DEMO.score} / 10
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-w-full tw-space-x-12">
                    <div className="tw-w-64 tw-flex-none tw-bg-[#09011B] tw-bg-opacity-50 tw-rounded-3xl tw-overflow-hidden">
                        <img
                            className="tw-w-full tw-h-full tw-object-contain tw-object-center"
                            src="https://image.tmdb.org/t/p/original/9T3u6laO3TRgJk4SFntt4UK1oXW.jpg"
                            alt="Background"
                        />
                    </div>

                    <div className="tw-aspect-video tw-w-full tw-rounded-3xl tw-overflow-hidden tw-shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
                        <iframe
                            className="tw-w-full tw-h-full"
                            src="https://www.youtube.com/embed/6Ij9PiehENA?controls=1&autoplay=1&mute=1"
                            allow="autoplay"
                        ></iframe>
                    </div>
                </div>

                <div className="tw-flex tw-w-full tw-space-x-12">
                    <div className="tw-w-64 tw-flex-none"></div>
                    <div className="tw-flex tw-justify-around tw-w-full">
                        <button type="button" className="tw-bg-[#8565CD] tw-rounded-xl tw-w-48 tw-text-center tw-py-6">
                            <div className="tw-text-2xl tw-font-black tw-uppercase">Dislike</div>
                        </button>
                        <button type="button" className="tw-bg-[#ED2863] tw-rounded-xl tw-w-48 tw-text-center tw-py-6">
                            <div className="tw-text-2xl tw-font-black tw-uppercase">Like</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
