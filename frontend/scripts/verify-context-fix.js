// Script to verify createContext fixes are working
// Run this in browser console after the app loads

function verifyContextFix() {
  console.log('🔍 Verifying createContext fixes...');
  
  // Check if React is properly loaded
  const reactVersion = window.React?.version || 'Not found';
  console.log(`✅ React version: ${reactVersion}`);
  
  // Check if AuthContext is working
  const authContext = document.querySelector('[data-testid="auth-context"]');
  if (authContext) {
    console.log('✅ AuthContext element found');
  } else {
    console.log('❌ AuthContext element not found');
  }
  
  // Check for createContext errors in console
  const errors = [];
  const originalConsoleError = console.error;
  console.error = function(...args) {
    if (args.some(arg => typeof arg === 'string' && arg.includes('createContext'))) {
      errors.push(args.join(' '));
    }
    originalConsoleError.apply(console, args);
  };
  
  setTimeout(() => {
    if (errors.length === 0) {
      console.log('✅ No createContext errors detected!');
    } else {
      console.log('❌ createContext errors found:', errors);
    }
    console.error = originalConsoleError;
  }, 3000);
  
  // Check asset loading
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const animationScript = scripts.find(s => s.src.includes('animations'));
  if (animationScript) {
    console.log(`✅ Animation script loaded: ${animationScript.src}`);
    
    // Check if it has the timestamp
    if (animationScript.src.includes('1754027339492')) {
      console.log('✅ New timestamped assets are being loaded!');
    } else {
      console.log('❌ Old cached assets still being loaded');
    }
  }
  
  console.log('🎯 Verification complete! Check results above.');
}

// Auto-run verification
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', verifyContextFix);
} else {
  verifyContextFix();
}

// Make it available globally
window.verifyContextFix = verifyContextFix;
