
import { Archivo_Black } from "next/font/google";

import ProfileCard from "@/components/home/ProfileCard";
import TechText from "@/components/ui/TechText";

import "./Hero.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:py-24 lg:py-32"
    >
      {/* Text Content */}
      <div className="flex flex-1 flex-col items-center gap-8 text-center md:items-start md:text-left">
        {/* Tech Text - 3 Lines */}
        <div className="tech-text-group">
          {["CRAFTING", "DIGITAL", "SOLUTION"].map((word, index) => (
            <div className="tech-text-line" key={word}>
              <TechText
                text={word}
                fontFamily={archivoBlack.style.fontFamily}
                introDuration={2 + index * 0.3}
                className={archivoBlack.className}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Profile Card */}
      <div>
        <ProfileCard
          avatarUrl="/images/profile-ajid.png?v=1"
          iconUrl="/zed-v4-icon.svg"
        />
      </div>
    </section>
  );
}
