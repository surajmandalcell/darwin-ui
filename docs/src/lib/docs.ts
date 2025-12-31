import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/docs');

export type Doc = {
    slug: string;
    meta: {
        title?: string;
        description?: string;
        [key: string]: any;
    };
    content: string;
};

export function getAllDocs(): string[] {
    // Recursively find all mdx files
    const files: string[] = [];

    function traverse(dir: string) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                traverse(path.join(dir, entry.name));
            } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
                const relative = path.relative(contentDirectory, path.join(dir, entry.name));
                // Remove extension
                const slug = relative.replace(/\.mdx?$/, '');
                files.push(slug);
            }
        }
    }

    if (fs.existsSync(contentDirectory)) {
        traverse(contentDirectory);
    }

    return files;
}

export async function getDocBySlug(slugSegments: string[]): Promise<Doc | null> {
    const slug = slugSegments.join('/');
    // try .mdx and .md
    let fullPath = path.join(contentDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        fullPath = path.join(contentDirectory, `${slug}.md`);
    }

    if (!fs.existsSync(fullPath)) {
        // try checking if it is an index
        fullPath = path.join(contentDirectory, slug, 'index.mdx');
        if (!fs.existsSync(fullPath)) return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        meta: data,
        content,
    };
}

export function getDocsTree() {
    const allDocs = getAllDocs();
    const groups: Record<string, any[]> = {};

    // Sort docs to ensure order
    allDocs.sort();

    allDocs.forEach(slug => {
        // Skip index if it exists as root
        if (slug === 'index') return;

        const parts = slug.split('/');
        // Use directory as section name, or 'General'
        const section = parts.length > 1 ? parts[0] : 'General';
        // Use filename as title, formatted
        const name = parts[parts.length - 1];
        const title = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

        if (!groups[section]) groups[section] = [];
        groups[section].push({
            title,
            href: `/docs/${slug}`
        });
    });

    // Custom ordering of sections could be done here
    const sectionOrder = ['getting-started', 'components', 'hooks', 'general'];

    return Object.entries(groups)
        .sort(([a], [b]) => {
            const ia = sectionOrder.indexOf(a);
            const ib = sectionOrder.indexOf(b);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return a.localeCompare(b);
        })
        .map(([title, items]) => ({
            title: title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' '),
            items
        }));
}
