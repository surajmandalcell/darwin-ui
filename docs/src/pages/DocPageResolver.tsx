import { useLocation } from "react-router-dom";
import {
    ButtonPreview,
    ButtonSizePreview,
    ButtonWithIconPreview,
    BadgePreview,
    InputPreview,
    CheckboxPreview,
    SwitchPreview,
    CardPreview,
    AlertPreview,
    SkeletonPreview,
    ModalPreview,
    ToastPreview,
    SelectPreview,
    TablePreview
} from "../components/ComponentPreview";
import DashboardShowcase from "../components/DashboardShowcase";
import { CodeBlock } from "../components/CodeBlock";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { DocNavigation } from "../components/DocNavigation";
import * as examples from "../content/code-examples";

export default function DocPageResolver() {
    const location = useLocation();
    const pathname = location.pathname;

    // Parse the slug
    const slug = pathname.replace('/docs/', '');
    const parts = slug.split('/');
    const section = parts[0];
    const page = parts[1] || 'introduction';

    // Default content
    let content = (
        <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white capitalize">{page.replace(/-/g, ' ')}</h1>
            <p className="text-xl text-white/60 mb-8">Documentation for {page} is coming soon.</p>
        </div>
    );

    // ========================================================================
    // GETTING STARTED SECTION
    // ========================================================================

    if (section === 'getting-started') {
        if (page === 'introduction') {
            content = (
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Introduction</h1>
                        <p className="text-xl text-white/60">
                            Darwin UI is a beautiful macOS-inspired dark theme React component library with glass-morphism aesthetic.
                            Built for modern web applications using React 19, Tailwind CSS v4, and Framer Motion.
                        </p>
                    </div>

                    <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/50">
                        <h3 className="text-lg font-semibold text-white mb-2">Philosophy</h3>
                        <p className="text-zinc-400">
                            We believe in "Design Engineering". Every component is crafted not just to work, but to feel premium.
                            Micro-interactions, smooth animations, and perfect spacing are first-class citizens.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Dashboard Showcase</h2>
                        <p className="text-zinc-400 mb-6">See what you can build with Darwin UI.</p>
                        <DashboardShowcase />
                    </div>
                </div>
            );
        } else if (page === 'installation') {
            content = (
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Installation</h1>
                        <p className="text-xl text-white/60">Get up and running with Darwin UI in seconds.</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Prerequisites</h2>
                        <p className="text-white/70">Before you begin, ensure you have:</p>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Node.js 18 or higher</li>
                            <li>React 18 or higher (React 19 recommended)</li>
                            <li>A package manager (npm, yarn, or pnpm)</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Install Package</h2>
                        <p className="text-white/70">Install Darwin UI using your preferred package manager:</p>
                        <CodeBlock code={examples.INSTALL_NPM} language="bash" showLineNumbers={false} />
                        <CodeBlock code={examples.INSTALL_YARN} language="bash" showLineNumbers={false} />
                        <CodeBlock code={examples.INSTALL_PNPM} language="bash" showLineNumbers={false} />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Import Styles</h2>
                        <p className="text-white/70">Import the global styles in your main app file:</p>
                        <CodeBlock code={examples.IMPORT_STYLES} language="tsx" fileName="main.tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Provider Setup</h2>
                        <p className="text-white/70">
                            Wrap your application with the required providers for Toast, Alert, and Overlay functionality:
                        </p>
                        <CodeBlock code={examples.PROVIDER_SETUP} language="tsx" fileName="App.tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">First Component</h2>
                        <p className="text-white/70">You're ready to use Darwin UI components:</p>
                        <CodeBlock code={examples.FIRST_COMPONENT} language="tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Troubleshooting</h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                                <h3 className="font-semibold text-white mb-2">TypeScript Errors</h3>
                                <p className="text-sm text-white/60">
                                    Ensure your tsconfig.json includes "node_modules/@smc/darwin-ui" in the include array.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                                <h3 className="font-semibold text-white mb-2">Missing Peer Dependencies</h3>
                                <p className="text-sm text-white/60">
                                    Install framer-motion and lucide-react if not already installed: npm install framer-motion lucide-react
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            );
        } else if (page === 'theming') {
            content = (
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Theming</h1>
                        <p className="text-xl text-white/60">
                            Customize Darwin UI to match your brand using CSS variables and Tailwind classes.
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Color System</h2>
                        <p className="text-white/70">
                            Darwin UI uses HSL color values for maximum flexibility. All colors are defined as CSS variables:
                        </p>
                        <CodeBlock code={examples.CSS_VARIABLES} language="css" fileName="index.css" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Customization</h2>
                        <p className="text-white/70">Override any color variable in your own CSS:</p>
                        <CodeBlock code={examples.CUSTOM_THEME} language="css" fileName="theme.css" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Component Overrides</h2>
                        <p className="text-white/70">
                            Every component accepts a className prop for custom styling using Tailwind classes:
                        </p>
                        <CodeBlock code={examples.COMPONENT_OVERRIDE} language="tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Glass-morphism Aesthetic</h2>
                        <p className="text-white/70">The signature Darwin UI look is achieved through:</p>
                        <ul className="list-disc list-inside text-white/60 space-y-2">
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">backdrop-blur-md</code> - Creates the frosted glass effect</li>
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">bg-white/[0.05]</code> - Subtle transparent backgrounds</li>
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">border-white/10</code> - Delicate borders</li>
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">shadow-2xl</code> - Depth through shadows</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Font Customization</h2>
                        <p className="text-white/70">Change the default fonts by overriding the CSS variables:</p>
                        <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                            <pre className="text-sm text-white/80 overflow-x-auto">
{`:root {
  --font-sans: 'Your Font', sans-serif;
  --font-mono: 'Your Mono Font', monospace;
}`}
                            </pre>
                        </div>
                    </section>
                </div>
            );
        }
    }

    // ========================================================================
    // HOOKS SECTION
    // ========================================================================

    else if (section === 'hooks') {
        if (page === 'use-media-query') {
            content = (
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">useMediaQuery</h1>
                        <p className="text-xl text-white/60">
                            React hook to detect media query matches for responsive behavior.
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">API</h2>
                        <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                            <code className="text-white/80">useMediaQuery(query: string): boolean</code>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.USE_MEDIA_QUERY_EXAMPLE} language="tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Common Use Cases</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-2">
                            <li>Show/hide components based on screen size</li>
                            <li>Render different layouts for mobile vs desktop</li>
                            <li>Detect dark mode preference: <code className="text-sm bg-white/10 px-2 py-1 rounded">(prefers-color-scheme: dark)</code></li>
                            <li>Respond to orientation changes</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'use-is-mobile') {
            content = (
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">useIsMobile</h1>
                        <p className="text-xl text-white/60">
                            Convenience hook for detecting mobile devices (viewport width &lt; 768px).
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">API</h2>
                        <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                            <code className="text-white/80">useIsMobile(): boolean</code>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Implementation</h2>
                        <p className="text-white/70">This hook wraps useMediaQuery with a breakpoint at 768px:</p>
                        <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                            <pre className="text-sm text-white/80">
{`export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}`}
                            </pre>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.USE_IS_MOBILE_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'use-escape-key') {
            content = (
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">useEscapeKey</h1>
                        <p className="text-xl text-white/60">
                            Hook to handle Escape key presses for dismissing modals, dropdowns, and overlays.
                        </p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">API</h2>
                        <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                            <code className="text-white/80">useEscapeKey(callback: () =&gt; void, enabled?: boolean): void</code>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.USE_ESCAPE_KEY_EXAMPLE} language="tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Used In</h2>
                        <p className="text-white/70">This hook is used internally by:</p>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Modal component</li>
                            <li>Alert component</li>
                            <li>Select dropdown</li>
                            <li>Context menus</li>
                        </ul>
                    </section>
                </div>
            );
        }
    }

    // ========================================================================
    // COMPONENTS SECTION
    // ========================================================================

    else if (section === 'components') {
        if (page === 'button') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Button</h1>
                        <p className="text-xl text-white/60">Triggers an event or action. Highly customizable with variants and sizes.</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Variants</h2>
                        <ButtonPreview />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Sizes</h2>
                        <ButtonSizePreview />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">With Icons</h2>
                        <ButtonWithIconPreview />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.BUTTON_EXAMPLE} language="tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Props</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="border-b border-white/10">
                                    <tr>
                                        <th className="px-4 py-3 text-white font-semibold">Prop</th>
                                        <th className="px-4 py-3 text-white font-semibold">Type</th>
                                        <th className="px-4 py-3 text-white font-semibold">Default</th>
                                        <th className="px-4 py-3 text-white font-semibold">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr>
                                        <td className="px-4 py-3 text-white/70 font-mono text-xs">variant</td>
                                        <td className="px-4 py-3 text-white/50 font-mono text-xs">string</td>
                                        <td className="px-4 py-3 text-white/50 font-mono text-xs">"primary"</td>
                                        <td className="px-4 py-3 text-white/60 text-xs">Button variant style</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-white/70 font-mono text-xs">size</td>
                                        <td className="px-4 py-3 text-white/50 font-mono text-xs">string</td>
                                        <td className="px-4 py-3 text-white/50 font-mono text-xs">"md"</td>
                                        <td className="px-4 py-3 text-white/60 text-xs">Button size (sm, md, lg)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-white/70 font-mono text-xs">disabled</td>
                                        <td className="px-4 py-3 text-white/50 font-mono text-xs">boolean</td>
                                        <td className="px-4 py-3 text-white/50 font-mono text-xs">false</td>
                                        <td className="px-4 py-3 text-white/60 text-xs">Disables the button</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            );
        } else if (page === 'badge') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Badge</h1>
                        <p className="text-xl text-white/60">Displays a status or label indicator.</p>
                    </div>
                    <BadgePreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.BADGE_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'card') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Card</h1>
                        <p className="text-xl text-white/60">Container component with header, content, and footer sections.</p>
                    </div>
                    <CardPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.CARD_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'input') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Input</h1>
                        <p className="text-xl text-white/60">Text input field with focus states and variants.</p>
                    </div>
                    <InputPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.INPUT_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'select') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Select</h1>
                        <p className="text-xl text-white/60">Dropdown selection component with portal-based positioning.</p>
                    </div>
                    <SelectPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.SELECT_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Note</h2>
                        <p className="text-white/70">
                            Select uses a children-based API with &lt;option&gt; elements for maximum flexibility.
                            The dropdown is rendered in a portal to avoid z-index issues.
                        </p>
                    </section>
                </div>
            );
        } else if (page === 'checkbox') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Checkbox</h1>
                        <p className="text-xl text-white/60">Interactive checkbox with animated check state.</p>
                    </div>
                    <CheckboxPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.CHECKBOX_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'switch') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Switch</h1>
                        <p className="text-xl text-white/60">Toggle switch with spring animation.</p>
                    </div>
                    <SwitchPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.SWITCH_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'table') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Table</h1>
                        <p className="text-xl text-white/60">Responsive data table with styling and loading states.</p>
                    </div>
                    <TablePreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.TABLE_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'modal') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Modal</h1>
                        <p className="text-xl text-white/60">Dialog window with backdrop, animations, and focus management.</p>
                    </div>
                    <ModalPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.MODAL_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Accessibility</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Automatically traps focus within the modal</li>
                            <li>Closes on Escape key press</li>
                            <li>Prevents body scroll when open</li>
                            <li>Returns focus to trigger element on close</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'toast') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Toast</h1>
                        <p className="text-xl text-white/60">Notification system with auto-dismiss and multiple variants.</p>
                    </div>
                    <ToastPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.TOAST_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">API</h2>
                        <div className="p-4 rounded-lg border border-white/10 bg-zinc-900/50">
                            <code className="text-white/80 text-sm">
                                showToast(message: string, options?: {'{'} title?: string, type?: 'info' | 'success' | 'warning' | 'error', duration?: number {'}'})
                            </code>
                        </div>
                    </section>
                </div>
            );
        } else if (page === 'alert') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Alert</h1>
                        <p className="text-xl text-white/60">Modal alert dialogs with confirm/cancel actions.</p>
                    </div>
                    <AlertPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.ALERT_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'skeleton') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Skeleton</h1>
                        <p className="text-xl text-white/60">Loading placeholder with pulsing animation.</p>
                    </div>
                    <SkeletonPreview />
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.SKELETON_EXAMPLE} language="tsx" />
                    </section>
                </div>
            );
        } else if (page === 'image') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Image</h1>
                        <p className="text-xl text-white/60">Optimized image component with lazy loading and click-to-enlarge.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.IMAGE_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Features</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Lazy loading by default</li>
                            <li>Click to enlarge in full-screen overlay</li>
                            <li>Rounded corner variants</li>
                            <li>Responsive sizing</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'date-select') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">DateSelect</h1>
                        <p className="text-xl text-white/60">Calendar date picker with single and recurring event support.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.DATE_SELECT_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Features</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Single and recurring events</li>
                            <li>Date, datetime, month-only, and year-only modes</li>
                            <li>Time selection with all-day option</li>
                            <li>Recurring frequency (daily, weekly, monthly, specific day)</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'multi-select') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">MultiSelect</h1>
                        <p className="text-xl text-white/60">Multiple selection component with pills UI and search.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.MULTI_SELECT_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Features</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Multiple selection with pills display</li>
                            <li>Search/filter functionality</li>
                            <li>Keyboard navigation</li>
                            <li>Remove items individually</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'search-input') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">SearchInput</h1>
                        <p className="text-xl text-white/60">Search input with magnifying glass icon and clear button.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.SEARCH_INPUT_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Note</h2>
                        <p className="text-white/70">
                            SearchInput is a wrapper around the Input component with variant="search".
                            It automatically includes a search icon and clear functionality.
                        </p>
                    </section>
                </div>
            );
        } else if (page === 'context-menu') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">ContextMenu</h1>
                        <p className="text-xl text-white/60">Right-click context menus with keyboard navigation.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.CONTEXT_MENU_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Features</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Right-click or click trigger modes</li>
                            <li>Keyboard navigation (arrow keys, Enter, Escape)</li>
                            <li>Separator support</li>
                            <li>Portal-based rendering</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'upload') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Upload</h1>
                        <p className="text-xl text-white/60">Drag-and-drop file upload with preview, progress, and image reordering.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.UPLOAD_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Features</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Drag-and-drop file selection</li>
                            <li>Image preview thumbnails</li>
                            <li>Upload progress indicators</li>
                            <li>Reorder images (drag to reorder)</li>
                            <li>Set cover image (click star icon)</li>
                            <li>Remove individual images</li>
                            <li>Maximum file count limit</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'reveal') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Reveal</h1>
                        <p className="text-xl text-white/60">Scroll-triggered animations with multiple animation types.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.REVEAL_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Animation Types</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">fade</code> - Fade in opacity</li>
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">slide</code> - Slide from direction (up, down, left, right)</li>
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">scale</code> - Scale up from smaller size</li>
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">blur</code> - Blur and fade in</li>
                            <li><code className="text-sm bg-white/10 px-2 py-1 rounded">clip</code> - Clip path reveal</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'window') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Window</h1>
                        <p className="text-xl text-white/60">macOS-style window chrome with traffic lights and title bar.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.WINDOW_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Features</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>macOS-style traffic light close button</li>
                            <li>Title bar with centered title</li>
                            <li>Glass-morphism styling</li>
                            <li>Smooth entrance animation</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'close-button') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">CloseButton</h1>
                        <p className="text-xl text-white/60">Accessible dismiss button with macOS-style appearance.</p>
                    </div>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.CLOSE_BUTTON_EXAMPLE} language="tsx" />
                    </section>
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Accessibility</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>Proper ARIA labels</li>
                            <li>Keyboard accessible</li>
                            <li>Visible focus state</li>
                            <li>Clear hover feedback</li>
                        </ul>
                    </section>
                </div>
            );
        } else if (page === 'charts') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Charts</h1>
                        <p className="text-xl text-white/60">Six chart types built with Recharts: Area, Bar, Line, Pie, Donut, and Stacked Bar.</p>
                    </div>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Usage</h2>
                        <CodeBlock code={examples.CHARTS_EXAMPLE} language="tsx" />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Live Example</h2>
                        <p className="text-white/70">See all chart types in action in the Dashboard Showcase:</p>
                        <DashboardShowcase />
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Available Charts</h2>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
                            <li>AreaChart - Filled area charts</li>
                            <li>BarChart - Vertical bar charts</li>
                            <li>LineChart - Line charts</li>
                            <li>PieChart - Circular pie charts</li>
                            <li>DonutChart - Ring charts with center text</li>
                            <li>StackedBarChart - Stacked bar visualizations</li>
                        </ul>
                    </section>
                </div>
            );
        }
    }

    return (
        <div className="docs-content animate-in fade-in duration-500">
            <Breadcrumbs />
            {content}
            <DocNavigation />
        </div>
    );
}
