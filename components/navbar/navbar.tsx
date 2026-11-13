import { Ship, Map, Anchor, Database } from "lucide-react";
import { getTranslations } from "next-intl/server";
import NavbarClient from "./navbar-client";

export async function Navbar() {
    const t = await getTranslations();

    const links = [
        {
            href: "/",
            icon: <Map className="size-5 shrink-0" />,
            label: t("Navbar.Map"),
        },
        {
            href: "/vessels",
            icon: <Ship className="size-5 shrink-0" />,
            label: t("Navbar.Vessels"),
            dropdownItems: [
                { href: "/vessels/overview", label: t("Navbar.VesselsOverview") },
                { href: "/vessels/search", label: t("Navbar.VesselsSearch") },
                { href: "/vessels/fleet", label: t("Navbar.VesselsFleet") },
            ]
        },
        {
            href: "/ports",
            icon: <Anchor className="size-5 shrink-0" />,
            label: t("Navbar.Ports"),
            dropdownItems: [
                { href: "/ports/overview", label: t("Navbar.PortsOverview") },
                { href: "/ports/search", label: t("Navbar.PortsSearch") },
                { href: "/ports/ports", label: t("Navbar.PortsList") },
            ]
        },
        {
            href: "/open-data",
            icon: <Database className="size-5 shrink-0" />,
            label: t("Navbar.OpenData"),
            dropdownItems: [
                { href: "/open-data/seaports", label: t("Navbar.Seaports") },
            ]
        },
    ];

    return <NavbarClient title={t("Navbar.Navigation")} links={links} />;
}
