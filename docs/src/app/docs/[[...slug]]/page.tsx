import { getDocBySlug, getAllDocs } from '@/lib/docs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { components } from '@/components/mdx-components';

export async function generateStaticParams() {
    const docs = getAllDocs();
    return docs.map((slug) => ({ slug: slug.split('/') }));
}

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    const slugPath = slug || ['index'];

    // If slug is 'index', we might need to map to the root index.mdx if I put it in src/content/docs/index.mdx
    // But my getAllDocs logic returns 'index' if the file is index.mdx.

    const doc = await getDocBySlug(slugPath);

    if (!doc) {
        // Try 'getting-started/introduction' as default fallback for /docs root if index doesn't exist?
        if (!slug) {
            return notFound(); // or redirect
        }
        return notFound();
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">
                    {doc.meta.title}
                </h1>
                {doc.meta.description && (
                    <p className="text-xl text-white/60">
                        {doc.meta.description}
                    </p>
                )}
            </div>

            <article className="prose prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-indigo-400 prose-code:text-indigo-300 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 max-w-none">
                <MDXRemote source={doc.content} components={components} />
            </article>
        </div>
    );
}
