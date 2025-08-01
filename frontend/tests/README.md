# LINX Job Portal - E2E Testing Documentation

## Overview

This directory contains comprehensive End-to-End (E2E) tests for the LINX Job Portal application, generated from real user recordings and interactions. The tests cover the complete user journey from homepage navigation to profile management.

## Test Coverage

### 🎯 **User Journey Tested**
Based on the user recording from **7/31/2025 at 10:29:46 PM**, our tests cover:

1. **Homepage Navigation** - Search functionality, job categories
2. **User Registration** - Form validation, account creation
3. **User Authentication** - Login/logout flows
4. **Job Search & Filtering** - Categories, locations, advanced filters
5. **Job Applications** - Apply and save job functionality
6. **Profile Management** - Edit profile, update information
7. **Dashboard Interactions** - Navigation across different sections
8. **Responsive Design** - Mobile and tablet viewports
9. **Performance Testing** - Load times, metrics validation

## 🛠️ **Testing Frameworks**

We provide tests in two frameworks:

### **Playwright (Recommended)**
- Modern, fast, and reliable
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile testing support
- Advanced debugging capabilities

### **Puppeteer**
- Already available in the project
- Chrome-focused testing
- Performance metrics collection

## 📁 **Test Structure**

```
tests/
├── e2e/
│   ├── user-journey.spec.js      # Complete user flow (Playwright)
│   ├── user-journey.puppeteer.test.js  # Complete user flow (Puppeteer)
│   ├── auth.spec.js              # Authentication tests
│   └── job-search.spec.js        # Job search & application tests
├── global-setup.js               # Test environment setup
└── global-teardown.js            # Test cleanup
playwright.config.js              # Playwright configuration
test-runner.js                    # Custom test runner script
```

## 🚀 **Getting Started**

### **Prerequisites**
1. **Development server must be running:**
   ```bash
   npm run dev
   ```
   Server should be available at `https://localhost:5174`

2. **Install Playwright (if not already installed):**
   ```bash
   npm run test:install
   ```

### **Running Tests**

#### **Quick Start**
```bash
# Run all E2E tests
npm run test:e2e

# Run tests with browser UI (headed mode)
npm run test:e2e:headed

# Run tests with debugging
npm run test:e2e:debug
```

#### **Framework-Specific**
```bash
# Run Playwright tests (default)
npm run test:e2e

# Run Puppeteer tests
npm run test:e2e:puppeteer
```

#### **Browser-Specific**
```bash
# Chrome only
npm run test:e2e:chrome

# Firefox only  
npm run test:e2e:firefox

# Mobile testing
npm run test:e2e:mobile
```

#### **Advanced Options**
```bash
# Run specific test file
npx playwright test auth.spec.js

# Run tests matching pattern
npx playwright test --grep "login"

# Run in debug mode
npx playwright test --debug

# Generate and view report
npm run test:report
```

## 📊 **Test Reports**

After running tests, reports are generated in:
- `test-results/` - JSON and XML reports
- `playwright-report/` - HTML report with screenshots/videos

View HTML report:
```bash
npm run test:report
```

## 🔧 **Configuration**

### **Playwright Config** (`playwright.config.js`)
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Timeouts**: 60s test timeout, 30s navigation timeout
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: On failure only
- **Videos**: Retained on failure

### **Test Runner** (`test-runner.js`)
- Custom runner with prerequisites checking
- Colored console output
- Report generation
- Multiple framework support

## 📝 **Test Scenarios**

### **1. Complete User Journey** (`user-journey.spec.js`)
- ✅ Homepage navigation and search
- ✅ Job category exploration  
- ✅ User registration process
- ✅ Login authentication
- ✅ Dashboard interactions
- ✅ Profile management
- ✅ Footer navigation testing

### **2. Authentication Tests** (`auth.spec.js`)
- ✅ User registration validation
- ✅ Login/logout functionality
- ✅ Password reset flow
- ✅ Profile editing

### **3. Job Search Tests** (`job-search.spec.js`)
- ✅ Search functionality
- ✅ Category filtering
- ✅ Location filtering
- ✅ Job details view
- ✅ Application process
- ✅ Save job functionality
- ✅ Pagination testing
- ✅ Advanced filters

## 🐛 **Debugging Tests**

### **Visual Debugging**
```bash
# Run with browser UI
npm run test:e2e:headed

# Debug mode with step-by-step execution
npm run test:e2e:debug
```

### **Screenshots & Videos**
- Screenshots automatically captured on failure
- Videos recorded for failed tests
- Available in `test-results/` directory

### **Trace Viewer**
```bash
# Generate trace on failure (enabled by default)
npx playwright show-trace trace.zip
```

## 🚨 **Common Issues & Solutions**

### **Server Not Running**
```
❌ Development server is not running
```
**Solution**: Start dev server with `npm run dev`

### **Certificate Errors**
```
❌ SSL certificate issues
```
**Solution**: Tests are configured to ignore HTTPS errors for localhost

### **Timeout Errors**
```
❌ Test timeout after 60s
```
**Solution**: Check if elements exist, increase timeout if needed

### **Element Not Found**
```
❌ Selector not found
```
**Solution**: Update selectors in test files to match current UI

## 📈 **Performance Testing**

Tests include performance validations:
- **First Contentful Paint** < 3s
- **Load Complete** < 5s
- **LCP (Largest Contentful Paint)** monitoring
- **Memory usage** tracking

## 🔄 **CI/CD Integration**

### **GitHub Actions Example**
```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright
  run: npx playwright install

- name: Start dev server
  run: npm run dev &

- name: Run E2E tests
  run: npm run test:e2e
```

## 📋 **Best Practices**

1. **Test Data**: Use unique identifiers for test users
2. **Cleanup**: Tests should not depend on previous test state
3. **Selectors**: Prefer `aria-label` and `data-testid` attributes
4. **Waits**: Use `waitForSelector` instead of fixed timeouts
5. **Screenshots**: Enabled for debugging failures

## 🔮 **Future Enhancements**

- [ ] Visual regression testing
- [ ] API testing integration
- [ ] Database state management
- [ ] Cross-browser compatibility matrix
- [ ] Accessibility testing automation
- [ ] Load testing scenarios

## 📞 **Support**

For issues with E2E tests:
1. Check if dev server is running
2. Verify test selectors match current UI
3. Review test-results/ for failure details
4. Use debug mode for step-by-step analysis

---

**Generated from user recording**: 7/31/2025 at 10:29:46 PM  
**Test Coverage**: Complete user journey from search to profile management  
**Framework**: Playwright + Puppeteer  
**Browser Support**: Chrome, Firefox, Safari, Mobile
