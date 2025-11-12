import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs errors, and displays a fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('❌ Error caught by boundary:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }

    // Log error to error tracking service in production
    if (import.meta.env.PROD) {
      // Example: Send to error tracking service
      // logErrorToService(error, errorInfo);
      
      // Example: Google Analytics error tracking
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: error.toString(),
          fatal: false,
        });
      }
    }

    this.setState({
      error,
      errorInfo,
      errorCount: this.state.errorCount + 1,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
              </div>

              {/* Error Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h1>

              {/* Error Description */}
              <p className="text-lg text-gray-600 mb-8">
                We're sorry for the inconvenience. An unexpected error has occurred. 
                Our team has been notified and we're working to fix it.
              </p>

              {/* Error Details (Development Only) */}
              {import.meta.env.DEV && this.state.error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <p className="font-mono text-sm text-red-800 mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm font-semibold text-red-700 hover:text-red-900">
                        Component Stack
                      </summary>
                      <pre className="mt-2 text-xs text-red-600 overflow-auto max-h-40">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
                
                <Link
                  to="/"
                  onClick={this.handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-all"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </div>

              {/* Error Count (Development Only) */}
              {import.meta.env.DEV && this.state.errorCount > 1 && (
                <p className="mt-6 text-sm text-gray-500">
                  Error occurred {this.state.errorCount} times
                </p>
              )}

              {/* Support Contact */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Need help? Contact us at{' '}
                  <a 
                    href="mailto:sales@caghana.com" 
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    sales@caghana.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
