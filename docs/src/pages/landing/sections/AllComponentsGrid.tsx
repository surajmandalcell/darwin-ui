import { allComponents } from '../data/components';
import { ShowcaseCard } from '../../../components/ShowcaseCard';

// Simple placeholder for component previews
// These will be replaced with actual component demos when integrated
const componentPreviews: Record<string, React.ReactNode> = {
  button: (
    <button className="px-6 py-2 bg-white text-black rounded-lg font-medium">
      Button
    </button>
  ),
  badge: (
    <div className="inline-flex px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-full text-sm">
      Badge
    </div>
  ),
  card: (
    <div className="w-full max-w-xs p-4 border border-white/10 rounded-lg bg-white/[0.02]">
      <div className="text-white font-semibold mb-2">Card</div>
      <div className="text-white/60 text-sm">Card content</div>
    </div>
  ),
};

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
