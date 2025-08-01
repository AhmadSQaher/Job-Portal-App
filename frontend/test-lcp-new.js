import puppeteer from 'puppeteer';

console.log('🚀 Testing Largest Contentful Paint (LCP) Performance...');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']
    });
    
    const page = await browser.newPage();
    
    // Enable performance monitoring
    await page.setCacheEnabled(false);
    
    const startTime = Date.now();
    
    // Navigate to the local development server
    await page.goto('https://localhost:5174', { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const paintEntries = performance.getEntriesByType('paint');
      const navigationEntries = performance.getEntriesByType('navigation');
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      
      return {
        fcp: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        lcp: lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : 0,
        domContentLoaded: navigationEntries[0]?.domContentLoadedEventEnd - navigationEntries[0]?.domContentLoadedEventStart || 0,
        loadComplete: navigationEntries[0]?.loadEventEnd - navigationEntries[0]?.loadEventStart || 0,
        ttfb: navigationEntries[0]?.responseStart - navigationEntries[0]?.requestStart || 0
      };
    });
    
    // Get LCP element details
    const lcpElementInfo = await page.evaluate(() => {
      const observer = new PerformanceObserver((list) => {});
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        const lcpEntry = lcpEntries[lcpEntries.length - 1];
        const element = lcpEntry.element;
        if (element) {
          const styles = window.getComputedStyle(element);
          return {
            tagName: element.tagName,
            text: element.textContent?.slice(0, 50) || '',
            visible: styles.visibility === 'visible' && styles.display !== 'none',
            opacity: styles.opacity,
            transform: styles.transform,
            fontWeight: styles.fontWeight,
            fontSize: styles.fontSize
          };
        }
      }
      return null;
    });
    
    const totalTime = Date.now() - startTime;
    
    console.log('📊 Performance Results:');
    console.log('==================================================');
    console.log(`🕐 TTFB: ${Math.round(performanceMetrics.ttfb)}ms`);
    console.log(`🎨 First Contentful Paint: ${Math.round(performanceMetrics.fcp)}ms`);
    console.log(`📏 Largest Contentful Paint: ${Math.round(performanceMetrics.lcp)}ms`);
    console.log(`⚡ DOM Content Loaded: ${Math.round(performanceMetrics.domContentLoaded)}ms`);
    console.log(`🏁 Load Complete: ${Math.round(performanceMetrics.loadComplete)}ms`);
    console.log(`📦 Total Load Time: ${totalTime}ms`);
    
    if (lcpElementInfo) {
      console.log('🎯 LCP Element Analysis:');
      console.log('==================================================');
      console.log(`📝 Text: "${lcpElementInfo.text}"`);
      console.log(`👁️  Visible: ${lcpElementInfo.visible ? '✅ Yes' : '❌ No'}`);
      console.log(`🔍 Opacity: ${lcpElementInfo.opacity}`);
      console.log(`📐 Transform: ${lcpElementInfo.transform}`);
      console.log(`⚖️  Font Weight: ${lcpElementInfo.fontWeight}`);
      console.log(`📏 Font Size: ${lcpElementInfo.fontSize}`);
    }
    
    console.log('🏆 Performance Assessment:');
    console.log('==================================================');
    
    const lcpScore = performanceMetrics.lcp;
    if (lcpScore <= 2500) {
      console.log(`✅ Excellent LCP: ${Math.round(lcpScore)}ms (≤ 2.5s)`);
    } else if (lcpScore <= 4000) {
      console.log(`⚠️  Needs Improvement: ${Math.round(lcpScore)}ms (2.5s - 4s)`);
    } else {
      console.log(`❌ Poor LCP: ${Math.round(lcpScore)}ms (> 4s)`);
    }
    
    // Calculate improvement estimate
    const baselineLCP = 4370; // Previous slow LCP
    const improvement = ((baselineLCP - lcpScore) / baselineLCP) * 100;
    console.log(`🚀 Estimated LCP Improvement: ${Math.round(improvement)}%`);
    
    await browser.close();
  } catch (error) {
    console.error('❌ Error during performance test:', error.message);
  }
})();
