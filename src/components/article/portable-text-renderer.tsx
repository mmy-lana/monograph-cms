import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
  type PortableTextTypeComponentProps
} from '@portabletext/react';
import Image from 'next/image';
import type { CalloutNode, CodeNode, CustomPortableTextBlock, ImageNode } from '@/types/blog';
import { getBlockPlainText, slugify } from '@/lib/utils';

interface PortableTextRendererProps {
  value: CustomPortableTextBlock[];
}

/** Link annotation carried on `markDefs` entries, as emitted by the editorial schema. */
type LinkMark = {
  _type: 'link';
  _key?: string;
  href?: string;
};

const CALLOUT_TONES: Record<'info' | 'warning' | 'tip', { accent: string; label: string }> = {
  info: { accent: 'border-neutral-900 bg-neutral-50', label: 'Note' },
  warning: { accent: 'border-amber-500 bg-amber-50', label: 'Caution' },
  tip: { accent: 'border-editorial-green bg-neutral-50', label: 'Takeaway' }
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-serif text-lg leading-[1.8] text-neutral-800 mb-6 tracking-normal">
        {children}
      </p>
    ),
    h2: ({ children, value }) => {
      const id = slugify(getBlockPlainText(value));
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
      const id = slugify(getBlockPlainText(value));
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
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => {
      const href = typeof value?.href === 'string' && value.href.length > 0 ? value.href : null;
      const isExternal = href !== null && href.startsWith('http');

      if (href === null) {
        return <span className="underline decoration-dotted underline-offset-4">{children}</span>;
      }

      return (
        <a
          href={href}
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
    callout: ({ value }: PortableTextTypeComponentProps<CalloutNode>) => {
      const tone = value.tone ?? 'info';
      const { accent, label } = CALLOUT_TONES[tone];

      return (
        <aside
          className={`my-8 p-5 rounded-xs border-l-4 text-neutral-800 font-sans text-sm sm:text-base leading-relaxed ${accent}`}
        >
          <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
            {label}
          </p>
          {value.text ? (
            <p>{value.text}</p>
          ) : (
            <p className="text-neutral-500 italic">This note is empty.</p>
          )}
        </aside>
      );
    },
    code: ({ value }: PortableTextTypeComponentProps<CodeNode>) => {
      const code = typeof value.code === 'string' ? value.code : '';
      const language = typeof value.language === 'string' ? value.language : '';

      return (
        <figure className="my-8 rounded-xs overflow-hidden bg-neutral-900 text-neutral-100 font-mono text-xs sm:text-sm">
          {value.filename && (
            <figcaption className="px-4 py-2 border-b border-neutral-800 text-neutral-400 text-xs bg-neutral-950 flex justify-between items-center gap-4">
              <span className="truncate">{value.filename}</span>
              {language && <span className="uppercase shrink-0">{language}</span>}
            </figcaption>
          )}
          {code ? (
            <pre className="p-4 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          ) : (
            <p className="p-4 text-neutral-400 italic">No code was supplied for this sample.</p>
          )}
        </figure>
      );
    },
    image: ({ value }: PortableTextTypeComponentProps<ImageNode>) => {
      const imageUrl = typeof value.asset?.url === 'string' ? value.asset.url : null;

      return (
        <figure className="my-10">
          {imageUrl ? (
            <div className="relative w-full aspect-16/10 rounded-xs overflow-hidden bg-neutral-100">
              <Image
                src={imageUrl}
                alt={value.alt || 'Article image'}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-16/10 rounded-xs border border-dashed border-editorial-border bg-paper-subtle flex items-center justify-center px-6">
              <p className="font-sans text-xs text-neutral-500 text-center">
                This figure has no image asset attached.
              </p>
            </div>
          )}
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
  if (value.length === 0) {
    return (
      <div className="max-w-[42.5rem] mx-auto py-16 text-center">
        <p className="font-serif text-lg text-neutral-800 mb-1">This article has no body content yet.</p>
        <p className="font-sans text-xs text-neutral-500">
          The story body will appear here once the editorial draft is published.
        </p>
      </div>
    );
  }

  return (
    <div className="prose-editorial">
      <PortableText value={value} components={components} />
    </div>
  );
}
