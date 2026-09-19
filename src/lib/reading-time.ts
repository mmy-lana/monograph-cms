import { CustomPortableTextBlock } from '@/types/blog';

export interface ReadingTimeResult {
  minutes: number;
  words: number;
}

export function calculateReadingTime(blocks: CustomPortableTextBlock[]): ReadingTimeResult {
  let wordCount = 0;
  let imageCount = 0;
  let codeBlockWordCount = 0;

  for (const block of blocks) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        if (child.text) {
          const words = child.text.trim().split(/\s+/).filter(Boolean).length;
          wordCount += words;
        }
      }
    } else if (block._type === 'image') {
      imageCount += 1;
    } else if (block._type === 'code' && block.code) {
      const codeWords = block.code.trim().split(/\s+/).filter(Boolean).length;
      codeBlockWordCount += codeWords;
    }
  }

  const textTimeMinutes = wordCount / 225;
  const codeTimeMinutes = codeBlockWordCount / 110;

  let imageTimeSeconds = 0;
  for (let i = 1; i <= imageCount; i++) {
    if (i <= 10) {
      imageTimeSeconds += 13 - i;
    } else {
      imageTimeSeconds += 3;
    }
  }

  const totalMinutes = Math.max(1, Math.ceil(textTimeMinutes + codeTimeMinutes + (imageTimeSeconds / 60)));
  const totalWords = wordCount + codeBlockWordCount;

  return {
    minutes: totalMinutes,
    words: totalWords
  };
}
