import type { Author, Category, Post } from '@/types/blog';

/**
 * Editorial taxonomy shared by every monograph in this offline fallback
 * dataset. The four desks mirror the Sanity dataset one-to-one so that
 * navigation, filtering and category landing pages behave identically
 * whether or not a network request succeeds.
 */
export const CATEGORIES: Category[] = [
  {
    _id: 'cat-1',
    title: 'Systems Engineering',
    slug: 'systems-engineering',
    description: 'Distributed architecture, runtime internals and the operational discipline required to keep large fleets predictable under load.',
    color: '#2563EB'
  },
  {
    _id: 'cat-2',
    title: 'Design & Craft',
    slug: 'design-and-craft',
    description: 'Typography, grid systems and interface detail work treated as measurable engineering problems rather than decoration.',
    color: '#10B981'
  },
  {
    _id: 'cat-3',
    title: 'Economics & Policy',
    slug: 'economics-and-policy',
    description: 'How licensing, procurement and standards governance decide which infrastructure actually gets funded and maintained.',
    color: '#7C3AED'
  },
  {
    _id: 'cat-4',
    title: 'Database Internals & Storage Engines',
    slug: 'database-internals',
    description: 'B-tree and LSM structures, write-ahead logging, query planning and the physical layout of durable data.',
    color: '#F59E0B'
  }
];

/**
 * Contributor roster. Each author keeps a single editorial beat or, where noted,
 * a second one, which is what makes the cross-category tagging in the post list
 * below realistic rather than synthetic.
 */
export const AUTHORS: Author[] = [
  {
    _id: 'author-1',
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Staff infrastructure architect working on consensus, admission control and failure injection across multi-region fleets. Fifteen years of on-call rotations shaped every opinion in her writing.',
    role: 'Staff Infrastructure Architect',
    twitterHandle: 'erostova_eng',
    followersCount: 14820
  },
  {
    _id: 'author-2',
    name: 'Marcus Vance',
    slug: 'marcus-vance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Type designer and editorial director who has set long-form magazines in metal, in QuarkXPress and in variable-font CSS. He argues that measure and rhythm are engineering constraints, not taste.',
    role: 'Design Director',
    twitterHandle: 'vance_type',
    followersCount: 8930
  },
  {
    _id: 'author-3',
    name: 'Priya Raghunathan',
    slug: 'priya-raghunathan',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    bio: 'Storage engine lead responsible for a B-tree based OLTP engine and its buffer pool. She writes about page layout, crash recovery and the arithmetic behind fill factor decisions.',
    role: 'Storage Engine Lead',
    twitterHandle: 'prag_ran',
    followersCount: 26140
  },
  {
    _id: 'author-4',
    name: 'Tomas Lindqvist',
    slug: 'tomas-lindqvist',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    bio: 'Platform engineer turned standards participant who tracks the cost of coordination inside large engineering organisations and the bodies that govern shared protocols.',
    role: 'Principal Platform Engineer',
    twitterHandle: 'tomas_lq',
    followersCount: 7320
  },
  {
    _id: 'author-5',
    name: 'Amara Okonkwo',
    slug: 'amara-okonkwo',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    bio: 'Editorial systems designer who builds token pipelines and type scales for newsrooms, and studies how open-licence choices ripple through design tooling ecosystems.',
    role: 'Editorial Systems Designer',
    twitterHandle: 'amara_sets',
    followersCount: 11980
  },
  {
    _id: 'author-6',
    name: 'Kenji Watanabe',
    slug: 'kenji-watanabe',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Query planner engineer who spends his days reading EXPLAIN output and histogram statistics. He writes about cardinality estimation, join ordering and the plans that look free but are not.',
    role: 'Query Planner Engineer',
    twitterHandle: 'kenji_query',
    followersCount: 8420
  },
  {
    _id: 'author-7',
    name: 'Sofia Marchetti',
    slug: 'sofia-marchetti',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    bio: 'Site reliability engineer who owns the observability and capacity story for a streaming platform, and treats every dashboard as a hypothesis to be falsified.',
    role: 'Senior Site Reliability Engineer',
    twitterHandle: 'sofia_sre',
    followersCount: 4360
  },
  {
    _id: 'author-8',
    name: 'Daniel Oyelaran',
    slug: 'daniel-oyelaran',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    bio: 'Digital infrastructure policy researcher who reads procurement notices and licence texts the way other people read changelogs, and models what they cost the public sector.',
    role: 'Infrastructure Policy Researcher',
    twitterHandle: 'doyelaran',
    followersCount: 2150
  },
  {
    _id: 'author-9',
    name: 'Hanna Bergstrom',
    slug: 'hanna-bergstrom',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Database reliability engineer who runs stateful workloads on Kubernetes and writes about replication lag, failover drills and the operational cost of storage topologies.',
    role: 'Database Reliability Engineer',
    twitterHandle: 'hanna_replicates',
    followersCount: 3160
  }
];

