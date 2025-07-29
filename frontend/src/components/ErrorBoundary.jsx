import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-gray-400 text-lg mb-2">⚠️</div>
            <p className="text-gray-600">
              {this.props.fallbackMessage || 'Something went wrong loading this component.'}
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-2 text-sm text-gray-500">
                <summary className="cursor-pointer">Error details</summary>
                <pre className="mt-1 text-left">{this.state.error.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
