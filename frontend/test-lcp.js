#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs';

async function testLCP() {
  console.log('🚀 Testing Largest Contentful Paint (LCP) Performance...\n');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
  });

  try {
    const page = await browser.newPage();
    
    // Track performance metrics
    const metrics = {
      lcp: null,
      fcp: null,
      ttfb: null,
      loadTime: null
    };

    // Enable performance monitoring
    await page.evaluateOnNewDocument(() => {
      window.performanceMetrics = {};
      
      // Track LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        window.performanceMetrics.lcp = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Track FCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint') {
            window.performanceMetrics.fcp = entry.startTime;
          }
        }
      }).observe({ entryTypes: ['paint'] });
    });

    const startTime = Date.now();
    
    // Navigate to the page
    const response = await page.goto('https://localhost:5173', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    const loadTime = Date.now() - startTime;
    metrics.loadTime = loadTime;

    // Get TTFB from response
    const timing = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        ttfb: navigation.responseStart - navigation.requestStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart
      };
    });

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      return window.performanceMetrics || {};
    });

    // Check if LCP element is visible
    const lcpElementInfo = await page.evaluate(() => {
      const lcpElement = document.querySelector('h1');
      if (lcpElement) {
        const rect = lcpElement.getBoundingClientRect();
        const styles = getComputedStyle(lcpElement);
        return {
          text: lcpElement.textContent.trim(),
          visible: rect.width > 0 && rect.height > 0,
          opacity: styles.opacity,
          transform: styles.transform,
          fontWeight: styles.fontWeight,
          fontSize: styles.fontSize
        };
      }
      return null;
    });

    // Results
    console.log('📊 Performance Results:');
    console.log('='.repeat(50));
    console.log(`🕐 TTFB: ${Math.round(timing.ttfb)}ms`);
    console.log(`🎨 First Contentful Paint: ${Math.round(performanceMetrics.fcp || 0)}ms`);
    console.log(`📏 Largest Contentful Paint: ${Math.round(performanceMetrics.lcp || 0)}ms`);
    console.log(`⚡ DOM Content Loaded: ${Math.round(timing.domContentLoaded)}ms`);
    console.log(`🏁 Load Complete: ${Math.round(timing.loadComplete)}ms`);
    console.log(`📦 Total Load Time: ${loadTime}ms`);
    
    console.log('\n🎯 LCP Element Analysis:');
    console.log('='.repeat(50));
    if (lcpElementInfo) {
      console.log(`📝 Text: "${lcpElementInfo.text}"`);
      console.log(`👁️  Visible: ${lcpElementInfo.visible ? '✅ Yes' : '❌ No'}`);
      console.log(`🔍 Opacity: ${lcpElementInfo.opacity}`);
      console.log(`📐 Transform: ${lcpElementInfo.transform}`);
      console.log(`⚖️  Font Weight: ${lcpElementInfo.fontWeight}`);
      console.log(`📏 Font Size: ${lcpElementInfo.fontSize}`);
    } else {
      console.log('❌ LCP element not found');
    }

    // Performance assessment
    console.log('\n🏆 Performance Assessment:');
    console.log('='.repeat(50));
    
    const lcpScore = performanceMetrics.lcp || 0;
    if (lcpScore === 0) {
      console.log('⚠️  LCP not measured (page might still be loading)');
    } else if (lcpScore <= 2500) {
      console.log(`✅ Excellent LCP: ${Math.round(lcpScore)}ms (≤ 2.5s)`);
    } else if (lcpScore <= 4000) {
      console.log(`⚠️  Needs Improvement LCP: ${Math.round(lcpScore)}ms (2.5s - 4s)`);
    } else {
      console.log(`❌ Poor LCP: ${Math.round(lcpScore)}ms (> 4s)`);
    }

    // Calculate improvement estimate
    const estimatedOriginalLCP = 2250; // Based on 93% render delay from user's report
    if (lcpScore > 0 && lcpScore < estimatedOriginalLCP) {
      const improvement = Math.round(((estimatedOriginalLCP - lcpScore) / estimatedOriginalLCP) * 100);
      console.log(`🚀 Estimated LCP Improvement: ${improvement}%`);
    }

  } catch (error) {
    console.error('❌ Error testing performance:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testLCP().catch(console.error);
