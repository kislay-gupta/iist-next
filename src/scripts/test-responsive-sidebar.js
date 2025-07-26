// This script can be used to manually test the responsive behavior of the sidebar
// Run it in the browser console on different screen sizes

function testResponsiveSidebar() {
  console.log("Testing Sidebar Responsive Behavior");

  // Check if desktop sidebar is hidden on small screens
  const desktopSidebar = document.querySelector(".sidebar");
  if (desktopSidebar) {
    const style = window.getComputedStyle(desktopSidebar);
    console.log("Desktop Sidebar Display:", style.display);
    console.log(
      "Is Hidden on Small Screen:",
      window.innerWidth < 640 && style.display === "none"
    );
  } else {
    console.log("Desktop Sidebar not found");
  }

  // Check if mobile button is visible on small screens
  const mobileButton = document.querySelector(
    '[data-testid="mobile-menu-button"]'
  );
  if (mobileButton) {
    const style = window.getComputedStyle(mobileButton);
    console.log("Mobile Button Display:", style.display);
    console.log(
      "Is Visible on Small Screen:",
      window.innerWidth < 640 && style.display !== "none"
    );
    console.log(
      "Is Hidden on Large Screen:",
      window.innerWidth >= 640 && style.display === "none"
    );
  } else {
    console.log("Mobile Button not found");
  }

  // Test submenu positioning
  console.log("Viewport Width:", window.innerWidth);
  console.log("Viewport Height:", window.innerHeight);

  // Find a menu item with children
  const menuItems = document.querySelectorAll('[data-testid^="menu-item-"]');
  console.log("Menu Items Found:", menuItems.length);

  if (menuItems.length > 0) {
    // Simulate hover on the first menu item
    const event = new MouseEvent("mouseenter", {
      bubbles: true,
      cancelable: true,
    });
    menuItems[0].dispatchEvent(event);

    // Wait for submenu to appear
    setTimeout(() => {
      const submenu = document.querySelector(".submenu-enter-active");
      if (submenu) {
        const rect = submenu.getBoundingClientRect();
        console.log("Submenu Position:", {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
        });
        console.log(
          "Is Within Viewport:",
          rect.left >= 0 &&
            rect.right <= window.innerWidth &&
            rect.top >= 0 &&
            rect.bottom <= window.innerHeight
        );
      } else {
        console.log("Submenu not found or not active");
      }
    }, 200);
  }
}

// Run the test
testResponsiveSidebar();
