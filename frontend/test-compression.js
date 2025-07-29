#!/usr/bin/env node

import https from 'https';
import { promisify } from 'util';

// Test compression by checking response headers
async function testCompression() {
  const options = {
    hostname: 'localhost',
    port: 5173,
    path: '/src/index.css',
    method: 'GET',
    headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    },
    rejectUnauthorized: false // For self-signed certs
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log('🔍 Testing compression for /src/index.css');
      console.log('Status:', res.statusCode);
      console.log('Content-Encoding:', res.headers['content-encoding'] || 'none');
      console.log('Content-Type:', res.headers['content-type']);
      console.log('Content-Length:', res.headers['content-length']);
      console.log('Vary:', res.headers['vary']);
      console.log('Cache-Control:', res.headers['cache-control']);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('✅ Received', data.length, 'bytes');
        if (res.headers['content-encoding']) {
          console.log('🎉 Compression is working!');
        } else {
          console.log('❌ No compression detected');
        }
        resolve(res.headers);
      });
    });

    req.on('error', (e) => {
      console.error('❌ Request failed:', e.message);
      reject(e);
    });

    req.end();
  });
}

// Test multiple endpoints
async function runTests() {
  console.log('🚀 Testing Vite Development Server Compression\n');
  
  const endpoints = [
    '/src/index.css',
    '/src/App.jsx',
    '/@vite/client',
    '/node_modules/.vite/deps/react.js'
  ];

  for (const endpoint of endpoints) {
    try {
      const options = {
        hostname: 'localhost',
        port: 5173,
        path: endpoint,
        method: 'GET',
        headers: {
          'Accept-Encoding': 'gzip, deflate, br'
        },
        rejectUnauthorized: false
      };

      await new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
          console.log(`\n📄 Testing: ${endpoint}`);
          console.log(`Status: ${res.statusCode}`);
          console.log(`Content-Encoding: ${res.headers['content-encoding'] || 'none'}`);
          console.log(`Content-Length: ${res.headers['content-length'] || 'chunked'}`);
          
          let data = '';
          res.on('data', (chunk) => data += chunk);
          res.on('end', () => {
            console.log(`Received: ${data.length} bytes`);
            if (res.headers['content-encoding']) {
              console.log('✅ COMPRESSED');
            } else {
              console.log('❌ NOT COMPRESSED');
            }
            resolve();
          });
        });

        req.on('error', (e) => {
          console.log(`❌ Error testing ${endpoint}:`, e.message);
          resolve();
        });

        req.end();
      });
    } catch (error) {
      console.log(`❌ Failed to test ${endpoint}`);
    }
  }
  
  console.log('\n🏁 Testing complete!');
}

runTests().catch(console.error);
