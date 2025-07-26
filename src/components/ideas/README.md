# Ideas Gallery Components

This directory contains the core components for the Ideas Gallery feature, including individual idea cards and the grid layout system.

## Components

- [IdeaCard](#ideacard-component) - Individual idea display card
- [IdeasGrid](#ideasgrid-component) - Responsive grid layout for multiple ideas

---

# IdeaCard Component

A responsive, interactive card component for displaying idea information in the Ideas Gallery. The component features hover effects, engagement metrics, category badges, and optimized image loading.

## Features

- **Responsive Design**: Adapts to different screen sizes with proper spacing and layout
- **Image Optimization**: Uses Next.js Image component with loading states and error handling
- **Interactive Elements**: Like and bookmark buttons with visual feedback
- **Engagement Metrics**: Displays views, likes, and comments with smart number formatting
- **Category System**: Color-coded category badges with proper formatting
- **Author Information**: Author avatar with fallback initials
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Performance**: Lazy loading, hover effects, and smooth transitions

## Usage

```tsx
import IdeaCard from "@/components/ideas/IdeaCard";
import { Idea } from "@/types/ideas";

const idea: Idea = {
  _id: "idea-1",
  title: "DIY Volcano Eruption Experiment",
  description:
    "Learn about chemical reactions with this exciting volcano experiment.",
  image: "/images/volcano-experiment.jpg",
  author: {
    _id: "author-1",
    name: "Dr. Sarah Johnson",
    avatar: "/images/authors/sarah-johnson.jpg",
  },
  category: "science-experiments",
  slug: "diy-volcano-eruption-experiment",
  publishedAt: "2024-01-15T10:30:00Z",
  engagement: {
    views: 1250,
    likes: 89,
    comments: 23,
  },
  featured: true,
  status: "published",
};

function MyComponent() {
  const handleLike = (ideaId: string) => {
    console.log(`Liked idea: ${ideaId}`);
    // Implement like functionality
  };

  const handleBookmark = (ideaId: string) => {
    console.log(`Bookmarked idea: ${ideaId}`);
    // Implement bookmark functionality
  };

  return (
    <IdeaCard idea={idea} onLike={handleLike} onBookmark={handleBookmark} />
  );
}
```

## Props

| Prop         | Type                       | Required | Description                                           |
| ------------ | -------------------------- | -------- | ----------------------------------------------------- |
| `idea`       | `Idea`                     | Yes      | The idea object containing all information to display |
| `onLike`     | `(ideaId: string) => void` | No       | Callback function when like button is clicked         |
| `onBookmark` | `(ideaId: string) => void` | No       | Callback function when bookmark button is clicked     |

## Idea Object Structure

```typescript
interface Idea {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  slug: string;
  publishedAt: string;
  engagement: {
    views: number;
    likes: number;
    comments: number;
  };
  featured?: boolean;
  status?: "draft" | "published" | "archived";
}
```

## Styling

The component uses Tailwind CSS classes and follows the existing design system:

- **Card Container**: Rounded corners, shadow, hover effects
- **Image**: Aspect ratio 16:10, object-cover, hover scale effect
- **Typography**: Responsive font sizes, proper line heights
- **Colors**: Category-specific colors, consistent with design system
- **Spacing**: Consistent padding and margins throughout

### Category Colors

- `science-experiments`: Green theme
- `art-crafts`: Amber theme
- `technology`: Purple theme
- `environmental`: Emerald theme
- `all`: Blue theme
- Default: Gray theme

## Features in Detail

### Image Handling

- **Loading States**: Shows blur effect while loading
- **Error Handling**: Displays fallback content for broken images
- **Optimization**: Uses Next.js Image with proper sizing and lazy loading
- **Priority Loading**: Featured ideas load images with priority

### Engagement Metrics

- **Smart Formatting**: Numbers are formatted (1.5K, 2.3M) for better readability
- **Icons**: Uses Lucide React icons for consistency
- **Layout**: Horizontal layout with proper spacing

### Interactive Elements

- **Like Button**: Toggle state with heart icon, prevents event propagation
- **Bookmark Button**: Toggle state with bookmark icon, prevents event propagation
- **Hover Effects**: Buttons appear on card hover with smooth transitions

### Accessibility

- **ARIA Labels**: Proper labels for interactive elements
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Semantic HTML structure for screen reader compatibility
- **Focus Management**: Proper focus indicators and management

## Testing

The component includes comprehensive tests:

### Unit Tests

- Component rendering with different props
- Image loading and error states
- User interactions (like, bookmark)
- Engagement number formatting
- Category color mapping
- Date formatting

### Integration Tests

- Component import and instantiation
- Type compatibility
- Mock data compatibility

### Demo Component

- Visual testing with various scenarios
- Interactive testing of all features
- Error state demonstrations

### Running Tests

```bash
# Run utility tests (no framework required)
node src/components/ideas/__tests__/test-runner.js

# Run integration tests (when testing framework is available)
npm test IdeaCard

# View demo component
# Import IdeaCardDemo in your page or storybook
```

## Performance Considerations

- **Image Optimization**: Next.js Image component with proper sizing
- **Lazy Loading**: Images load only when needed
- **Hover Effects**: CSS-based transitions for smooth performance
- **Bundle Size**: Minimal dependencies, tree-shakeable imports

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Next.js Image component requirements
- ES6+ JavaScript features

## Dependencies

- `next/image`: Image optimization
- `next/link`: Client-side navigation
- `date-fns`: Date formatting
- `lucide-react`: Icons
- `@radix-ui/react-avatar`: Avatar component
- Tailwind CSS: Styling

## Customization

The component can be customized by:

1. **Styling**: Override Tailwind classes or add custom CSS
2. **Icons**: Replace Lucide icons with custom icons
3. **Layout**: Modify the card structure in the component
4. **Colors**: Update category color mapping
5. **Interactions**: Add custom event handlers

## Related Components

- `CategoryTabs`: For filtering ideas by category
- `IdeasGrid`: For displaying multiple IdeaCards
- `IdeasGalleryPage`: Main page component using IdeaCard

## Requirements Satisfied

This component satisfies the following requirements from the specification:

- **3.1**: Displays featured image
- **3.2**: Shows idea title
- **3.3**: Shows author name
- **3.4**: Shows publication date
- **3.5**: Shows engagement metrics
- **3.6**: Shows category tag
- **4.1**: Hover effects and visual feedback
- **4.2**: Navigation to detailed idea page
- **4.3**: Accessibility standards compliance
- **4.4**: Like and bookmark functionality
- **4.5**: Image loading states and optimization

---

# IdeasGrid Component

A responsive grid layout component for displaying multiple IdeaCard components. Features loading states, empty state handling, and infinite scroll functionality.

## Features

- **Responsive Grid Layout**: Adapts from 1-5 columns based on screen size
- **Loading Skeleton States**: Smooth loading experience with animated placeholders
- **Empty State Handling**: User-friendly message when no ideas are available
- **Load More Functionality**: Optional infinite scroll or pagination support
- **Proper Spacing**: Consistent gaps and alignment across all screen sizes
- **Performance Optimized**: Efficient rendering and smooth scrolling

## Usage

```tsx
import IdeasGrid from "@/components/ideas/IdeasGrid";
import { Idea } from "@/types/ideas";

const ideas: Idea[] = [
  // Array of idea objects
];

function MyComponent() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    // Fetch more ideas
    fetchMoreIdeas().then((newIdeas) => {
      setIdeas((prev) => [...prev, ...newIdeas]);
      setLoading(false);
    });
  };

  return (
    <IdeasGrid ideas={ideas} loading={loading} onLoadMore={handleLoadMore} />
  );
}
```

## Props

| Prop         | Type         | Required | Description                                                         |
| ------------ | ------------ | -------- | ------------------------------------------------------------------- |
| `ideas`      | `Idea[]`     | Yes      | Array of idea objects to display                                    |
| `loading`    | `boolean`    | Yes      | Whether the component is currently loading data                     |
| `onLoadMore` | `() => void` | No       | Callback function for loading more ideas (enables load more button) |

## Responsive Breakpoints

The grid automatically adjusts the number of columns based on screen size:

| Screen Size   | Breakpoint | Columns | Description          |
| ------------- | ---------- | ------- | -------------------- |
| Mobile        | < 640px    | 1-2     | Single/double column |
| Small Tablet  | 640px+     | 2       | Double column        |
| Tablet        | 768px+     | 2       | Double column        |
| Large Tablet  | 1024px+    | 3       | Triple column        |
| Desktop       | 1280px+    | 4       | Quad column          |
| Large Desktop | 1536px+    | 5       | Five columns         |

## States

### Loading State (Initial)

When `loading={true}` and `ideas.length === 0`:

- Displays 8 skeleton cards
- Animated pulse effect
- Maintains grid layout structure

### Loading More State

When `loading={true}` and `ideas.length > 0`:

- Shows existing ideas
- Adds 4 additional skeleton cards at the end
- Maintains smooth user experience

### Empty State

When `loading={false}` and `ideas.length === 0`:

- Displays friendly empty state message
- Includes helpful suggestions
- Spans full grid width

### Loaded State

When `loading={false}` and `ideas.length > 0`:

- Displays all idea cards in responsive grid
- Shows load more button if `onLoadMore` is provided
- Optimal spacing and alignment

## Styling

The component uses Tailwind CSS with the following key classes:

```css
/* Main container */
.space-y-6 /* Vertical spacing between sections */

/* Grid layout */
.grid .gap-6 /* Grid with 6-unit gaps */
.grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5

/* Loading skeletons */
.animate-pulse .bg-gray-200 /* Animated loading placeholders */

/* Empty state */
.col-span-full /* Full width spanning */
```

## Loading Skeleton Structure

Each skeleton card includes:

- Image placeholder (16:10 aspect ratio)
- Title placeholder (2 lines)
- Description placeholder (2 lines)
- Author avatar and info placeholders
- Engagement metrics placeholders

## Empty State Customization

The empty state can be customized by modifying the `EmptyState` component:

```tsx
const EmptyState: React.FC<{ message?: string }> = ({
  message = "Custom empty message"
}) => (
  // Custom empty state JSX
);
```

## Performance Considerations

- **Efficient Rendering**: Only renders visible content
- **Skeleton Loading**: Prevents layout shift during loading
- **Optimized Images**: Leverages IdeaCard's image optimization
- **Smooth Animations**: CSS-based transitions for better performance

## Accessibility

- **Semantic HTML**: Proper grid structure
- **Loading States**: Screen reader friendly loading indicators
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper labels for load more button

## Testing

### Unit Tests

- Grid layout rendering
- Loading state handling
- Empty state display
- Load more functionality
- Responsive breakpoint classes

### Integration Tests

- IdeaCard integration
- Props interface compatibility
- State management

### Demo Component

```tsx
import IdeasGridDemo from "@/components/ideas/__tests__/IdeasGrid.demo";
// Comprehensive demo with all states and interactions
```

## Browser Support

- CSS Grid support required
- Modern browsers (Chrome 57+, Firefox 52+, Safari 10.1+)
- Next.js compatibility

## Dependencies

- `react`: Core React functionality
- `@/components/ideas/IdeaCard`: Individual card component
- `@/components/ui/card`: Base card components
- `@/lib/utils`: Utility functions (cn)
- `@/types/ideas`: TypeScript interfaces

## Related Components

- `IdeaCard`: Individual idea display component
- `CategoryTabs`: Category filtering component
- `IdeasGalleryPage`: Main page component

## Requirements Satisfied

This component satisfies the following requirements from the specification:

- **2.1**: Responsive grid layout for ideas display
- **2.2**: Desktop display (3-4 cards per row)
- **2.3**: Tablet display (2-3 cards per row)
- **2.4**: Mobile display (1-2 cards per row)
- **2.5**: Consistent spacing and alignment
- **5.4**: Smooth performance during scrolling and interactions

## Examples

### Basic Usage

```tsx
<IdeasGrid ideas={ideas} loading={false} />
```

### With Load More

```tsx
<IdeasGrid ideas={ideas} loading={loading} onLoadMore={handleLoadMore} />
```

### Loading State

```tsx
<IdeasGrid ideas={[]} loading={true} />
```

### Empty State

```tsx
<IdeasGrid ideas={[]} loading={false} />
```
