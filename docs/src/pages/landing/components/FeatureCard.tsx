import { type LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: 'blue' | 'purple' | 'green' | 'gray';
}

const accentColorClasses = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  green: 'bg-green-500/10 border-green-500/20 text-green-400',
  gray: 'bg-gray-500/10 border-gray-500/20 text-gray-400',
};

export function FeatureCard({
  title,
  description,
  icon: Icon,
  accentColor,
}: FeatureCardProps) {
  return (
    <div className="card-border card-background-elevated rounded-2xl p-8 group">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 transition-colors duration-300 ${accentColorClasses[accentColor]}`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  );
}
