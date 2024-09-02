
if(!customElements.get('custom-canvas')) {
  customElements.define(
    'custom-canvas',
    class CustomCanvas extends HTMLElement {
      constructor() {
        super();
      }
    }
  )
}