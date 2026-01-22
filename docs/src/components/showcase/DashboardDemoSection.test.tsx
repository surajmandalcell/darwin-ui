import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardDemoSection } from './DashboardDemoSection';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}));

// Mock DashboardShowcase component
vi.mock('../DashboardShowcase', () => ({
  default: () => <div data-testid="dashboard-showcase">Dashboard Showcase Content</div>,
}));

describe('DashboardDemoSection', () => {
  it('renders the section title', () => {
    render(<DashboardDemoSection />);
    expect(screen.getByText('Build Real Interfaces')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<DashboardDemoSection />);
    expect(screen.getByText(/See how Darwin UI components work together/)).toBeInTheDocument();
  });

  it('renders the DashboardShowcase component', () => {
    render(<DashboardDemoSection />);
    expect(screen.getByTestId('dashboard-showcase')).toBeInTheDocument();
  });

  it('contains a section element', () => {
    const { container } = render(<DashboardDemoSection />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('has proper styling classes for min-height', () => {
    const { container } = render(<DashboardDemoSection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('min-h-screen');
  });
});
