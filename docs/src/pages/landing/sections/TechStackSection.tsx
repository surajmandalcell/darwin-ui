import { techStack } from '../data/techStack';
import { TechLogo } from '../components/TechLogo';

export function TechStackSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
            Built with modern tools
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Powered by the best technologies in the React ecosystem
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12 items-center">
          {techStack.map((tech) => (
            <TechLogo key={tech.name} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
