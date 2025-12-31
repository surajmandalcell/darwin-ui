import { type ReactNode } from 'react';
import { Check } from 'lucide-react';

interface CategorySectionProps {
  badge: string;
  accentColor: 'blue' | 'purple' | 'green' | 'orange';
  title: string;
  description: string;
  components: string[];
  demo: ReactNode;
  imagePosition: 'left' | 'right';
}

const accentColorClasses = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  green: 'bg-green-500/10 border-green-500/20 text-green-400',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
};

export function CategorySection({
  badge,
  accentColor,
  title,
  description,
  components,
  demo,
  imagePosition,
}: CategorySectionProps) {
  const textContent = (
    <div className="flex flex-col justify-center">
      {/* Badge */}
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-6 w-fit ${accentColorClasses[accentColor]}`}
      >
        {badge}
      </div>

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        {title}
      </h2>

      {/* Description */}
      <p className="text-xl text-white/60 mb-8 leading-relaxed">
        {description}
      </p>

      {/* Component checklist */}
      <div className="grid grid-cols-2 gap-3">
        {components.map((component) => (
          <div
            key={component}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] border border-white/5"
          >
            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-white/80 text-sm font-medium">
              {component}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const demoContent = (
    <div className="flex items-center justify-center">
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 p-12 w-full demo-shadow bg-gradient-to-br from-white/[0.02] to-transparent"
      >
        {demo}
      </div>
    </div>
  );

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {imagePosition === 'right' ? (
            <>
              {textContent}
              {demoContent}
            </>
          ) : (
            <>
              {demoContent}
              {textContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
