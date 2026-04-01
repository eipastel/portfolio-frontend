import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/40 py-8 bg-background">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Thiago Diogo. {t("footer.rights")}</p>
        <p className="flex items-center gap-2">
          {t("footer.role")} <span className="w-1 h-1 rounded-full bg-primary" /> {t("footer.specialization")}
        </p>
      </div>
    </footer>
  );
}
