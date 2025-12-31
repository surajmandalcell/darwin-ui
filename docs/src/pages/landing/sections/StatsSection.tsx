const stats = [
  { number: '23', label: 'Components' },
  { number: '100%', label: 'TypeScript' },
  { number: '11', label: 'Button Variants' },
  { number: '6', label: 'Chart Types' },
];

export function StatsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-white/50 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
