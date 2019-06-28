import { useEffect, useRef } from 'react';

export default(eventName, handler, element = global) => {

    function throttled(delay, fn) {
        let lastCall = 0;
        return function (...args) {
          const now = (new Date).getTime();
          if (now - lastCall < delay) {
            return;
          }
          lastCall = now;
          return fn(...args);
        }
    }

    function debounced(delay, fn) {
        let timerId;
        return function (...args) {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
          }, delay);
        }
      }

    // Create a ref that stores handler
    const savedHandler = useRef()

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = debounced(300, handler)
    }, [handler])

    useEffect(
        () => {
        // Make sure element supports addEventListener
        const isSupported = element && element.addEventListener
        if (!isSupported) return

        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event)

        // Add event listener
        element.addEventListener(eventName, eventListener)

        // Remove event listener on cleanup
        return () => { element.removeEventListener(eventName, eventListener) }},
            [eventName, element] // Re-run if eventName or element changes
    )
}
