// Downloads royalty-free plumbing images into /public/images
// Run: node scripts/fetch-images.mjs
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'images');

const images = [
  { slot: 'hero-1',              url: 'https://images.pexels.com/photos/32588548/pexels-photo-32588548.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { slot: 'hero-alt',            url: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { slot: 'service-fuite-eau',   url: 'https://images.pexels.com/photos/15206136/pexels-photo-15206136.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'service-debouchage',  url: 'https://images.pexels.com/photos/87299/pexels-photo-87299.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'service-chauffe-eau', url: 'https://images.pexels.com/photos/3173206/pexels-photo-3173206.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'service-sanitaires',  url: 'https://images.pexels.com/photos/7031719/pexels-photo-7031719.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'service-salle-de-bain', url: 'https://images.unsplash.com/photo-1749532125405-70950966b0e5?w=1600&q=80&auto=format&fit=crop' },
  { slot: 'service-cuisine',     url: 'https://images.pexels.com/photos/6253786/pexels-photo-6253786.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'trust-rapidite',      url: 'https://images.pexels.com/photos/6195899/pexels-photo-6195899.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'trust-disponibilite', url: 'https://images.pexels.com/photos/8204317/pexels-photo-8204317.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'trust-devis-gratuit', url: 'https://images.pexels.com/photos/8112186/pexels-photo-8112186.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'trust-experience',    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop' },
  { slot: 'gallery-1',           url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80&auto=format&fit=crop' },
  { slot: 'gallery-2',           url: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1600&q=80&auto=format&fit=crop' },
  { slot: 'gallery-3',           url: 'https://images.pexels.com/photos/28169591/pexels-photo-28169591.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'gallery-4',           url: 'https://images.pexels.com/photos/3721272/pexels-photo-3721272.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'gallery-5',           url: 'https://images.pexels.com/photos/28178448/pexels-photo-28178448.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'gallery-6',           url: 'https://images.pexels.com/photos/29248902/pexels-photo-29248902.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'gallery-7',           url: 'https://images.pexels.com/photos/35493890/pexels-photo-35493890.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'gallery-8',           url: 'https://images.pexels.com/photos/12196323/pexels-photo-12196323.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'gallery-9',           url: 'https://images.pexels.com/photos/34295403/pexels-photo-34295403.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { slot: 'gallery-10',          url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&q=80&auto=format&fit=crop' },
  { slot: 'zone-bg',             url: 'https://images.pexels.com/photos/22147530/pexels-photo-22147530.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { slot: 'contact-bg',          url: 'https://images.pexels.com/photos/8204327/pexels-photo-8204327.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { slot: 'about-1',             url: 'https://images.pexels.com/photos/29226620/pexels-photo-29226620.jpeg?auto=compress&cs=tinysrgb&w=1600' },
];

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function downloadOne({ slot, url }) {
  const file = join(OUT_DIR, `${slot}.jpg`);
  if (await exists(file)) {
    return { slot, status: 'skip' };
  }
  const res = await fetch(url, { headers: { 'User-Agent': ua, 'Accept': 'image/jpeg,image/*,*/*' } });
  if (!res.ok) throw new Error(`${slot}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(file, buf);
  return { slot, status: 'ok', bytes: buf.length };
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const concurrency = 4;
  const queue = [...images];
  const results = [];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const job = queue.shift();
      try {
        const r = await downloadOne(job);
        console.log(`[${r.status}] ${r.slot}${r.bytes ? ` (${(r.bytes/1024).toFixed(0)} KB)` : ''}`);
        results.push(r);
      } catch (e) {
        console.error(`[fail] ${job.slot}: ${e.message}`);
        results.push({ slot: job.slot, status: 'fail', error: e.message });
      }
    }
  });
  await Promise.all(workers);
  const ok = results.filter(r => r.status === 'ok').length;
  const skip = results.filter(r => r.status === 'skip').length;
  const fail = results.filter(r => r.status === 'fail').length;
  console.log(`\nDone — downloaded ${ok}, skipped ${skip}, failed ${fail}`);
  if (fail) process.exitCode = 1;
}

run();
