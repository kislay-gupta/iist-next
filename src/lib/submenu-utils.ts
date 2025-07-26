/**
 * Utility functions for submenu positioning and boundary detection
 */

/**
 * Checks if an element would overflow the viewport boundaries
 * @param element - The element to check
 * @param direction - The direction to check for overflow ('right', 'left', 'top', 'bottom')
 * @param offset - Additional offset to consider (e.g., for submenu width)
 * @returns boolean indicating if the element would overflow
 */
export const wouldOverflow = (
  element: HTMLElement,
  direction: "right" | "left" | "top" | "bottom",
  offset: number = 0
): boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  switch (direction) {
    case "right":
      return rect.right + offset > viewportWidth;
    case "left":
      return rect.left - offset < 0;
    case "top":
      return rect.top - offset < 0;
    case "bottom":
      return rect.bottom + offset > viewportHeight;
    default:
      return false;
  }
};

/**
 * Calculates the optimal position for a submenu based on parent position and viewport boundaries
 * @param parentElement - The parent menu item element
 * @param submenuWidth - Width of the submenu
 * @param submenuHeight - Height of the submenu (or estimated height)
 * @param depth - Nesting depth of the menu item
 * @returns Position object with direction and coordinates
 */
export const calculateOptimalPosition = (
  parentElement: HTMLElement,
  submenuWidth: number = 256,
  submenuHeight: number = 400,
  depth: number = 0
) => {
  if (!parentElement) {
    return {
      position: "right" as const,
      top: 0,
      left: 0,
    };
  }

  const rect = parentElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Check available space in different directions
  const spaceRight = viewportWidth - rect.right;
  const spaceLeft = rect.left;
  const spaceBottom = viewportHeight - rect.top;

  // For small screens, adjust submenu width to fit better
  const adjustedSubmenuWidth =
    viewportWidth < 768
      ? Math.min(submenuWidth, viewportWidth * 0.8)
      : submenuWidth;

  // Determine horizontal position
  let position: "right" | "left" = "right";

  // For deeply nested menus (level 2+), we need to be more careful about positioning
  if (depth >= 2) {
    // For third level or deeper, check if we have enough space on either side
    // and choose the side with more space
    position = spaceRight >= spaceLeft ? "right" : "left";

    // For level 3+, we need special handling to prevent menus from going off-screen
    if (depth >= 3) {
      // For very deep nesting, we might need to alternate sides to prevent cascading off-screen
      // If parent menus are already using most of the space on one side, try the other side
      const isAtRightEdge = spaceRight < adjustedSubmenuWidth * 0.5;
      const isAtLeftEdge = spaceLeft < adjustedSubmenuWidth * 0.5;

      if (isAtRightEdge && !isAtLeftEdge) {
        position = "left";
      } else if (isAtLeftEdge && !isAtRightEdge) {
        position = "right";
      } else if (isAtRightEdge && isAtLeftEdge) {
        // If we're tight on both sides, use the side with slightly more space
        // and the component will need to adjust width
        position = spaceRight >= spaceLeft ? "right" : "left";
      }
    } else {
      // For level 2, use standard deep nesting logic
      // If we're already at the edge of the screen, we might need to adjust the width
      if (
        spaceRight < adjustedSubmenuWidth &&
        spaceLeft < adjustedSubmenuWidth
      ) {
        // We're in a tight spot, so use the side with more space and adjust width if needed
        if (spaceRight >= spaceLeft) {
          position = "right";
          // We might need to adjust the width in the component that uses this function
        } else {
          position = "left";
          // We might need to adjust the width in the component that uses this function
        }
      }
    }
  } else {
    // For first and second level menus, use the standard logic
    if (viewportWidth < 768) {
      position = spaceRight >= spaceLeft ? "right" : "left";
    } else {
      position = spaceRight >= adjustedSubmenuWidth ? "right" : "left";
    }
  }

  // Calculate top position
  let top = 0;

  if (depth === 0) {
    // For top-level items
    top = 0;
  } else {
    // For nested items
    if (submenuHeight > spaceBottom) {
      // If submenu is taller than available space below
      // Align to bottom of viewport with padding
      top = Math.max(0, viewportHeight - submenuHeight - 10);

      // But don't go higher than parent top if possible
      if (top > rect.top) {
        top = Math.max(0, rect.top);
      }
    } else {
      // Enough space below, align with parent
      top = rect.top;
    }

    // For deeply nested menus, add a small vertical offset to prevent direct overlap
    if (depth >= 2) {
      // Add a small offset for each level beyond the second
      // For level 3+, use a larger offset to prevent stacking issues
      const verticalOffset = depth >= 3 ? (depth - 1) * 8 : (depth - 1) * 5;
      top = Math.max(0, top + verticalOffset);

      // For very deep nesting (level 3+), ensure we don't go too far down
      if (depth >= 3 && top + submenuHeight > viewportHeight) {
        // If we would go off the bottom, adjust upward
        top = Math.max(0, viewportHeight - submenuHeight - 10);
      }
    }

    // For small screens, ensure the submenu doesn't go off-screen at the bottom
    if (viewportWidth < 768) {
      const bottomOverflow = top + submenuHeight - viewportHeight;
      if (bottomOverflow > 0) {
        top = Math.max(0, top - bottomOverflow);
      }
    }
  }

  return {
    position,
    top,
    // Calculate left/right position based on direction
    left: position === "right" ? rect.right : rect.left - adjustedSubmenuWidth,
  };
};

/**
 * Calculates z-index for nested submenus
 * @param baseZIndex - Base z-index for the menu system
 * @param depth - Nesting depth of the menu item
 * @returns Calculated z-index value
 */
export const calculateZIndex = (
  baseZIndex: number = 50,
  depth: number = 0
): number => {
  // Increase z-index by 10 for each level of nesting
  // For deeply nested menus (3+ levels), use exponential scaling to ensure proper stacking
  if (depth >= 3) {
    // For level 3+, use exponential scaling to ensure proper stacking
    return baseZIndex + Math.pow(2, depth + 1) * 10;
  } else {
    // For levels 0-2, use linear scaling
    const depthFactor = depth > 1 ? 20 : 10;
    return baseZIndex + depth * depthFactor;
  }
};
