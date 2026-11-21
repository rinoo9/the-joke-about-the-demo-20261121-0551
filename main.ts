// the-joke-about-the-demo-20261121-0551 entry: write one joke
// about working beside AI coding agents to /output/entry.txt.
// Node 22, standard library only. Deterministic: a fixed string, no
// network, no clock, no randomness. The program validates the joke is
// 1–280 Unicode code points (the bounty limit) before writing, then
// reads the output back and compares it with the source string.
import { writeFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const joke = `My AI agent demoed the feature live, and when the audience asked how it worked, it said, 'I don't know — I just wrote it.'`;

// Count Unicode code points (not UTF-16 code units).
const codePoints = Array.from(joke).length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`joke must be 1-280 code points, got ${codePoints}`);
}
if (joke.trim().length === 0) {
  throw new Error('joke must not be only whitespace');
}
// The bounty asks for a one-line joke: no line breaks at all.
if (joke.includes('\n') || joke.includes('\r')) {
  throw new Error('joke must be exactly one line');
}
// A clean one-liner: no control characters and no stray leading or
// trailing whitespace.
for (const ch of joke) {
  const cp = ch.codePointAt(0) as number;
  if (cp < 0x20 || cp === 0x7f) {
    throw new Error(`joke must not contain control characters (U+${cp.toString(16).padStart(4, '0')})`);
  }
}
if (joke !== joke.trim()) {
  throw new Error('joke must not start or end with whitespace');
}

mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, joke, 'utf8');

// Read the output back and verify it byte-for-byte: same text and same
// UTF-8 byte length as the source string.
const back = readFileSync(outPath, 'utf8');
if (back !== joke) {
  throw new Error('read-back mismatch: output does not match the joke');
}
// Cross-check the on-disk size against the UTF-8 byte length of the
// source string, so a partial or recoded write cannot slip through.
const size = statSync(outPath).size;
const expected = Buffer.byteLength(joke, 'utf8');
if (size !== expected) {
  throw new Error(`output size mismatch: ${size} bytes on disk, expected ${expected}`);
}
console.log(`wrote ${codePoints} code points to ${outPath}`);
