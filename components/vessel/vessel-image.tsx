import { MainIcon } from "@/lib/icons/main-icon";

export default function VesselImage({
    vesselMmsi,
    t,
    className,
}: {
    vesselMmsi: number;
    t: any;
    className?: string;
}) {
    return (
        <div
            className={`mx-3 my-2 flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-gray-200 dark:bg-black ${className ?? ""}`}
        >
            <MainIcon className="size-16 text-gray-500 dark:text-gray-200" />

            <span className="text-center text-sm text-gray-500 dark:text-gray-200">
                {t("General.NoVesselPhoto")}
            </span>
        </div>
    );
}