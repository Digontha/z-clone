import React from "react";

const STYLE_ID = "error-boundary-styles";
const failedBoundaries = new Set<object>();

const CSS = `
.eb-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
  background: #1f2937;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
.eb-inner {
  max-width: 340px;
  width: 100%;
  text-align: center;
  animation: eb-in 0.25s ease-out;
}
@keyframes eb-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.eb-icon-wrap {
  position: relative;
  margin: 0 auto 16px;
  width: 48px;
  height: 48px;
}
.eb-icon-glow {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: rgba(248, 113, 113, 0.2);
  filter: blur(16px);
}
.eb-icon-circle {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 1px solid rgba(248, 113, 113, 0.35);
  background: rgba(248, 113, 113, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f87171;
}
.eb-title { margin: 0 0 6px; font-weight: 600; font-size: 16px; line-height: 1.4; color: rgba(255, 255, 255, 0.92); }
.eb-sub { margin: 0 0 12px; font-size: 12.5px; line-height: 1.5; color: rgba(255, 255, 255, 0.6); }
.eb-msg {
  margin: 0 0 20px;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11.5px; line-height: 1.6; color: rgba(255, 255, 255, 0.5);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden;
}
.eb-btn {
  font-family: inherit; font-size: 12.5px; font-weight: 600; color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 9px;
  padding: 7px 14px; cursor: pointer;
  display: inline-flex; align-items: center; gap: 6px;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}
.eb-btn:hover { background: rgba(255, 255, 255, 0.14); border-color: rgba(255, 255, 255, 0.22); }
`;

function ensureStylesInjected() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const tag = document.createElement("style");
  tag.id = STYLE_ID;
  tag.textContent = CSS;
  document.head.appendChild(tag);
}

function AlertIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

interface ErrorBoundaryProps {
  name?: string;
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info?.componentStack);
    failedBoundaries.add(this);
    try {
      window.parent?.postMessage(
        {
          type: "runtime-error",
          componentName: this.props.name || "App",
          message: String(error?.message || error),
          stack: info?.componentStack || "",
        },
        "*",
      );
    } catch {
      // Not embedded in an iframe with a listening parent — nothing to notify.
    }
  }

  componentDidMount() {
    ensureStylesInjected();
    if (!this.state.error) this.notifyHealthy();
  }

  componentDidUpdate(_prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    if (prevState.error && !this.state.error) {
      failedBoundaries.delete(this);
      this.notifyHealthy();
    }
  }

  componentWillUnmount() {
    failedBoundaries.delete(this);
  }

  notifyHealthy() {
    window.setTimeout(() => {
      if (failedBoundaries.size > 0) return;
      try {
        window.parent?.postMessage(
          { type: "runtime-ok", componentName: this.props.name || "App" },
          "*",
        );
      } catch {
        return;
      }
    }, 0);
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    const label = this.props.name ? `"${this.props.name}"` : "This section";

    return (
      <div className="eb-wrap" role="alert">
        <div className="eb-inner">
          <div className="eb-icon-wrap">
            <div className="eb-icon-glow" />
            <div className="eb-icon-circle">
              <AlertIcon />
            </div>
          </div>

          <p className="eb-title">{label} failed to render</p>
          <p className="eb-sub">Everything outside this boundary still works.</p>
          <p className="eb-msg">{String(error?.message || error)}</p>

          <button type="button" className="eb-btn" onClick={this.handleReload}>
            <RefreshIcon />
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;