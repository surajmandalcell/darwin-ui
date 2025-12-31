interface TechLogoProps {
  name: string;
  logo: string;
  url: string;
}

export function TechLogo({ name, logo, url }: TechLogoProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center transition-all duration-300"
      aria-label={name}
    >
      <img
        src={logo}
        alt={name}
        className="h-12 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      />
    </a>
  );
}
