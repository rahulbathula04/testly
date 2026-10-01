import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

console.log('\n🔐 RUNNING PRODUCTION HARDENING TESTS...\n');

const adminGate = read('components/admin/AdminLoginGate.jsx');
assert(!adminGate.includes('ADMIN_PASS'), 'Admin password must never exist in client source');
assert(!adminGate.includes('9347379041Ra'), 'Known hardcoded admin credential must never exist in client source');
assert(adminGate.includes('signInWithPassword'), 'Admin login must use Supabase Auth');

const legacyStore = read('data/testly100/testly100Store.js');
assert(!legacyStore.includes('Generate 86 Approved Participants'), 'Production store must not seed an 86-person cohort');
assert(!legacyStore.includes('APPROVE_BATCH'), 'Production audit log must not contain fabricated history');

const hero = read('components/Hero.jsx');
assert(!hero.includes('THE AUTHORIZED EXAM REGISTRATION RAIL'), 'Public hero must not claim authorization without current evidence');
assert(!hero.includes('ZERO DEFECT AUDIT'), 'Public hero must not promise zero-defect outcomes');

const pricing = read('components/PriceProof.jsx');
assert(!pricing.includes('Verified Official Fee Schedule'), 'Pricing UI must not present stale hardcoded fees as verified');
assert(!pricing.includes('Your Direct Net Savings'), 'Pricing UI must not calculate savings from stale static provider fees');

const securityMigration = fs.readFileSync(
  path.join(srcDir, '..', 'supabase', 'migrations', '20261001_production_security_hardening.sql'),
  'utf8'
);
assert(securityMigration.includes('enable row level security'), 'RLS hardening migration must enable RLS');
assert(securityMigration.includes('Administrator authorization required'), 'Seat allocation RPC must require administrator authorization');
assert(securityMigration.includes('revoke execute on function'), 'Seat allocation RPC must not be publicly executable');

console.log('  ✓ Client admin credential removed');
console.log('  ✓ Fabricated cohort/audit seed removed');
console.log('  ✓ Unsupported public trust claims removed');
console.log('  ✓ Stale pricing verification language removed');
console.log('  ✓ Supabase RLS and RPC hardening present');
console.log('\n🔐 PRODUCTION HARDENING TESTS PASSED\n');
