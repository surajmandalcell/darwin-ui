import { features } from '../data/features';
import { FeatureCard } from '../components/FeatureCard';

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for developers
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Every component is crafted with attention to detail, focusing on
            developer experience and end-user delight
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
