
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
        console.log("Custom element is added to page.");
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

// canvas-rendering-fundamentals
if(!customElements.get('canvas-rendering-fundamentals')) {
  customElements.define(
    'canvas-rendering-fundamentals',
    class canvasRenderingFundamentals extends HTMLElement {
      constructor() {
        super();

        const CANVAS_WIDTH = 512;
        const CANVAS_HEIGHT = 512;

        const canvas = this.querySelector('canvas');

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

        const image = new Image();
        const video = document.createElement('video');
        image.onload = function () {
          video.onloadeddata = function() {
            video.muted = true;
            video.play();
            requestAnimationFrame(drawFrame);
          }
          video.src = '../src/assets/sample-video.mp4'
        }
        image.src = '../src/assets/sample-image.jpeg';

        function drawFrame(ts) {
          ts /= 1000;

          // canvasCtx.canvas2d.clearRect(0, 0, 200, canvas.height);
          canvasCtx.canvas2d.clearRect(0, 0, canvas.width, canvas.height);

          // Rectangle
          const gradient = canvasCtx.canvas2d.createLinearGradient(100, 100, 125, 100);
          gradient.addColorStop(0, 'red');
          gradient.addColorStop(1, 'black');

          // canvasCtx.canvas2d.fillStyle = 'red';
          canvasCtx.canvas2d.fillStyle = gradient;
          canvasCtx.canvas2d.strokeStyle = 'green';
          canvasCtx.canvas2d.lineWidth = 5;
          // canvasCtx.canvas2d.lineCap = 'round'; // gives rounded joint radius to the rect fill
          // canvasCtx.canvas2d.lineJoin = 'round'; // gives rounded joint radius to the rect stroke
          
          canvasCtx.canvas2d.rect(100, 100, 50, 50);
          canvasCtx.canvas2d.fill();
          canvasCtx.canvas2d.stroke();
          
          // placing fill last will cut the stroke inside the rect
          // canvasCtx.canvas2d.rect(100, 200, 50, 50);
          // canvasCtx.canvas2d.stroke();
          // canvasCtx.canvas2d.fill();

          // rectangle fill & stroke shorts
          // canvasCtx.canvas2d.fillRect(100, 200, 50, 50);
          // canvasCtx.canvas2d.strokeRect(100, 200, 50, 50);

          // Circle
          const circle = {
            circleX: 125,
            circleY: 250,
            circleRadius: 50,
            startAngle: 0,
            endAngle: Math.PI * 2
          };

          const endAngle = ts;
          // const endAngle = Math.PI;

          canvasCtx.canvas2d.fillStyle = 'yellow';
          canvasCtx.canvas2d.beginPath();
          // canvasCtx.canvas2d.arc(circle.circleX, circle.circleY, circle.circleRadius, circle.startAngle, circle.endAngle);
          canvasCtx.canvas2d.arc(circle.circleX, circle.circleY, circle.circleRadius, circle.startAngle, endAngle);
          // canvasCtx.canvas2d.arc(circle.circleX, circle.circleY, circle.circleRadius, circle.startAngle, endAngle, true);
          canvasCtx.canvas2d.closePath();
          canvasCtx.canvas2d.fill();

          // Lines
          canvasCtx.canvas2d.lineWidth = 1;
          canvasCtx.canvas2d.strokeStyle = 'black';

          canvasCtx.canvas2d.beginPath();
          canvasCtx.canvas2d.moveTo(100, 400);
          canvasCtx.canvas2d.lineTo(150, 400);
          canvasCtx.canvas2d.lineTo(150, 350);
          canvasCtx.canvas2d.closePath();
          canvasCtx.canvas2d.stroke();
          canvasCtx.canvas2d.fill();

          // Paths - Quadratic Curve
          canvasCtx.canvas2d.lineWidth = 2;
          canvasCtx.canvas2d.strokeStyle = 'orange';
          canvasCtx.canvas2d.beginPath();
          canvasCtx.canvas2d.moveTo(100, 450);
          canvasCtx.canvas2d.quadraticCurveTo(125, 400, 150, 450);
          canvasCtx.canvas2d.stroke();

          // Paths - Bezier Cubic Curve
          canvasCtx.canvas2d.lineWidth = 3;
          canvasCtx.canvas2d.strokeStyle = 'green';
          canvasCtx.canvas2d.beginPath();

          const startX = 250;
          const startY = 450;

          const cp1x = startX + 50;
          // const cp1y = startY - 50;
          const cp1y = startY - 50 + ts * 20;
          const cp2x = startX + 100;
          const cp2y = startY - 50;
          const endX = startX + 150;
          const endY = startY;

          canvasCtx.canvas2d.moveTo(startX, startY);
          canvasCtx.canvas2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
          canvasCtx.canvas2d.stroke();

          // Texts
          canvasCtx.canvas2d.fillStyle = 'red';
          canvasCtx.canvas2d.font = '2rem monospace';
          canvasCtx.canvas2d.fillText('Hello World', 250, 100);
          
          canvasCtx.canvas2d.fillStyle = 'red';
          canvasCtx.canvas2d.font = '2rem sans-serif';
          canvasCtx.canvas2d.strokeText('Hello World', 250, 150);

          // Image
          // canvasCtx.canvas2d.drawImage(image, 250, 200);
          canvasCtx.canvas2d.drawImage(image, 250, 170, image.naturalWidth * 0.25, image.naturalHeight * 0.25);

          // Video
          // canvasCtx.canvas2d.drawImage(video, 250, 250);
          canvasCtx.canvas2d.drawImage(video, 250, 270, video.videoWidth * 0.5, video.videoHeight * 0.5);

          requestAnimationFrame(drawFrame);
        }
      }

      connectedCallback() {
        console.log("Custom element is added to page.");
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
  );
}