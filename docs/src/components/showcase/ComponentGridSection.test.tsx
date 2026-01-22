import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentGridSection } from './ComponentGridSection';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...props}>{children}</span>,
  },
  useInView: () => true,
}));

describe('ComponentGridSection', () => {
  it('renders the section title', () => {
    render(<ComponentGridSection />);
    expect(screen.getByText('Beautiful Components')).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<ComponentGridSection />);
    expect(screen.getByText(/36\+ production-ready components/)).toBeInTheDocument();
  });

  it('renders button variants', () => {
    render(<ComponentGridSection />);
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('Outline')).toBeInTheDocument();
    expect(screen.getByText('Ghost')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders badge variants', () => {
    render(<ComponentGridSection />);
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders input component', () => {
    render(<ComponentGridSection />);
    expect(screen.getByPlaceholderText('Enter your email...')).toBeInTheDocument();
  });

  it('renders switch components with labels', () => {
    render(<ComponentGridSection />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders checkbox components with labels', () => {
    render(<ComponentGridSection />);
    expect(screen.getByText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Send updates')).toBeInTheDocument();
  });

  it('renders progress components', () => {
    render(<ComponentGridSection />);
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('renders avatar group', () => {
    render(<ComponentGridSection />);
    expect(screen.getByTestId('avatar-group')).toBeInTheDocument();
  });

  it('renders card component', () => {
    render(<ComponentGridSection />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Your weekly report is ready.')).toBeInTheDocument();
  });

  it('renders link to view all components', () => {
    render(<ComponentGridSection />);
    const link = screen.getByText(/View all 36\+ components/);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/docs');
  });
});
