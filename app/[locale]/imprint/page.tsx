import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const imprint = {
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
    namespace: "Imprint",
  });

  return {
    title: t("title"),
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

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "Imprint",
  });

  const requiredFields = Object.entries(imprint);

  const missingFields = requiredFields
    .filter(([, value]) => !value?.trim())
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing imprint environment variables: ${missingFields.join(", ")}`
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center">
      <h1 className="mb-8 text-3xl font-bold">
        {t("title")}
      </h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          {t("legalBasis")}
        </h2>

        <address className="not-italic leading-relaxed">
          {imprint.name}
          <br />
          {imprint.street}
          <br />
          {imprint.postalCode} {imprint.city}
          <br />
          {imprint.country}
        </address>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">
          {t("contact")}
        </h2>

        <p>
          {t("email")}:{" "}
          <a
            href={`mailto:${imprint.email}`}
            className="underline underline-offset-4"
          >
            {imprint.email}
          </a>
        </p>
      </section>
    </main>
  );
}