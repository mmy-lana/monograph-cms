import { PortableText, PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { CustomPortableTextBlock } from '@/types/blog';

interface PortableTextRendererProps {
  value: CustomPortableTextBlock[];
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-serif text-lg leading-[1.8] text-neutral-800 mb-6 tracking-normal">
        {children}
      </p>
    ),
    h2: ({ children, value }) => {
      const text = (value.children || []).map((c: any) => c.text || '').join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h2
          id={id}
          className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-12 mb-4 scroll-mt-20"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const text = (value.children || []).map((c: any) => c.text || '').join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h3
          id={id}
          className="font-sans text-xl font-bold tracking-tight text-neutral-900 mt-8 mb-3 scroll-mt-20"
        >
          {children}
        </h3>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-[3px] border-neutral-900 pl-6 my-8 italic font-serif text-xl sm:text-2xl text-neutral-800 leading-relaxed">
        {children}
      </blockquote>
    )
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = (value?.href || '').startsWith('http');
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="underline decoration-neutral-400 underline-offset-4 hover:decoration-black transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-neutral-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-neutral-100 text-neutral-800 font-mono text-sm px-1.5 py-0.5 rounded">
        {children}
      </code>
    )
  },
  types: {
    callout: ({ value }: { value: { text?: string; tone?: string } }) => (
      <aside className="my-8 p-5 bg-neutral-50 rounded-xs border-l-4 border-editorial-green text-neutral-800 font-sans text-sm sm:text-base leading-relaxed">
        {value.text}
      </aside>
    ),
    code: ({ value }: { value: { code?: string; filename?: string; language?: string } }) => (
      <div className="my-8 rounded-xs overflow-hidden bg-neutral-900 text-neutral-100 font-mono text-xs sm:text-sm">
        {value.filename && (
          <div className="px-4 py-2 border-b border-neutral-800 text-neutral-400 text-xs bg-neutral-950 flex justify-between items-center">
            <span>{value.filename}</span>
            <span className="uppercase">{value.language}</span>
          </div>
        )}
        <pre className="p-4 overflow-x-auto leading-relaxed">
          <code>{value.code}</code>
        </pre>
      </div>
    ),
    image: ({ value }: { value: { asset?: { url?: string }; alt?: string; caption?: string } }) => {
      const imageUrl = value?.asset?.url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80';
      return (
        <figure className="my-10">
          <div className="relative w-full aspect-16/10 rounded-xs overflow-hidden bg-neutral-100">
            <Image
              src={imageUrl}
              alt={value.alt || 'Article image'}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center font-sans text-xs text-neutral-500 mt-2.5">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  }
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="prose-editorial">
      <PortableText value={value as unknown as PortableTextBlock[]} components={components} />
    </div>
  );
}
