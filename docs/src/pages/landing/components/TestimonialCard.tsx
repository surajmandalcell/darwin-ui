interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
}: TestimonialCardProps) {
  return (
    <div className="card-border card-background rounded-2xl p-8">
      {/* Avatar */}
      <div className="mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-white/10 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{avatar}</span>
        </div>
      </div>

      {/* Quote */}
      <p className="text-white/70 leading-relaxed mb-6">&ldquo;{quote}&rdquo;</p>

      {/* Author */}
      <div>
        <p className="text-white font-semibold">{author}</p>
        <p className="text-white/50 text-sm">{role}</p>
      </div>
    </div>
  );
}
