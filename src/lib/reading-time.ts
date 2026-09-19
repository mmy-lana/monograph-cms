import type { CustomPortableTextBlock } from '@/types/blog';
import { isTextBlock } from '@/lib/utils';

export interface ReadingTimeResult {
  minutes: number;
  words: number;
}

/** Milliseconds reserved per image, capped so a gallery cannot dominate. */
const IMAGE_SECONDS_MAX = 13;
const IMAGE_SECONDS_MIN = 3;
const IMAGES_AT_FULL_WEIGHT = 10;

export function calculateReadingTime(blocks: CustomPortableTextBlock[]): ReadingTimeResult {
  // A malformed document (or a projection that dropped the field) must degrade
  // to an empty estimate instead of throwing during render.
  if (!Array.isArray(blocks)) {
    return { minutes: 1, words: 0 };
  }

  let wordCount = 0;
  let imageCount = 0;
  let codeBlockWordCount = 0;

  for (const block of blocks) {
    if (!block || typeof block !== 'object') continue;

    if (isTextBlock(block)) {
      // `children` is required by the type but is routinely absent on blocks
      // authored by hand or returned by an incomplete projection.
      if (!Array.isArray(block.children)) continue;

      for (const child of block.children) {
        if (child && typeof child.text === 'string') {
          const words = child.text.trim().split(/\s+/).filter(Boolean).length;
          wordCount += words;
        }
      }
    } else if (block._type === 'image') {
      imageCount += 1;
    } else if (block._type === 'code' && typeof block.code === 'string') {
      const codeWords = block.code.trim().split(/\s+/).filter(Boolean).length;
      codeBlockWordCount += codeWords;
    }
  }

  const textTimeMinutes = wordCount / 225;
  const codeTimeMinutes = codeBlockWordCount / 110;

  let imageTimeSeconds = 0;
  for (let i = 1; i <= imageCount; i++) {
    imageTimeSeconds +=
      i <= IMAGES_AT_FULL_WEIGHT ? IMAGE_SECONDS_MAX - i : IMAGE_SECONDS_MIN;
  }

  const totalMinutes = Math.max(1, Math.ceil(textTimeMinutes + codeTimeMinutes + (imageTimeSeconds / 60)));
  const totalWords = wordCount + codeBlockWordCount;

  return {
    minutes: totalMinutes,
    words: totalWords
  };
}
