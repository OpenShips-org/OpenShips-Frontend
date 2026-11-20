import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function MapFooter() {
    const t = await getTranslations("Footer");
    return (
        <footer className="flex shrink-0 items-center justify-between gap-4 border-t bg-background px-6 py-3 text-xs text-muted-foreground">
    
                <span>{t("copyright")}</span>

                <nav className="pointer-events-auto flex gap-4">
                    <Link href="/imprint" className="hover:underline">
                        {t("imprint")}
                    </Link>

                    <Link href="/privacy-policy" className="hover:underline">
                        {t("privacyPolicy")}
                    </Link>
                </nav>
        </footer>
    );
}
