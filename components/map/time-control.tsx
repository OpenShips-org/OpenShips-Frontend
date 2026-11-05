"use client";

import { Slider } from "@/components/ui/slider";

interface TimeControlProps {
    minTime: Date;
    maxTime: Date;
    from: Date;
    to: Date;
    currentTime?: Date;
    onRangeChange: (range: { from: Date; to: Date }) => void;
    onTimeChange?: (time: Date) => void;
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
});

export default function TimeControl({
    minTime,
    maxTime,
    from,
    to,
    currentTime,
    onRangeChange,
    onTimeChange,
}: TimeControlProps) {
    const handleRangeChange = (value: number | readonly number[]) => {
        if (!Array.isArray(value) || value.length !== 2) return;

        const [fromTimestamp, toTimestamp] = value;

        onRangeChange({
            from: new Date(fromTimestamp),
            to: new Date(toTimestamp),
        });
    };

    return (
        <div className="absolute bottom-6 left-1/2 z-10 w-[min(700px,calc(100%-2rem))] -translate-x-1/2 rounded-lg border bg-background/95 px-5 py-4 shadow-lg backdrop-blur">
            <Slider
                min={minTime.getTime()}
                max={maxTime.getTime()}
                step={60 * 1000}
                value={[from.getTime(), to.getTime()]}
                onValueChange={handleRangeChange}
            />

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{dateTimeFormatter.format(from)}</span>
                <span>{dateTimeFormatter.format(to)}</span>
            </div>
        </div>
    );
}
