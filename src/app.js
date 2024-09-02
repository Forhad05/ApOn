
if(!customElements.get('custom-canvas')) {
  customElements.define(
    'custom-canvas',
    class CustomCanvas extends HTMLElement {
      constructor() {
        super();

        const CANVAS_WIDTH = 512;
        const CANVAS_HEIGHT = 512;

        const canvas = this.querySelector('canvas');
        console.log(canvas);

        canvas.width = CANVAS_WIDTH * devicePixelRatio;
        canvas.height = CANVAS_HEIGHT * devicePixelRatio;

        canvas.style.setProperty('width', `${CANVAS_WIDTH}px`);
        canvas.style.setProperty('height', `${CANVAS_HEIGHT}px`);

        var canvasCtx = {
          canvas2d: canvas.getContext('2d'),
          canvasWebgl: canvas.getContext('webgl'),
          canvasWegl2: canvas.getContext('wegl2'),
          canvasGpu: canvas.getContext('gpu')
        };

        requestAnimationFrame(drawFrame);

        function drawFrame(ts) {
          ts /= 1000
          console.log(ts);
          
          canvasCtx.canvas2d.moveTo(100, 100);
          canvasCtx.canvas2d.lineTo(200, 200);
          canvasCtx.canvas2d.stroke();
          requestAnimationFrame(drawFrame);
        }
      }

      connectedCallback() {
        console.log("Custom element added to page.");
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