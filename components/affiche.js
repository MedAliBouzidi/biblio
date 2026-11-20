"use client";

import { useState } from "react";

export default function Affiche({ src, alt }) {
    const [cassee, setCassee] = useState(false);
    if (!src || cassee) {
        return (
            <div className="affiche bg-light d-flex align-items-center justify-content-center text-secondary small">
                Pas d&apos;affiche
            </div>
        );
    }

    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={src} alt={alt} className="affiche" onError={() => setCassee(true)} />;
}