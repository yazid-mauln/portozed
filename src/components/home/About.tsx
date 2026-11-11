import { Reveal } from "@/components/ui/Reveal";

/** Ukuran judul. Ubah di sini kalau mau lebih besar atau kecil. */
const HEADING_SIZE = "text-[clamp(2rem,5vw,7.5rem)] leading-[0.95]";

/**
 * TODO: ganti semua teks di bawah dengan data asli kamu.
 * Isinya sengaja placeholder, supaya tidak ada klaim palsu tentang kamu.
 */
const ABOUT_PARAGRAPHS = [
  "TODO: Paragraf 1. Siapa kamu, apa yang kamu kerjakan, dan apa yang kamu pedulikan dalam membuat software.",
  "TODO: Paragraf 2. Apa yang sedang kamu kerjakan sekarang, teknologi yang kamu pakai, dan proyek pribadi yang sedang berjalan.",
] as const;

const ABOUT_FACTS = [
  { label: "Now", value: "Full Stack Developer - PT.Nusantara Compnet Integrator" },
  { label: "Study", value: "Computer Science - Universitas Bina Nusantara" },
  { label: "Focus", value: "Web Development, Mobile Development, Cloud, Security" },
  { label: "Open to", value: " opportunities and collaborations" },
] as const;

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full h-200 px-4 py-20 sm:px-6 md:py-28"
    >
      <Reveal className="mb-10 text-left ml-14 md:mb-16">
        <h2
          id="about-heading"
          className={` ${HEADING_SIZE} m-0 font-black tracking-tight text-foreground`}
        >
          About me
        </h2>
      </Reveal>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal
          delay={150}
          className="flex flex-col gap-6"
        >
          {ABOUT_PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              className="m-0 text-base leading-relaxed text-foreground sm:text-lg"
            >
              {text}
            </p>
          ))}
        </Reveal>

        {/* Quick facts */}
        <dl className="m-0 w-full">
          {ABOUT_FACTS.map((fact, i) => (
            <Reveal
              key={fact.label}
              delay={300 + i * 90}
              className="group flex items-center justify-between gap-4 border-t border-border py-5 last:border-b"
            >
              <dt className="text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-300 group-hover:text-[#ff5a36]">
                {fact.label}
              </dt>
              <dd className="m-0 text-right text-base font-medium text-foreground sm:text-lg transition-transform duration-300 group-hover:-translate-x-1">
                {fact.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
