import { useParams, useLocation } from "react-router-dom";
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

export default function DocPageResolver() {
    const location = useLocation();
    const pathname = location.pathname; // e.g. /docs/components/button

    // Parse the slug
    const slug = pathname.replace('/docs/', '');
    const parts = slug.split('/');
    const section = parts[0];
    const page = parts[1] || 'introduction';

    // Map of content
    // This effectively replaces MDX for now, giving us full React control which is what the user might prefer for a "Web App" feel.
    // We can add text/code/blocks here.

    // Default content
    let content = (
        <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white capitalize">{page.replace(/-/g, ' ')}</h1>
            <p className="text-xl text-white/60 mb-8">Documentation for {page} is coming soon.</p>
        </div>
    );

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
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Installation</h1>
                    <p className="text-xl text-white/60">Get up and running in seconds.</p>

                    <div className="prose prose-invert max-w-none">
                        <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-blue-400">
                            npm install @smc/darwin-ui
                        </div>
                    </div>
                </div>
            );
        }
    } else if (section === 'components') {
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
                </div>
            );
        } else if (page === 'badge') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Badge</h1>
                        <p className="text-xl text-white/60">Displays a status or count.</p>
                    </div>
                    <BadgePreview />
                </div>
            );
        } else if (page === 'input') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Input</h1>
                        <p className="text-xl text-white/60">Displays a form input field.</p>
                    </div>
                    <InputPreview />
                </div>
            );
        } else if (page === 'checkbox') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Checkbox</h1>
                        <p className="text-xl text-white/60">A control that allows the user to toggle between checked and not checked.</p>
                    </div>
                    <CheckboxPreview />
                </div>
            );
        } else if (page === 'switch') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Switch</h1>
                        <p className="text-xl text-white/60">A control that allows the user to toggle between checked and not checked.</p>
                    </div>
                    <SwitchPreview />
                </div>
            );
        } else if (page === 'card') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Card</h1>
                        <p className="text-xl text-white/60">Displays a card with header, content, and footer.</p>
                    </div>
                    <CardPreview />
                </div>
            );
        } else if (page === 'alert') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Alert</h1>
                        <p className="text-xl text-white/60">Displays a callout for user attention.</p>
                    </div>
                    <AlertPreview />
                </div>
            );
        } else if (page === 'skeleton') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Skeleton</h1>
                        <p className="text-xl text-white/60">Use to show a placeholder while content is loading.</p>
                    </div>
                    <SkeletonPreview />
                </div>
            );
        } else if (page === 'modal') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Modal</h1>
                        <p className="text-xl text-white/60">A window overlaid on either the primary window or another dialog window.</p>
                    </div>
                    <ModalPreview />
                </div>
            );
        } else if (page === 'toast') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Toast</h1>
                        <p className="text-xl text-white/60">A succinct message that is displayed temporarily.</p>
                    </div>
                    <ToastPreview />
                </div>
            );
        } else if (page === 'select') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Select</h1>
                        <p className="text-xl text-white/60">Displays a list of options for the user to pick from.</p>
                    </div>
                    <SelectPreview />
                </div>
            );
        } else if (page === 'table') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Table</h1>
                        <p className="text-xl text-white/60">Responsive data table with styling.</p>
                    </div>
                    <TablePreview />
                </div>
            );
        } else if (page === 'charts') {
            content = (
                <div className="space-y-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Charts</h1>
                        <p className="text-xl text-white/60">Beautiful charts built with Recharts.</p>
                    </div>
                    <p className="text-zinc-400">Check out the Dashboard Showcase for chart examples.</p>
                    <DashboardShowcase />
                </div>
            );
        }
    }

    return (
        <div className="docs-content animate-in fade-in duration-500">
            {content}
        </div>
    );
}
