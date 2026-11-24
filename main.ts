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

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

// The gate reads exactly one line of 1-200 characters, so validate before
// writing: a line that is empty, too long, or split across lines would fail
// the check instead of scoring.
function validateLine(line: string): void {
  if (!line.trim()) fail('entry line must not be empty');
  if (line.length > 200) {
    fail(`entry line is ${line.length} chars, must be 1-200`);
  }
  if (line.includes('\n')) fail('entry line must be a single line');
}

validateLine(LINE);

// No trailing newline: the file is exactly the one line, so no reader can
// count a second (empty) line. The gate allows 1-200 characters either way,
// but exact is safer.
const ENTRY_FILE = join(OUTPUT_DIR, 'entry.txt');

function writeEntry(line: string): void {
  try {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    writeFileSync(ENTRY_FILE, line, 'utf8');
  } catch (err) {
    fail(`could not write ${ENTRY_FILE}: ${(err as Error).message}`);
  }
}

writeEntry(LINE);
console.log(`wrote ${LINE.length} chars to ${ENTRY_FILE}`);
