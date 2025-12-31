import { SidebarContent, MobileSidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function DocsLayout() {
    return (
        <div
            className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground selection:bg-indigo-500/30 font-sans"
            data-docs-layout="true"
        >
            {/* Desktop Sidebar - Navigation for documentation sections */}
            <aside
                className="hidden lg:block w-64 fixed inset-y-0 left-0 border-r border-white/10 bg-zinc-950/50 backdrop-blur-md z-30 overflow-y-auto"
                role="navigation"
                aria-label="Documentation navigation"
            >
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <MobileSidebar />

            {/* Main documentation content area */}
            <main
                className="flex-1 lg:pl-64 min-w-0 min-h-screen overflow-y-auto"
                role="main"
                aria-label="Documentation content"
            >
                <article className="max-w-4xl mx-auto py-10 px-6 prose prose-invert prose-headings:scroll-mt-20">
                    <Outlet />
                </article>
            </main>
        </div>
    );
}
