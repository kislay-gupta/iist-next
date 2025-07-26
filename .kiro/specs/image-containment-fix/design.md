# Design Document: Image Containment Fix

## Overview

This design document outlines the approach for fixing image containment issues in the ChildScientistCard component. The goal is to ensure that all images are properly displayed with consistent dimensions and aspect ratios, regardless of the original image size or aspect ratio.

## Architecture

The fix will be implemented directly in the ChildScientistCard component, which is a React functional component used in the ChildScientistCarousel. The component uses Next.js Image component for optimized image loading and Tailwind CSS for styling.

## Components and Interfaces

### ChildScientistCard Component

The ChildScientistCard component will be modified to ensure proper image containment. The component interface will remain unchanged:

```typescript
interface ChildScientistCardProps {
  imageSrc: string | StaticImageData;
  name: string;
}
```

## Design Changes

### Current Implementation Issues

The current implementation uses:

```jsx
<Image
  src={imageSrc}
  alt={`${name} - Child Scientist`}
  className="w-full h-full object-cover rounded-xl p-1"
/>
```

While `object-cover` is used, there are several issues:

1. The padding (p-1) inside the image container reduces the effective area for the image
2. The parent container has fixed dimensions but may not be properly constraining the image
3. The aspect ratio of the image is not explicitly controlled

### Proposed Solution

1. **Image Container Styling**:

   - Use a fixed aspect ratio container for the image
   - Apply proper object-fit and object-position properties
   - Ensure the image container has overflow hidden

2. **Image Component Configuration**:

   - Configure the Next.js Image component with proper fill or size properties
   - Ensure the alt text is properly set for accessibility
   - Apply appropriate quality settings for the images

3. **Card Layout Adjustments**:
   - Ensure the card has a consistent size regardless of content
   - Apply proper padding and margin to maintain visual consistency
   - Ensure the name label has sufficient space below the image

## Implementation Details

The implementation will focus on modifying the CSS classes applied to the Image component and its container. The key changes will be:

1. Apply `relative` positioning to the image container
2. Use `aspect-ratio` or explicit height/width to maintain consistent dimensions
3. Configure the Next.js Image component with `fill` property and appropriate `sizes` attribute
4. Ensure `overflow-hidden` is applied to prevent any image overflow
5. Apply proper `object-fit` and `object-position` properties to control how the image fills its container

## Error Handling

- If an image fails to load, an appropriate fallback or placeholder should be displayed
- The component should gracefully handle different image formats and sizes

## Testing Strategy

1. **Visual Testing**:

   - Test with images of different aspect ratios (portrait, landscape, square)
   - Test with images of different resolutions
   - Test with very large and very small images

2. **Responsive Testing**:

   - Test on different screen sizes
   - Test with different viewport widths
   - Ensure the component behaves correctly in the carousel at all breakpoints

3. **Edge Cases**:
   - Test with missing images
   - Test with very long names that might wrap
   - Test with different image formats (JPG, PNG, WebP)
