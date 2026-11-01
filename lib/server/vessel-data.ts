import { API_URL } from "@/config/server";
import { ApiResponse } from "@/models/api-response";
import { VesselDetailResponse } from "@/models/vessel-detail-response";

export async function getVesselDetails(
    mmsi: number
): Promise<ApiResponse<VesselDetailResponse>> {
    const res = await fetch(`${API_URL}/api/v1/vessels/details/${mmsi}`, {
        next: {
            revalidate: 120,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch vessel details data");
    }

    return res.json();
}