export const MOCK_POSTS: Post[] = [
  {
    _id: 'post-1',
    title: 'Architecting Resilient Distributed Systems Without Lying to Yourself',
    slug: 'architecting-resilient-distributed-systems',
    subtitle: 'Deadline propagation, edge-minted idempotency keys and admission control, measured against nine months of production incidents.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
      alt: 'Rows of illuminated server racks receding into a dim data centre aisle',
      caption: 'The fleet that survived our worst week was the one that could shed work, not the one with the most replicas.'
    },
    publishedAt: '2026-03-12T10:00:00Z',
    updatedAt: '2026-03-15T08:12:00Z',
    author: AUTHORS[0],
    categories: [CATEGORIES[0]],
    tags: ['Distributed Systems', 'Backpressure', 'Idempotency', 'Latency Budgets', 'Incident Response'],
    estimatedReadingTime: 8,
    wordCount: 1820,
    clapsCount: 4230,
    viewsCount: 38900,
    body: [
      {
        _key: 'p1-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p1-c1',
            _type: 'span',
            text: 'Resilience is not a property you install at the end of a project; it is a set of budgets you spend continuously. The system that survived our worst week was not the one with the most replicated state, but the one that could drop forty percent of its work without violating a single customer-visible contract.'
          }
        ]
      },
      {
        _key: 'p1-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p1-c2',
            _type: 'span',
            text: 'Failure Domains Are Budgets, Not Booleans'
          }
        ]
      },
      {
        _key: 'p1-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p1-c3',
            _type: 'span',
            text: 'Architecture diagrams label a service as available or unavailable. Production tells a different story: a node can serve reads while its write path is pinned, and a shard can answer queries while replication lag grows by two seconds per minute. Modelling degradation as a continuous quantity lets you choose where the loss lands instead of discovering it on a status page at 03:00.'
          }
        ]
      },
      {
        _key: 'p1-b4',
        _type: 'callout',
        tone: 'warning',
        text: 'Retries are a load amplifier. Three attempts across four service hops multiply a failing dependency traffic twelvefold at exactly the moment it can least afford the extra work. Every retry policy needs a matching shed policy.'
      },
      {
        _key: 'p1-b5',
        _type: 'code',
        language: 'typescript',
        filename: 'deadline.ts',
        code: `export interface Deadline {
  readonly budgetMs: number;
  readonly startedAt: number;
}

export function remainingMs(deadline: Deadline): number {
  return deadline.budgetMs - (Date.now() - deadline.startedAt);
}

export async function withBudget<T>(
  deadline: Deadline,
  operation: (signal: AbortSignal) => Promise<T>
): Promise<T> {
  const left = remainingMs(deadline);
  if (left <= 0) {
    throw new Error(\`budget exhausted for \${operation.name || 'anonymous call'}\`);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), left);
  try {
    return await operation(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}`
      },
      {
        _key: 'p1-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p1-c4',
            _type: 'span',
            text: 'Idempotency Keys Belong at the Edge'
          }
        ]
      },
      {
        _key: 'p1-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p1-c5',
            _type: 'span',
            text: 'Generating an idempotency key inside the service that performs the write is already too late, because a client timeout followed by a retry has created two logical requests before your code runs. Keys minted at the client boundary, carried in a header and persisted with the transaction, collapse both attempts into one row and one ledger entry.'
          }
        ]
      },
      {
        _key: 'p1-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p1-c6',
            _type: 'span',
            text: 'We store the key next to a hash of the canonicalised request payload. If the same key arrives with a different body hash we return a conflict instead of replaying the first result, which is the failure mode that silently reconciles two different intentions into one payment.'
          }
        ]
      },
      {
        _key: 'p1-b9',
        _type: 'callout',
        tone: 'tip',
        text: 'Persist the idempotency record in the same transaction as the business effect. A cache-only implementation quietly loses its guarantee on eviction and turns a legitimate retry into a duplicate.'
      },
      {
        _key: 'p1-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p1-c7',
            _type: 'span',
            text: 'Backpressure Before Circuit Breakers'
          }
        ]
      },
      {
        _key: 'p1-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p1-c8',
            _type: 'span',
            text: 'Circuit breakers react after latency has degraded; admission control acts before the damage compounds. A queue-depth signal from each worker pool feeds a token bucket, so callers are rejected while p99 is still inside budget and the rejection itself carries a retry-after hint.'
          }
        ]
      },
      {
        _key: 'p1-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p1-c9',
            _type: 'span',
            text: 'A queue is a latency promise written in the future tense. Every message you accept is a commitment to finish it before its caller gives up.'
          }
        ]
      },
      {
        _key: 'p1-b13',
        _type: 'code',
        language: 'go',
        filename: 'limiter.go',
        code: `package admission

import (
    "context"
    "errors"
    "time"
)

var ErrShed = errors.New("request shed by admission control")

// Limiter blocks until the worker pool has capacity or the caller gives up.
type Limiter struct {
    slots chan struct{}
}

func NewLimiter(capacity int) *Limiter {
    return &Limiter{slots: make(chan struct{}, capacity)}
}

func (l *Limiter) Acquire(ctx context.Context) error {
    select {
    case l.slots <- struct{}{}:
        return nil
    case <-ctx.Done():
        return ErrShed
    case <-time.After(50 * time.Millisecond):
        return ErrShed
    }
}

func (l *Limiter) Release() {
    select {
    case <-l.slots:
    default:
    }
}`
      },
      {
        _key: 'p1-b14',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p1-c10',
            _type: 'span',
            text: 'The composite result after two quarters was unglamorous and measurable: p99 write latency fell from 480 to 96 milliseconds, timeout-induced retries dropped by ninety-one percent, and the incident class that used to require a war room became a dashboard annotation with a runbook link.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-2',
    title: 'The Lost Art of High-Density Typography in Digital Publishing',
    slug: 'the-lost-art-of-high-density-typography',
    subtitle: 'Why the web abandoned measure, rhythm and optical correction, and how to rebuild them with modern CSS.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1600&q=80',
      alt: 'Wooden letterpress drawers filled with metal movable type sorts',
      caption: 'Mechanical type imposed hard constraints on spacing, and those constraints produced better reading than most fluid layouts do today.'
    },
    publishedAt: '2026-03-08T14:30:00Z',
    author: AUTHORS[1],
    categories: [CATEGORIES[1]],
    tags: ['Typography', 'CSS', 'Editorial Design', 'Design Tokens'],
    estimatedReadingTime: 6,
    wordCount: 1360,
    clapsCount: 2840,
    viewsCount: 22100,
    body: [
      {
        _key: 'p2-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p2-c1',
            _type: 'span',
            text: 'Typography is not the arrangement of attractive glyphs; it is the construction of an effortless cognitive path through text. When a measure exceeds roughly seventy-five characters, the return sweep of the eye becomes a search problem, and readers pay for that search with comprehension.'
          }
        ]
      },
      {
        _key: 'p2-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p2-c2',
            _type: 'span',
            text: 'Rhythm Is an Arithmetic Contract'
          }
        ]
      },
      {
        _key: 'p2-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p2-c3',
            _type: 'span',
            text: 'A true vertical rhythm demands that every vertical measurement resolve to a multiple or a clean fraction of the baseline grid. If the paragraph line height is 32 pixels, then headings, pull quotes, figure captions and dividers must snap to that grid or the page will drift by a few pixels per section until the columns no longer align.'
          }
        ]
      },
      {
        _key: 'p2-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Density is a range, not a target. A 1.5 line height is comfortable at 16 pixels and claustrophobic at 22; leading should scale with measure, not with viewport width alone.'
      },
      {
        _key: 'p2-b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p2-c4',
            _type: 'span',
            text: 'The classic desk reference for this is a proportion rather than a number: leading of roughly one and a half times the type size for a measure near sixty-six characters, tightening toward one and a third for short measures such as sidebars and captions. Expressing that relationship as a computed token keeps long and short text blocks on the same rhythm without hand-tuned one-offs.'
          }
        ]
      },
      {
        _key: 'p2-b6',
        _type: 'code',
        language: 'typescript',
        filename: 'measure-tokens.ts',
        code: `const MIN_MEASURE_CH = 45;
const IDEAL_MEASURE_CH = 66;

export interface TypeStep {
  readonly sizeRem: number;
  readonly measureCh: number;
}

/** Leading widens as the measure grows: short columns tolerate tight leading. */
export function leadingFor(step: TypeStep): number {
  const density = (step.measureCh - MIN_MEASURE_CH) / (IDEAL_MEASURE_CH - MIN_MEASURE_CH);
  const clamped = Math.min(Math.max(density, 0), 1);
  return Number((1.32 + clamped * 0.18).toFixed(3));
}

export function toCss(step: TypeStep): string {
  const leading = leadingFor(step);
  return [
    'font-size: ' + step.sizeRem + 'rem',
    'max-inline-size: ' + step.measureCh + 'ch',
    'line-height: ' + leading
  ].join('; ');
}`
      },
      {
        _key: 'p2-b7',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p2-c5',
            _type: 'span',
            text: 'Optical Size Is Not a Stylistic Toggle'
          }
        ]
      },
      {
        _key: 'p2-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p2-c6',
            _type: 'span',
            text: 'Text sizes need generous spacing and sturdy stems to survive at fifteen pixels; display sizes need tighter spacing, thinner hairlines and a smaller x-height ratio to avoid looking clumsy at ninety. Variable fonts expose the axis directly, and a stylesheet that pins one value across both ranges is throwing away the correction the designer drew.'
          }
        ]
      },
      {
        _key: 'p2-b9',
        _type: 'callout',
        tone: 'warning',
        text: 'Setting optical size from the rendered pixel size at runtime causes reflow during font loading and produces layout shift in every paragraph. Compute it from the design step, not from measurement.'
      },
      {
        _key: 'p2-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p2-c7',
            _type: 'span',
            text: 'Hanging Punctuation and the Left Edge'
          }
        ]
      },
      {
        _key: 'p2-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p2-c8',
            _type: 'span',
            text: 'A quotation mark pushed inside the text block breaks the optical left edge of the column; the same mark hung into the margin preserves it. Browsers expose this through hanging punctuation where available, and a negative text indent of about half an em approximates it elsewhere without touching the markup.'
          }
        ]
      },
      {
        _key: 'p2-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p2-c9',
            _type: 'span',
            text: 'Good typography is invisible until it is absent. Readers never compliment a well-set page, they simply finish the article.'
          }
        ]
      },
      {
        _key: 'p2-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p2-c10',
            _type: 'span',
            text: 'The practical test is unglamorous: print the page, hold it at reading distance, and cover the screen with a sheet of paper as you read one column. If your eye stumbles at the same line every time, the fault is measurable, and it is almost always measure, leading or contrast rather than typeface choice.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-3',
    title: 'Backpressure and Flow Control in Streaming Pipelines',
    slug: 'backpressure-and-flow-control-in-streaming-pipelines',
    subtitle: 'Choosing between credit-based, window-based and time-based flow control when producers and consumers live in different failure domains.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80',
      alt: 'Bundles of coloured fibre optic patch cables routed into a network switch',
      caption: 'Flow control is a scheduling problem disguised as a networking problem.'
    },
    publishedAt: '2026-02-24T09:15:00Z',
    author: AUTHORS[6],
    categories: [CATEGORIES[0]],
    tags: ['Streaming', 'Backpressure', 'Flow Control', 'Kafka', 'Capacity Planning'],
    estimatedReadingTime: 9,
    wordCount: 2050,
    clapsCount: 1180,
    viewsCount: 26400,
    body: [
      {
        _key: 'p3-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p3-c1',
            _type: 'span',
            text: 'Every streaming pipeline eventually discovers that unbounded queues are just a delayed outage. The interesting engineering question is not whether to apply backpressure, but which signal carries it upstream: credits, windows, or latency.'
          }
        ]
      },
      {
        _key: 'p3-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p3-c2',
            _type: 'span',
            text: 'Three Flow Control Regimes'
          }
        ]
      },
      {
        _key: 'p3-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p3-c3',
            _type: 'span',
            text: 'Credit-based control lets a consumer advertise how many messages it can accept, which gives precise throughput matching and cheap reasoning about memory. Window-based control, as used by TCP and by most replication protocols, tracks bytes in flight and tolerates bursty producers. Latency-based control compares observed queue delay against a target and throttles producers when the target is exceeded.'
          }
        ]
      },
      {
        _key: 'p3-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Credit-based control is the only one of the three that gives a hard upper bound on in-flight work, which is why it is the right default for pipelines with a strict memory budget.'
      },
      {
        _key: 'p3-b5',
        _type: 'code',
        language: 'go',
        filename: 'credits.go',
        code: `package flow

import "sync/atomic"

// CreditWindow tracks permits a consumer has advertised back to the producer.
type CreditWindow struct {
    available int64
    max       int64
}

func NewCreditWindow(max int64) *CreditWindow {
    return &CreditWindow{available: max, max: max}
}

// TryReserve takes one permit without blocking; callers shed work when it fails.
func (w *CreditWindow) TryReserve() bool {
    for {
        current := atomic.LoadInt64(&w.available)
        if current <= 0 {
            return false
        }
        if atomic.CompareAndSwapInt64(&w.available, current, current-1) {
            return true
        }
    }
}

// Refill is called once a batch has been acknowledged downstream.
func (w *CreditWindow) Refill(n int64) {
    for {
        current := atomic.LoadInt64(&w.available)
        next := current + n
        if next > w.max {
            next = w.max
        }
        if atomic.CompareAndSwapInt64(&w.available, current, next) {
            return
        }
    }
}

func (w *CreditWindow) InFlight() int64 {
    return w.max - atomic.LoadInt64(&w.available)
}`
      },
      {
        _key: 'p3-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p3-c4',
            _type: 'span',
            text: 'Where Teams Get the Ack Path Wrong'
          }
        ]
      },
      {
        _key: 'p3-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p3-c5',
            _type: 'span',
            text: 'Credits must be returned after the downstream side effect is durable, not after the message has been parsed into memory. Refilling credits at parse time converts a durable acknowledgement into an optimistic one, and a crash at the wrong moment loses the batch while the producer believes it landed.'
          }
        ]
      },
      {
        _key: 'p3-b8',
        _type: 'image',
        asset: {
          _type: 'image',
          url: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80'
        },
        alt: 'Dense patch panel with dozens of numbered network connections',
        caption: 'Credit returns should be observable per partition, not only in aggregate, or a single hot partition will hide its imbalance behind a healthy average.'
      },
      {
        _key: 'p3-b9',
        _type: 'callout',
        tone: 'warning',
        text: 'A consumer that acknowledges before committing turns backpressure into data loss. Track credit refills and commit offsets as a single unit of work in your metrics, then alert on the divergence.'
      },
      {
        _key: 'p3-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p3-c6',
            _type: 'span',
            text: 'Tuning the Credit Ceiling'
          }
        ]
      },
      {
        _key: 'p3-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p3-c7',
            _type: 'span',
            text: 'Set the ceiling from the consumer throughput times the tolerable stall: a consumer that processes 4,000 messages per second and may stall for two seconds needs roughly 8,000 credits. Add a jitter buffer of twenty percent so a slow batch does not immediately starve the pipeline, and expose in-flight credits as a first-class gauge.'
          }
        ]
      },
      {
        _key: 'p3-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p3-c8',
            _type: 'span',
            text: 'A pipeline without backpressure does not fail at the point of overload; it fails much later, in a component that had nothing to do with the original spike.'
          }
        ]
      },
      {
        _key: 'p3-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p3-c9',
            _type: 'span',
            text: 'The payoff is operational rather than theoretical: after moving three ingestion topics to credit-based flow control, our consumer memory high-water mark fell by seventy percent and the nightly rebalance stopped producing out-of-memory kills entirely.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-4',
    title: 'Tail Latency Budgets for Multi-Tenant Fleets',
    slug: 'tail-latency-budgets-for-multi-tenant-fleets',
    subtitle: 'How to keep p99 stable when a single noisy neighbour can consume an entire host and your scheduler has no idea it happened.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
      alt: 'Dashboard of latency and throughput charts on a dark monitor',
      caption: 'Averages hide the incidents your customers actually notice; the only numbers worth budgeting are percentiles.'
    },
    publishedAt: '2026-01-30T16:45:00Z',
    author: AUTHORS[0],
    categories: [CATEGORIES[0]],
    tags: ['Latency', 'Scheduling', 'Multi-Tenancy', 'Performance Isolation', 'SRE'],
    estimatedReadingTime: 11,
    wordCount: 2480,
    clapsCount: 6720,
    viewsCount: 74100,
    body: [
      {
        _key: 'p4-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p4-c1',
            _type: 'span',
            text: 'A tenant that runs a nightly analytics job can double the p99 of every neighbour on the same host without ever exceeding its own CPU quota. Tail latency in shared infrastructure is therefore a scheduling problem first and a capacity problem second.'
          }
        ]
      },
      {
        _key: 'p4-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p4-c2',
            _type: 'span',
            text: 'Why Averages Cannot Detect Interference'
          }
        ]
      },
      {
        _key: 'p4-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p4-c3',
            _type: 'span',
            text: 'The mean of a latency distribution moves with throughput, while the shape of the distribution moves with contention. A host whose mean rose by two milliseconds and whose p99 rose by ninety milliseconds is telling you that requests are queueing behind a burst of memory pressure, not that the fleet needs more replicas.'
          }
        ]
      },
      {
        _key: 'p4-b4',
        _type: 'callout',
        tone: 'warning',
        text: 'Percentile averaging is a lie of convenience. Averaging per-host p99 values produces a number that matches no request in your system; aggregate raw histograms, or merge digests, before you compute anything.'
      },
      {
        _key: 'p4-b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p4-c4',
            _type: 'span',
            text: 'We keep per-request histograms with exponential buckets and merge them in a streaming rollup. Bucket boundaries are chosen so that a bucket index is a fixed number of arithmetic operations from the observed value, which keeps the hot path free of allocation and makes the merge associative across arbitrary time ranges.'
          }
        ]
      },
      {
        _key: 'p4-b6',
        _type: 'code',
        language: 'go',
        filename: 'histogram.go',
        code: `package latency

import "math/bits"

const (
    subBucketBits  = 12
    subBucketCount = 1 << subBucketBits
)

// Histogram is a power-of-two bucketed distribution with a linear sub-range,
// which keeps the error below one percent across four orders of magnitude.
type Histogram struct {
    counts []uint64
    total  uint64
    sum    uint64
}

func NewHistogram(buckets int) *Histogram {
    return &Histogram{counts: make([]uint64, buckets)}
}

func index(value uint64) int {
    if value < subBucketCount {
        return int(value)
    }
    exponent := 63 - bits.LeadingZeros64(value)
    shift := uint(exponent - subBucketBits + 1)
    return int(subBucketCount + (value>>shift)*2)
}

func (h *Histogram) Record(nanos uint64) {
    h.counts[index(nanos)]++
    h.total++
    h.sum += nanos
}

func (h *Histogram) Merge(other *Histogram) {
    for i, c := range other.counts {
        h.counts[i] += c
    }
    h.total += other.total
    h.sum += other.sum
}`
      },
      {
        _key: 'p4-b7',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p4-c5',
            _type: 'span',
            text: 'Isolation Mechanisms and What They Actually Buy You'
          }
        ]
      },
      {
        _key: 'p4-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p4-c6',
            _type: 'span',
            text: 'CPU quotas cap throughput but not the queueing delay they induce, because a throttled container still competes for page cache and memory bandwidth. Memory bandwidth is the resource most tenants exhaust first, and it is the one that current schedulers measure least directly.'
          }
        ]
      },
      {
        _key: 'p4-b9',
        _type: 'callout',
        tone: 'tip',
        text: 'Reserve a slice of each host for latency-critical traffic using a dedicated cgroup with guaranteed memory and a bounded CPU quota, then verify with stress tests that the reservation holds at forty percent background load.'
      },
      {
        _key: 'p4-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p4-c7',
            _type: 'span',
            text: 'Scheduling for the Tail Instead of the Mean'
          }
        ]
      },
      {
        _key: 'p4-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p4-c8',
            _type: 'span',
            text: 'Placement decisions that optimise average utilisation concentrate load on the fastest hosts, which are then the first to degrade. Deliberately scattering latency-critical replicas and refusing placements above a utilisation watermark costs a few percent of hardware and buys back most of the tail.'
          }
        ]
      },
      {
        _key: 'p4-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p4-c9',
            _type: 'span',
            text: 'Nobody remembers your median. Users remember the request that made them refresh the page.'
          }
        ]
      },
      {
        _key: 'p4-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p4-c10',
            _type: 'span',
            text: 'Nine months of data collection produced a simple operational rule: a tenant is noisy when its own p99 rises less than its neighbours. Tracking that ratio per host turned interference from folklore into a metric we could page on.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-5',
    title: 'Rebalancing Costs in Consistent Hashing Rings',
    slug: 'rebalancing-costs-in-consistent-hashing-rings',
    subtitle: 'Virtual node counts, key movement ratios and the bandwidth caps that keep a topology change from becoming an incident.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
      alt: 'Globe at night overlaid with glowing connection arcs between continents',
      caption: 'A ring is a promise about how much data moves when the world changes; the only honest question is who pays for that movement.'
    },
    publishedAt: '2025-12-11T08:20:00Z',
    author: AUTHORS[3],
    categories: [CATEGORIES[0]],
    tags: ['Consistent Hashing', 'Sharding', 'Capacity Planning', 'Cache Efficiency'],
    estimatedReadingTime: 10,
    wordCount: 2260,
    clapsCount: 940,
    viewsCount: 18300,
    body: [
      {
        _key: 'p5-b1',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p5-c1',
            _type: 'span',
            text: 'Any distributed hash table is a promise about how much data will move when the world changes. The only honest question is who pays for that movement.'
          }
        ]
      },
      {
        _key: 'p5-b2',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p5-c2',
            _type: 'span',
            text: 'Adding capacity should be a boring operation. In systems that map keys with a modulo of the node count it is anything but: introducing a single node remaps nearly every key, so a cache tier suffers a self-inflicted cold start and a sharded store starts a migration that touches the entire dataset.'
          }
        ]
      },
      {
        _key: 'p5-b3',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p5-c3',
            _type: 'span',
            text: 'Virtual Nodes Buy Balance With Memory'
          }
        ]
      },
      {
        _key: 'p5-b4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p5-c4',
            _type: 'span',
            text: 'A ring with one token per node confines key movement to the arc immediately clockwise of the new token, but the load distribution is lumpy: ten nodes over the ring produce expected gaps of a tenth of the address space and observed gaps that differ by a factor of three. Adding virtual nodes reduces the variance because each physical node claims many small arcs instead of one large one.'
          }
        ]
      },
      {
        _key: 'p5-b5',
        _type: 'callout',
        tone: 'info',
        text: 'Two hundred to five hundred virtual nodes per host brings the standard deviation of load to a few percent, at the cost of a larger in-memory ring and a slightly longer successor lookup.'
      },
      {
        _key: 'p5-b6',
        _type: 'code',
        language: 'rust',
        filename: 'ring.rs',
        code: `use std::collections::BTreeMap;

#[derive(Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Debug)]
pub struct Token(pub u64);

pub struct Ring {
    tokens: BTreeMap<Token, usize>,
    replicas: usize,
}

impl Ring {
    pub fn new(replicas: usize) -> Self {
        Self {
            tokens: BTreeMap::new(),
            replicas,
        }
    }

    pub fn insert_node(&mut self, node: usize) {
        for replica in 0..self.replicas {
            let label = format!("node-{node}-replica-{replica}");
            self.tokens.insert(Token(fnv1a(label.as_bytes())), node);
        }
    }

    /// Owner of a key: the first token clockwise from the key hash, wrapping to
    /// the head of the ring when the key hashes past the final token.
    pub fn owner(&self, key: &[u8]) -> Option<usize> {
        let hash = Token(fnv1a(key));
        self.tokens
            .range(hash..)
            .next()
            .or_else(|| self.tokens.iter().next())
            .map(|(_, node)| *node)
    }

    /// Fraction of the address space each node is responsible for.
    pub fn share(&self) -> BTreeMap<usize, f64> {
        let mut shares: BTreeMap<usize, f64> = BTreeMap::new();
        let keys: Vec<Token> = self.tokens.keys().copied().collect();
        for (index, token) in keys.iter().enumerate() {
            let next = keys[(index + 1) % keys.len()];
            let span = next.0.wrapping_sub(token.0) as f64;
            if let Some(node) = self.tokens.get(token) {
                *shares.entry(*node).or_insert(0.0) += span / u64::MAX as f64;
            }
        }
        shares
    }

    pub fn len(&self) -> usize {
        self.tokens.len()
    }
}

fn fnv1a(bytes: &[u8]) -> u64 {
    let mut hash: u64 = 0xcbf2_9ce4_8422_2325;
    for byte in bytes {
        hash ^= u64::from(*byte);
        hash = hash.wrapping_mul(0x0000_0100_0000_01b3);
    }
    hash
}`
      },
      {
        _key: 'p5-b7',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p5-c5',
            _type: 'span',
            text: 'Rebalancing Is a Rate Limit Problem'
          }
        ]
      },
      {
        _key: 'p5-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p5-c6',
            _type: 'span',
            text: 'Recomputing the ring is trivial; streaming bytes without saturating the network that serves live traffic is the real work. Each migration needs a bandwidth cap, a per-shard limiter and a progress gauge that operators can watch, because the alternative is discovering the transfer limit from a latency graph at midnight.'
          }
        ]
      },
      {
        _key: 'p5-b9',
        _type: 'callout',
        tone: 'warning',
        text: 'Never migrate two arcs of the same shard concurrently. Parallel migrations compete for the exact disk bandwidth that serves live reads and turn a planned capacity change into a read-timeout incident.'
      },
      {
        _key: 'p5-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p5-c7',
            _type: 'span',
            text: 'Measuring Migration Efficiency'
          }
        ]
      },
      {
        _key: 'p5-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p5-c8',
            _type: 'span',
            text: 'The number worth publishing internally is bytes moved per byte of capacity added. A ring with five hundred twelve virtual nodes moves about one point zero two times the ideal share when a node joins; a sixteen-token ring on the same cluster moved one point four times the ideal share, which we paid for in network egress and in cache misses.'
          }
        ]
      },
      {
        _key: 'p5-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p5-c9',
            _type: 'span',
            text: 'Two operational habits made the difference: rehearse the join on a staging cluster with production-shaped keys, and keep the old and new ring layouts side by side so that a rollback is a pointer swap rather than another migration.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-6',
    title: 'Taming High-Cardinality Metrics at the Collector',
    slug: 'taming-high-cardinality-metrics-at-the-collector',
    subtitle: 'Series budgets, label rewriting and overflow buckets that keep an observability bill proportional to the value it returns.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      alt: 'Cascading green characters on a dark screen evoking streaming telemetry',
      caption: 'Every unbounded label is a promise to store a new series for every value it will ever take.'
    },
    publishedAt: '2025-11-06T13:05:00Z',
    author: AUTHORS[8],
    categories: [CATEGORIES[0]],
    tags: ['Observability', 'Metrics', 'Cardinality', 'Prometheus', 'Cost Control'],
    estimatedReadingTime: 7,
    wordCount: 1590,
    clapsCount: 2180,
    viewsCount: 31200,
    body: [
      {
        _key: 'p6-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p6-c1',
            _type: 'span',
            text: 'The most expensive line in a monitoring bill is rarely a dashboard; it is a label with unbounded values attached to a request counter. Cardinality is multiplicative, so ten endpoints, fifty status codes and a per-user identifier that looks harmless in development multiply into a series count no storage engine can compact quickly enough.'
          }
        ]
      },
      {
        _key: 'p6-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p6-c2',
            _type: 'span',
            text: 'Do the Cardinality Arithmetic First'
          }
        ]
      },
      {
        _key: 'p6-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p6-c3',
            _type: 'span',
            text: 'Before shipping a metric, multiply the distinct value count of every label together. A histogram adds one series per bucket plus the sum and count series, so a twenty bucket histogram costs twenty-two series per label combination rather than one, and a second histogram over the same labels doubles the bill again.'
          }
        ]
      },
      {
        _key: 'p6-b4',
        _type: 'callout',
        tone: 'warning',
        text: 'A trace identifier in a metric label is never acceptable. It is a log line wearing a counter costume, and a single busy endpoint can add six figures of series per hour.'
      },
      {
        _key: 'p6-b5',
        _type: 'code',
        language: 'typescript',
        filename: 'cardinality-guard.ts',
        code: `const MAX_DISTINCT_VALUES = 500;

export interface MetricPoint {
  name: string;
  labels: Record<string, string>;
}

/**
 * Rewrites unbounded label values into a bounded overflow bucket so that a
 * single misconfigured exporter cannot multiply the series count of a metric.
 */
export class CardinalityGuard {
  private readonly seen = new Map<string, Set<string>>();

  constructor(private readonly limit: number = MAX_DISTINCT_VALUES) {}

  private bucketFor(label: string): Set<string> {
    const existing = this.seen.get(label);
    if (existing) {
      return existing;
    }
    const created = new Set<string>();
    this.seen.set(label, created);
    return created;
  }

  apply(point: MetricPoint): MetricPoint {
    const labels: Record<string, string> = {};
    for (const [label, value] of Object.entries(point.labels)) {
      const bucket = this.bucketFor(label);
      if (bucket.has(value) || bucket.size < this.limit) {
        bucket.add(value);
        labels[label] = value;
      } else {
        labels[label] = 'other';
      }
    }
    return { name: point.name, labels };
  }

  seriesCount(): number {
    let total = 1;
    for (const bucket of this.seen.values()) {
      total *= bucket.size + 1;
    }
    return total;
  }
}`
      },
      {
        _key: 'p6-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p6-c4',
            _type: 'span',
            text: 'Reduce at the Collector, Not in the Backend'
          }
        ]
      },
      {
        _key: 'p6-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p6-c5',
            _type: 'span',
            text: 'Relabeling rules that execute at the collector keep expensive series from ever reaching storage, which matters because managed backends bill on ingest rather than on retention. Keep the raw attribute in traces, where per-request cardinality is the entire point, and reduce it to a bounded dimension before the same information becomes a metric.'
          }
        ]
      },
      {
        _key: 'p6-b8',
        _type: 'callout',
        tone: 'tip',
        text: 'Cap distinct values per label in the collector and emit a synthetic overflow series so that dropped data is visible in a graph instead of silent in a config file.'
      },
      {
        _key: 'p6-b9',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p6-c6',
            _type: 'span',
            text: 'Budgeting Series per Team'
          }
        ]
      },
      {
        _key: 'p6-b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p6-c7',
            _type: 'span',
            text: 'We publish a weekly series count per owning team and treat the budget like any other resource quota. Teams that exceed it either justify the increase in review or drop a label, and in practice most choose to drop a label once the cost is visible next to the dashboard that consumes it.'
          }
        ]
      },
      {
        _key: 'p6-b11',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p6-c8',
            _type: 'span',
            text: 'Observability is not free. The only real choice is whether you pay for it in storage or in debugging time you no longer have.'
          }
        ]
      },
      {
        _key: 'p6-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p6-c9',
            _type: 'span',
            text: 'Six weeks after enforcing budgets, active series fell by thirty-eight percent with no reduction in alert coverage, and the collector reclaiming memory stopped needing the nightly restart that had become part of the routine.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-7',
    title: 'Variable Font Axes for Editorial Type Systems',
    slug: 'variable-font-axes-for-editorial-type-systems',
    subtitle: 'Deciding which axes to ship, which to clamp, and why grade belongs in tokens while optical size belongs in the component.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80',
      alt: 'Close-up of large printed letterforms in high contrast serif type',
      caption: 'A variable font is a design space; shipping it means choosing which parts of that space the reader is allowed to see.'
    },
    publishedAt: '2026-03-02T11:40:00Z',
    updatedAt: '2026-03-06T09:25:00Z',
    author: AUTHORS[1],
    categories: [CATEGORIES[1]],
    tags: ['Variable Fonts', 'Design Tokens', 'Typography', 'Web Performance', 'CSS'],
    estimatedReadingTime: 12,
    wordCount: 2710,
    clapsCount: 9110,
    viewsCount: 96500,
    body: [
      {
        _key: 'p7-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p7-c1',
            _type: 'span',
            text: 'A variable font is a program with parameters, not a bundle of static weights glued together. That distinction matters because every axis you ship adds interpolation data to the file, and every axis you expose to authors adds a way for the typographic system to drift.'
          }
        ]
      },
      {
        _key: 'p7-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p7-c2',
            _type: 'span',
            text: 'Axis Planning Is a File Size Decision'
          }
        ]
      },
      {
        _key: 'p7-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p7-c3',
            _type: 'span',
            text: 'A two-axis text family with a weight range from 300 to 900 typically lands between sixty and one hundred ten kilobytes in WOFF2 with subsetting, while adding an italic axis can double the payload and a full width axis can triple it. Since the font blocks first paint on the text it is meant to render, the axis set is a performance decision before it is an aesthetic one.'
          }
        ]
      },
      {
        _key: 'p7-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Ship the axes the system actually uses. An unused axis costs bytes on every page load and invites authors to invent one-off weights that no token references and no reviewer will catch.'
      },
      {
        _key: 'p7-b5',
        _type: 'code',
        language: 'typescript',
        filename: 'font-face.ts',
        code: `export type AxisRange = readonly [min: number, max: number];

export interface VariableFont {
  readonly family: string;
  readonly file: string;
  readonly weight: AxisRange;
  readonly grade: AxisRange;
  readonly supportsOpticalSizing: boolean;
}

const clamp = (value: number, [min, max]: AxisRange): number =>
  Math.min(Math.max(value, min), max);

export function faceFor(font: VariableFont): string {
  const [weightMin, weightMax] = font.weight;
  const rules = [
    '@font-face {',
    '  font-family: "' + font.family + '";',
    '  src: url("' + font.file + '") format("woff2-variations");',
    '  font-weight: ' + weightMin + ' ' + weightMax + ';',
    '  font-display: swap;',
    '  size-adjust: 100%;',
    '}'
  ];
  return rules.join('\\n');
}

/**
 * Grade compensates for ink spread per surface, so it belongs to the theme
 * rather than to a type step: dark backgrounds need a slightly lighter grade.
 */
export function gradeDeclaration(font: VariableFont, surface: 'light' | 'dark'): string {
  const target = surface === 'dark' ? clamp(8, font.grade) : clamp(0, font.grade);
  return 'font-variation-settings: "GRAD" ' + target + ';';
}`
      },
      {
        _key: 'p7-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p7-c4',
            _type: 'span',
            text: 'Optical Size and Grade Obey Different Rules'
          }
        ]
      },
      {
        _key: 'p7-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p7-c5',
            _type: 'span',
            text: 'Optical size follows the design step: a caption at fourteen pixels needs the sturdier drawing, and a display headline at eighty pixels needs the tighter one with thinner hairlines. Grade follows the surface instead, because it exists to compensate for ink spread and for the platform differences between grayscale and subpixel antialiasing.'
          }
        ]
      },
      {
        _key: 'p7-b8',
        _type: 'callout',
        tone: 'tip',
        text: 'Prefer the high-level properties font-weight, font-stretch, font-style and font-optical-sizing wherever they exist. Browsers resolve inheritance and synthetic fallbacks for them, and they keep the cascade readable; reserve font-variation-settings for axes with no equivalent, such as grade.'
      },
      {
        _key: 'p7-b9',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p7-c6',
            _type: 'span',
            text: 'Fallback Metrics and Layout Stability'
          }
        ]
      },
      {
        _key: 'p7-b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p7-c7',
            _type: 'span',
            text: 'Match the fallback font ascent, descent and line gap overrides to the variable font metrics, and set size-adjust so the average character width lines up. Without those overrides, the swap from the system font to the webfont reflows every paragraph and the reader experiences the page as a jump rather than a load.'
          }
        ]
      },
      {
        _key: 'p7-b11',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p7-c8',
            _type: 'span',
            text: 'A font stack is an interface. It decides what the reader sees during the first three hundred milliseconds, whether or not anyone designed that state.'
          }
        ]
      },
      {
        _key: 'p7-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p7-c9',
            _type: 'span',
            text: 'The result of clamping our own axes to weight, grade and optical size, and of shipping a single subset, was a font payload that dropped from three hundred eighty kilobytes across six static files to ninety-four kilobytes in one request, with measurable improvement in the time to first stable paragraph at the fifty-fifth percentile on mobile connections.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-8',
    title: 'Designing Contrast-Safe Dark Mode Inversions',
    slug: 'designing-contrast-safe-dark-mode-inversions',
    subtitle: 'Why inverting colour channels breaks legibility, and how to re-derive a tonal ramp on a perceptual lightness scale instead.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
      alt: 'Laptop displaying analytics charts in a dark editor theme',
      caption: 'Dark mode is a second typographic system that happens to share the content, not a filter applied to the first one.'
    },
    publishedAt: '2026-02-05T10:05:00Z',
    author: AUTHORS[4],
    categories: [CATEGORIES[1]],
    tags: ['Dark Mode', 'Accessibility', 'Contrast', 'Color Science', 'CSS'],
    estimatedReadingTime: 8,
    wordCount: 1810,
    clapsCount: 3450,
    viewsCount: 40700,
    body: [
      {
        _key: 'p8-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p8-c1',
            _type: 'span',
            text: 'Inverting an interface is not a matter of subtracting each channel from two hundred fifty-five. It is a re-derivation of the entire tonal ramp under a different luminance envelope, and the arithmetic of contrast is unforgiving about shortcuts.'
          }
        ]
      },
      {
        _key: 'p8-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p8-c2',
            _type: 'span',
            text: 'Why Naive Inversion Fails'
          }
        ]
      },
      {
        _key: 'p8-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p8-c3',
            _type: 'span',
            text: 'Contrast ratio is computed from relative luminance, and relative luminance is not linear in the sRGB channel values: it applies a gamma correction near the low end of the range. Moving a background from a light grey to a near black therefore changes the required foreground lightness far more than the numeric difference between the two hex values suggests, and a mirrored palette lands in a region where the ratio quietly falls below the threshold.'
          }
        ]
      },
      {
        _key: 'p8-b4',
        _type: 'callout',
        tone: 'info',
        text: 'WCAG requires a contrast ratio of at least 4.5 to 1 for body text and 3 to 1 for large text above roughly twenty-four pixels. Both numbers are ratios of relative luminance, not of channel values.'
      },
      {
        _key: 'p8-b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p8-c4',
            _type: 'span',
            text: 'The second failure is chroma. A saturated blue at maximum lightness is comfortable on a white surface and produces visible halation on black, particularly on panels with slow pixel response. Accent colours need to keep their hue angle while shedding roughly a fifth of their chroma in dark mode.'
          }
        ]
      },
      {
        _key: 'p8-b6',
        _type: 'image',
        asset: {
          _type: 'image',
          url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
        },
        alt: 'Dark interface panels with cyan and violet accent highlights',
        caption: 'Accent colours keep their hue and lose chroma in dark mode; surfaces are re-derived on a perceptual lightness scale.'
      },
      {
        _key: 'p8-b7',
        _type: 'code',
        language: 'rust',
        filename: 'contrast.rs',
        code: `/// Linearises one sRGB channel for the WCAG relative luminance formula.
fn linearise(channel: u8) -> f64 {
    let c = f64::from(channel) / 255.0;
    if c <= 0.04045 {
        c / 12.92
    } else {
        ((c + 0.055) / 1.055).powf(2.4)
    }
}

pub fn relative_luminance(rgb: (u8, u8, u8)) -> f64 {
    let (r, g, b) = rgb;
    0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b)
}

pub fn contrast_ratio(a: (u8, u8, u8), b: (u8, u8, u8)) -> f64 {
    let la = relative_luminance(a);
    let lb = relative_luminance(b);
    let (lighter, darker) = if la > lb { (la, lb) } else { (lb, la) };
    (lighter + 0.05) / (darker + 0.05)
}

/// Minimum foreground lightness for a target ratio on a known surface.
pub fn passes_body_text(surface: (u8, u8, u8), text: (u8, u8, u8)) -> bool {
    contrast_ratio(surface, text) >= 4.5
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn midnight_surface_accepts_soft_white_text() {
        let surface = (11, 13, 16);
        let text = (232, 234, 237);
        assert!(passes_body_text(surface, text));
    }

    #[test]
    fn mirrored_accent_fails_on_black() {
        let surface = (11, 13, 16);
        let mirrored_accent = (38, 99, 235);
        assert!(!passes_body_text(surface, mirrored_accent));
    }
}`
      },
      {
        _key: 'p8-b8',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p8-c5',
            _type: 'span',
            text: 'Design the Ramp, Not the Colour'
          }
        ]
      },
      {
        _key: 'p8-b9',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p8-c6',
            _type: 'span',
            text: 'We express every surface as a step on a perceptual lightness scale, with chroma held constant across modes and only the lightness direction flipped. Text steps keep their ordinal relationship: the primary text step stays around thirteen L units above the surface, secondary around eight, and the tertiary step is only used for text that a reader can afford to miss.'
          }
        ]
      },
      {
        _key: 'p8-b10',
        _type: 'callout',
        tone: 'warning',
        text: 'Do not reuse a light-mode highlight colour as a dark-mode background tint. Highlights that read as a whisper on white become a glare strip on black, and they will fail contrast against the text placed on them.'
      },
      {
        _key: 'p8-b11',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p8-c7',
            _type: 'span',
            text: 'Testing Contrast Before Shipping'
          }
        ]
      },
      {
        _key: 'p8-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p8-c8',
            _type: 'span',
            text: 'The ratio computation belongs in the component test suite, iterating over every token pair that can co-occur on screen. A token edit that breaks contrast then fails the build in seconds, instead of surfacing in an accessibility audit six weeks later when the palette has already been extended in three directions.'
          }
        ]
      },
      {
        _key: 'p8-b13',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p8-c9',
            _type: 'span',
            text: 'A palette is a contract with the reader about where attention should land. Inverting it without re-deriving it breaks that contract silently.'
          }
        ]
      },
      {
        _key: 'p8-b14',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p8-c10',
            _type: 'span',
            text: 'The measurable outcome was a dark theme that passes at the same thresholds as its light counterpart, including the two accent pairs that the mirrored palette had failed, and a test suite that catches the next regression without anyone needing to remember the numbers.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-9',
    title: 'Optical Sizing and the Arithmetic of Measure',
    slug: 'optical-sizing-and-the-arithmetic-of-measure',
    subtitle: 'Turning characters per line, advance widths and leading into numbers you can compute instead of taste you have to defend.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80',
      alt: 'Mechanical typewriter with a sheet of typescript in the carriage',
      caption: 'Measure has been an engineering constraint since long before it was a stylesheet property.'
    },
    publishedAt: '2025-10-19T15:25:00Z',
    author: AUTHORS[4],
    categories: [CATEGORIES[1]],
    tags: ['Optical Sizing', 'Typography', 'CSS', 'Reading Comfort', 'Variable Fonts'],
    estimatedReadingTime: 9,
    wordCount: 2040,
    clapsCount: 12600,
    viewsCount: 204000,
    body: [
      {
        _key: 'p9-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p9-c1',
            _type: 'span',
            text: 'Optical sizing is the oldest idea in type design that the web only recently learned to express: a drawing optimised for fourteen pixels is not the drawing optimised for eighty pixels, and pretending otherwise yields text that is fragile at caption sizes and heavy-handed in headlines.'
          }
        ]
      },
      {
        _key: 'p9-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p9-c2',
            _type: 'span',
            text: 'Measure Is an Arithmetic Constraint'
          }
        ]
      },
      {
        _key: 'p9-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p9-c3',
            _type: 'span',
            text: 'A comfortable line runs between forty-five and seventy-five characters, with the sweet spot near sixty-six for continuous prose. At a sixteen pixel body size with an average advance of nine and a half pixels per character, that is a line of roughly six hundred twenty pixels, which is why a full-width paragraph on a fourteen hundred pixel desktop is a reading failure before it is a design failure.'
          }
        ]
      },
      {
        _key: 'p9-b4',
        _type: 'callout',
        tone: 'info',
        text: 'One ch unit is the advance width of the zero glyph, not the average character width. In most text faces the average lowercase advance is about ten percent narrower, so a 66ch line behaves closer to sixty characters of running prose.'
      },
      {
        _key: 'p9-b5',
        _type: 'code',
        language: 'typescript',
        filename: 'measure.ts',
        code: `const ZERO_TO_AVERAGE_ADVANCE = 0.9;
const COMFORTABLE_CHARACTERS = 66;

export interface MeasureSpec {
  readonly charactersPerLine: number;
  readonly fontSizePx: number;
  readonly zeroAdvanceEm: number;
  readonly baseLineHeight: number;
}

/** Rendered line width for a given ch measure. */
export function lineWidthPx(spec: MeasureSpec): number {
  return spec.charactersPerLine * spec.zeroAdvanceEm * spec.fontSizePx;
}

/** ch measures overstate real line length, so correct before judging comfort. */
export function trueCharacters(spec: MeasureSpec): number {
  return spec.charactersPerLine * ZERO_TO_AVERAGE_ADVANCE;
}

/**
 * Leading grows with measure: a narrow column tolerates a tighter rhythm than
 * a wide one, because the return sweep is shorter and cheaper.
 */
export function leadingPx(spec: MeasureSpec): number {
  const comfort = Math.min(trueCharacters(spec) / COMFORTABLE_CHARACTERS, 1.25);
  return Math.round(spec.fontSizePx * spec.baseLineHeight * comfort);
}

export function opticalSizeFor(spec: MeasureSpec): number {
  return Math.round(Math.min(Math.max(spec.fontSizePx, 11), 96));
}`
      },
      {
        _key: 'p9-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p9-c4',
            _type: 'span',
            text: 'Leading Follows Measure, Not the Breakpoint'
          }
        ]
      },
      {
        _key: 'p9-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p9-c5',
            _type: 'span',
            text: 'A responsive layout that narrows the text column at small breakpoints while keeping a fixed line height produces lines that are simultaneously tight in measure and loose in leading. The rhythm should tighten with the measure rather than with the viewport, because a phone in landscape has a wide viewport and still a narrow measure.'
          }
        ]
      },
      {
        _key: 'p9-b8',
        _type: 'callout',
        tone: 'warning',
        text: 'Sizing body text with viewport units makes measure unpredictable at exactly the extremes where reading matters: very small screens with high density, and very wide screens with a large default zoom.'
      },
      {
        _key: 'p9-b9',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p9-c6',
            _type: 'span',
            text: 'Hyphenation, Rag and Justification'
          }
        ]
      },
      {
        _key: 'p9-b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p9-c7',
            _type: 'span',
            text: 'Justified text without hyphenation is a river generator; justified text with the wrong language attribute is worse, because the browser hyphenates with the wrong dictionary. Enable hyphenation with an explicit language, cap the number of consecutive hyphens at two, and prefer a ragged right edge for narrow measures where justification requires grotesque word spacing.'
          }
        ]
      },
      {
        _key: 'p9-b11',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p9-c8',
            _type: 'span',
            text: 'A measure that is too long does not look wrong. It simply costs the reader a fraction of a second on every line, thousands of times, and the article gets blamed for being dull.'
          }
        ]
      },
      {
        _key: 'p9-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p9-c9',
            _type: 'span',
            text: 'Encoding these relationships as computed tokens rather than fixed values made review conversations shorter: instead of debating whether a paragraph felt loose, we could point at the derived measure and leading and ask whether the input was correct.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-10',
    title: 'Fluid Editorial Grids Beyond the Twelve Column Myth',
    slug: 'fluid-editorial-grids-beyond-the-twelve-column-myth',
    subtitle: 'Deriving column count from minimum measure and container width instead of inheriting a print convention from 1970s imposition.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80',
      alt: 'Overhead view of printed charts and grid layouts on a work surface',
      caption: 'A grid is a set of relationships between text blocks; the column count is an output of those relationships, not an input.'
    },
    publishedAt: '2025-08-27T12:00:00Z',
    author: AUTHORS[1],
    categories: [CATEGORIES[1]],
    tags: ['Grid Systems', 'Layout', 'CSS Grid', 'Container Queries', 'Editorial Design'],
    estimatedReadingTime: 13,
    wordCount: 2930,
    clapsCount: 1520,
    viewsCount: 27600,
    body: [
      {
        _key: 'p10-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p10-c1',
            _type: 'span',
            text: 'The twelve column grid is a convention inherited from full-sheet imposition and twelve inch paper, not a law of legibility. It survives because it divides evenly into two, three, four and six, which makes hand layout easy, and because every design tool ships it as a default.'
          }
        ]
      },
      {
        _key: 'p10-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p10-c2',
            _type: 'span',
            text: 'Column Count Is a Function of Measure'
          }
        ]
      },
      {
        _key: 'p10-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p10-c3',
            _type: 'span',
            text: 'If a text column must stay above forty-five characters and below seventy-five, then the number of columns is whatever fits between those bounds in the available width. On a sixteen hundred pixel canvas with a twenty-four pixel gutter that is six columns of roughly two hundred forty pixels, or three comfortable text columns plus margins, and never twelve columns of a hundred twenty pixels that no paragraph can use.'
          }
        ]
      },
      {
        _key: 'p10-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Derive the grid from a minimum usable measure and a fixed gutter, then let the page margins absorb the remainder. A grid whose columns cannot hold a sentence is a ruler, not a layout system.'
      },
      {
        _key: 'p10-b5',
        _type: 'code',
        language: 'rust',
        filename: 'grid.rs',
        code: `/// Geometry for one editorial grid: fixed gutters, flexible columns.
#[derive(Debug, Clone, Copy)]
pub struct Grid {
    pub container_px: f64,
    pub gutter_px: f64,
    pub min_measure_ch: f64,
    pub advance_px: f64,
}

#[derive(Debug, PartialEq)]
pub struct GridPlan {
    pub columns: u32,
    pub column_px: f64,
    pub characters_per_column: f64,
}

impl Grid {
    /// Largest column count whose columns still hold min_measure_ch characters.
    pub fn plan(&self) -> GridPlan {
        let ideal = self.min_measure_ch * self.advance_px;
        let mut columns = 1;
        loop {
            let next = columns + 1;
            let total_gutters = self.gutter_px * f64::from(next - 1);
            let column_px = (self.container_px - total_gutters) / f64::from(next);
            if column_px < ideal {
                break;
            }
            columns = next;
        }
        let total_gutters = self.gutter_px * f64::from(columns - 1);
        let column_px = (self.container_px - total_gutters) / f64::from(columns);
        GridPlan {
            columns,
            column_px,
            characters_per_column: column_px / self.advance_px,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn wide_canvas_never_yields_twelve_narrow_columns() {
        let grid = Grid {
            container_px: 1600.0,
            gutter_px: 24.0,
            min_measure_ch: 45.0,
            advance_px: 9.5,
        };
        let plan = grid.plan();
        assert!(plan.columns <= 6);
        assert!(plan.characters_per_column >= 45.0);
    }
}`
      },
      {
        _key: 'p10-b6',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p10-c4',
            _type: 'span',
            text: 'Container queries change what is possible here, because a component can respond to the width of the column it was placed in rather than to the width of the viewport. A pull quote in a three column layout and the same pull quote in a sidebar now size themselves correctly without either knowing about the page as a whole.'
          }
        ]
      },
      {
        _key: 'p10-b7',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p10-c5',
            _type: 'span',
            text: 'Gutters Are Rhythm, Not Spacing'
          }
        ]
      },
      {
        _key: 'p10-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p10-c6',
            _type: 'span',
            text: 'A gutter is the visible unit of the baseline grid made horizontal. Setting gutters to a multiple of the body line height keeps headlines, figures and captions aligned across columns even when they span different numbers of them, and it removes the class of bugs where a caption sits two pixels off from the text it belongs to.'
          }
        ]
      },
      {
        _key: 'p10-b9',
        _type: 'callout',
        tone: 'tip',
        text: 'Express gutters and margins as multiples of the line height token, then let the column width be the only flexible value in the system. Layout drift disappears when everything else is derived from a single rhythm.'
      },
      {
        _key: 'p10-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p10-c7',
            _type: 'span',
            text: 'Testing the Grid Against Real Copy'
          }
        ]
      },
      {
        _key: 'p10-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p10-c8',
            _type: 'span',
            text: 'Grids are usually reviewed with placeholder strings of uniform length, which is the one kind of text a grid will never have to set. Run the layout against the longest headline in the archive, a paragraph containing a forty character URL, a footnote with a superscript sequence, and a figure caption with a three line credit before declaring the grid finished.'
          }
        ]
      },
      {
        _key: 'p10-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p10-c9',
            _type: 'span',
            text: 'The grid is not visible on the page. What is visible is whether the page holds together when the content misbehaves.'
          }
        ]
      },
      {
        _key: 'p10-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p10-c10',
            _type: 'span',
            text: 'Rebuilding three article templates on a derived six column grid removed roughly four hundred lines of breakpoint specific overrides, and the only regression we found in review was a photo essay that had been relying on twelve columns to fake a mosaic that CSS Grid expresses directly.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-11',
    title: 'The Licensing Economics of Open Infrastructure',
    slug: 'licensing-economics-of-open-infrastructure',
    subtitle: 'Permissive, copyleft and source-available licences are pricing instruments, and their boundaries decide who can capture the value.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
      alt: 'Hands reviewing a printed contract beside a notebook and pen',
      caption: 'A licence is the only part of an infrastructure product that every user reads carefully, and the part that most shapes its market.'
    },
    publishedAt: '2026-01-14T09:45:00Z',
    author: AUTHORS[3],
    categories: [CATEGORIES[2]],
    tags: ['Licensing', 'Open Source', 'Business Models', 'Compliance', 'Governance'],
    estimatedReadingTime: 10,
    wordCount: 2250,
    clapsCount: 3860,
    viewsCount: 52300,
    body: [
      {
        _key: 'p11-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p11-c1',
            _type: 'span',
            text: 'Infrastructure licences are pricing instruments that happen to be written in legal language. Every clause about redistribution, hosting or derivative works is a statement about which party is allowed to capture the surplus the software creates, and the clause is enforceable in a way that a pricing page is not.'
          }
        ]
      },
      {
        _key: 'p11-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p11-c2',
            _type: 'span',
            text: 'Three Families and Their Revenue Shapes'
          }
        ]
      },
      {
        _key: 'p11-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p11-c3',
            _type: 'span',
            text: 'Permissive licences such as Apache-2.0 and MIT maximise adoption and let any vendor build a hosted product without contributing back, so the originator monetises through support, managed service and brand. Weak copyleft at the file or library level preserves that commercial freedom while requiring changes to the licensed components themselves to be published. Strong copyleft and network copyleft extend the obligation to services exposed over a network, which is precisely the boundary that hosted competitors cross.'
          }
        ]
      },
      {
        _key: 'p11-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Source-available licences are not open source by the definition most procurement offices use. If a tender requires an OSI-approved licence, a business source licence fails the requirement regardless of how readable the code is.'
      },
      {
        _key: 'p11-b5',
        _type: 'code',
        language: 'sql',
        filename: 'licence-exposure.sql',
        code: `-- Licence exposure per product, weighted by direct dependencies: transitive
-- depth matters, but direct edges carry most of the real obligation.
WITH direct_edges AS (
    SELECT product_id, package_id
    FROM dependency_edge
    WHERE depth = 1
),
classified AS (
    SELECT
        e.product_id,
        p.licence_spdx,
        COUNT(*) AS packages
    FROM direct_edges e
    JOIN package p ON p.id = e.package_id
    GROUP BY e.product_id, p.licence_spdx
),
totals AS (
    SELECT product_id, SUM(packages) AS all_packages
    FROM classified
    GROUP BY product_id
)
SELECT
    c.product_id,
    c.licence_spdx,
    c.packages,
    ROUND(100.0 * c.packages / t.all_packages, 1) AS share_pct
FROM classified c
JOIN totals t ON t.product_id = c.product_id
WHERE c.licence_spdx IN ('AGPL-3.0-only', 'BUSL-1.1', 'SSPL-1.0')
ORDER BY share_pct DESC, c.product_id;`
      },
      {
        _key: 'p11-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p11-c4',
            _type: 'span',
            text: 'Where the Money Actually Goes'
          }
        ]
      },
      {
        _key: 'p11-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p11-c5',
            _type: 'span',
            text: 'Open core businesses sell the operational surface around a free engine: the control plane, the audit trail, the role model and the upgrade path. The placement of that boundary decides the support burden, because everything on the free side of the line is a feature request you will receive without a contract to justify the work.'
          }
        ]
      },
      {
        _key: 'p11-b8',
        _type: 'image',
        asset: {
          _type: 'image',
          url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80'
        },
        alt: 'Open notebook with handwritten notes and a pen resting on the page',
        caption: 'The licence boundary is a design decision, and it is usually made long before anyone models what it will cost to maintain the free side of it.'
      },
      {
        _key: 'p11-b9',
        _type: 'callout',
        tone: 'warning',
        text: 'Relicensing a widely deployed component splits the ecosystem. Downstream vendors fork the last permissively licensed release and stop contributing upstream, which is a durable loss of engineering capacity rather than a temporary dispute.'
      },
      {
        _key: 'p11-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p11-c6',
            _type: 'span',
            text: 'Reading a Licence Like a Balance Sheet'
          }
        ]
      },
      {
        _key: 'p11-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p11-c7',
            _type: 'span',
            text: 'Ask three questions in order. Who may host this commercially? Who must publish modifications? What happens to the licence if the project changes hands? A project can be generous on the first question and strict on the second, and the combination that matters for a platform team is almost always the second, because hosting is where the margin lives.'
          }
        ]
      },
      {
        _key: 'p11-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p11-c8',
            _type: 'span',
            text: 'Open source is a distribution strategy, not a business model. Confusing the two is how projects end up with a large user base and no way to pay for the second decade of maintenance.'
          }
        ]
      },
      {
        _key: 'p11-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p11-c9',
            _type: 'span',
            text: 'The practical guidance for a platform team is to record the licence, the governing entity and the relicensing history of every dependency at the moment it is adopted. That record costs an hour to create and is the only artefact that makes an informed build versus buy decision possible three years later.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-12',
    title: 'Procurement Capture in Public Sector Software',
    slug: 'procurement-capture-in-public-sector-software',
    subtitle: 'How requirement wording, framework agreements and single-bid tenders quietly decide which infrastructure a government can ever replace.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
      alt: 'Meeting table covered with printed reports, charts and a laptop',
      caption: 'Procurement documents are the least read and most consequential architecture specifications in the public sector.'
    },
    publishedAt: '2025-12-29T17:10:00Z',
    author: AUTHORS[7],
    categories: [CATEGORIES[2]],
    tags: ['Procurement', 'Public Sector', 'Vendor Lock-In', 'Policy', 'Total Cost of Ownership'],
    estimatedReadingTime: 12,
    wordCount: 2720,
    clapsCount: 742,
    viewsCount: 12900,
    body: [
      {
        _key: 'p12-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p12-c1',
            _type: 'span',
            text: 'Public procurement is the largest venture fund for infrastructure software, and it is the only one that publishes its term sheet. Every requirement written into a tender becomes a feature that some vendor must implement to compete, which makes the wording of a specification an industrial policy instrument whether or not anyone intended it as one.'
          }
        ]
      },
      {
        _key: 'p12-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p12-c2',
            _type: 'span',
            text: 'How Requirements Become Lock-In'
          }
        ]
      },
      {
        _key: 'p12-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p12-c3',
            _type: 'span',
            text: 'Lock-in rarely arrives as an explicit exclusivity clause. It arrives as a requirement to integrate with the incumbent existing interface, to reproduce its report format byte for byte, or to migrate historical data with no downtime. Each clause is individually defensible and collectively describes one product, which is why so many tenders have exactly one plausible bidder.'
          }
        ]
      },
      {
        _key: 'p12-b4',
        _type: 'callout',
        tone: 'warning',
        text: 'A single-bid tender is the clearest available signal of a specification written around one vendor. Tracking that rate per framework is cheaper than any audit and it can be computed from published award notices alone.'
      },
      {
        _key: 'p12-b5',
        _type: 'code',
        language: 'sql',
        filename: 'single-bid-rate.sql',
        code: `-- Share of awarded tenders that attracted a single bid, per framework and year.
SELECT
    EXTRACT(YEAR FROM award_date) AS award_year,
    framework,
    COUNT(*) AS awards,
    COUNT(*) FILTER (WHERE bid_count = 1) AS single_bid_awards,
    ROUND(
        100.0 * COUNT(*) FILTER (WHERE bid_count = 1) / COUNT(*),
        1
    ) AS single_bid_pct,
    ROUND(AVG(value_eur), 0) AS mean_value_eur,
    ROUND(
        SUM(value_eur) FILTER (WHERE bid_count = 1) / NULLIF(SUM(value_eur), 0),
        3
    ) AS single_bid_value_share
FROM procurement_award
WHERE award_date >= DATE '2015-01-01'
  AND status = 'awarded'
GROUP BY award_year, framework
HAVING COUNT(*) >= 25
ORDER BY award_year, single_bid_pct DESC;`
      },
      {
        _key: 'p12-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p12-c4',
            _type: 'span',
            text: 'The Exit Cost Nobody Budgets'
          }
        ]
      },
      {
        _key: 'p12-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p12-c5',
            _type: 'span',
            text: 'Ten year total cost of ownership models in tender documents almost always include licence, implementation and support, and almost never include the cost of leaving. Migration cost is the number that determines negotiating power at renewal, and the only time it can be cheaply reduced is during the original implementation, when data formats and integration points are still negotiable.'
          }
        ]
      },
      {
        _key: 'p12-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p12-c6',
            _type: 'span',
            text: 'A contract that mandates an export format, a documented data dictionary and a right to run a parallel system for ninety days has a measurable effect on renewal pricing. It costs the buyer a small amount of implementation effort and it removes the vendor\'s ability to price against the switching cost.'
          }
        ]
      },
      {
        _key: 'p12-b9',
        _type: 'callout',
        tone: 'tip',
        text: 'Write the exit plan into the original contract, not into the renewal negotiation. Requirements are cheap while a contract is being competed and expensive once a system is in production.'
      },
      {
        _key: 'p12-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p12-c7',
            _type: 'span',
            text: 'Designing for Reversibility'
          }
        ]
      },
      {
        _key: 'p12-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p12-c8',
            _type: 'span',
            text: 'Reversibility has three components: data you can extract without paying a professional services invoice, interfaces that follow a published standard rather than a vendor SDK, and operational knowledge that lives in the buyer\'s staff rather than in the vendor\'s delivery team. Of the three, the third is the hardest to write into a contract and the one that most determines whether an exit is theoretical or real.'
          }
        ]
      },
      {
        _key: 'p12-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p12-c9',
            _type: 'span',
            text: 'Competition in public software is created at the drafting table, years before any vendor responds to the notice.'
          }
        ]
      },
      {
        _key: 'p12-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p12-c10',
            _type: 'span',
            text: 'The reforms that correlate with healthier bidding are unglamorous: publish the data dictionary, require standards based interfaces, cap the length of the incumbent\'s advantage by limiting how much bespoke work a single contract may contain, and measure the single bid rate as a first class indicator of market function.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-13',
    title: 'The Price of Standards Fragmentation',
    slug: 'the-price-of-standards-fragmentation',
    subtitle: 'Every provider-specific extension is a toll road, and the portability abstraction you build on top of it is a second toll.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1600&q=80',
      alt: 'Signed contract pages spread across a wooden desk under lamplight',
      caption: 'Fragmentation is not a technical accident; it is the deliberate result of interfaces that are cheap to add and expensive to leave.'
    },
    publishedAt: '2025-09-22T07:35:00Z',
    author: AUTHORS[4],
    categories: [CATEGORIES[2]],
    tags: ['Standards', 'Portability', 'Cloud Economics', 'Interoperability', 'Egress Fees'],
    estimatedReadingTime: 9,
    wordCount: 2020,
    clapsCount: 5290,
    viewsCount: 68400,
    body: [
      {
        _key: 'p13-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p13-c1',
            _type: 'span',
            text: 'Standards fragmentation is usually described as a technical failure, as though a committee simply failed to converge. In practice it is a pricing decision made one interface at a time: a managed queue with exactly the semantics you need is cheaper to adopt today and more expensive to leave in three years, and that asymmetry is the product.'
          }
        ]
      },
      {
        _key: 'p13-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p13-c2',
            _type: 'span',
            text: 'The Two Bills of Portability'
          }
        ]
      },
      {
        _key: 'p13-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p13-c3',
            _type: 'span',
            text: 'A team that wants genuine portability pays twice. First it pays the feature tax, forgoing provider specific capabilities that would have solved the problem in a week. Then it pays the abstraction tax, maintaining a compatibility layer whose least common denominator behaviour is subtly different from every backend it wraps. Teams that skip both bills pay a third one later, at renewal, when the switching cost is set by someone else.'
          }
        ]
      },
      {
        _key: 'p13-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Portability is a spectrum with a measurable price at each point. The useful question is not whether the architecture is portable, but how many engineer-weeks a migration would cost and who has to approve the spend.'
      },
      {
        _key: 'p13-b5',
        _type: 'code',
        language: 'sql',
        filename: 'portability-cost.sql',
        code: `-- Annualised portability cost per workload: storage, egress and compute,
-- with egress expressed relative to compute so friction is comparable.
WITH usage AS (
    SELECT
        workload_id,
        provider,
        SUM(storage_gb_month) AS storage_gb_month,
        SUM(egress_gb) AS egress_gb,
        SUM(compute_hours) AS compute_hours
    FROM cloud_usage_daily
    WHERE usage_date >= CURRENT_DATE - INTERVAL '365 days'
    GROUP BY workload_id, provider
)
SELECT
    u.workload_id,
    u.provider,
    ROUND(u.storage_gb_month * p.storage_price, 2) AS storage_cost,
    ROUND(u.egress_gb * p.egress_price, 2) AS egress_cost,
    ROUND(u.compute_hours * p.compute_price, 2) AS compute_cost,
    ROUND(
        (u.egress_gb * p.egress_price)
        / NULLIF(u.compute_hours * p.compute_price, 0),
        3
    ) AS egress_to_compute_ratio
FROM usage u
JOIN provider_price p ON p.provider = u.provider
ORDER BY egress_to_compute_ratio DESC;`
      },
      {
        _key: 'p13-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p13-c4',
            _type: 'span',
            text: 'Extensions Are Priced in Engineer-Years'
          }
        ]
      },
      {
        _key: 'p13-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p13-c5',
            _type: 'span',
            text: 'The cost of a provider extension is not the invoice line for its service; it is the migration work it creates. A runbook that spans three proprietary services, a custom identity integration and a managed message broker with unusual ordering semantics can take a team four to six months to move, and that number is what appears in the renewal conversation as leverage.'
          }
        ]
      },
      {
        _key: 'p13-b8',
        _type: 'callout',
        tone: 'warning',
        text: 'Abstractions written before a second backend exists almost always leak the first backend semantics. Write the compatibility layer only when you are actually running two backends in production, and treat the first implementation as the reference rather than the definition.'
      },
      {
        _key: 'p13-b9',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p13-c6',
            _type: 'span',
            text: 'What Standards Bodies Can and Cannot Fix'
          }
        ]
      },
      {
        _key: 'p13-b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p13-c7',
            _type: 'span',
            text: 'A standard can only freeze interfaces that vendors are willing to implement at parity, and parity is expensive for whoever has the most advanced implementation. This is why specifications converge on the shape of the data model long before they converge on operational semantics, and why reading the conformance test suite is a more reliable predictor of portability than reading the specification text.'
          }
        ]
      },
      {
        _key: 'p13-b11',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p13-c8',
            _type: 'span',
            text: 'A standard that nobody implements to completion is documentation, not interoperability. The conformance suite is the standard.'
          }
        ]
      },
      {
        _key: 'p13-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p13-c9',
            _type: 'span',
            text: 'For buyers, the defensible position is a small, explicit list of the provider-specific capabilities the business genuinely depends on, with an owner and a cost estimate attached to each. That list is short in most organisations, and discovering its length during a negotiation is the expensive way to learn it.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-14',
    title: 'Maintenance Budgets and the Sustainability Gap',
    slug: 'maintenance-budgets-and-the-sustainability-gap',
    subtitle: 'Creation gets grants, conferences and headlines; maintenance gets an inbox. The arithmetic of that asymmetry is now measurable.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Shelves of bound legal volumes in a research library',
      caption: 'Maintenance is the part of the lifecycle that produces no announcements and carries all of the operational risk.'
    },
    publishedAt: '2025-03-27T14:15:00Z',
    author: AUTHORS[7],
    categories: [CATEGORIES[2]],
    tags: ['Open Source', 'Maintenance', 'Funding', 'Governance', 'Risk Management'],
    estimatedReadingTime: 14,
    wordCount: 3160,
    clapsCount: 8390,
    viewsCount: 118000,
    body: [
      {
        _key: 'p14-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p14-c1',
            _type: 'span',
            text: 'Software economics rewards creation and quietly bills maintenance to whoever is standing nearby. A new library attracts a conference talk, a grant and a hundred companies willing to depend on it; the same library three years later attracts a security questionnaire and a maintainer answering issues at eleven at night in a timezone that is not theirs.'
          }
        ]
      },
      {
        _key: 'p14-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p14-c2',
            _type: 'span',
            text: 'Where the Money Goes Relative to Usage'
          }
        ]
      },
      {
        _key: 'p14-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p14-c3',
            _type: 'span',
            text: 'Funding per unit of usage falls as a project matures, which is the opposite of what an infrastructure dependency requires. The most widely installed versions of a package are typically the least funded per install, because adoption outruns the mechanisms that convert adoption into money: sponsorship tiers, support contracts and foundation membership all scale more slowly than install counts.'
          }
        ]
      },
      {
        _key: 'p14-b4',
        _type: 'code',
        language: 'sql',
        filename: 'funding-gap.sql',
        code: `-- Funding per thousand downstream installs, grouped by project age band.
SELECT
    CASE
        WHEN age_years < 3 THEN 'new'
        WHEN age_years < 8 THEN 'established'
        ELSE 'legacy'
    END AS age_band,
    COUNT(*) AS projects,
    ROUND(AVG(downstream_installs_1k), 1) AS mean_installs_1k,
    ROUND(
        SUM(annual_funding_usd) / NULLIF(SUM(downstream_installs_1k), 0),
        2
    ) AS funding_per_1k_installs,
    ROUND(
        100.0 * COUNT(*) FILTER (WHERE maintainer_count <= 2) / COUNT(*),
        1
    ) AS pct_two_or_fewer_maintainers,
    ROUND(
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY days_since_release),
        0
    ) AS median_days_since_release
FROM project_funding_view
WHERE archived = FALSE
GROUP BY age_band
ORDER BY funding_per_1k_installs DESC;`
      },
      {
        _key: 'p14-b5',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p14-c4',
            _type: 'span',
            text: 'The Two Maintainer Distribution'
          }
        ]
      },
      {
        _key: 'p14-b6',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p14-c5',
            _type: 'span',
            text: 'Most critical dependencies are maintained by one or two people who hold no formal obligation to any of their consumers. The practical consequence is not that these projects are fragile in a technical sense, but that their continuity depends on the health, employment and patience of a specific individual, which no enterprise risk register models well.'
          }
        ]
      },
      {
        _key: 'p14-b7',
        _type: 'callout',
        tone: 'warning',
        text: 'A dependency with one maintainer and a million installs is a concentration risk identical in structure to a single supplier for a physical component, but it is almost never recorded as one.'
      },
      {
        _key: 'p14-b8',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p14-c6',
            _type: 'span',
            text: 'Funding Mechanisms and What They Change'
          }
        ]
      },
      {
        _key: 'p14-b9',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p14-c7',
            _type: 'span',
            text: 'Donation based sponsorship funds attention but rarely funds a second maintainer, because individual contributions are small and unpredictable. Corporate support contracts with a named response time convert a maintainer into a vendor with a service obligation, which is more durable and much harder to sell. Foundation employment solves continuity for a handful of flagship projects and scales poorly, since every funded maintainer requires a governance structure willing to hire them.'
          }
        ]
      },
      {
        _key: 'p14-b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p14-c8',
            _type: 'span',
            text: 'The mechanism that changes behaviour most reliably is the one that puts a maintenance line item in a company budget. Once an engineering leader must renew a support contract annually, the dependency acquires an owner, and the owner starts asking questions about release cadence and bus factor that donations never provoked.'
          }
        ]
      },
      {
        _key: 'p14-b11',
        _type: 'callout',
        tone: 'tip',
        text: 'If a dependency is critical, pay for it in a form the maintainer can put on a timesheet. Money for hours buys continuity; money for gratitude buys a thank-you note.'
      },
      {
        _key: 'p14-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p14-c9',
            _type: 'span',
            text: 'Every infrastructure project is a twenty year commitment priced as a two year project, and the second decade is paid for by someone who was not in the room.'
          }
        ]
      },
      {
        _key: 'p14-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p14-c10',
            _type: 'span',
            text: 'The measurable indicators worth tracking inside an organisation are mundane: the number of dependencies with fewer than two maintainers, the share of those with a funded support relationship, and the median days since the last release for each critical package. None of them are dramatic, and together they predict which dependency will consume a quarter of an on-call rotation next year.'
          }
        ]
      },
      {
        _key: 'p14-b14',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p14-c11',
            _type: 'span',
            text: 'Sustainability is not a moral claim about maintainers; it is an operational claim about the systems that depend on them. Treating it as the former makes it a conversation about generosity. Treating it as the latter makes it a line in the budget where it can actually be fixed.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-15',
    title: 'Interoperability Mandates and Market Structure',
    slug: 'interoperability-mandates-and-market-structure',
    subtitle: 'What portability regulation can realistically change, and which costs it moves from buyers to providers without removing them.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Spreadsheets and financial statements arranged on a desk beside a calculator',
      caption: 'Switching provisions are a cost allocation instrument: they decide who pays for the friction that remains.'
    },
    publishedAt: '2025-02-11T16:25:00Z',
    author: AUTHORS[7],
    categories: [CATEGORIES[2]],
    tags: ['Regulation', 'Interoperability', 'Market Structure', 'Cloud Policy'],
    estimatedReadingTime: 5,
    wordCount: 1130,
    clapsCount: 120,
    viewsCount: 1740,
    body: [
      {
        _key: 'p15-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p15-c1',
            _type: 'span',
            text: 'Interoperability mandates are the bluntest instrument available to regulators who want to lower switching costs in infrastructure markets. They work, but not in the way their advocates usually describe: they do not eliminate switching friction, they reassign who pays for it.'
          }
        ]
      },
      {
        _key: 'p15-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p15-c2',
            _type: 'span',
            text: 'What a Portability Clause Can Actually Move'
          }
        ]
      },
      {
        _key: 'p15-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p15-c3',
            _type: 'span',
            text: 'A requirement to provide data in a documented format at a published price addresses the cheapest part of an exit. It removes the legal and commercial obstacles while leaving the engineering work untouched, and the engineering work is where eighty percent of the cost sits: re-implementing integrations, re-tuning performance and re-certifying compliance.'
          }
        ]
      },
      {
        _key: 'p15-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Read any switching provision and ask who performs the migration. If the answer is the customer, the regulation has moved a price, not a workload.'
      },
      {
        _key: 'p15-b5',
        _type: 'code',
        language: 'sql',
        filename: 'switching-friction.sql',
        code: `-- Concentration and switching friction by infrastructure segment.
SELECT
    segment,
    COUNT(DISTINCT vendor_id) AS vendors,
    ROUND(SUM(share) FILTER (WHERE rank <= 3), 3) AS top3_share,
    ROUND(
        AVG(exit_fee_eur) / NULLIF(AVG(annual_spend_eur), 0),
        3
    ) AS exit_fee_ratio,
    ROUND(AVG(migration_months), 1) AS mean_migration_months,
    COUNT(*) FILTER (WHERE published_export_format = FALSE) AS no_export_format
FROM market_share_annual
WHERE year = 2024
GROUP BY segment
HAVING SUM(share) > 0.9
ORDER BY exit_fee_ratio DESC;`
      },
      {
        _key: 'p15-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p15-c4',
            _type: 'span',
            text: 'The Freeze Risk'
          }
        ]
      },
      {
        _key: 'p15-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p15-c5',
            _type: 'span',
            text: 'Mandating support for a specific interface version freezes it. Providers keep the mandated version working, correct and unimproved, and ship their real investment in a layer the mandate does not name. The regulated surface becomes a compatibility museum while the competitive surface keeps moving, which is a better outcome than no regulation but a worse one than regulators expect.'
          }
        ]
      },
      {
        _key: 'p15-b8',
        _type: 'callout',
        tone: 'warning',
        text: 'A mandate that names a format without naming a conformance test creates a compliance theatre market: vendors pass the checklist and customers still cannot move their data without a services engagement.'
      },
      {
        _key: 'p15-b9',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p15-c6',
            _type: 'span',
            text: 'What Buyers Should Do With the Leverage'
          }
        ]
      },
      {
        _key: 'p15-b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p15-c7',
            _type: 'span',
            text: 'Regulation creates a one-time opportunity: for a few years, exit terms are negotiable because providers must demonstrate compliance. Buyers who use that window to run an actual migration rehearsal, even a partial one, learn their true switching cost and keep the number for the next renewal; buyers who file the certificate and move on have purchased the appearance of portability.'
          }
        ]
      },
      {
        _key: 'p15-b11',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p15-c8',
            _type: 'span',
            text: 'The purpose of a portability mandate is not to make switching free. It is to make the price of switching visible before the negotiation begins.'
          }
        ]
      },
      {
        _key: 'p15-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p15-c9',
            _type: 'span',
            text: 'That reframing is the useful contribution of the policy debate to engineering practice: switching cost becomes an input to architecture review rather than a surprise in a renewal meeting.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-16',
    title: 'Page Splits and Fill Factor in B-Tree Engines',
    slug: 'page-splits-and-fill-factor-in-btree-engines',
    subtitle: 'Why a monotonically increasing key writes faster than a random one, and what the resulting index bloat actually costs.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1600&q=80',
      alt: 'Blue-lit code editor displaying a long source file',
      caption: 'An index write is a page write, and a page write is a disk seek wearing an abstraction.'
    },
    publishedAt: '2025-11-22T13:35:00Z',
    updatedAt: '2025-12-02T10:18:00Z',
    author: AUTHORS[2],
    categories: [CATEGORIES[3]],
    tags: ['B-Tree', 'Storage Engines', 'Indexing', 'Page Layout', 'PostgreSQL'],
    estimatedReadingTime: 11,
    wordCount: 2470,
    clapsCount: 14700,
    viewsCount: 862000,
    body: [
      {
        _key: 'p16-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p16-c1',
            _type: 'span',
            text: 'A B-tree index is not a data structure so much as a bet about access patterns. The engine spends its write budget keeping pages sorted on the assumption that reads will arrive with a key, which means the cost of an insert depends almost entirely on where in the key space the new entry lands.'
          }
        ]
      },
      {
        _key: 'p16-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p16-c2',
            _type: 'span',
            text: 'What Happens During a Split'
          }
        ]
      },
      {
        _key: 'p16-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p16-c3',
            _type: 'span',
            text: 'When a leaf page fills, the engine allocates a new page, moves roughly half of the tuples into it, and inserts a separator key into the parent, which may itself split and propagate upward. A single insert can therefore dirty several pages, and under a random key distribution with a fully packed index that happens on a large fraction of inserts.'
          }
        ]
      },
      {
        _key: 'p16-b4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p16-c4',
            _type: 'span',
            text: 'Monotonic keys behave differently. Inserting sequentially into the rightmost leaf fills it to capacity, splits once, and continues in the new rightmost page, so each split produces two pages that are respectively full and nearly empty. That is cheap at write time and wasteful at read time: the index occupies more pages than its cardinality requires until the leaves fill in.'
          }
        ]
      },
      {
        _key: 'p16-b5',
        _type: 'callout',
        tone: 'info',
        text: 'Fill factor is the percentage of each leaf page the engine fills during a build before leaving space for future inserts. Setting it to ninety on a randomly inserted index trades thirty percent more pages for substantially fewer splits.'
      },
      {
        _key: 'p16-b6',
        _type: 'code',
        language: 'sql',
        filename: 'index-density.sql',
        code: `-- Leaf density and fragmentation per index after a bulk load with random keys.
-- Requires the pgstattuple extension for pgstatindex().
CREATE EXTENSION IF NOT EXISTS pgstattuple;

SELECT
    s.schemaname,
    s.relname AS index_name,
    pg_size_pretty(pg_relation_size(s.indexrelid)) AS index_size,
    ROUND((pgstatindex(s.indexrelid)).avg_leaf_density::numeric, 1)
        AS avg_leaf_density_pct,
    ROUND((pgstatindex(s.indexrelid)).leaf_fragmentation::numeric, 1)
        AS leaf_fragmentation_pct,
    (pgstatindex(s.indexrelid)).avg_leaf_density < 65 AS candidate_for_rebuild
FROM pg_stat_user_indexes s
WHERE s.schemaname = 'public'
ORDER BY avg_leaf_density_pct ASC, index_size DESC;`
      },
      {
        _key: 'p16-b7',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p16-c5',
            _type: 'span',
            text: 'Choosing a Key That Admits Its Cost'
          }
        ]
      },
      {
        _key: 'p16-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p16-c6',
            _type: 'span',
            text: 'Random identifiers such as version four UUIDs eliminate coordination between writers but scatter inserts across every leaf page in the index. A time ordered identifier keeps locality in the key, and there are now several standardised formats that preserve sortability while retaining enough randomness to avoid predictability.'
          }
        ]
      },
      {
        _key: 'p16-b9',
        _type: 'callout',
        tone: 'warning',
        text: 'A random primary key on a write heavy table is a performance decision, not a neutrality decision. Measure the write amplification before adopting one, and prefer a time ordered identifier when the engine clusters by primary key.'
      },
      {
        _key: 'p16-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p16-c7',
            _type: 'span',
            text: 'Bloat Is a Read Amplification Problem'
          }
        ]
      },
      {
        _key: 'p16-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p16-c8',
            _type: 'span',
            text: 'Index bloat is usually discussed as a disk cost, which understates it. A tree with leaves at sixty percent density has roughly forty percent more levels of internal nodes than a dense one, so each lookup traverses more pages, and every one of those pages is an additional buffer pool resident competing with the heap for memory.'
          }
        ]
      },
      {
        _key: 'p16-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p16-c9',
            _type: 'span',
            text: 'Heap only tuple updates help here in engines that support them: when an update does not touch an indexed column, the new version can stay on the same page and the index is left untouched, which removes the index maintenance cost from the most common write pattern in an OLTP workload.'
          }
        ]
      },
      {
        _key: 'p16-b13',
        _type: 'image',
        asset: {
          _type: 'image',
          url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
        },
        alt: 'Workstation with multiple monitors showing database tables and terminal output',
        caption: 'Leaf density and fragmentation are the two numbers worth graphing after any bulk load; both are available without stopping the server.'
      },
      {
        _key: 'p16-b14',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p16-c10',
            _type: 'span',
            text: 'An index is a promise to keep a copy of your data sorted. Every write pays for that promise, whether or not a reader ever collects.'
          }
        ]
      },
      {
        _key: 'p16-b15',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p16-c11',
            _type: 'span',
            text: 'The tuning that followed this investigation was deliberately boring: a time ordered primary key on the two hottest tables, a fill factor of ninety on the index with the worst split rate, and a scheduled rebuild replaced by a monitoring rule that pages only when leaf density falls below sixty percent.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-17',
    title: 'Compaction Strategies in LSM Storage Engines',
    slug: 'compaction-strategies-in-lsm-storage-engines',
    subtitle: 'Size-tiered and leveled compaction sit at opposite ends of a trade-off between write amplification, read amplification and space amplification.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      alt: 'Macro photograph of a printed circuit board with gold traces and capacitors',
      caption: 'An LSM engine buys sequential writes and pays for them later, in the background, with interest.'
    },
    publishedAt: '2025-10-02T08:50:00Z',
    author: AUTHORS[5],
    categories: [CATEGORIES[3]],
    tags: ['LSM Trees', 'Compaction', 'Write Amplification', 'RocksDB', 'Storage Engines'],
    estimatedReadingTime: 10,
    wordCount: 2240,
    clapsCount: 2640,
    viewsCount: 33800,
    body: [
      {
        _key: 'p17-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p17-c1',
            _type: 'span',
            text: 'A log structured merge tree converts random writes into sequential ones and defers the expensive part until later. That deferral is compaction, and it is where the engine must decide how much write amplification it is willing to spend in order to keep reads and disk usage bounded.'
          }
        ]
      },
      {
        _key: 'p17-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p17-c2',
            _type: 'span',
            text: 'Size-Tiered Compaction: Cheap Writes, Expensive Space'
          }
        ]
      },
      {
        _key: 'p17-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p17-c3',
            _type: 'span',
            text: 'Size-tiered compaction merges runs of similar size into a run twice as large, producing a logarithmic number of merges per byte written. Write amplification stays near four to eight times, but the engine must keep several overlapping runs per level, so a point lookup may probe each of them and disk usage can transiently reach twice the live dataset.'
          }
        ]
      },
      {
        _key: 'p17-b4',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p17-c4',
            _type: 'span',
            text: 'Leveled Compaction: Predictable Reads, Costly Rewrites'
          }
        ]
      },
      {
        _key: 'p17-b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p17-c5',
            _type: 'span',
            text: 'Leveled compaction maintains one sorted run per level with each level an order of magnitude larger than the one above it, so a lookup touches at most one run per level and the key range of a run is known without reading it. The price is that every key migrates through each level in turn, which pushes write amplification toward ten to thirty times depending on the level multiplier.'
          }
        ]
      },
      {
        _key: 'p17-b6',
        _type: 'callout',
        tone: 'info',
        text: 'The level multiplier is the dial that trades the two amplifications against each other: a multiplier of ten favours reads, a multiplier of four cuts rewrite cost at the price of more levels and more compaction threads competing for the same device.'
      },
      {
        _key: 'p17-b7',
        _type: 'code',
        language: 'rust',
        filename: 'compaction.rs',
        code: `/// One sorted run on disk, described by the key range it covers.
#[derive(Debug, Clone, Copy)]
pub struct Run {
    pub smallest_key: u64,
    pub largest_key: u64,
    pub bytes: u64,
    pub level: u8,
}

#[derive(Debug, Clone)]
pub struct LeveledPlan {
    pub level_bytes: Vec<u64>,
    pub max_bytes_per_level: u64,
    pub multiplier: u64,
}

impl LeveledPlan {
    pub fn capacity(&self, level: usize) -> u64 {
        self.max_bytes_per_level * self.multiplier.pow(level as u32)
    }

    /// First level that exceeds its capacity; that level seeds a compaction.
    pub fn overloaded_level(&self) -> Option<usize> {
        (0..self.level_bytes.len()).find(|level| self.level_bytes[*level] > self.capacity(*level))
    }

    /// Bytes rewritten when a candidate run merges into the next level: the
    /// cost is dominated by the size of the overlapping runs it must read.
    pub fn compaction_cost(&self, candidate: &Run, next_level: &[Run]) -> u64 {
        candidate.bytes + overlaps(candidate, next_level)
    }
}

/// Total bytes of the runs whose key ranges intersect the candidate run.
pub fn overlaps(candidate: &Run, runs: &[Run]) -> u64 {
    runs.iter()
        .filter(|run| {
            run.smallest_key <= candidate.largest_key && run.largest_key >= candidate.smallest_key
        })
        .map(|run| run.bytes)
        .sum()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn non_overlapping_runs_are_free_to_skip() {
        let candidate = Run { smallest_key: 1_000, largest_key: 2_000, bytes: 512, level: 0 };
        let runs = vec![
            Run { smallest_key: 0, largest_key: 999, bytes: 4096, level: 1 },
            Run { smallest_key: 4_000, largest_key: 5_000, bytes: 4096, level: 1 },
        ];
        assert_eq!(overlaps(&candidate, &runs), 0);
        assert_eq!(LeveledPlan {
            level_bytes: vec![0],
            max_bytes_per_level: 256 * 1024 * 1024,
            multiplier: 10,
        }.compaction_cost(&candidate, &runs), 512);
    }
}`
      },
      {
        _key: 'p17-b8',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p17-c6',
            _type: 'span',
            text: '存储引擎的内部结构'
          }
        ]
      },
      {
        _key: 'p17-b9',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p17-c7',
            _type: 'span',
            text: 'Internally the engine keeps three cooperating structures: a mutable memory table that absorbs writes, an immutable memory table waiting to be flushed, and the sorted runs on disk. The flush that moves the immutable table to disk is the only place where a write becomes durable, which is why a stalled flush eventually becomes a stalled write path.'
          }
        ]
      },
      {
        _key: 'p17-b10',
        _type: 'callout',
        tone: 'warning',
        text: 'Compaction starvation is the most common cause of unexplained write stalls. If the compaction threads cannot keep up with the flush rate, level zero accumulates runs, read latency climbs, and the engine begins throttling writes long before any disk metric looks abnormal.'
      },
      {
        _key: 'p17-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p17-c8',
            _type: 'span',
            text: 'Tombstones complicate the picture, because a delete is a write that must survive until it has been merged past every older version of the key. Retaining them too briefly resurrects deleted data; retaining them too long keeps obsolete versions alive and inflates the space amplification that a leveled design was chosen to avoid.'
          }
        ]
      },
      {
        _key: 'p17-b12',
        _type: 'image',
        asset: {
          _type: 'image',
          url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80'
        },
        alt: 'Terminal window showing a long stream of build output on a dark background',
        caption: 'Compaction progress, level sizes and stalled write counts belong on the same dashboard, because the first two explain the third.'
      },
      {
        _key: 'p17-b13',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p17-c9',
            _type: 'span',
            text: 'Amplification is conserved. Every design choice reduces one of write, read or space amplification by increasing another, and the only free variable is which one your workload can afford.'
          }
        ]
      },
      {
        _key: 'p17-b14',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p17-c10',
            _type: 'span',
            text: 'For an ingest heavy workload we settled on size-tiered compaction in the lowest levels with leveled compaction above them, which kept ninety-fifth percentile lookups under five milliseconds while holding write amplification near eight times, and moved the space amplification question into a weekly capacity review rather than a nightly incident.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-18',
    title: 'Cardinality Estimation Errors in Query Planners',
    slug: 'cardinality-estimation-errors-in-query-planners',
    subtitle: 'Most bad plans are not a planner being unintelligent, they are a planner believing a wrong number about how many rows a predicate returns.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1533709752211-118fcaf03312?auto=format&fit=crop&w=1600&q=80',
      alt: 'Rack mounted servers with status lights in a dim machine room',
      caption: 'A misestimate of two orders of magnitude is enough to turn a nested loop into the only plan the optimiser will consider.'
    },
    publishedAt: '2025-09-04T12:20:00Z',
    author: AUTHORS[5],
    categories: [CATEGORIES[3]],
    tags: ['Query Planning', 'Statistics', 'SQL', 'Performance', 'PostgreSQL'],
    estimatedReadingTime: 12,
    wordCount: 2690,
    clapsCount: 6080,
    viewsCount: 87900,
    body: [
      {
        _key: 'p18-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p18-c1',
            _type: 'span',
            text: 'Query optimisers are cost models fed by statistics, and the statistics are almost always the weaker half. A planner that believes a filter returns fifty rows will choose a nested loop; the same planner, told the truth of fifty thousand rows, would choose a hash join in microseconds.'
          }
        ]
      },
      {
        _key: 'p18-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p18-c2',
            _type: 'span',
            text: 'Where the Numbers Come From'
          }
        ]
      },
      {
        _key: 'p18-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p18-c3',
            _type: 'span',
            text: 'Most engines summarise a column with a sample of equi-depth histogram buckets, a list of most common values, and an estimate of distinct value count. Selectivity for an equality predicate is then a lookup in that summary, and selectivity for a range is an interpolation inside a bucket that assumes the values within the bucket are uniformly distributed.'
          }
        ]
      },
      {
        _key: 'p18-b4',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p18-c4',
            _type: 'span',
            text: 'Two assumptions do the real damage. The first is independence: combining predicates multiplies their selectivities, so a predicate on city and a predicate on postal code are treated as unrelated even when one determines the other. The second is uniformity within a bucket, which fails badly on skewed columns where a single value accounts for most of the rows.'
          }
        ]
      },
      {
        _key: 'p18-b5',
        _type: 'callout',
        tone: 'warning',
        text: 'On a table with correlated columns, a conjunction of three filters can be underestimated by more than a factor of one thousand. That error is what produces the plan that looks free and runs for eleven minutes.'
      },
      {
        _key: 'p18-b6',
        _type: 'code',
        language: 'sql',
        filename: 'estimate-drift.sql',
        code: `-- Nodes whose row estimates were off by more than an order of magnitude.
-- Assumes plan capture into plan_history with the EXPLAIN JSON tree stored.
WITH plan_nodes AS (
    SELECT
        queryid,
        plan #>> '{Plan,Node Type}' AS node_type,
        (plan #>> '{Plan,Plan Rows}')::bigint AS estimated_rows,
        (plan #>> '{Plan,Actual Rows}')::bigint AS actual_rows,
        (plan #>> '{Plan,Total Cost}')::numeric AS total_cost,
        (plan #>> '{Plan,Actual Total Time}')::numeric AS actual_total_ms
    FROM plan_history
    WHERE captured_at >= now() - INTERVAL '7 days'
)
SELECT
    queryid,
    node_type,
    estimated_rows,
    actual_rows,
    ROUND(
        GREATEST(actual_rows, 1)::numeric / GREATEST(estimated_rows, 1),
        1
    ) AS estimate_factor,
    ROUND(actual_total_ms, 1) AS actual_total_ms,
    ROUND(total_cost, 1) AS total_cost
FROM plan_nodes
WHERE estimated_rows > 0
  AND GREATEST(actual_rows, 1)::numeric / GREATEST(estimated_rows, 1) > 10
ORDER BY estimate_factor DESC, actual_total_ms DESC
LIMIT 50;`
      },
      {
        _key: 'p18-b7',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p18-c5',
            _type: 'span',
            text: 'Reducing the Error at the Source'
          }
        ]
      },
      {
        _key: 'p18-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p18-c6',
            _type: 'span',
            text: 'Extended statistics let the engine record functional dependencies and distinct value counts across a column group, which restores the correlation the independence assumption discards. Declaring statistics on the pair of correlated columns is a one line change that regularly improves plans on tables with composite filters, and it costs a slightly larger catalogue and a marginally longer analyse step.'
          }
        ]
      },
      {
        _key: 'p18-b9',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p18-c7',
            _type: 'span',
            text: 'The second lever is predicate shape. Wrapping an indexed column in a function or an implicit cast makes the predicate non-sargable, so the planner cannot use the index range at all and estimates the filtered set from a default selectivity. Rewriting the predicate into a range on the bare column often fixes both the plan and the estimate at once.'
          }
        ]
      },
      {
        _key: 'p18-b10',
        _type: 'callout',
        tone: 'tip',
        text: 'Raise the statistics target on columns used in selective filters before reaching for a hint you cannot express. More histogram buckets cost a few kilobytes and remove a whole class of plan instability.'
      },
      {
        _key: 'p18-b11',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p18-c8',
            _type: 'span',
            text: 'Finding Systematic Errors Instead of Individual Queries'
          }
        ]
      },
      {
        _key: 'p18-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p18-c9',
            _type: 'span',
            text: 'Logging every plan with its actual row counts turns estimation error into a measurable population. Grouping those records by node type and table reveals that the errors cluster: the same three tables produce almost all of the misestimates, usually because their columns are correlated in a way that no per-column statistic can express.'
          }
        ]
      },
      {
        _key: 'p18-b13',
        _type: 'image',
        asset: {
          _type: 'image',
          url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
        },
        alt: 'Laptop screen showing a database client with a long result grid',
        caption: 'Comparing estimated and actual row counts side by side is the fastest diagnostic available for a plan that behaves nothing like its cost suggests.'
      },
      {
        _key: 'p18-b14',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p18-c10',
            _type: 'span',
            text: 'The optimiser is not wrong to choose that plan. It is wrong about the world, and the fix belongs in the statistics rather than in the query text.'
          }
        ]
      },
      {
        _key: 'p18-b15',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p18-c11',
            _type: 'span',
            text: 'The three changes that removed our worst plans were unglamorous: extended statistics on four column pairs, a statistics target raised to five hundred on the tenant identifier used in almost every filter, and a weekly review of the drift query above so that new misestimates surface as a graph rather than as a customer complaint.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-19',
    title: 'Write-Ahead Logging and Recovery Invariants',
    slug: 'write-ahead-logging-and-recovery-invariants',
    subtitle: 'Group commit, checkpoint distance and torn pages: the rules that decide whether a database can actually recover after the power fails.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1600&q=80',
      alt: 'Engineer inspecting instrumentation in a laboratory environment',
      caption: 'Durability is an agreement between the database and the storage device, and the device does not always keep its side.'
    },
    publishedAt: '2025-08-08T10:40:00Z',
    author: AUTHORS[2],
    categories: [CATEGORIES[3]],
    tags: ['Write-Ahead Logging', 'Crash Recovery', 'Durability', 'fsync', 'Checkpoints'],
    estimatedReadingTime: 9,
    wordCount: 2030,
    clapsCount: 1870,
    viewsCount: 24500,
    body: [
      {
        _key: 'p19-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p19-c1',
            _type: 'span',
            text: 'The write-ahead log is the only reason a database can be simultaneously fast and durable. It converts a random write into a sequential append and defers the random work to a checkpoint, in exchange for a set of invariants that recovery depends on absolutely.'
          }
        ]
      },
      {
        _key: 'p19-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p19-c2',
            _type: 'span',
            text: 'The Invariants Recovery Relies On'
          }
        ]
      },
      {
        _key: 'p19-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p19-c3',
            _type: 'span',
            text: 'First, a data page may not reach disk before the log records describing its changes are durable, which is what makes redo possible at all. Second, every log record must be redoable more than once without changing the outcome, because recovery can replay from a checkpoint that is older than the last flush. Third, the log must be written in a strictly increasing sequence, so a record with a lower sequence number than a page records is already reflected in that page.'
          }
        ]
      },
      {
        _key: 'p19-b4',
        _type: 'callout',
        tone: 'info',
        text: 'Idempotent redo is what allows recovery to replay a record whose effect is already partially present. Any design where replaying a log record twice corrupts state has given up the ability to recover from an interrupted recovery.'
      },
      {
        _key: 'p19-b5',
        _type: 'code',
        language: 'go',
        filename: 'groupcommit.go',
        code: `package wal

import (
    "os"
    "sync"
)

// GroupCommit coalesces concurrent appends into a single flush. Flush latency,
// not bandwidth, is what limits the log, so batching is the only lever that
// scales throughput without weakening durability.
type GroupCommit struct {
    mu       sync.Mutex
    file     *os.File
    pending  []byte
    flushing bool
    done     chan struct{}
}

func NewGroupCommit(file *os.File) *GroupCommit {
    return &GroupCommit{file: file}
}

func (g *GroupCommit) Append(record []byte) error {
    g.mu.Lock()
    g.pending = append(g.pending, record...)
    if g.flushing {
        wait := g.done
        g.mu.Unlock()
        <-wait
        return nil
    }
    g.flushing = true
    g.done = make(chan struct{})
    batch := g.pending
    g.pending = nil
    done := g.done
    g.mu.Unlock()

    _, err := g.file.Write(batch)
    if err == nil {
        err = g.file.Sync()
    }

    g.mu.Lock()
    g.flushing = false
    close(done)
    g.mu.Unlock()
    return err
}

func (g *GroupCommit) Flush() error {
    g.mu.Lock()
    batch := g.pending
    g.pending = nil
    g.mu.Unlock()
    if len(batch) == 0 {
        return nil
    }
    if _, err := g.file.Write(batch); err != nil {
        return err
    }
    return g.file.Sync()
}`
      },
      {
        _key: 'p19-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p19-c4',
            _type: 'span',
            text: 'Checkpoint Distance Sets Your Recovery Time'
          }
        ]
      },
      {
        _key: 'p19-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p19-c5',
            _type: 'span',
            text: 'A checkpoint writes dirty pages to disk and records a point from which recovery may start. Spacing checkpoints far apart reduces steady state write amplification and lengthens crash recovery in direct proportion. A system that checkpoints every thirty minutes has committed to a repair window measured in minutes after every unclean shutdown, which is a decision worth making explicitly rather than by default.'
          }
        ]
      },
      {
        _key: 'p19-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p19-c6',
            _type: 'span',
            text: 'Full page writes exist because a storage device may persist a partial page during a crash. The first modification of a page after a checkpoint therefore writes the entire page image into the log, which is expensive and precisely the cost that makes torn page recovery possible.'
          }
        ]
      },
      {
        _key: 'p19-b9',
        _type: 'callout',
        tone: 'warning',
        text: 'A flush call is not a guarantee about the physical device. Write-back caches, virtualised storage layers and battery backed controllers each reinterpret durability, and only an explicit test with power removal establishes what your storage stack actually does.'
      },
      {
        _key: 'p19-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p19-c7',
            _type: 'span',
            text: 'Testing Recovery Instead of Trusting It'
          }
        ]
      },
      {
        _key: 'p19-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p19-c8',
            _type: 'span',
            text: 'Our crash test harness kills the process with SIGKILL at randomised points, then verifies that the recovered database satisfies row counts, checksums and referential invariants. Running it nightly in continuous integration found two ordering bugs that no amount of code review had surfaced, both of which only appeared when the kill landed inside a checkpoint.'
          }
        ]
      },
      {
        _key: 'p19-b12',
        _type: 'image',
        asset: {
          _type: 'image',
          url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
        },
        alt: 'Workstation with a terminal showing a test suite running beside notes',
        caption: 'A nightly crash test is the only cheap way to keep a recovery path honest as a codebase evolves.'
      },
      {
        _key: 'p19-b13',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p19-c9',
            _type: 'span',
            text: 'A recovery path that is never executed is a hypothesis. Until it runs against a real crash, it is not a feature.'
          }
        ]
      },
      {
        _key: 'p19-b14',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p19-c10',
            _type: 'span',
            text: 'The parameter change that mattered most was reducing the checkpoint interval so that recovery completed inside our availability target, which raised steady state write volume by nine percent and turned a nine minute repair into a fifty second one.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-20',
    title: 'Index-Only Scans and the Visibility Map',
    slug: 'index-only-scans-and-visibility-maps',
    subtitle: 'Skipping the heap is only free while the visibility map says the page is clean, and vacuum is what keeps that promise true.',
    status: 'published',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80',
      alt: 'Desk with an open laptop displaying a code editor and a notebook beside it',
      caption: 'An index-only scan is a bet on vacuum keeping up with writes, and the heap fetch counter tells you when the bet is losing.'
    },
    publishedAt: '2025-06-27T09:05:00Z',
    author: AUTHORS[8],
    categories: [CATEGORIES[3]],
    tags: ['Index-Only Scans', 'Visibility Map', 'Vacuum', 'PostgreSQL', 'Query Performance'],
    estimatedReadingTime: 7,
    wordCount: 1580,
    clapsCount: 415,
    viewsCount: 7320,
    body: [
      {
        _key: 'p20-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p20-c1',
            _type: 'span',
            text: 'An index-only scan reads the index and skips the heap entirely, turning a two access path into one. The technique is real, but it is conditional: it works only while the visibility map can assure the executor that every page it touches contains no rows invisible to the current snapshot.'
          }
        ]
      },
      {
        _key: 'p20-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p20-c2',
            _type: 'span',
            text: 'What the Visibility Map Records'
          }
        ]
      },
      {
        _key: 'p20-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p20-c3',
            _type: 'span',
            text: 'The map stores two bits per heap page: one indicating that all tuples on the page are visible to every snapshot, and one indicating that all tuples are frozen and will never need vacuuming again. Vacuum sets these bits after it has cleaned a page, and any subsequent modification clears the visibility bit immediately.'
          }
        ]
      },
      {
        _key: 'p20-b4',
        _type: 'callout',
        tone: 'info',
        text: 'A missing visibility bit does not prevent an index-only scan; it forces a heap fetch for each tuple on that page. The plan still reports itself as index-only, which is why the heap fetch counter matters more than the plan node name.'
      },
      {
        _key: 'p20-b5',
        _type: 'code',
        language: 'rust',
        filename: 'scan-health.rs',
        code: `/// Cumulative counters reported by the engine for one index relation.
#[derive(Debug, Clone, Copy, Default)]
pub struct IndexScanStats {
    pub index_scans: u64,
    pub index_only_scans: u64,
    pub heap_fetches: u64,
    pub tuples_returned: u64,
}

#[derive(Debug, PartialEq)]
pub struct ScanHealth {
    pub index_only_share: f64,
    pub heap_fetch_ratio: f64,
    pub vacuum_is_lagging: bool,
}

impl IndexScanStats {
    pub fn health(&self) -> ScanHealth {
        let index_only_share = if self.index_scans == 0 {
            0.0
        } else {
            self.index_only_scans as f64 / self.index_scans as f64
        };
        let heap_fetch_ratio = if self.tuples_returned == 0 {
            0.0
        } else {
            self.heap_fetches as f64 / self.tuples_returned as f64
        };
        ScanHealth {
            index_only_share,
            heap_fetch_ratio,
            vacuum_is_lagging: heap_fetch_ratio > 0.2,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lagging_vacuum_shows_up_as_heap_fetches() {
        let stats = IndexScanStats {
            index_scans: 1_000,
            index_only_scans: 940,
            heap_fetches: 41_000,
            tuples_returned: 60_000,
        };
        let health = stats.health();
        assert!(health.index_only_share > 0.9);
        assert!(health.vacuum_is_lagging);
    }
}`
      },
      {
        _key: 'p20-b6',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'p20-c4',
            _type: 'span',
            text: 'Making Index-Only Scans Actually Pay'
          }
        ]
      },
      {
        _key: 'p20-b7',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p20-c5',
            _type: 'span',
            text: 'The first requirement is vacuum frequency proportional to write volume, not to table age. Append-only tables whose visibility map is almost entirely set will see the plan for free; the same table under a heavy update workload will spend most of its index-only scans fetching heap pages, and it will be slower than a plain index scan because the index entries are wider.'
          }
        ]
      },
      {
        _key: 'p20-b8',
        _type: 'callout',
        tone: 'warning',
        text: 'Default autovacuum thresholds are tuned for small tables. On a table measured in hundreds of gigabytes, a percentage based trigger means the map can be stale for hours while an index-only scan quietly degrades into an index scan with extra steps.'
      },
      {
        _key: 'p20-b9',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'p20-c6',
            _type: 'span',
            text: 'Covering Indexes and Their Write Cost'
          }
        ]
      },
      {
        _key: 'p20-b10',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p20-c7',
            _type: 'span',
            text: 'Attaching the projected columns to an index as included payload lets a query be satisfied without touching the heap, but the payload is copied for every entry and rewritten on every update that touches those columns. The judgement is straightforward: cover a query whose columns are stable and read often, and leave a query whose projected columns change frequently to the heap.'
          }
        ]
      },
      {
        _key: 'p20-b11',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'p20-c8',
            _type: 'span',
            text: 'The plan node name tells you what the executor intended. Only the counters tell you what it had to do.'
          }
        ]
      },
      {
        _key: 'p20-b12',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'p20-c9',
            _type: 'span',
            text: 'Instrumenting heap fetch ratio per index turned an invisible degradation into a weekly review item, and lowering the vacuum scale factor on the three busiest tables cut heap fetches on the hottest index by ninety-four percent without changing a single query.'
          }
        ]
      }
    ]
  },
  {
    _id: 'post-draft-1',
    title: 'The Economics of Open Standards',
    slug: 'the-economics-of-open-standards',
    subtitle: 'Working notes on who pays to write a specification, who captures the value of adopting it, and why maintenance is always the unfunded third.',
    status: 'draft',
    coverImage: {
      url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
      alt: 'Two people shaking hands across a table with documents between them',
      caption: 'Unpublished working draft retained to exercise status filtering across feed, search and detail routes.'
    },
    publishedAt: '2025-04-08T09:30:00Z',
    author: AUTHORS[3],
    categories: [CATEGORIES[2]],
    tags: ['Standards', 'Licensing', 'Governance', 'Public Interest', 'Interoperability'],
    estimatedReadingTime: 6,
    wordCount: 1350,
    clapsCount: 105,
    viewsCount: 1620,
    body: [
      {
        _key: 'pdr-b1',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pdr-c1',
            _type: 'span',
            text: 'An open standard is a public good produced by a private coalition, and the coalition is almost never the group that benefits most from it. Understanding who writes, who adopts and who maintains a specification explains most of the strange behaviour observed in standards committees.'
          }
        ]
      },
      {
        _key: 'pdr-b2',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'pdr-c2',
            _type: 'span',
            text: 'Three Roles, Three Incentives'
          }
        ]
      },
      {
        _key: 'pdr-b3',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pdr-c3',
            _type: 'span',
            text: 'Authors pay the drafting cost in engineer time and travel, and they capture the value of shaping the interface toward their own implementation. Adopters pay an integration cost and capture the value of not being locked in. Maintainers, who keep the conformance suite current once the initial enthusiasm has moved on, frequently capture nothing at all.'
          }
        ]
      },
      {
        _key: 'pdr-b4',
        _type: 'callout',
        tone: 'info',
        text: 'The drafting phase of most specifications is funded by vendors with a commercial interest in the outcome. The maintenance phase, which lasts far longer, is funded by whoever happens to care, which is usually nobody.'
      },
      {
        _key: 'pdr-b5',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pdr-c4',
            _type: 'span',
            text: 'This asymmetry has a predictable consequence. Specifications converge quickly on the parts that are visible in a press release and slowly or never on the parts that only matter during an incident: error semantics, version negotiation and the handling of partial failures.'
          }
        ]
      },
      {
        _key: 'pdr-b6',
        _type: 'code',
        language: 'sql',
        filename: 'standards-investment.sql',
        code: `-- Editing effort versus adoption for a sample of infrastructure specifications.
WITH revisions AS (
    SELECT
        spec_id,
        COUNT(*) AS revisions,
        COUNT(DISTINCT editor_org) AS editing_orgs,
        MAX(revision_date) AS last_revision
    FROM spec_revision
    GROUP BY spec_id
)
SELECT
    s.spec_id,
    s.title,
    r.revisions,
    r.editing_orgs,
    ROUND(
        EXTRACT(EPOCH FROM (now() - r.last_revision)) / 86400.0,
        0
    ) AS days_since_revision,
    s.implementations,
    ROUND(s.implementations::numeric / NULLIF(r.editing_orgs, 0), 2)
        AS implementations_per_editing_org,
    (r.editing_orgs = 1) AS single_org_capture
FROM specification s
JOIN revisions r ON r.spec_id = s.spec_id
WHERE s.status = 'published'
ORDER BY single_org_capture DESC, days_since_revision DESC;`
      },
      {
        _key: 'pdr-b7',
        _type: 'block',
        style: 'h2',
        children: [
          {
            _key: 'pdr-c5',
            _type: 'span',
            text: 'Conformance Suites Are the Real Standard'
          }
        ]
      },
      {
        _key: 'pdr-b8',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pdr-c6',
            _type: 'span',
            text: 'A specification without a conformance suite is a document that every implementer interprets in the direction that suits them. The suite is what converts prose into interoperability, it is expensive to write, and it is almost always the first line item cut when a committee runs short of budget.'
          }
        ]
      },
      {
        _key: 'pdr-b9',
        _type: 'callout',
        tone: 'warning',
        text: 'Watch for specifications whose only remaining activity is a mailing list. A frozen specification with no test suite is not stability, it is abandonment with a version number.'
      },
      {
        _key: 'pdr-b10',
        _type: 'block',
        style: 'h3',
        children: [
          {
            _key: 'pdr-c7',
            _type: 'span',
            text: 'Funding Models Worth Testing'
          }
        ]
      },
      {
        _key: 'pdr-b11',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pdr-c8',
            _type: 'span',
            text: 'Three models appear repeatedly in successful cases: a membership fee that funds a permanent secretariat, a public procurement requirement that makes conformance a condition of sale, and a downstream consortium that pays for the suite because its members all depend on it. The third is the most durable, because the payers and the beneficiaries are the same organisations.'
          }
        ]
      },
      {
        _key: 'pdr-b12',
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _key: 'pdr-c9',
            _type: 'span',
            text: 'A standard is not maintained by the authority that published it. It is maintained by whoever still has a reason to test against it.'
          }
        ]
      },
      {
        _key: 'pdr-b13',
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'pdr-c10',
            _type: 'span',
            text: 'Open questions for the finished piece: whether procurement can be used to fund conformance suites directly, and whether a registry of implementations by tested revision is a viable maintenance signal. Both need data before they can be argued rather than asserted.'
          }
        ]
      }
    ]
  }
];
