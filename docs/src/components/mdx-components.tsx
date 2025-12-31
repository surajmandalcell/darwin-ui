import Link from 'next/link';
import Image from 'next/image';
import * as Darwin from '@smc/darwin-ui';
import { ComponentPreview } from '@/components/component-preview'; // I might need to restore this

// Custom components map
export const components = {
    ...Darwin,
    Link,
    Image,
    // Add specialized MDX components
    pre: (props: any) => (
        <div className="relative my-6 rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
            <pre {...props} className="overflow-x-auto p-0" />
        </div>
    ),
    code: (props: any) => (
        <code {...props} className="font-mono text-sm text-indigo-300" />
    ),
    // Override Starlight specific components if they exist in MDX
    Card: Darwin.Card,
    CardGrid: (props: any) => <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6" {...props} />,
};
