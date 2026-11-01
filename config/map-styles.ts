
import type { StyleItem } from "map-gl-style-switcher/react-map-gl";

type MapStyle = StyleItem & {
    dark: boolean;
};

const versatilesThemes = [
    { id: "colorful", name: "Colorful", dark: false },
    { id: "natural", name: "Natural", dark: false },
    { id: "gray", name: "Gray", dark: false },
    { id: "gray-dark", name: "Gray Dark", dark: true },
    { id: "protostar", name: "Protostar", dark: false },
    { id: "protostar-dark", name: "Protostar Dark", dark: true },
    { id: "protozoa", name: "Protozoa", dark: false },
    { id: "fnord", name: "Fnord", dark: true },
    { id: "googol", name: "Googol", dark: false },
    { id: "satellite", name: "Satellite (Experimental)", dark: true },
] as const;

const versatilesStyles: MapStyle[] = versatilesThemes.map((theme) => ({
    id: `versatiles_${theme.id}`,
    name: theme.name,
    styleUrl: `/api/map-style?theme=${theme.id}&language=de`,
    image: `/style-previews/${theme.id}.svg`,
    dark: theme.dark,
}));

export const mapStyles: MapStyle[] = [
    ...versatilesStyles,
];
