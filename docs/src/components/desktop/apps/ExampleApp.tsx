"use client";

import type { WindowState } from '../../../contexts/desktop-context';
import DashboardShowcase from '../../DashboardShowcase';

interface ExampleAppProps {
  windowState: WindowState;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ExampleApp({ windowState: _windowState }: ExampleAppProps) {
  return (
    <div className="h-full overflow-hidden">
      <DashboardShowcase showTitleBar={false} interactive={true} />
    </div>
  );
}

export default ExampleApp;
