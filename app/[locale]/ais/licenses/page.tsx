import { useTranslations } from "next-intl";
import { Copyright, ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { localeConfig } from "@/lib/locale-config";
import { BASE_URL } from "@/config/server";

const licenses = [
    {
        id: "aisstream",
        name: "AISStream",
        translationKey: "AisStream",
        url: "https://aisstream.io/",
    },
    {
        id: "pelyr",
        name: "Pelyr",
        translationKey: "Pelyr",
        url: "https://pelyr.com/",
    },
    {
        id: "fintraffic-digitraffic",
        name: "Fintraffic Digitraffic",
        translationKey: "FintrafficDigitraffic",
        url: "https://digitraffic.fi/",
        licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    {
        id: "kystverket",
        name: "Kystverket",
        translationKey: "Kystverket",
        url: "https://www.kystverket.no/",
        licenseUrl: "https://data.norge.no/nlod/en/2.0",
    },
    {
        id: "barentswatch",
        name: "BarentsWatch",
        translationKey: "BarentsWatch",
        url: "https://www.barentswatch.no/",
        licenseUrl: "https://data.norge.no/nlod/en/2.0",
    },
] as const;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("AISPages.LicensePage.Metadata");
    const locale = await getLocale();

    const config =
        localeConfig[locale as keyof typeof localeConfig] ?? localeConfig.en;

    const url = `${BASE_URL}/${locale}`;

    return {
        title: t("Title"),
        description: t("Description"),

        openGraph: {
            type: "website",
            siteName: "OpenShips",
            title: t("Title"),
            description: t("Description"),
            url,
            locale: config.ogLocale,
            images: [
                {
                    url: `${BASE_URL}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: t("Title"),
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: t("Title"),
            description: t("Description"),
            images: [`${BASE_URL}/og-image.png`],
        },
    };
}

function LicenseSection({
    license,
}: {
    license: (typeof licenses)[number];
}) {
    const t = useTranslations("AISPages.LicensePage");
    const base = `AISPages.LicensePage.${license.translationKey}`;

    return (
        <section id={license.id} className="mt-10 scroll-mt-20">
            <h2 className="text-xl font-bold">{license.name}</h2>
            <hr className="mb-3" />

            <p className="my-3">
                <Copyright className="mr-2 inline-block" />
                <strong>{t("License")}:</strong>{" "}
                {t(`${license.translationKey}.License`)}

                {license.url && (
                    <>
                        {" "}
                        <a
                            href={license.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`License information for ${license.name}`}
                            className="inline-block text-blue-600 hover:underline"
                        >
                            <ExternalLink className="inline-block size-4" />
                        </a>
                    </>
                )}
            </p>

            <p className="my-3">{t(`${license.translationKey}.Description`)}</p>

            {license.translationKey !== "AisStream" && (
                <p className="my-3">
                    <strong>Attribution:</strong>{" "}
                    {t(`${license.translationKey}.Attribution`)}
                </p>
            )}

            <p className="my-3">
                <ExternalLink className="mr-2 inline-block size-4" />
                {t("SourceLink")}:{" "}
                <a
                    href={license.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    {license.url}
                </a>
            </p>
        </section>
    );
}

function LicenseContents() {
    const t = useTranslations("AISPages.LicensePage");

    return (
        <nav className="mt-8 rounded-lg border p-4">
            <h2 className="mb-3 font-semibold">{t("Contents")}</h2>

            <ul className="list-inside list-disc space-y-1">
                {licenses.map((license) => (
                    <li key={license.id}>
                        <a
                            href={`#${license.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {license.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function AisLicensesPage() {
    const t = useTranslations("AISPages.LicensePage");

    return (
        <div className="mt-10 flex justify-center p-4">
            <div className="w-full max-w-3xl">
                <h1 className="text-2xl font-bold">
                    {t("PageTitle")}
                </h1>

                <p>{t("PageDescription")}</p>

                <LicenseContents />

                {licenses.map((license) => (
                    <LicenseSection
                        key={license.id}
                        license={license}
                    />
                ))}
            </div>
        </div>
    );
}
