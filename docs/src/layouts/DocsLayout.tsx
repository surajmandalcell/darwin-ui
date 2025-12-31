import { SidebarContent, MobileSidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function DocsLayout() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground selection:bg-indigo-500/30 font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 fixed inset-y-0 left-0 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl z-30">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <MobileSidebar />

            <main className="flex-1 lg:pl-64 min-w-0 animate-in fade-in duration-500 slide-in-from-bottom-2">
                <div className="max-w-4xl mx-auto py-10 px-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
