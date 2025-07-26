# Design Document

## Overview

This design addresses the sidebar children logic and layout issues by implementing a robust hierarchical menu system with proper hover states, positioning logic, and responsive behavior. The solution focuses on improving the user experience through smooth transitions, correct positioning calculations, and efficient data handling.

## Architecture

### Component Structure

```
Sidebar
├── MenuData State Management
├── Loading State Handler
├── MenuItem (Recursive Component)
│   ├── Hover State Management
│   ├── Children Positioning Logic
│   └── Navigation Handling
└── Skeleton Loading Components
```

### State Management

- **menuData**: Array of MenuItem objects with hierarchical structure
- **isLoading**: Boolean for API loading state
- **Individual hover states**: Managed per MenuItem component for better performance

## Components and Interfaces

### MenuItem Interface

```typescript
type MenuItem = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  children?: MenuItem[];
};

type MenuItemProps = {
  item: MenuItem;
  depth?: number;
  onNavigate?: () => void;
};
```

### Hover Management System

- Use individual component state for hover management instead of global state
- Implement hover delays to prevent flickering when moving between items
- Use CSS transitions for smooth appearance/disappearance of submenus

### Positioning Logic

- Calculate submenu position based on parent item location
- Implement viewport boundary detection
- Adjust submenu position when it would overflow screen edges
- Handle different positioning for different nesting levels
- Support up to 3 levels of nested categories (parent -> child -> grandchild)
- Implement proper z-index management for deeply nested menus

## Data Models

### Menu Data Structure

```typescript
interface MenuResponse {
  data: MenuItem[];
  status: string;
}

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  children?: MenuItem[];
}
```

### Component State Model

```typescript
interface SidebarState {
  menuData: MenuItem[];
  isLoading: boolean;
  error: string | null;
}

interface MenuItemState {
  isHovered: boolean;
  submenuPosition: "right" | "left";
}
```

## Error Handling

### API Error Handling

- Implement try-catch blocks around API calls
- Display user-friendly error messages
- Provide retry mechanisms for failed requests
- Log errors for debugging purposes

### Positioning Error Handling

- Fallback positioning when calculations fail
- Handle edge cases for viewport boundaries
- Graceful degradation for unsupported features

### Navigation Error Handling

- Validate URLs before navigation
- Handle missing or invalid slugs
- Provide feedback for navigation failures

## Testing Strategy

### Unit Tests

- Test MenuItem component with various data structures
- Test hover state management
- Test positioning calculations
- Test API data handling

### Integration Tests

- Test complete sidebar functionality
- Test responsive behavior across breakpoints
- Test keyboard navigation
- Test accessibility features

### Visual Tests

- Test submenu positioning in different scenarios
- Test transitions and animations
- Test loading states and skeletons
- Test error states display

## Implementation Details

### CSS Classes and Styling

```css
.sidebar-container {
  position: relative;
  width: 16rem; /* w-64 */
  background: white;
  border-right: 1px solid #e5e7eb;
}

.menu-item {
  position: relative;
  padding: 0.5rem 0.75rem;
  transition: background-color 0.2s ease;
}

.submenu {
  position: absolute;
  left: 100%;
  top: 0;
  min-width: 16rem;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
}

.submenu.visible {
  opacity: 1;
  visibility: visible;
}
```

### Responsive Design Strategy

- Use Tailwind's responsive prefixes for breakpoint-specific styles
- Hide desktop sidebar on mobile using `max-sm:hidden`
- Ensure mobile sidebar (drawer) handles the same data structure
- Implement touch-friendly interactions for mobile devices

### Performance Optimizations

- Memoize MenuItem components to prevent unnecessary re-renders
- Use useCallback for event handlers
- Implement lazy loading for deeply nested menus
- Optimize API calls with proper dependency arrays

### Accessibility Considerations

- Implement proper ARIA labels and roles
- Support keyboard navigation (Tab, Enter, Escape)
- Provide screen reader announcements for menu state changes
- Ensure sufficient color contrast for all states

## Positioning Algorithm

### Submenu Positioning Logic

1. Calculate parent item's position relative to viewport
2. Determine available space to the right and left
3. Position submenu to the right by default
4. If insufficient space to the right, position to the left
5. Adjust vertical position if submenu would overflow bottom
6. Apply calculated position using CSS transforms or positioning
7. For deeply nested menus (up to 3 levels), ensure proper cascading and z-index management
8. Handle edge cases where multiple levels of submenus might overlap

### Viewport Boundary Detection

```typescript
const calculateSubmenuPosition = (parentElement: HTMLElement) => {
  const rect = parentElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const submenuWidth = 256; // 16rem in pixels

  const spaceRight = viewportWidth - rect.right;
  const spaceLeft = rect.left;

  return {
    position: spaceRight >= submenuWidth ? "right" : "left",
    top: Math.max(0, rect.top),
    left: spaceRight >= submenuWidth ? rect.right : rect.left - submenuWidth,
  };
};
```
