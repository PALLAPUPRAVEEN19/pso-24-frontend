import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center p-6 text-[#1A2332] font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#EAE5DD] shadow-soft text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-[#1A2332] font-heading">Something went wrong</h2>
            <p className="text-xs text-[#5A6578] leading-relaxed">
              An unexpected error occurred in the application. Please try reloading the page.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-2.5 px-4 bg-[#385E72] hover:bg-[#2C4B5B] text-white rounded-xl font-bold text-xs transition-colors shadow-soft"
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/';
                }}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-[#1A2332] rounded-xl font-bold text-xs transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
