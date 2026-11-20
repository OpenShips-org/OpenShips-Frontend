import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const responsible = {
  name: process.env.IMPRINT_NAME,
  street: process.env.IMPRINT_STREET,
  postalCode: process.env.IMPRINT_POSTAL_CODE,
  city: process.env.IMPRINT_CITY,
  country: process.env.IMPRINT_COUNTRY,
  email: process.env.IMPRINT_EMAIL,
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "Privacy",
  });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "Privacy",
  });

  const requiredFields = Object.entries(responsible);

  const missingFields = requiredFields
    .filter(([, value]) => !value?.trim())
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing privacy environment variables: ${missingFields.join(", ")}`
    );
  }

  const sections = [
    "hosting",
    "logs",
    "maps",
    "localStorage",
    "email",
    "rights",
    "security",
  ] as const;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col px-6 py-16 overflow-auto!">
      <h1 className="mb-4 text-center text-3xl font-bold">
        {t("title")}
      </h1>

      <p className="mb-12 text-center text-sm text-muted-foreground">
        {t("lastUpdated")}
      </p>

      <section className="mb-10 space-y-3">
        <h2 className="text-xl font-semibold">
          {t("responsible.title")}
        </h2>

        <address className="not-italic leading-relaxed text-muted-foreground">
          {responsible.name}
          <br />
          {responsible.street}
          <br />
          {responsible.postalCode} {responsible.city}
          <br />
          {responsible.country}
          <br />
          <a
            href={`mailto:${responsible.email}`}
            className="underline underline-offset-4"
          >
            {responsible.email}
          </a>
        </address>
      </section>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section} className="space-y-3">
            <h2 className="text-xl font-semibold">
              {t(`${section}.title`)}
            </h2>

            <div className="whitespace-pre-line leading-relaxed text-muted-foreground">
              {t(`${section}.content`)}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}