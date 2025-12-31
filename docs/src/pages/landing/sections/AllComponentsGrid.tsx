import { allComponents } from '../data/components';
import { ShowcaseCard } from '../../../components/ShowcaseCard';
import { componentPreviews } from '../components/ComponentPreviews';

// Bento grid sizing configuration
const bentoSizes: Record<string, { cols: number; rows: number }> = {
  Button: { cols: 2, rows: 2 },
  Upload: { cols: 2, rows: 2 },
  Table: { cols: 2, rows: 2 },
  Charts: { cols: 2, rows: 2 },
  Window: { cols: 2, rows: 1 },
  Reveal: { cols: 2, rows: 2 },
  DateSelect: { cols: 1, rows: 2 },
  Modal: { cols: 1, rows: 2 },
};

const getSize = (title: string) => bentoSizes[title] || { cols: 1, rows: 1 };

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

        {/* Components Bento Grid - 4 columns with variable sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allComponents.map((component) => {
            const size = getSize(component.title);
            return (
              <ShowcaseCard
                key={component.slug}
                title={component.title}
                description={component.description}
                slug={component.slug}
                badge={component.badge}
                preview={
                  componentPreviews[component.title] || (
                    <div className="text-white/60">Component preview</div>
                  )
                }
                cols={size.cols}
                rows={size.rows}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
