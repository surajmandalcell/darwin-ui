import React from 'react';

export const Button = ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
  <button data-variant={variant}>{children}</button>
);

export const Badge = ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
  <span data-variant={variant}>{children}</span>
);

export const Input = ({ placeholder }: { placeholder?: string }) => (
  <input placeholder={placeholder} />
);

export const Switch = ({ label, defaultChecked }: { label?: string; defaultChecked?: boolean }) => (
  <label>
    <input type="checkbox" defaultChecked={defaultChecked} aria-label={label} />
    {label}
  </label>
);

export const Checkbox = ({ label, defaultChecked }: { label?: string; defaultChecked?: boolean }) => (
  <label>
    <input type="checkbox" defaultChecked={defaultChecked} aria-label={label} />
    {label}
  </label>
);

export const Progress = ({ value, showValue, variant }: { value: number; showValue?: boolean; variant?: string }) => (
  <div role="progressbar" aria-valuenow={value} data-variant={variant}>
    {showValue && `${value}%`}
  </div>
);

export const Slider = ({ defaultValue }: { defaultValue?: number }) => (
  <input type="range" defaultValue={defaultValue} />
);

export const Avatar = ({ fallback, size }: { fallback?: string; size?: string }) => (
  <div data-testid="avatar" data-size={size}>{fallback}</div>
);

export const AvatarGroup = ({ children, max }: { children: React.ReactNode; max?: number }) => (
  <div data-testid="avatar-group" data-max={max}>{children}</div>
);

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={className}>{children}</h3>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

// Sidebar components
export const Sidebar = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="sidebar">{children}</div>
);

export const SidebarItem = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="sidebar-item">{children}</div>
);

// Table components
export const Table = ({ children }: { children: React.ReactNode }) => (
  <table>{children}</table>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead>{children}</thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr>{children}</tr>
);

export const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th>{children}</th>
);

export const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td>{children}</td>
);

// Search Input
export const SearchInput = ({ placeholder }: { placeholder?: string }) => (
  <input type="search" placeholder={placeholder} />
);

// Tooltip
export const Tooltip = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);
