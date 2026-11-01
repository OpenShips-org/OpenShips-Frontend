import { getVesselDetails } from "@/lib/server/vessel-data";
import { getVesselDestination } from "@/lib/server/destination";
import VesselImage from "@/components/vessel/vessel-image";
import { getTranslations } from "next-intl/server";
import { DestinationType } from "@/models/vessel-destination";
import { AisDataLicense } from "@/models/ais-data-license";
import { AisSource } from "@/models/ais-source";

type PageProps = {
    params: Promise<{
        locale: string;
        mmsi: string;
    }>;
};

export default async function Page({ params }: PageProps) {
    const { locale, mmsi } = await params;
    const tMap = await getTranslations("Map");
    const tAis = await getTranslations("AIS");

    const vesselDetails = await getVesselDetails(Number(mmsi));

    if (!vesselDetails?.data) {
        return (
            <div className="flex min-h-dvh flex-col items-center justify-center px-4">
                <div className="flex w-full flex-col rounded-lg bg-accent p-5 md:w-2/3 lg:w-1/2">
                    <span className="text-center text-lg font-medium text-gray-500 dark:text-gray-400">
                        {tMap("General.VesselNotFound")}
                    </span>
                </div>
            </div>
        );
    }

    const destinationData = await getVesselDestination(Number(mmsi));
    const destination = destinationData?.data;
    const destinationText = destination
        ? destination.destinationType === DestinationType.RoundTrip
            ? tAis("Destination.roundTrip", {
                  from: destination.fromName ?? tMap("General.Unknown"),
                  to: destination.toName,
              })
            : destination.destinationType === DestinationType.Directed
              ? destination.fromName
                  ? tAis("Destination.directed", {
                        from: destination.fromName,
                        to: destination.toName,
                    })
                  : tAis("Destination.directedWithoutFrom", {
                        to: destination.toName,
                    })
              : tAis("Destination.single", {
                    to: destination.toName,
                })
        : tMap("General.Unknown");

    const vessel = vesselDetails.data;

    const flagClass = vessel.flag?.code
        ? `fi fi-${vessel.flag.code.toLowerCase()}`
        : "";

    const unknown = tMap("General.Unknown");

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center px-4">
            <div className="flex w-full flex-col rounded-lg bg-accent p-5 md:w-2/3 lg:w-1/2">
                <div className="flex w-full flex-col gap-5 md:flex-row md:items-start">
                    {/* Bild */}
                    <VesselImage
                        vesselMmsi={Number(mmsi)}
                        t={tMap}
                        className="mx-0 w-full md:w-1/2"
                    />

                    {/* Details */}
                    <div className="flex w-full flex-col space-y-3 px-3 py-2 md:w-1/2">
                        {/* MMSI + FLAG */}
                        <div className="flex items-center justify-between">
                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.MMSI")}
                                </span>

                                <span className="font-medium">
                                    {vessel.mmsi}
                                </span>
                            </div>

                            {vessel.flag && (
                                <span
                                    className={`${flagClass} mr-3 scale-200 rounded-xs`}
                                    title={vessel.flag.name}
                                />
                            )}
                        </div>

                        {/* IMO + CALL SIGN */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.IMO")}
                                </span>

                                <span className="truncate font-medium">
                                    {vessel.imoNumber ?? unknown}
                                </span>
                            </div>

                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.CallSign")}
                                </span>

                                <span className="truncate font-medium">
                                    {vessel.callSign ?? unknown}
                                </span>
                            </div>
                        </div>

                        <hr className="mx-2 my-1" />

                        {/* DESTINATION + ETA */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.Destination")}
                                </span>

                                <span className="wrap-break-words font-medium">
                                    {destinationText}
                                </span>
                            </div>

                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.ETA")}
                                </span>

                                <span className="wrap-break-words font-medium">
                                    {vessel.eta
                                        ? new Intl.DateTimeFormat(locale, {
                                              dateStyle: "short",
                                              timeStyle: "short",
                                          }).format(new Date(vessel.eta))
                                        : unknown}
                                </span>
                            </div>
                        </div>

                        <hr className="mx-2 my-1" />

                        {/* DIMENSIONS */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.Draught")}
                                </span>

                                <span className="font-medium">
                                    {vessel.draught
                                        ? `${(vessel.draught / 10).toFixed(
                                              1
                                          )} m`
                                        : unknown}
                                </span>
                            </div>

                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.Length")}
                                </span>

                                <span className="font-medium">
                                    {vessel.length
                                        ? `${vessel.length} m`
                                        : unknown}
                                </span>
                            </div>

                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.Width")}
                                </span>

                                <span className="font-medium">
                                    {vessel.beam ? `${vessel.beam} m` : unknown}
                                </span>
                            </div>
                        </div>

                        <hr className="mx-2 my-1" />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex min-w-0 flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {tMap("General.AISSource")}
                                </span>
                                <span className="truncate font-medium">
                                    {AisSource[vessel.source ?? 0]}
                                </span>
                            </div>
                        </div>

                        {/* AIS DATA LICENSE */}
                        <div className="flex min-w-0 flex-col">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {tMap("General.AISDataLicense")}
                            </span>
                            <span className="truncate font-medium">
                                {AisDataLicense[vessel.license ?? 0]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
