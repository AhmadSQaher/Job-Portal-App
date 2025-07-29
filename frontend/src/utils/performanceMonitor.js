// Performance monitoring utilities
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Function to send metrics to analytics service
function sendToAnalytics(metric) {
  // In production, send to your analytics service
  console.log('Performance metric:', metric);
  
  // Example: Send to Google Analytics, DataDog, etc.
  // gtag('event', metric.name, {
  //   event_category: 'Web Vitals',
  //   value: Math.round(metric.value),
  //   non_interaction: true,
  // });
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  // Core Web Vitals
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

// Performance observer for resource timing
export function observeResourceTiming() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.transferSize > 100000) { // Log large resources
          console.warn('Large resource detected:', {
            name: entry.name,
            size: entry.transferSize,
            duration: entry.duration
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }
}

// Custom performance marks
export function markPerformance(name) {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(name);
  }
}

export function measurePerformance(name, startMark, endMark) {
  if ('performance' in window && 'measure' in performance) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`${name}: ${measure.duration}ms`);
      return measure.duration;
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  }
}

// Preload critical resources - dynamic approach for Vite builds
export function preloadCriticalResources() {
  // In development mode, don't preload as Vite handles this
  if (import.meta.env.DEV) {
    return;
  }

  // Get all script and style links from the document
  const existingLinks = document.querySelectorAll('link[rel="stylesheet"], script[src]');
  const criticalAssets = [];

  existingLinks.forEach(element => {
    if (element.tagName === 'LINK' && element.rel === 'stylesheet') {
      criticalAssets.push({ href: element.href, as: 'style' });
    } else if (element.tagName === 'SCRIPT' && element.src) {
      criticalAssets.push({ href: element.src, as: 'script' });
    }
  });

  // Preload the first few critical assets
  criticalAssets.slice(0, 2).forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'script') {
      link.crossOrigin = 'anonymous';
    }
    // Add onload and onerror handlers to prevent unused preload warnings
    link.onload = () => link.remove();
    link.onerror = () => link.remove();
    document.head.appendChild(link);
  });
}

// Lazy load images with intersection observer
export function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}
