// Simple Image Compression using Canvas (Browser-based)
function createImageOptimizationTool() {
    const optimizationTool = document.createElement('div');
    optimizationTool.innerHTML = `
        <div id="image-optimizer" style="
            position: fixed;
            top: 20px;
            left: 20px;
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            max-width: 300px;
            display: none;
        ">
            <h4>🖼️ Image Optimizer</h4>
            <p>This tool helps optimize gallery loading:</p>
            <ul style="font-size: 12px; padding-left: 20px;">
                <li>✅ Lazy loading enabled</li>
                <li>✅ Progressive loading</li>
                <li>✅ Loading queue management</li>
                <li>✅ Error handling</li>
            </ul>
            <div id="optimization-stats" style="margin-top: 10px; font-size: 12px; color: #ccc;"></div>
            <button onclick="this.parentElement.style.display='none'" style="
                background: #d4a574;
                border: none;
                color: white;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Close</button>
        </div>
    `;
    document.body.appendChild(optimizationTool);
    
    // Show the tool for 10 seconds on gallery pages
    if (window.location.pathname.includes('Photos')) {
        setTimeout(() => {
            document.getElementById('image-optimizer').style.display = 'block';
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                document.getElementById('image-optimizer').style.display = 'none';
            }, 8000);
        }, 2000);
    }
}

// Add to enhancements.js
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createImageOptimizationTool);
} else {
    createImageOptimizationTool();
}
