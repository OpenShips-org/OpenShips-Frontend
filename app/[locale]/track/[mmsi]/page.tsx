"use client";

import MainMap from "@/components/map/main-map";
import TimeControl from "@/components/map/time-control";
import "map-gl-style-switcher/dist/map-gl-style-switcher.css";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const { mmsi } = useParams<{ mmsi: string }>();

    const hour = 60 * 60 * 1000;

    const [from, setFrom] = useState(
        () => new Date(Date.now() - hour * 24 * 7)
    );

    const [to, setTo] = useState(() => new Date());

    // Erlaubter Gesamtzeitraum des Sliders
    const minTime = new Date(Date.now() - hour * 24 * 7); // 30 Tage
    const maxTime = new Date();

    return (
        <div className="h-dvh">
            <MainMap
                mode={{
                    type: "track",
                    mmsi: Number(mmsi),
                    from,
                    to,
                }}
                mapChildren={
                    <>
                        <TimeControl
                            minTime={minTime}
                            maxTime={maxTime}
                            from={from}
                            to={to}
                            onRangeChange={({ from, to }) => {
                                setFrom(from);
                                setTo(to);
                            }}
                        />
                    </>
                }
            />
        </div>
    );
}