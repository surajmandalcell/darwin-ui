import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DarwinLogo, DarwinLogoSimple } from './DarwinLogo';

describe('DarwinLogo', () => {
  it('renders an SVG element', () => {
    const { container } = render(<DarwinLogo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<DarwinLogo className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('renders without background by default', () => {
    const { container } = render(<DarwinLogo />);
    // Should not have wrapper div with gradient
    const gradientDiv = container.querySelector('.bg-linear-to-br');
    expect(gradientDiv).not.toBeInTheDocument();
  });

  it('renders with background when showBackground is true', () => {
    const { container } = render(<DarwinLogo showBackground />);
    // Should have wrapper div with rounded corners
    const wrapper = container.querySelector('.rounded-\\[22\\%\\]');
    expect(wrapper).toBeInTheDocument();
  });

  it('has proper viewBox attribute', () => {
    const { container } = render(<DarwinLogo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('uses currentColor for fill', () => {
    const { container } = render(<DarwinLogo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('applies className to wrapper when showBackground is true', () => {
    const { container } = render(<DarwinLogo showBackground className="w-12 h-12" />);
    const wrapper = container.querySelector('.w-12');
    expect(wrapper).toBeInTheDocument();
  });
});

describe('DarwinLogoSimple', () => {
  it('renders an SVG element', () => {
    const { container } = render(<DarwinLogoSimple />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<DarwinLogoSimple className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('has proper viewBox attribute', () => {
    const { container } = render(<DarwinLogoSimple />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('contains a path with transform for flipped effect', () => {
    const { container } = render(<DarwinLogoSimple />);
    const path = container.querySelector('path[transform]');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('transform', 'scale(1, -1) translate(0, -24)');
  });
});
