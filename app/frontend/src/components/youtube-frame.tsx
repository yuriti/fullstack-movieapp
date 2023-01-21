import React from "react";

interface Props extends Omit<React.ComponentProps<"iframe">, "allow"> {
    autoplay?: boolean;
    mute?: boolean;
}

const YoutubeFrame: React.FC<Props> = ({ src, autoplay, mute, ...props }) => {
    return (
        <iframe
            {...props}
            src={`https://www.youtube.com/embed/${src}?controls=1&autoplay=${autoplay ? 1 : 0}&mute=${mute ? 1 : 0}`}
            allow={[autoplay && "autoplay"].filter(Boolean).join("; ")}
        />
    );
};

export default YoutubeFrame;
