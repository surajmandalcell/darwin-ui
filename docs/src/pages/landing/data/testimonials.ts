export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'The TypeScript support is excellent. Autocomplete works perfectly and I catch so many bugs before they reach production.',
    author: 'Alex Johnson',
    role: 'Frontend Developer',
    avatar: 'AJ',
  },
  {
    quote:
      'Darwin UI has become our go-to component library. The quality is outstanding and it saves us hours of development time.',
    author: 'Sarah Chen',
    role: 'Tech Lead',
    avatar: 'SC',
  },
  {
    quote:
      'Beautiful and functional. The components look professional out of the box, and customization is straightforward.',
    author: 'Mike Rodriguez',
    role: 'Product Designer',
    avatar: 'MR',
  },
];
