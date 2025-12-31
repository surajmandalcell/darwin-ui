'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@smc/darwin-ui'; // using library button if suitable
import { ScrollArea } from '@base-ui/react'; // or native
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

// Hardcoded for now, or passed as props. 
// Since this is client component, I can't call getDocsTree directly if it uses fs (it does).
// So I will pass the tree from Layout (Server Component! rsc rocks).

export function SidebarContent({ tree, className }: { tree: any[], className?: string }) {
    const pathname = usePathname();

    return (
        <div className={cn("h-full py-6 pr-6 pl-4", className)}>
            <div className="mb-8 px-2 flex items-center gap-2 font-bold text-xl text-white">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                Darwin UI
            </div>
            <div className="space-y-6">
                {tree.map((section, i) => (
                    <div key={i}>
                        <h4 className="mb-2 px-2 text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                            {section.title}
                        </h4>
                        <div className="space-y-1">
                            {section.items.map((item: any) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:text-white hover:bg-white/5",
                                        pathname === item.href ? "text-white bg-white/10" : "text-zinc-500"
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

export function MobileSidebar({ tree }: { tree: any[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="lg:hidden sticky top-0 z-50 flex items-center border-b border-white/10 bg-zinc-950/80 backdrop-blur-md px-4 h-14 w-full">
            <button onClick={() => setOpen(!open)} className="text-white">
                {open ? <X /> : <Menu />}
            </button>
            <span className="ml-4 font-bold text-white">Darwin UI</span>

            {open && (
                <div className="fixed inset-0 top-14 z-50 bg-zinc-950 p-4 animate-in slide-in-from-left-10 duration-200">
                    <SidebarContent tree={tree} />
                </div>
            )}
        </div>
    );
}
