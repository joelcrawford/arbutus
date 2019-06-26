export default (history, timeout = 1000) => {
    let observer;
    let timeoutId;
  
    if (!window.MutationObserver) {
      return;
    }
  
    const reset = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
  
        timeoutId = null;
      }
  
      if (observer) {
        observer.disconnect();
      }
    };
  
    const createScrollToElement = (id) => {
      return () => {
        const element = document.getElementById(id);
  
        if (element) {
          element.scrollIntoView();
  
          reset();
  
          return true;
        }
  
        return false;
      };
    };
  
    history.listen((location, action) => {
      if (timeoutId) {
        reset();
      }
  
      if (location.action !== 'PUSH') {
        return;
      }
  
      if (typeof location.hash !== 'string') {
        return;
      }
  
      const elementId = location.hash.slice(1);
  
      if (!elementId) {
        return;
      }
  
      const scrollToElement = createScrollToElement(elementId);
  
      setTimeout(() => {
        if (scrollToElement()) {
          return;
        }
  
        observer = new MutationObserver(scrollToElement);
  
        observer.observe(document, {
          attributes: true,
          childList: true,
          subtree: true
        });
  
        timeoutId = setTimeout(reset, timeout);
      });
    });
  };