
import { osm, satellite, inlineSources } from "@versatiles/style";
import { renderToSVG } from "@versatiles/svg-renderer";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

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
];

const CUSTOM_TILESERVER =
    process.env.TILESERVER_URL ?? "https://tiles.openships.de";

const VERSATILES_SERVER = "https://tiles.versatiles.org";

const OUTPUT_DIR = resolve(process.cwd(), "public/style-previews");

// Preview location: Fehmarn
const LOCATION = {
    lon: 11.223829302106878,
    lat: 54.48427814929451,
    zoom: 11,
};

// Image dimensions
const IMAGE = {
    width: 400,
    height: 400,
};

async function generatePreview(theme) {
    console.log(`Generating preview: ${theme}`);

    let style;

    if (theme === "satellite") {
        style = satellite({
            urls: {
                base: VERSATILES_SERVER,
            },
            osmOverlay: true,
        });
    } else {
        style = osm({
            theme,
            text: {
                language: "de",
            },
            urls: {
                base: CUSTOM_TILESERVER,
            },
        });
    }

    // Resolve TileJSON references
    const resolvedStyle = await inlineSources(style);

    // Render SVG
    const svg = await renderToSVG({
        style: resolvedStyle,
        ...IMAGE,
        ...LOCATION,
        renderLabels: true,
    });

    // Save SVG
    const outputPath = resolve(OUTPUT_DIR, `${theme}.svg`);

    await writeFile(outputPath, svg, "utf8");

    console.log(`Generated: ${outputPath}`);
}

async function main() {
    await mkdir(OUTPUT_DIR, { recursive: true });

    console.log(`Generating ${themes.length} style previews...\n`);

    for (const theme of themes) {
        await generatePreview(theme);
    }

    console.log("\nAll previews generated successfully!");
}

main().catch((error) => {
    console.error("Preview generation failed:", error);
    process.exitCode = 1;
});
