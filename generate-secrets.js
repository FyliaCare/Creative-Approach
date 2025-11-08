#!/usr/bin/env node
import crypto from 'crypto';

console.log('🔐 Generating secure secrets for production deployment...\n');

console.log('1️⃣  JWT_SECRET:');
console.log(crypto.randomBytes(64).toString('hex'));
console.log('');

console.log('2️⃣  SESSION_SECRET:');
console.log(crypto.randomBytes(32).toString('hex'));
console.log('');

console.log('✅ Copy these values to your Render environment variables!');
console.log('📖 See RENDER_DEPLOYMENT.md for complete deployment guide');
