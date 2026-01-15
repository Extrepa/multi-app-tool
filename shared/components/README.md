# Shared Components

Reusable React components for use across Errl projects.

## Components

### ErrorBoundary

React Error Boundary component for catching and handling JavaScript errors in component trees.

**Location:** `components/ErrorBoundary.tsx`

**Usage:**

```tsx
import { ErrorBoundary } from '@/shared/components';

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

**Props:**
- `children: ReactNode` - Child components to wrap
- `fallback?: ReactNode` - Custom fallback UI (optional)
- `onError?: (error: Error, errorInfo: ErrorInfo) => void` - Error callback (optional)
- `resetOnPropsChange?: boolean` - Reset error state when props change (optional)
- `resetKeys?: Array<string | number>` - Keys that trigger reset when they change (optional)

**Features:**
- Catches JavaScript errors in child component tree
- Displays user-friendly error UI
- Supports custom fallback components
- Resets error state when props change (optional)
- Logs errors in development mode
- Ready for error reporting service integration (Sentry, LogRocket, etc.)

**Export:** Available via `@/shared/components` or `@errl/shared/components`
