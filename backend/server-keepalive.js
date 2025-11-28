import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let serverProcess = null;
let restartCount = 0;
const MAX_RESTARTS = 10;

function startServer() {
  if (restartCount >= MAX_RESTARTS) {
    console.error('❌ Max restart attempts reached. Please check the server logs.');
    process.exit(1);
  }

  console.log(`🚀 Starting server (attempt ${restartCount + 1})...`);
  
  serverProcess = spawn('node', ['server.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  serverProcess.on('close', (code) => {
    console.log(`⚠️  Server process exited with code ${code}`);
    if (code !== 0) {
      restartCount++;
      console.log(`🔄 Restarting server in 2 seconds...`);
      setTimeout(startServer, 2000);
    }
  });

  serverProcess.on('error', (err) => {
    console.error('❌ Failed to start server:', err);
    restartCount++;
    setTimeout(startServer, 2000);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Received SIGINT, shutting down gracefully...');
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
  setTimeout(() => process.exit(0), 1000);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Received SIGTERM, shutting down gracefully...');
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
  setTimeout(() => process.exit(0), 1000);
});

// Start the server
startServer();

console.log('📡 Server keepalive process running. Press Ctrl+C to stop.');
