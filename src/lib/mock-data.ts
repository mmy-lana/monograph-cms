import { Post } from '@/types/blog';

export const MOCK_POSTS: Post[] = [
  {
    _id: 'post-1',
    title: 'Architecting Resilient Distributed Systems: Lessons from 100M Requests',
    slug: 'architecting-resilient-distributed-systems',
    subtitle: 'How decoupling state, orchestrating idempotency keys, and edge streaming changed our core throughput.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      alt: 'Server rack infrastructure with cool lighting',
      caption: 'Distributed edge nodes deployed across 34 global regions.'
    },
    publishedAt: '2026-03-12T10:00:00Z',
    author: {
      _id: 'author-1',
      name: 'Elena Rostova',
      slug: 'elena-rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Principal Distributed Systems Engineer at HyperScale. Writing on consistency guarantees, rust runtimes, and distributed transactions.',
      role: 'Staff Infrastructure Architect',
      twitterHandle: 'erostova_eng',
      followersCount: 14820
    },
    categories: [
      {
        _id: 'cat-1',
        title: 'Systems Engineering',
        slug: 'systems-engineering',
        description: 'Deep dives into distributed architecture, edge compute, and kernel optimizations.',
        color: '#2563EB'
      }
    ],
    tags: ['Architecture', 'Distributed Systems', 'Performance', 'Reliability'],
    estimatedReadingTime: 8,
    wordCount: 1840,
    clapsCount: 4230,
    viewsCount: 38900,
    body: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c1',
            _type: 'span',
            text: 'When systems scale beyond tens of millions of concurrent requests, classical assumptions about synchronous atomicity evaporate. Network partitions cease being rare anomalies; they become continuous ambient realities.'
          }
        ]
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'c2',
            _type: 'span',
            text: '1. The Illusion of Synchronous RPCs'
          }
        ]
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c3',
            _type: 'span',
            text: 'Every remote procedural call is a latent failure boundary. In high-density pipelines, cascading timeouts can exhaust connection pools in fractions of a second. Replacing blocking cross-service calls with event-driven durable outbox patterns eliminated 94% of our edge 504 errors.'
          }
        ]
      },
      {
        _key: 'b4',
        _type: 'callout',
        tone: 'tip',
        text: 'Crucial Takeaway: Always ensure idempotency keys are generated on the origin client and validated before the transaction hits your primary persistence engine.'
      },
      {
        _key: 'b5',
        _type: 'code',
        language: 'typescript',
        filename: 'idempotent-engine.ts',
        code: `export async function executeTransactionalTask<T>(\n  idempotencyKey: string,\n  fn: () => Promise<T>\n): Promise<T> {\n  const cached = await redis.get(\`idem:\${idempotencyKey}\`);\n  if (cached) return JSON.parse(cached);\n\n  const lockAcquired = await redis.set(\`lock:\${idempotencyKey}\`, '1', 'PX', 5000, 'NX');\n  if (!lockAcquired) throw new ConcurrencyConflictError();\n\n  try {\n    const result = await fn();\n    await redis.set(\`idem:\${idempotencyKey}\`, JSON.stringify(result), 'EX', 86400);\n    return result;\n  } finally {\n    await redis.del(\`lock:\${idempotencyKey}\`);\n  }\n}`
      },
      {
        _key: 'b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'c4',
            _type: 'span',
            text: '2. Bounded Contexts and Memory Footprints'
          }
        ]
      },
      {
        _key: 'b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c5',
            _type: 'span',
            text: 'Memory pressure in managed garbage-collected runtimes creates unpredictable stop-the-world pauses. By moving data ingestion buffers to zero-copy shared memory regions, we stabilized 99.9th percentile latencies from 420ms down to 18ms.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-2',
    title: 'The Lost Art of High-Density Typography in Digital Publishing',
    slug: 'the-lost-art-of-high-density-typography',
    subtitle: 'Why modern web design abandoned rhythm, measure, and contrast—and how to rebuild them.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1507842229451-797185e8282e?auto=format&fit=crop&w=1600&q=80',
      alt: 'Old printing press letterpress blocks',
      caption: 'Mechanical movable type matrices at the Plantin-Moretus Museum.'
    },
    publishedAt: '2026-03-08T14:30:00Z',
    author: {
      _id: 'author-2',
      name: 'Marcus Vance',
      slug: 'marcus-vance',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Typographer, type designer, and editorial designer. Former design lead at The Paris Review.',
      role: 'Design Director',
      twitterHandle: 'vance_type',
      followersCount: 8930
    },
    categories: [
      {
        _id: 'cat-2',
        title: 'Design & Craft',
        slug: 'design-and-craft',
        description: 'Typefaces, editorial grid systems, and the tactile mechanics of reading.',
        color: '#10B981'
      }
    ],
    tags: ['Typography', 'Editorial', 'UI Design', 'CSS'],
    estimatedReadingTime: 5,
    wordCount: 1150,
    clapsCount: 2840,
    viewsCount: 22100,
    body: [
      {
        _key: 'b20',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c20',
            _type: 'span',
            text: 'Typography is not the arrangement of pretty glyphs; it is the deliberate construction of an effortless cognitive highway. When measure exceeds 75 characters per line, the human eye strains during the sweep back to the next line starter.'
          }
        ]
      },
      {
        _key: 'b21',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'c21',
            _type: 'span',
            text: 'Rhythm and Vertical Metrics'
          }
        ]
      },
      {
        _key: 'b22',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c22',
            _type: 'span',
            text: 'A true editorial rhythm requires adherence to a vertical cadence. If your paragraph line height is 32px, headings, pull quotes, and visual dividers must snap strictly to multiples or fractions of that 32px baseline.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-3',
    title: 'The Economics of Open Standards in Infrastructure Software',
    slug: 'the-economics-of-open-standards',
    subtitle: 'Draft working notes on licensing incentives, governance, and long-term maintenance of public protocols.',
    status: 'draft',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      alt: 'Close-up of a printed circuit board with gold traces',
      caption: 'Draft fixture: excluded from all published feed queries and detail lookups.'
    },
    publishedAt: '2026-04-01T09:00:00Z',
    author: {
      _id: 'author-1',
      name: 'Elena Rostova',
      slug: 'elena-rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Principal Distributed Systems Engineer at HyperScale. Writing on consistency guarantees, rust runtimes, and distributed transactions.',
      role: 'Staff Infrastructure Architect',
      twitterHandle: 'erostova_eng',
      followersCount: 14820
    },
    categories: [
      {
        _id: 'cat-3',
        title: 'Economics & Policy',
        slug: 'economics-and-policy',
        description: 'Market structures, standards bodies, and incentive design for critical software ecosystems.',
        color: '#7C3AED'
      }
    ],
    tags: ['Standards', 'Licensing', 'Governance'],
    estimatedReadingTime: 6,
    wordCount: 1410,
    clapsCount: 0,
    viewsCount: 0,
    body: [
      {
        _key: 'b30',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'c30',
            _type: 'span',
            text: 'Unpublished working draft used to validate status-based filtering in the mock data fallback path.'
          }
        ]
      }
    ]
  }
];
