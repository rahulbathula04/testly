import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Testly Runtime Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex items-center justify-center p-6 font-[Inter,system-ui,sans-serif]">
          <div className="max-w-md w-full bg-white border border-[#E5E7EB] rounded-3xl p-8 text-center space-y-6 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF3FF] text-[#1E3A8A] mx-auto flex items-center justify-center text-2xl font-black">
              !
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                Something went wrong
              </h2>
              <p className="text-xs text-[#64748B] leading-relaxed">
                We encountered an unexpected error while loading this section. Your booking data and session are secure.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleHome}
                className="w-full bg-[#FAF9F6] hover:bg-[#EBF3FF] text-[#1E3A8A] border border-[#BFDBFE] text-xs font-bold py-3 px-5 rounded-xl transition-all cursor-pointer"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
