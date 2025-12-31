import { allComponents } from '../data/components';
import { ShowcaseCard } from '../../../components/ShowcaseCard';
import { componentPreviews } from '../components/ComponentPreviews';

export function AllComponentsGrid() {
  return (
    <section id="components" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-semibold text-white/40 uppercase tracking-wider mb-6">
            Complete Library
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            23 production-ready components
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Everything you need to build modern interfaces. Copy, paste, and
            customize to match your design system.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allComponents.map((component, index) => (
            <ShowcaseCard
              key={component.slug}
              title={component.title}
              description={component.description}
              slug={component.slug}
              badge={component.badge}
              preview={
                componentPreviews[component.slug] || (
                  <div className="text-white/60">Component preview</div>
                )
              }
              delay={index * 0.03}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
