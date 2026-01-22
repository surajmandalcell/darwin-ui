import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentShowcaseSection } from './ComponentShowcaseSection';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...props}>{children}</span>,
  },
  useInView: () => true,
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

describe('ComponentShowcaseSection', () => {
  it('renders the section title', () => {
    render(<ComponentShowcaseSection />);
    expect(screen.getByText('Beautiful Components')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<ComponentShowcaseSection />);
    expect(screen.getByText(/36 production-ready components/)).toBeInTheDocument();
  });

  it('renders category filter tabs', () => {
    render(<ComponentShowcaseSection />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Form Controls')).toBeInTheDocument();
    expect(screen.getByText('Data Display')).toBeInTheDocument();
    expect(screen.getByText('Feedback')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Charts')).toBeInTheDocument();
    expect(screen.getByText('Layout')).toBeInTheDocument();
    expect(screen.getByText('Rich Content')).toBeInTheDocument();
  });

  it('renders button component card', () => {
    render(<ComponentShowcaseSection />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('renders input component card', () => {
    render(<ComponentShowcaseSection />);
    expect(screen.getByText('Input')).toBeInTheDocument();
  });

  it('renders badge component card', () => {
    render(<ComponentShowcaseSection />);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('filters components when category is selected', () => {
    render(<ComponentShowcaseSection />);

    // Click on Charts category
    const chartsButton = screen.getByText('Charts');
    fireEvent.click(chartsButton);

    // Should show chart components
    expect(screen.getByText('AreaChart')).toBeInTheDocument();
    expect(screen.getByText('BarChart')).toBeInTheDocument();
    expect(screen.getByText('LineChart')).toBeInTheDocument();
  });

  it('shows all components when "All" is selected', () => {
    render(<ComponentShowcaseSection />);

    // Click on Form Controls first
    const formControlsButton = screen.getByText('Form Controls');
    fireEvent.click(formControlsButton);

    // Then click on All
    const allButton = screen.getByText('All');
    fireEvent.click(allButton);

    // Should show components from multiple categories
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Badge')).toBeInTheDocument();
    expect(screen.getByText('Alert')).toBeInTheDocument();
  });

  it('renders link to documentation', () => {
    render(<ComponentShowcaseSection />);
    const link = screen.getByText(/Explore all components in documentation/);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/docs');
  });
});
