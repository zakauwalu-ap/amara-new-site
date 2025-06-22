```markdown
# BackgroundLines Component Improvement Plan

This document outlines improvements for the `BackgroundLines` React component. The goal is to enhance robustness, maintainability, and prevent potential issues like memory leaks.

## 1. Crucial: Implement Event Listener Cleanup

**Problem:**
The current `useGSAP` cleanup function kills GSAP timelines but does not remove the native `mouseenter` and `mouseleave` event listeners attached directly to the SVG path elements. This can lead to:
*   **Memory Leaks:** If the component unmounts or re-renders frequently, old event listeners can persist, consuming memory.
*   **Unexpected Behavior:** Old listeners might still fire, leading to incorrect animations or errors.

**Solution:**
1.  **Store Handler References:** For each `pathElement`, store the `handleMouseEnter` and `handleMouseLeave` functions (the actual functions passed to `addEventListener`) in a `Map` or similar structure, keyed by the `pathElement`.
2.  **Remove Listeners in Cleanup:** In the `useGSAP` cleanup function (`return () => { ... }`), iterate through the `pathsToAnimate`. For each path:
    *   Retrieve its corresponding event handler functions from the stored map.
    *   Call `pathElement.removeEventListener('mouseenter', storedMouseEnterHandler)`.
    *   Call `pathElement.removeEventListener('mouseleave', storedMouseLeaveHandler)`.
    *   Clear the maps holding the handler references.

**Example Snippet (Conceptual - for the `useGSAP` hook):**

```javascript
// Inside useGSAP
const mouseEnterHandlers = new Map<SVGPathElement, () => void>();
const mouseLeaveHandlers = new Map<SVGPathElement, () => void>();

pathsToAnimate.forEach(pathElement => {
  const handleMouseEnter = () => { /* ... existing logic ... */ };
  const handleMouseLeave = () => { /* ... existing logic ... */ };

  pathElement.addEventListener('mouseenter', handleMouseEnter);
  pathElement.addEventListener('mouseleave', handleMouseLeave);

  mouseEnterHandlers.set(pathElement, handleMouseEnter);
  mouseLeaveHandlers.set(pathElement, handleMouseLeave);
});

// Cleanup function
return () => {
  pathsToAnimate.forEach(pathElement => {
    const enterHandler = mouseEnterHandlers.get(pathElement);
    if (enterHandler) {
      pathElement.removeEventListener('mouseenter', enterHandler);
    }
    const leaveHandler = mouseLeaveHandlers.get(pathElement);
    if (leaveHandler) {
      pathElement.removeEventListener('mouseleave', leaveHandler);
    }
    // ... existing timeline cleanup ...
  });
  mouseEnterHandlers.clear();
  mouseLeaveHandlers.clear();
  pathLeaveTimelines.current.clear();
};
```

## 2. Implement Dynamic Path Selection

**Problem:**
The component currently identifies paths to animate using a hardcoded array of IDs: `strokedPathIds = ["path1", "path2", ..., "path7"]`. This is brittle:
*   If path IDs change in the SVG, the animation will break.
*   If new paths are added to the SVG group, they won't be animated unless this array is manually updated.

**Solution:**
Instead of hardcoding IDs, query the DOM to find the paths dynamically.
1.  Ensure your target SVG paths are consistently grouped, e.g., within `<g id="path-lines">`.
2.  In `useGSAP`, after `svgRef.current` is available:
    *   Get a reference to the group element: `svgRef.current?.querySelector('#path-lines')`.
    *   Query all `path` elements within this group: `groupElement.querySelectorAll('path')`.
    *   Convert the `NodeList` to an array to get `pathsToAnimate`.

**Example Snippet (Conceptual - for `useGSAP` hook):**

```javascript
// Inside useGSAP
if (!svgRef.current) return;

const pathContainer = svgRef.current?.querySelector('#path-lines');
if (!pathContainer) {
  console.warn("Path container '#path-lines' not found.");
  return;
}

const pathsToAnimate: SVGPathElement[] = Array.from(pathContainer.querySelectorAll('path'));

if (pathsToAnimate.length === 0) {
  console.warn("No paths found within '#path-lines' to animate.");
  return;
}

pathsToAnimate.forEach(pathElement => {
  // ... rest of the animation setup for each pathElement ...
});
```

## 3. (Optional but Recommended) Utilize CSS Custom Properties for Colors

**Problem:**
HSL color strings are constructed in JavaScript and applied directly to SVG `stroke` attributes via GSAP. While functional, this can be improved for organization and clarity.

**Benefits of CSS Custom Properties:**
*   **Cleaner SVG Markup:** SVG paths can define their default stroke using `stroke="var(--default-stroke-color)"`.
*   **Centralized Color Definitions:** Colors are defined as CSS variables on a parent element (e.g., the main `div`), making them easier to manage and theme.
*   **GSAP Compatibility:** GSAP can animate CSS custom properties or directly animate attributes to values that reference CSS custom properties.

**Solution:**
1.  **Define CSS Custom Properties:** In the `style` prop of the wrapping `div`, define CSS custom properties using the HSL strings generated from props:
    ```jsx
    <div
      style={{
        // ... existing styles ...
        '--default-stroke-color': defaultHslString,
        '--hover-stroke-color': hoverHslString,
        '--intermediate-stroke-color': intermediateHslString,
        ...style // existing style prop from component props
      }}
    >
    ```
2.  **Update SVG Paths:** Modify the `stroke` attribute of each path in your SVG to use the default CSS variable:
    ```xml
    <path
      id="path7"
      d="..."
      stroke="var(--default-stroke-color)"
      strokeWidth={strokeWidth}
      opacity="0.6"
    />
    ```
3.  **Update GSAP Animations:** In your GSAP `set` and `to` calls, reference the CSS custom property strings:
    ```javascript
    gsap.set(pathElement, { attr: { stroke: 'var(--hover-stroke-color)' } });
    // ...
    leaveTimeline.to(pathElement, {
      attr: { stroke: 'var(--intermediate-stroke-color)' },
      // ...
    });
    // ...
    ```
    The `dependencies` array for `useGSAP` (`[defaultHslString, hoverHslString, intermediateHslString]`) should remain. When these props change, the HSL strings are recalculated, the CSS custom properties on the `div` are updated, and GSAP will use the new values correctly.

By implementing these changes, the `BackgroundLines` component will be more robust, easier to maintain, and less prone to common React/DOM integration issues.
```