import { getTranslations } from "next-intl/server";

import { SiGithub } from "@icons-pack/react-simple-icons";

import {
    ArrowDown,
    ArrowUpRight,
    Database,
    Globe2,
    MapPin,
    MapPinned,
    FileJson,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const GITHUB_URL = "https://github.com/OpenShips-org/SeaPorts";

export default async function SeaportsPage() {
    const t = await getTranslations("SeaportsPage");

    return (
        <main className="min-h-screen bg-white text-slate-950 transition-colors duration-300 dark:bg-[#0c0e0f] dark:text-white">
            {/* Hero */}
            <section className="relative flex min-h-170 flex-col justify-between overflow-hidden border-b border-slate-200 dark:border-white/10">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/videos/port-dusk-poster.jpg"
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/videos/port-dusk.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/45 dark:bg-black/55" />

                <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-end px-6 py-8 lg:px-12">
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur transition hover:bg-white/20"
                    >
                        <SiGithub className="size-4 shrink-0" />
                        <span>GitHub</span>
                        <ArrowUpRight className="size-3.5 shrink-0" />
                    </a>
                </div>

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-20 lg:px-12 lg:pb-28">
                    <div className="mb-8 flex items-center gap-3">
                        <span className="h-px w-8 bg-white/70" />
                        <span className="text-xs font-medium tracking-[0.25em] text-white/70 uppercase">
                            {t("eyebrow")}
                        </span>
                    </div>

                    <h1 className="max-w-4xl text-5xl leading-[1.08] font-semibold tracking-tight text-white sm:text-6xl lg:text-8xl">
                        {t("hero.title")}
                        <span className="block text-white/55">
                            {t("hero.titleAccent")}
                        </span>
                    </h1>

                    <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                        {t("hero.description")}
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-white/85"
                        >
                            <SiGithub className="size-4 shrink-0" />
                            <span>{t("hero.github")}</span>
                            <ArrowUpRight className="size-4 shrink-0" />
                        </a>

                        <a
                            href="#overview"
                            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/40 px-6 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                            {t("hero.explore")}
                            <ArrowDown className="size-4" />
                        </a>
                    </div>
                </div>

                <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-between px-6 pb-7 text-[10px] tracking-[0.2em] text-white/60 uppercase lg:px-12">
                    <span>OPENSHIPS / DATASETS</span>
                    <span>GLOBAL MARITIME DATA</span>
                </div>
            </section>

            {/* Overview */}
            <section
                id="overview"
                className="mx-auto max-w-7xl px-6 py-24 transition-colors duration-300 lg:px-12 lg:py-32"
            >
                <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
                    <div>
                        <p className="mb-5 text-xs font-medium tracking-[0.22em] text-slate-400 uppercase dark:text-white/40">
                            01 / {t("overview.label")}
                        </p>

                        <h2 className="max-w-lg text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
                            {t("overview.title")}
                        </h2>

                        <p className="mt-7 max-w-lg text-sm leading-7 text-slate-600 sm:text-base dark:text-white/55">
                            {t("overview.description")}
                        </p>

                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center gap-2 text-sm font-medium transition hover:opacity-60"
                        >
                            {t("overview.link")}
                            <ArrowUpRight className="size-4" />
                        </a>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            {
                                icon: Globe2,
                                title: t("overview.features.global.title"),
                                description: t(
                                    "overview.features.global.description"
                                ),
                            },
                            {
                                icon: MapPin,
                                title: t("overview.features.location.title"),
                                description: t(
                                    "overview.features.location.description"
                                ),
                            },
                            {
                                icon: Database,
                                title: t("overview.features.codes.title"),
                                description: t(
                                    "overview.features.codes.description"
                                ),
                            },
                            {
                                icon: MapPinned,
                                title: t("overview.features.boundaries.title"),
                                description: t(
                                    "overview.features.boundaries.description"
                                ),
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/2.5 dark:hover:border-white/20 dark:hover:bg-white/4.5"
                            >
                                <feature.icon className="mb-8 size-5 text-slate-500 dark:text-white/65" />
                                <h3 className="text-sm font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-white/45">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coverage */}
            <section className="relative min-h-115 overflow-hidden border-y border-slate-200 dark:border-white/10">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/videos/port-sunset.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/65" />

                <div className="relative z-10 mx-auto flex min-h-115 max-w-7xl flex-col justify-center px-6 py-20 lg:px-12">
                    <p className="mb-5 text-xs tracking-[0.22em] text-white/60 uppercase">
                        02 / {t("coverage.label")}
                    </p>

                    <h2 className="max-w-2xl text-4xl leading-tight font-semibold tracking-tight text-white sm:text-6xl">
                        {t("coverage.title")}
                    </h2>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                        {t("coverage.description")}
                    </p>

                    <div className="mt-10 flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full border border-white/25 bg-white/10">
                            <MapPin className="size-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">
                                {t("coverage.highlight")}
                            </p>
                            <p className="mt-1 text-xs text-white/55">
                                {t("coverage.highlightDescription")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Structure */}
            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
                <div className="mb-14">
                    <p className="mb-5 text-xs tracking-[0.22em] text-slate-400 uppercase dark:text-white/40">
                        03 / {t("structure.label")}
                    </p>
                    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        {t("structure.title")}
                    </h2>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 dark:text-white/50">
                        {t("structure.description")}
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#111415]">
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <FileJson className="size-4 text-slate-500 dark:text-white/50" />
                            <span className="text-xs font-medium text-slate-700 dark:text-white/75">
                                {t("structure.schema")}
                            </span>
                        </div>
                        <span className="text-[10px] tracking-widest text-slate-400 uppercase dark:text-white/35">
                            SEAPORT RECORD
                        </span>
                    </div>

                    <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 dark:divide-white/10">
                        {[
                            [
                                "01",
                                "Port Name",
                                "The official name of the seaport.",
                            ],
                            [
                                "02",
                                "UN/LOCODE",
                                "United Nations location identifier.",
                            ],
                            [
                                "03",
                                "Country",
                                "Country associated with the port.",
                            ],
                            [
                                "04",
                                "Latitude / Longitude",
                                "Geographic coordinates.",
                            ],
                            [
                                "05",
                                "Geographical Boundary",
                                "Polygon coordinates describing the port area.",
                            ],
                        ].map(([number, name, description]) => (
                            <div
                                key={number}
                                className="flex items-start gap-5 border-b border-slate-200 p-6 last:border-b-0 sm:even:border-l sm:even:border-slate-200 dark:border-white/10 dark:sm:even:border-white/10"
                            >
                                <span className="pt-0.5 font-mono text-xs text-slate-400 dark:text-white/30">
                                    {number}
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white/90">
                                        {name}
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-white/45">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-200 px-6 py-4 dark:border-white/10">
                        <p className="font-mono text-[10px] text-slate-400 dark:text-white/35">
                            {t("structure.note")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Status */}
            <section className="relative overflow-hidden border-y border-slate-200 dark:border-white/10">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/videos/port-container.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/75" />

                <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-12 lg:py-28">
                    <div>
                        <p className="mb-5 text-xs tracking-[0.22em] text-white/55 uppercase">
                            04 / {t("status.label")}
                        </p>
                        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            {t("status.title")}
                        </h2>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex gap-4">
                            <div className="mt-1 size-2 shrink-0 rounded-full bg-white/80" />
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {t("status.current.title")}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-white/65">
                                    {t("status.current.description")}
                                </p>
                            </div>
                        </div>

                        <div className="my-8 h-px bg-white/15" />

                        <div className="flex gap-4">
                            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-white/75" />
                            <div>
                                <p className="text-sm font-medium text-white">
                                    {t("status.disclaimer.title")}
                                </p>
                                <p className="mt-3 text-sm leading-7 text-white/65">
                                    {t("status.disclaimer.description")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* License */}
            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-28">
                <div className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <p className="mb-5 text-xs tracking-[0.22em] text-slate-400 uppercase dark:text-white/40">
                            05 / {t("license.label")}
                        </p>
                        <h2 className="text-4xl font-semibold tracking-tight">
                            {t("license.title")}
                        </h2>
                        <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500 dark:text-white/50">
                            {t("license.description")}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center gap-5 rounded-xl border border-slate-200 bg-slate-50 p-7 dark:border-white/10 dark:bg-white/2.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-white/45">
                                {t("license.dataset")}
                            </span>
                            <span className="text-sm font-medium">
                                CC BY 4.0
                            </span>
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-white/10" />

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-white/45">
                                {t("license.source")}
                            </span>
                            <span className="text-sm font-medium">
                                EU Open Data Portal
                            </span>
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-white/10" />

                        <a
                            href="https://creativecommons.org/licenses/by/4.0/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between text-sm transition hover:opacity-60"
                        >
                            {t("license.readMore")}
                            <ArrowUpRight className="size-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12 lg:pb-32">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-7 py-16 text-center transition-colors duration-300 sm:px-12 dark:border-white/10 dark:bg-[#141718]">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                        {t("cta.title")}
                    </h2>

                    <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-500 dark:text-white/50">
                        {t("cta.description")}
                    </p>

                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-white/85"
                    >
                        <SiGithub className="size-4 shrink-0" />
                        <span>{t("cta.button")}</span>
                        <ArrowUpRight className="size-4 shrink-0" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-12 dark:text-white/40">
                    <span className="font-medium text-slate-900 dark:text-white/65">
                        OpenShips
                        <span className="text-slate-400 dark:text-white/30">
                            {" "}
                            / SeaPorts
                        </span>
                    </span>

                    <span>{t("footer.description")}</span>

                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
                    >
                        <SiGithub className="size-4 shrink-0" />
                        <span>GitHub Repository</span>
                        <ArrowUpRight className="size-3 shrink-0" />
                    </a>
                </div>
            </footer>
        </main>
    );
}
