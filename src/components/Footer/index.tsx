import GitHubIcon from "../../assets/icons/github.svg?react";
import LinkedInIcon from "../../assets/icons/linkedIn.svg?react";
import { motion } from "framer-motion";

interface FooterProps {
  isOnInfoDisplay?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isOnInfoDisplay }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex gap-4 ${
        isOnInfoDisplay ? "text-sky-300" : "text-sky-700"
      } ${isOnInfoDisplay ? "dark:text-sky-300" : "dark:text-sky-600"} ${
        isOnInfoDisplay ? "" : "absolute bottom-8"
      }`}
    >
      <div className="flex gap-2 text-xs min-[350px]:text-sm self-end font-extralight">
        Developed by{" "}
        <a
          href="https://traczoskar.dev"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Link to my portfolio website"
          title="Link to my portfolio website"
          className={`transition-all underline underline-offset-2 hover:scale-105 hover:text-sky-200 ${
            isOnInfoDisplay ? "text-sky-400" : "text-sky-600"
          } ${isOnInfoDisplay ? "dark:text-sky-400" : "dark:text-sky-400"}`}
        >
          Oskar Tracz
        </a>{" "}
        @2024
      </div>
      <a
        href="https://www.linkedin.com/in/traczoskar/"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Link to LinkedIn profile"
        title="Link to LinkedIn profile"
        className="flex items-center no-underline transition-all hover:text-sky-200 hover:scale-105"
      >
        <LinkedInIcon className="w-6 h-6" />
      </a>
      <a
        href="https://github.com/traczoskar/ai_weather_app"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Link to GitHub profile"
        title="Link to GitHub profile"
        className="flex items-center no-underline  transition-all hover:text-sky-200 hover:scale-105"
      >
        <GitHubIcon className="w-6 h-6" />
      </a>
    </motion.footer>
  );
};

export default Footer;
