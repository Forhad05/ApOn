
if(!customElements.get('custom-canvas')) {
  customElements.define(
    'custom-canvas',
    class CustomCanvas extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.setUpCanvas(document.getElementById('canvas'));
      }

      setUpCanvas(canvasEl, width = 512, height = 512) {
        const CANVAS_WIDTH = width;
        const CANVAS_HEIGHT = height;

        this.canvas = canvasEl ? canvasEl : this.querySelector('canvas');

        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.canvasCtx = {
          canvas2d: this.canvas.getContext('2d'),
          canvasWebgl: this.canvas.getContext('webgl'),
          canvasWegl2: this.canvas.getContext('wegl2'),
          canvasGpu: this.canvas.getContext('gpu')
        }

        this.canvasCtx.canvas2d.moveTo(100, 100);
        this.canvasCtx.canvas2d.lineTo(200, 200);
        this.canvasCtx.canvas2d.stroke();
      }

      disconnectedCallback() {
        console.log("Custom element removed from page.");
      }

      adoptedCallback() {
        console.log("Custom element moved to new page.");
      }

      attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
      }
    }
  )
}