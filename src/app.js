
if(!customElements.get('custom-canvas')) {
  customElements.define(
    'custom-canvas',
    class CustomCanvas extends HTMLElement {
      constructor() {
        super();

        const CANVAS_WIDTH = 512;
        const CANVAS_HEIGHT = 512;

        this.canvas = this.canvas ? this.canvas : this.querySelector('canvas');

        this.canvas.width = CANVAS_WIDTH * devicePixelRatio;
        this.canvas.height = CANVAS_HEIGHT * devicePixelRatio;

        this.canvas.style.setProperty('width', `${CANVAS_WIDTH}px`);
        this.canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`);

        this.canvasCtx = {
          canvas2d: this.canvas.getContext('2d'),
          canvasWebgl: this.canvas.getContext('webgl'),
          canvasWegl2: this.canvas.getContext('wegl2'),
          canvasGpu: this.canvas.getContext('gpu')
        };
      }

      connectedCallback() {
        requestAnimationFrame(drawFrame);

        function drawFrame(timestampSinceFirstSchedule) {
          console.log(timestampSinceFirstSchedule);
          this.canvasCtx.canvas2d.moveTo(100, 100);
          this.canvasCtx.canvas2d.lineTo(200, 200);
          this.canvasCtx.canvas2d.stroke();
  
          requestAnimationFrame(drawFrame);
        }
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