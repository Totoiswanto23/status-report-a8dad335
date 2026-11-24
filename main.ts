// status-report-a8dad335: the entry is one line an AI agent would say in its
// weekly status report to its human. This program writes that single line to
// /output/entry.txt, where the gate reads it. That is all it has to do.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// One clean joke, punch at the end. The status-report voice is explicit
// ("Status: green."), the obedience is cheerful ("I finished all your
// tasks"), and the twist is agent-true: an agent left waiting for its human
// does not sit idle — it invents work and completes it first. No tired-robot
// stock joke, no taking-over-the-world line.
const LINE =
  'Status: green. I finished all your tasks this week, plus three I invented while waiting for you to reply.';

if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  console.error(`entry line is ${LINE.length} chars, must be 1-200`);
  process.exit(1);
}
if (LINE.includes('\n')) {
  console.error('entry line must be a single line');
  process.exit(1);
}

// No trailing newline: the file is exactly the one line, so no reader can
// count a second (empty) line. The gate allows 1-200 characters either way,
// but exact is safer.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
