import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SearchButton } from './SearchButton';

// Hardcoded sidebar tree for now since we don't have fs access in client-side Vite (easily)
// In a real app we might fetch this JSON or codegen it.
export const docsTree = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs/getting-started/introduction" },
            { title: "Installation", href: "/docs/getting-started/installation" },
            { title: "Theming", href: "/docs/getting-started/theming" }
        ]
    },
    {
        title: "Components",
        items: [
            { title: "Button", href: "/docs/components/button" },
            { title: "Badge", href: "/docs/components/badge" },
            { title: "Card", href: "/docs/components/card" },
            { title: "Input", href: "/docs/components/input" },
            { title: "Select", href: "/docs/components/select" },
            { title: "Checkbox", href: "/docs/components/checkbox" },
            { title: "Switch", href: "/docs/components/switch" },
            { title: "Table", href: "/docs/components/table" },
            { title: "Modal", href: "/docs/components/modal" },
            { title: "Toast", href: "/docs/components/toast" },
            { title: "Alert", href: "/docs/components/alert" },
            { title: "Charts", href: "/docs/components/charts" },
            { title: "Skeleton", href: "/docs/components/skeleton" },
        ]
    },
    {
        title: "Hooks",
        items: [
            { title: "useMediaQuery", href: "/docs/hooks/use-media-query" },
            { title: "useIsMobile", href: "/docs/hooks/use-mobile" },
            { title: "useEscapeKey", href: "/docs/hooks/use-escape-key" },
        ]
    }
];

export function SidebarContent({ className, onClose }: { className?: string, onClose?: () => void }) {
    const location = useLocation();

    return (
        <div className={cn("h-full py-6 pr-6 pl-4 overflow-y-auto", className)}>
            <div className="mb-6 px-2 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white no-underline">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                    Darwin UI
                </Link>
                <ThemeToggle />
            </div>

            {/* Search Button */}
            <div className="mb-6 px-2">
                <SearchButton />
            </div>

            <div className="space-y-6">
                {docsTree.map((section, i) => (
                    <div key={i}>
                        <h4 className="mb-2 px-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                            {section.title}
                        </h4>
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        "block rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:text-white hover:bg-white/5 no-underline",
                                        location.pathname === item.href ? "text-white bg-white/10" : "text-zinc-500"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden sticky top-0 z-50 flex items-center border-b border-white/10 bg-zinc-950/80 backdrop-blur-md px-4 h-14 w-full">
            <button onClick={() => setOpen(!open)} className="text-white">
                {open ? <X /> : <Menu />}
            </button>
            <span className="ml-4 font-bold text-white">Darwin UI</span>

            {open && (
                <div className="fixed inset-0 top-14 z-50 bg-zinc-950 p-4 animate-in slide-in-from-left-10 duration-200">
                    <SidebarContent onClose={() => setOpen(false)} />
                </div>
            )}
        </div>
    );
}
