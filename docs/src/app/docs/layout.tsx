import { getDocsTree } from '@/lib/docs';
import { SidebarContent, MobileSidebar } from '@/components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    const tree = getDocsTree();

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl z-30">
                <SidebarContent tree={tree} />
            </aside>

            {/* Mobile Sidebar */}
            <MobileSidebar tree={tree} />

            <main className="flex-1 lg:pl-64 min-w-0 animate-in fade-in duration-500 slide-in-from-bottom-2">
                {children}
            </main>
        </div>
    );
}
