import { API_URL } from "@/config/server";
import { ApiResponse } from "@/types/api-response";
import { VesselDestination } from "@/types/vessel-destination";

export async function getVesselDestination(
    mmsi: number
): Promise<ApiResponse<VesselDestination> | null> {
    const res = await fetch(`${API_URL}/api/v1/destinations/${mmsi}`, {
        next: {
            revalidate: 120,
        },
    });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error("Failed to fetch vessel destination");
    }

    return res.json() as Promise<ApiResponse<VesselDestination>>;
}
