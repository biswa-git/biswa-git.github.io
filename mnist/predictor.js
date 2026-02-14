// MNIST Digit Predictor
// Uses neural network data from model.js

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const predictBtn = document.getElementById('predictBtn');
const predictionDisplay = document.getElementById('prediction');
const confidenceDisplay = document.getElementById('confidence');
const confidenceFill = document.getElementById('confidenceFill');
const statusDisplay = document.getElementById('status');

let isDrawing = false;
let hasDrawing = false;

// Initialize canvas
function initCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 25;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Draw horizontal dashed line with 10% padding
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height*0.2);
    ctx.lineTo(canvas.width, canvas.height*0.2);
    ctx.stroke();
    ctx.restore();
    
    // Draw another horizontal dashed line at the bottom
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height*0.8);
    ctx.lineTo(canvas.width, canvas.height*0.8);
    ctx.stroke();
    ctx.restore();
    
    // Draw vertical dashed lines
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.2, 0);
    ctx.lineTo(canvas.width*0.2, canvas.height);
    ctx.stroke();
    ctx.restore();
    
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.8, 0);
    ctx.lineTo(canvas.width*0.8, canvas.height);
    ctx.stroke();
    ctx.restore();
}

initCanvas();

// Drawing event listeners
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch support for mobile
canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    hasDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

clearBtn.addEventListener('click', () => {
    initCanvas();
    hasDrawing = false;
    predictionDisplay.textContent = '?';
    confidenceDisplay.textContent = 'Confidence: --';
    confidenceFill.style.width = '0%';
    statusDisplay.textContent = '';
});

predictBtn.addEventListener('click', async () => {
    if (!hasDrawing) {
        statusDisplay.textContent = 'Please draw a digit first!';
        statusDisplay.className = 'error';
        return;
    }

    // Check if model is loaded
    if (!NETWORK_DATA || NETWORK_DATA.length === 0) {
        statusDisplay.textContent = 'Error: Model not loaded. Did you run build_model.py?';
        statusDisplay.className = 'error';
        console.error('Model not loaded');
        return;
    }

    predictBtn.disabled = true;
    statusDisplay.textContent = 'Predicting...';
    statusDisplay.className = '';

    try {
        // Convert canvas to 28x28 grayscale image
        const imageData = preprocessImage();
        console.log('Image preprocessed:', imageData.length, 'pixels');

        // Make prediction
        const result = predict(imageData);
        console.log('Prediction result:', result);

        // Display results
        predictionDisplay.textContent = result.digit;
        const confidence = Math.round(result.confidence * 100);
        confidenceDisplay.textContent = `Confidence: ${confidence}%`;
        confidenceFill.style.width = confidence + '%';

        statusDisplay.textContent = 'Prediction successful!';
        statusDisplay.className = 'success';
    } catch (error) {
        console.error('Error:', error);
        statusDisplay.textContent = `Error: ${error.message}`;
        statusDisplay.className = 'error';
    } finally {
        predictBtn.disabled = false;
    }
});

function preprocessImage() {
    // Create a 28x28 canvas
    const smallCanvas = document.createElement('canvas');
    smallCanvas.width = 28;
    smallCanvas.height = 28;
    const smallCtx = smallCanvas.getContext('2d');

    // Fill with white
    smallCtx.fillStyle = 'white';
    smallCtx.fillRect(0, 0, 28, 28);

    // Draw the canvas image scaled down
    smallCtx.drawImage(canvas, 0, 0, 28, 28);

    // Get image data and convert to grayscale normalized to 0-1
    const imgData = smallCtx.getImageData(0, 0, 28, 28);
    const data = imgData.data;
    const normalizedData = [];

    for (let i = 0; i < data.length; i += 4) {
        // Convert RGBA to grayscale (inverted because MNIST uses white on black)
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = (r + g + b) / 3;
        // Invert: if pixel is white (255), it becomes 0; if black (0), it becomes 1
        normalizedData.push(1 - (gray / 255));
    }

    return normalizedData;
}

function relu(x) {
    return x > 0 ? x : 0;
}

function softmax(arr) {
    // Find maximum for numerical stability
    const maxVal = Math.max(...arr);

    // Calculate exponents with max subtraction for stability
    const expArr = arr.map(x => Math.exp(x - maxVal));

    // Sum of exponentials
    const sumExp = expArr.reduce((a, b) => a + b, 0);

    // Normalize: divide each by sum
    return expArr.map(x => x / sumExp);
}

function predict(imageData) {
    // Check if model is loaded
    if (!NETWORK_DATA || NETWORK_DATA.length === 0) {
        throw new Error('Model not loaded');
    }

    if (imageData.length !== 784) {
        throw new Error(`Invalid image size. Expected 784 pixels, got ${imageData.length}`);
    }

    // Start with input
    let x = imageData;

    // Forward pass through network
    // Weights are stored as: NETWORK_DATA[layer][from_node].w[to_node]
    // So to compute layer L, we use the front_weights of layer L-1
    for (let layerIdx = 1; layerIdx < NETWORK_DATA.length; layerIdx++) {
        const currentLayer = NETWORK_DATA[layerIdx];
        const previousLayer = NETWORK_DATA[layerIdx - 1];
        const output = [];

        // Calculate output for each node in current layer
        for (let toNodeIdx = 0; toNodeIdx < currentLayer.length; toNodeIdx++) {
            const node = currentLayer[toNodeIdx];
            let z = node.b;  // Start with bias

            // Sum: weight[i][toNodeIdx] * x[i] for all i in previous layer
            for (let fromNodeIdx = 0; fromNodeIdx < previousLayer.length; fromNodeIdx++) {
                const weight = previousLayer[fromNodeIdx].w[toNodeIdx];
                z += weight * x[fromNodeIdx];
            }

            // Apply activation function
            if (layerIdx < NETWORK_DATA.length - 1) {
                // ReLU for hidden layers
                output.push(relu(z));
            } else {
                // No activation yet, will apply softmax to all outputs together
                output.push(z);
            }
        }

        // For last layer, apply softmax to all outputs
        if (layerIdx === NETWORK_DATA.length - 1) {
            x = softmax(output);
        } else {
            x = output;
        }
    }

    // Get prediction
    let predictedDigit = 0;
    let maxConfidence = x[0];

    for (let i = 1; i < x.length; i++) {
        if (x[i] > maxConfidence) {
            maxConfidence = x[i];
            predictedDigit = i;
        }
    }

    return {
        digit: predictedDigit,
        confidence: maxConfidence,
        probabilities: x
    };
}
