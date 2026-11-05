import { NextRequest, NextResponse } from "next/server";
import { osm, satellite, inlineSources } from "@versatiles/style";

export const runtime = "nodejs";

const themes = [
    "colorful",
    "colorful-dark",
    "natural",
    "natural-dark",
    "muted",
    "muted-dark",
    "gray",
    "gray-dark",
    "toner",
    "toner-dark",
    "positrino",
    "positrino-dark",
    "protocol",
    "protostar",
    "protostar-dark",
    "protozoa",
    "fnord",
    "classic",
    "googol",
    "freedom",
    "macbob",
    "mactaylor",
    "bingo",
] as const;

type Theme = (typeof themes)[number];

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const requestedTheme = searchParams.get("theme") ?? "colorful";
    const language = searchParams.get("language") ?? "de";

    try {
        let style;

        if (requestedTheme === "satellite") {
            style = satellite({
                urls: {
                    base: "https://tiles.versatiles.org",
                },
                osmOverlay: true,
            });
        } else {
            if (!themes.includes(requestedTheme as Theme)) {
                return NextResponse.json(
                    { error: "Invalid theme" },
                    { status: 400 }
                );
            }

            style = osm({
                theme: requestedTheme as Theme,
                text: {
                    language,
                },
                urls: {
                    base: "https://tiles.openships.de",
                },
            });
        }

        const resolvedStyle = await inlineSources(style);

        return NextResponse.json(resolvedStyle);
    } catch (error) {
        console.error("Failed to generate map style:", error);

        return NextResponse.json(
            { error: "Failed to generate map style" },
            { status: 500 }
        );
    }
}
