import { motion } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";
import { useTranslation } from "react-i18next";

interface Job {
  role: string;
  company: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string | null;
  points: string[];
}

export function Experience() {
  const { t } = useTranslation(["experience", "data"]);
  const jobs = t("data:experience", { returnObjects: true }) as Job[];
  const monthNames = t("experience:months", { returnObjects: true }) as string[];

  function formatDate(date: string | null): string {
    if (!date) return t("experience:present");
    const [year, month] = date.split("-").map(Number);
    return `${monthNames[month - 1]} ${year}`;
  }

  function calcDuration(start: string, end: string | null): string {
    const [sy, sm] = start.split("-").map(Number);
    const now = end ? end.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
    const [ey, em] = now as [number, number];

    let totalMonths = (ey - sy) * 12 + (em - sm);
    if (!end) totalMonths += 1;

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) return `${years} ${t("experience:yr")} ${months} ${t("experience:mos")}`;
    if (years > 0) return `${years} ${t("experience:yr")}`;
    return `${months} ${t("experience:mos")}`;
  }
  return (
    <section id="experience">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={STAGGER_CONTAINER}
      >
        <motion.h2 variants={FADE_UP} className="text-2xl font-semibold mb-10 tracking-tight">
          {t("experience:title")}
        </motion.h2>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              variants={FADE_UP}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 sm:p-6 rounded-2xl border border-card-border bg-card shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg leading-tight">{job.role}</h3>
                    <p className="text-muted-foreground text-sm mt-0.5">{job.company} · {job.type}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{job.location}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full bg-muted/50 border border-border text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(job.startDate)} — {formatDate(job.endDate)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {calcDuration(job.startDate, job.endDate)}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {job.points.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
