window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
let isDraggingControlPoint = false;
let selectedControlPointIndices = null;
let hoveredControlPointIndices = null;
let saveStateTimer = null;
let points = [];
let customTexts = [];
let heatInProcesses = [];
let heatOutProcesses = [];
let customNotes = "";
let uiPositions = { legend: { left: null, top: null }, notes: { left: '20px', top: '20px' } };
let canvas, ctx;
let selectedPointIndex = null;
let activePointIndex = null;
let selectedLabelIndex = null;
let selectedConnectionIndices = null;
let selectedCustomTextIndex = null;
let isDragging = false;
let isDraggingLabel = false;
let isDraggingLineLabel = false;
let isDraggingCustomText = false;
let isDraggingIsoLineLabel = false;
let selectedIsoLineLabelIndex = null;
let isFinalized = false;
let snapLines = {x: null, y: null};
let currentLineStyle = 'solid';
const padding = { top: 40, right: 50, bottom: 70, left: 70 };
let domain = { T: {min: 0, max: 400}, s: {min: 0, max: 10} };
let baseDomain = {};
const saturationData = {
    liquid: [
        {T: 0.01, s: 0},
        {T: 10, s: 0.1511},
        {T: 20, s: 0.2965},
        {T: 30, s: 0.4368},
        {T: 40, s: 0.5724},
        {T: 50, s: 0.7038},
        {T: 60, s: 0.8312},
        {T: 70, s: 0.955},
        {T: 80, s: 1.0754},
        {T: 90, s: 1.1927},
        {T: 100, s: 1.307},
        {T: 110, s: 1.4187},
        {T: 120, s: 1.5278},
        {T: 130, s: 1.6346},
        {T: 140, s: 1.7393},
        {T: 150, s: 1.842},
        {T: 160, s: 1.9428},
        {T: 170, s: 2.0419},
        {T: 180, s: 2.1395},
        {T: 190, s: 2.2358},
        {T: 200, s: 2.3308},
        {T: 210, s: 2.4248},
        {T: 220, s: 2.5178},
        {T: 230, s: 2.6102},
        {T: 240, s: 2.7019},
        {T: 250, s: 2.7934},
        {T: 260, s: 2.8847},
        {T: 270, s: 2.9762},
        {T: 280, s: 3.0681},
        {T: 290, s: 3.1608},
        {T: 300, s: 3.2547},
        {T: 310, s: 3.3506},
        {T: 320, s: 3.4491},
        {T: 330, s: 3.5516},
        {T: 340, s: 3.6599},
        {T: 350, s: 3.7783},
        {T: 355, s: 3.8438},
        {T: 360, s: 3.9164},
        {T: 365, s: 4.001},
        {T: 366, s: 4.0204},
        {T: 367, s: 4.041},
        {T: 368, s: 4.0631},
        {T: 369, s: 4.0872},
        {T: 370, s: 4.1142},
        {T: 370.5, s: 4.1291},
        {T: 371, s: 4.1453},
        {T: 371.5, s: 4.1632},
        {T: 372, s: 4.1836},
        {T: 372.5, s: 4.2075},
        {T: 373, s: 4.2377},
        {T: 373.2, s: 4.2528},
        {T: 373.4, s: 4.271},
        {T: 373.6, s: 4.2944},
        {T: 373.8, s: 4.418}
    ],
    vapor: [
        {T: 373.8, s: 4.418},
        {T: 373.6, s: 4.5528},
        {T: 373.4, s: 4.5844},
        {T: 373.2, s: 4.6092},
        {T: 373, s: 4.6299},
        {T: 372.5, s: 4.6715},
        {T: 372, s: 4.7046},
        {T: 371.5, s: 4.7327},
        {T: 371, s: 4.7573},
        {T: 370.5, s: 4.7794},
        {T: 370, s: 4.7996},
        {T: 369, s: 4.8358},
        {T: 368, s: 4.8679},
        {T: 367, s: 4.8968},
        {T: 366, s: 4.9235},
        {T: 365, s: 4.9482},
        {T: 360, s: 5.0527},
        {T: 355, s: 5.1377},
        {T: 350, s: 5.2109},
        {T: 340, s: 5.3359},
        {T: 330, s: 5.4425},
        {T: 320, s: 5.5373},
        {T: 310, s: 5.6243},
        {T: 300, s: 5.7058},
        {T: 290, s: 5.7832},
        {T: 280, s: 5.8578},
        {T: 270, s: 5.9304},
        {T: 260, s: 6.0017},
        {T: 250, s: 6.0722},
        {T: 240, s: 6.1425},
        {T: 230, s: 6.2131},
        {T: 220, s: 6.2842},
        {T: 210, s: 6.3565},
        {T: 200, s: 6.4303},
        {T: 190, s: 6.506},
        {T: 180, s: 6.5841},
        {T: 170, s: 6.6649},
        {T: 160, s: 6.7491},
        {T: 150, s: 6.837},
        {T: 140, s: 6.9293},
        {T: 130, s: 7.0264},
        {T: 120, s: 7.1291},
        {T: 110, s: 7.238},
        {T: 100, s: 7.3541},
        {T: 90, s: 7.4781},
        {T: 80, s: 7.611},
        {T: 70, s: 7.754},
        {T: 60, s: 7.9082},
        {T: 50, s: 8.0749},
        {T: 40, s: 8.2557},
        {T: 30, s: 8.4521},
        {T: 20, s: 8.6661},
        {T: 10, s: 8.8998},
        {T: 0.01, s: 9.1555}
    ]
};

function getSaturatedVaporEntropyAtTemp(T) {
    const data = saturationData.vapor;
    if (T >= 373.8) return data[0].s; 
    if (T <= 0.01) return data[data.length - 1].s; 
    
    for (let i = 0; i < data.length - 1; i++) {
        const p1 = data[i];
        const p2 = data[i + 1];
        if (T <= p1.T && T >= p2.T) {
            const ratio = (T - p2.T) / (p1.T - p2.T);
            return p2.s + ratio * (p1.s - p2.s);
        }
    }
    return null; 
}

function getSaturatedLiquidEntropyAtTemp(T) {
    const data = saturationData.liquid;
    if (T >= 373.8) return data[data.length - 1].s; 
    if (T <= 0.01) return data[0].s; 
    
    for (let i = 0; i < data.length - 1; i++) {
        const p1 = data[i];
        const p2 = data[i + 1];
        if (T >= p1.T && T <= p2.T) {
            const ratio = (T - p1.T) / (p2.T - p1.T);
            return p1.s + ratio * (p2.s - p1.s);
        }
    }
    return null; 
}

function getPhaseType(phaseString) {
    if (!phaseString) return 'unknown';
    if (phaseString.includes('Superheated')) return 'superheated';
    if (phaseString.includes('Subcooled')) return 'subcooled';
    if (phaseString.includes('Two Phase') || phaseString.includes('Mixture')) return 'mixture';
    if (phaseString.includes('Saturated Vapor')) return 'sat_vapor';
    if (phaseString.includes('Saturated Liquid')) return 'sat_liquid';
    return 'unknown';
}

function planConnectionPath(source, target) {
    const waypoints = [];
    const sourcePhase = getPhaseType(source.phase);
    const targetPhase = getPhaseType(target.phase);
    
    waypoints.push({s: source.visual_s, T: source.visual_T, label: 'start'});
    
    if (sourcePhase === targetPhase || 
        sourcePhase === 'unknown' || 
        targetPhase === 'unknown') {
        waypoints.push({s: target.visual_s, T: target.visual_T, label: 'end'});
        return waypoints;
    }
    
    const liquidPhases = ['subcooled', 'sat_liquid'];
    if (liquidPhases.includes(sourcePhase) && liquidPhases.includes(targetPhase)) {
        waypoints.push({s: target.visual_s, T: target.visual_T, label: 'end'});
        return waypoints;
    }
    
    if (sourcePhase === 'superheated' && 
        (targetPhase === 'mixture' || targetPhase === 'sat_liquid' || targetPhase === 'subcooled')) {
        
        const satVaporAtTargetT = getSaturatedVaporEntropyAtTemp(target.T); 
        if (satVaporAtTargetT !== null) {
            waypoints.push({s: satVaporAtTargetT, T: target.T, label: 'sat_vapor_at_target_T'});
        }
        
        if (targetPhase === 'subcooled') {
            const satLiquidAtTargetT = getSaturatedLiquidEntropyAtTemp(target.T); 
            if (satLiquidAtTargetT !== null && satLiquidAtTargetT > target.s) {
                waypoints.push({s: satLiquidAtTargetT, T: target.T, label: 'sat_liquid_at_target_T'});
            }
        }
    }
    
    else if ((sourcePhase === 'subcooled' || sourcePhase === 'sat_liquid' || sourcePhase === 'mixture') && 
             targetPhase === 'superheated') {
        
        if (sourcePhase === 'subcooled') {
            const satLiquidAtSourceT = getSaturatedLiquidEntropyAtTemp(source.T); 
            if (satLiquidAtSourceT !== null && satLiquidAtSourceT > source.s) {
                waypoints.push({s: satLiquidAtSourceT, T: source.T, label: 'sat_liquid_at_source_T'});
            }
        }
        
        const satVaporAtSourceT = getSaturatedVaporEntropyAtTemp(source.T); 
        if (satVaporAtSourceT !== null) {
            waypoints.push({s: satVaporAtSourceT, T: source.T, label: 'sat_vapor_at_source_T'});
        }
    }
    
    else if (sourcePhase === 'subcooled' && 
             (targetPhase === 'mixture' || targetPhase === 'sat_liquid')) {
        
        const satLiquidAtTargetT = getSaturatedLiquidEntropyAtTemp(target.T); 
        if (satLiquidAtTargetT !== null) {
            waypoints.push({s: satLiquidAtTargetT, T: target.T, label: 'sat_liquid_at_target_T'});
        }
    }
    
    else if ((sourcePhase === 'mixture' || sourcePhase === 'sat_liquid') && 
             targetPhase === 'subcooled') {
        
        const satLiquidAtTargetT = getSaturatedLiquidEntropyAtTemp(target.T); 
        if (satLiquidAtTargetT !== null && satLiquidAtTargetT > target.s) {
            waypoints.push({s: satLiquidAtTargetT, T: target.T, label: 'sat_liquid_at_target_T'});
        }
    }
    
    waypoints.push({s: target.visual_s, T: target.visual_T, label: 'end'});
    
    return waypoints;
}

let history = [];
let historyIndex = -1;
const HISTORY_LIMIT = 200;
let connectionMode = { active: false, sourceIndex: null };
let mousePos = { x: 0, y: 0 };
let needsRedraw = false;
let settings = { lineColor: '#000000', pointLabelColor: '#000000', lineLabelColor: '#000000', lineWidth: 2, saturationWidth: 3, showLegend: true, legendTitle: 'Legend', isDraggingEnabled: true, isZoomEnabled: true, isBendingEnabled: true };let isoLines = [];
const API_BASE_URL = 'https://letsbengineer00.pythonanywhere.com';
const API_URL_PAIRS = `${API_BASE_URL}/calculate_from_pairs`;
const API_URL_XLSX = `${API_BASE_URL}/export_xlsx`;
const API_URL_TXT = `${API_BASE_URL}/export_txt`;

let activeSuggestionInput = null;
let activeSuggestionPropType = null;

let isPanning = false;
let panStart = { x: 0, y: 0, domain: null };

const allProperties = {
    'P': 'Pressure (P)',
    'T': 'Temperature (T)',
    'h': 'Enthalpy (h)',
    's': 'Entropy (s)',
    'x': 'Quality (x)'
};

const supportedPairs = {
    'P': ['T', 'h', 's', 'x'],
    'T': ['P', 'x'],
    'h': ['P', 's'],
    's': ['P', 'h'],
    'x': ['P', 'T']
};

const propInfo = {
    'P': { unit: 'kPa', range: '0.61 - 22064', placeholder: 'e.g., 101.3' },
    'T': { unit: '°C', range: '0.01 - 800+', placeholder: 'e.g., 100, Tsat' },
    'h': { unit: 'kJ/kg', range: 'approx. 0 - 4100', placeholder: 'e.g., 2500, hf, hg' },
    's': { unit: 'kJ/kg·K', range: 'approx. 0 - 9.2', placeholder: 'e.g., 6.5' },
    'x': { unit: '(0-1)', range: '0 to 1', placeholder: 'e.g., 0.85' }
};

const toCanvas = (s, T) => ({ x: padding.left + ((s - domain.s.min) / (domain.s.max - domain.s.min)) * (canvas.width - padding.left - padding.right), y: canvas.height - padding.bottom - ((T - domain.T.min) / (domain.T.max - domain.T.min)) * (canvas.height - padding.top - padding.bottom) });
const fromCanvas = (x, y) => ({ s: domain.s.min + ((x - padding.left) / (canvas.width - padding.left - padding.right)) * (domain.s.max - domain.s.min), T: domain.T.min + ((canvas.height - padding.bottom - y) / (canvas.height - padding.top - padding.bottom)) * (domain.T.max - domain.T.min) });

window.onload = () => {
    document.body.classList.add('loaded');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });
    
    document.onkeydown = onKeyDown;
    
    window.addEventListener('click', hideContextMenu);
    canvas.addEventListener('contextmenu', (e) => {
        
    });
    
    const canvasWrapper = document.getElementById('canvas-wrapper');
    const resizeObserver = new ResizeObserver(() => { 
        if (!canvasWrapper.clientWidth || !canvasWrapper.clientHeight) return; 
        canvas.width = canvasWrapper.clientWidth; 
        canvas.height = canvasWrapper.clientHeight; 
        draw(); 
    });
    resizeObserver.observe(canvasWrapper);
    
    makeDraggable(document.getElementById('legend-box'), document.querySelector('#legend-box .legend-header'), 'legend');
    makeDraggable(document.getElementById('custom-notes-container'), document.querySelector('#custom-notes-container .legend-header'), 'notes');
    
    loadFromSessionStorage(); 
    
    setBaseDomain();
    
    document.getElementById('prop1_type').addEventListener('change', () => updatePropDropdowns('prop1_type'));
    document.getElementById('prop2_type').addEventListener('change', () => updatePropDropdowns('prop2_type'));
    
    initializePropDropdowns();
    switchInputMethod('xsteam');
    switchTab('bulk');
    updateUI();
};
function getMousePos(e) { const rect = canvas.getBoundingClientRect(); return { mouseX: (e.clientX - rect.left) * (canvas.width / rect.width), mouseY: (e.clientY - rect.top) * (canvas.height / rect.height) }; }
function draw() {
    requestAnimationFrame(() => redrawCanvas(false));
}
function setBaseDomain() { baseDomain = structuredClone(domain); }

function onMouseDown(e) {
    hideContextMenu();
    if (e.target.closest('#quick-action-menu')) return;
    
    const { mouseX, mouseY } = getMousePos(e);
    if (isFinalized) return;

    let clickedOnObject = false;

    if (connectionMode.active) { 
        const clickedPointIndex = points.findIndex(p => { 
            const { x, y } = toCanvas(p.visual_s, p.visual_T); 
            return Math.hypot(x - mouseX, y - mouseY) < (p.size || 6) + 4; 
        }); 
        if (clickedPointIndex !== -1) { 
            clickedOnObject = true;
            if (connectionMode.sourceIndex === null) { 
                connectionMode.sourceIndex = clickedPointIndex; 
            } else { 
                if (connectionMode.sourceIndex !== clickedPointIndex && !points[connectionMode.sourceIndex].connections.some(c => c.target == clickedPointIndex)) { 
                    addConnection(connectionMode.sourceIndex, clickedPointIndex, { style: currentLineStyle }); 
                    requestSaveState(); 
                    updateUI(); 
                } 
                connectionMode.sourceIndex = null; 
                toggleConnectionMode(); 
            } 
            draw(); 
            return;
        } 
    }

    if (!settings.isDraggingEnabled) return;

    for (let i = customTexts.length - 1; i >= 0; i--) { 
        const textObj = customTexts[i]; ctx.font = `${textObj.size}px Arial`; 
        const metrics = ctx.measureText(textObj.text); 
        if (mouseX >= textObj.x - metrics.width / 2 && mouseX <= textObj.x + metrics.width / 2 && mouseY >= textObj.y - textObj.size / 2 && mouseY <= textObj.y + textObj.size / 2) { 
            isDraggingCustomText = true; selectedCustomTextIndex = i; clickedOnObject = true; return; 
        } 
    }
    
    for (let i = isoLines.length - 1; i >= 0; i--) {
        const line = isoLines[i];
        const anchorIndex = Math.floor(line.points.length * line.labelPositionRatio);
        const anchorPoint = toCanvas(line.points[anchorIndex].s, line.points[anchorIndex].T);
        if (Math.hypot(mouseX - anchorPoint.x, mouseY - anchorPoint.y) < 20) {
            isDraggingIsoLineLabel = true; selectedIsoLineLabelIndex = i; clickedOnObject = true; return;
        }
    }

    const showAllLabels = document.getElementById('showLabels').checked;
    const showLines = document.getElementById('showLines').checked;
    
    if (showLines) { 
        for (let i = 0; i < points.length; i++) { 
            for (let j = 0; j < points[i].connections.length; j++) { 
                const conn = points[i].connections[j]; const target = points[conn.target]; if (!conn.label || !target) continue; 
                const p1 = toCanvas(points[i].visual_s, points[i].visual_T), p2 = toCanvas(target.visual_s, target.visual_T); 
                const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2; const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x); 
                const isDefaultPos = conn.labelOffset.x === 0 && conn.labelOffset.y === 0; const defaultOffset = 10 + 12 / 2; 
                const offsetX = isDefaultPos ? -Math.sin(angle) * defaultOffset : conn.labelOffset.x; 
                const offsetY = isDefaultPos ? Math.cos(angle) * defaultOffset : conn.labelOffset.y; 
                const labelX = midX + offsetX, labelY = midY + offsetY; ctx.font = `12px Arial`; 
                const textMetrics = ctx.measureText(conn.label); 
                if (mouseX >= labelX - textMetrics.width / 2 && mouseX <= labelX + textMetrics.width / 2 && mouseY >= labelY - 12 / 2 - 2 && mouseY <= labelY + 12 / 2 + 2) { 
                    selectedConnectionIndices = { source: i, conn: j }; isDraggingLineLabel = true; updateUI(); clickedOnObject = true; return; 
                } 
            } 
        } 
    }
    
    if (showAllLabels) { 
        for (let i = points.length - 1; i >= 0; i--) { 
            const p = points[i]; if (!p.showLabel) continue; 
            const { x, y } = toCanvas(p.visual_s, p.visual_T); 
            const labelX = x + p.labelOffset.x, labelY = y + p.labelOffset.y; ctx.font = 'bold 12px Arial'; 
            const textMetrics = ctx.measureText(p.name); 
            if (mouseX >= labelX - textMetrics.width / 2 && mouseX <= labelX + textMetrics.width / 2 && mouseY >= labelY - 12 && mouseY <= labelY) { 
                selectedLabelIndex = i; isDraggingLabel = true; updateUI(); clickedOnObject = true; return; 
            } 
        } 
    }

    if (settings.isBendingEnabled) {
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points[i].connections.length; j++) {
                const conn = points[i].connections[j]; const target = points[conn.target]; if (!target) continue;
                const p1 = toCanvas(points[i].visual_s, points[i].visual_T); const p2 = toCanvas(target.visual_s, target.visual_T);
                const midX = (p1.x + p2.x) / 2; const midY = (p1.y + p2.y) / 2;
                const cpX = midX + (conn.controlPointOffset?.x || 0); const cpY = midY + (conn.controlPointOffset?.y || 0);
                if (Math.hypot(mouseX - cpX, mouseY - cpY) < 10) {
                    isDraggingControlPoint = true; selectedControlPointIndices = { source: i, conn: j };
                    canvas.style.cursor = 'grabbing'; clickedOnObject = true; return;
                }
            }
        }
    }
    
    for (let i = points.length-1; i >= 0; i--) { 
        const { x, y } = toCanvas(points[i].visual_s, points[i].visual_T); 
        if (Math.hypot(x-mouseX, y-mouseY) < (points[i].size || 6)+4) { 
            if (activePointIndex === i) {
                isDragging = true;
                clickedOnObject = true;
                return;
            }
            selectedPointIndex = i; activePointIndex = i; isDragging = true; 
            showQuickActionMenu(i); updateUI(); clickedOnObject = true; return; 
        } 
    }
    
    if (!clickedOnObject) {
        hideQuickActionMenu();
        if (activePointIndex !== null) {
            activePointIndex = null;
            updateUI(); 
        }
        isPanning = true;
        panStart.x = mouseX;
        panStart.y = mouseY;
        panStart.domain = structuredClone(domain);
        canvas.style.cursor = 'grabbing';
    }
}
function onMouseMove(e) {
    const { mouseX, mouseY } = getMousePos(e);
    mousePos = { x: mouseX, y: mouseY };

    if (settings.isBendingEnabled && isDraggingControlPoint && selectedControlPointIndices) {
        const { source, conn } = selectedControlPointIndices;
        const connection = points[source].connections[conn];
        const target = points[connection.target];
        
        const p1 = toCanvas(points[source].visual_s, points[source].visual_T);
        const p2 = toCanvas(target.visual_s, target.visual_T);
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        
        connection.controlPointOffset.x = mouseX - midX;
        connection.controlPointOffset.y = mouseY - midY;
        draw();
        return;
    }

    if (isDraggingIsoLineLabel && selectedIsoLineLabelIndex !== null) {
        const line = isoLines[selectedIsoLineLabelIndex];
        let minDistanceSq = Infinity;
        let bestRatio = line.labelPositionRatio;
        for (let i = 0; i < line.points.length - 1; i++) {
            const p1 = toCanvas(line.points[i].s, line.points[i].T);
            const p2 = toCanvas(line.points[i+1].s, line.points[i+1].T);
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            if (dx === 0 && dy === 0) continue;
            const t = ((mouseX - p1.x) * dx + (mouseY - p1.y) * dy) / (dx * dx + dy * dy);
            const clampedT = Math.max(0, Math.min(1, t));
            const closestX = p1.x + clampedT * dx;
            const closestY = p1.y + clampedT * dy;
            const distSq = (mouseX - closestX) ** 2 + (mouseY - closestY) ** 2;
            if (distSq < minDistanceSq) {
                minDistanceSq = distSq;
                bestRatio = (i + clampedT) / (line.points.length - 1);
            }
        }
        line.labelPositionRatio = bestRatio;
        draw();
        return;
    }

    if (isPanning) {
        const dx = mouseX - panStart.x, dy = mouseY - panStart.y;
        const sRange = panStart.domain.s.max - panStart.domain.s.min, tRange = panStart.domain.T.max - panStart.domain.T.min;
        const dS = (dx / (canvas.width - padding.left - padding.right)) * sRange;
        const dT = (dy / (canvas.height - padding.top - padding.bottom)) * tRange;
        domain.s.min = panStart.domain.s.min - dS; domain.s.max = panStart.domain.s.max - dS;
        domain.T.min = panStart.domain.T.min + dT; domain.T.max = panStart.domain.T.max + dT;
        draw();
        return;
    }
    
    let onControlPoint = false;
    let needsRedrawForHover = false;
    if (settings.isBendingEnabled && !isDragging && !isDraggingLabel && !isDraggingLineLabel && !connectionMode.active && !isDraggingControlPoint) {
        let found = false;
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points[i].connections.length; j++) {
                const conn = points[i].connections[j];
                const target = points[conn.target];
                if (!target) continue;
                
                const p1 = toCanvas(points[i].visual_s, points[i].visual_T);
                const p2 = toCanvas(target.visual_s, target.visual_T);
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                const cpX = midX + (conn.controlPointOffset?.x || 0);
                const cpY = midY + (conn.controlPointOffset?.y || 0);

                if (Math.hypot(mouseX - cpX, mouseY - cpY) < 10) {
                    onControlPoint = true;
                    if (!hoveredControlPointIndices || hoveredControlPointIndices.source !== i || hoveredControlPointIndices.conn !== j) {
                        hoveredControlPointIndices = { source: i, conn: j };
                        needsRedrawForHover = true;
                    }
                    found = true;
                    break;
                }
            }
            if(found) break;
        }
        if (!found && hoveredControlPointIndices) {
            hoveredControlPointIndices = null;
            needsRedrawForHover = true;
        }
    }
    
    if (isPanning || isDraggingControlPoint) {
        canvas.style.cursor = 'grabbing';
    } else if (onControlPoint) {
        canvas.style.cursor = 'grab';
    } else if (connectionMode.active) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'crosshair';
    }

    if (needsRedrawForHover) draw();

    if (isDraggingCustomText && selectedCustomTextIndex !== null) { customTexts[selectedCustomTextIndex].x = mouseX; customTexts[selectedCustomTextIndex].y = mouseY; draw(); return; }
    if (connectionMode.active && connectionMode.sourceIndex !== null) { draw(); return; }
    if (!settings.isDraggingEnabled) { isDragging = isDraggingLabel = isDraggingLineLabel = false; return; }
    if (isDraggingLineLabel && selectedConnectionIndices) { const { source, conn } = selectedConnectionIndices; const connection = points[source].connections[conn]; const target = points[connection.target]; const p1 = toCanvas(points[source].visual_s, points[source].visual_T); const p2 = toCanvas(target.visual_s, target.visual_T); const midX = (p1.x + p2.x) / 2; const midY = (p1.y + p2.y) / 2; connection.labelOffset.x = mouseX - midX; connection.labelOffset.y = mouseY - midY; draw(); return; }
    if (isDraggingLabel && selectedLabelIndex !== null) { const point = points[selectedLabelIndex]; const pointPos = toCanvas(point.visual_s, point.visual_T); point.labelOffset.x = mouseX - pointPos.x; point.labelOffset.y = mouseY - pointPos.y; draw(); return; }
    
    if (!isDragging || selectedPointIndex === null) { return; }
    
    snapLines = {x: null, y: null, xPoint: null, yPoint: null};
    let newCoords = fromCanvas(mouseX, mouseY);
    points.forEach((p, i) => {
        if (i !== selectedPointIndex) {
            const snapThresholdS = (domain.s.max - domain.s.min) * 0.01;
            const snapThresholdT = (domain.T.max - domain.T.min) * 0.01;
            if (Math.abs(newCoords.s - p.visual_s) < snapThresholdS) {
                snapLines.x = toCanvas(p.visual_s, 0).x;
                snapLines.xPoint = toCanvas(p.visual_s, p.visual_T);
            }
            if (Math.abs(newCoords.T - p.visual_T) < snapThresholdT) {
                snapLines.y = toCanvas(0, p.visual_T).y;
                snapLines.yPoint = toCanvas(p.visual_s, p.visual_T);
            }
        }
    });
    points[selectedPointIndex].visual_T = newCoords.T;
    points[selectedPointIndex].visual_s = newCoords.s;
    updatePropertiesPanel(selectedPointIndex);
    hideQuickActionMenu();
    draw();
}
function onMouseUp() {
    if (isDraggingControlPoint) {
        requestSaveState();
    }

    if (isPanning) { 
        setBaseDomain(); 
        requestSaveState(); 
    }
    if (isDragging || isDraggingLabel || isDraggingLineLabel || isDraggingCustomText || isDraggingIsoLineLabel) {
        requestSaveState();
    }
    if (isDragging) { 
        showQuickActionMenu(selectedPointIndex); 
    }

    isPanning = isDragging = isDraggingLabel = isDraggingLineLabel = isDraggingCustomText = isDraggingIsoLineLabel = isDraggingControlPoint = false;
    
    selectedPointIndex = selectedLabelIndex = selectedConnectionIndices = selectedCustomTextIndex = selectedIsoLineLabelIndex = selectedControlPointIndices = null;
    
    snapLines = { x: null, y: null };
    canvas.style.cursor = connectionMode.active ? 'pointer' : 'crosshair';
    draw();
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    container.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function initializePropDropdowns() {
    const prop1Select = document.getElementById('prop1_type');
    prop1Select.innerHTML = Object.keys(supportedPairs).map(key => `<option value="${key}">${allProperties[key]}</option>`).join('');
    prop1Select.value = 'P';
    updatePropDropdowns('prop1_type');
}

function updatePropDropdowns(changedId) {
    const prop1Select = document.getElementById('prop1_type');
    const prop2Select = document.getElementById('prop2_type');
    const primaryValue = prop1Select.value;
    let currentSecondaryValue = prop2Select.value;
    const validPartners = supportedPairs[primaryValue] || [];
    prop2Select.innerHTML = validPartners.map(key => `<option value="${key}">${allProperties[key]}</option>`).join('');
    if (validPartners.includes(currentSecondaryValue)) {
        prop2Select.value = currentSecondaryValue;
    } else if (validPartners.length > 0) {
        prop2Select.value = validPartners[0];
    }
    updateInputLabels();
}

function switchInputMethod(method) {
    document.querySelectorAll('.method-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.method-content').forEach(content => content.classList.remove('active'));
    const xsteamDesc = document.getElementById('method-description');
    const directDesc = document.getElementById('method-description-direct');
    if (method === 'xsteam') {
        document.getElementById('switchToXsteamBtn').classList.add('active');
        document.getElementById('xsteamInputArea').classList.add('active');
        xsteamDesc.innerHTML = '✨ <strong>Calculate</strong> all other thermodynamic properties from two known values. You can use text like <code>Tsat</code>, <code>hf</code>, <code>hg</code> as values.';
    } else if (method === 'direct') {
        document.getElementById('switchToDirectBtn').classList.add('active');
        document.getElementById('directInputArea').classList.add('active');
        directDesc.innerHTML = '✍️ <strong>Manually plot</strong> a point if you already know its Temperature and Entropy. Other properties will not be calculated.';
    }
}

function switchSuggestionMode(mode, context) {
    const parent = document.getElementById(`value-suggestion-section-${context}`);
    parent.querySelectorAll('.suggestion-btn').forEach(btn => btn.classList.remove('active'));
    parent.querySelectorAll('.suggestion-content').forEach(content => content.classList.remove('active'));
    parent.querySelector(`button[onclick="switchSuggestionMode('${mode}', '${context}')"]`).classList.add('active');
    parent.querySelector(`#suggestion-content-${mode}-${context}`).classList.add('active');
}

function showValueSuggestions(inputElement, propertyType, context) {
    activeSuggestionInput = inputElement;
    activeSuggestionPropType = propertyType;
    const suggestionSection = document.getElementById(`value-suggestion-section-${context}`);
    const suggestionTitle = document.getElementById(`suggestion-title-${context}`);
    const valueContainer = document.getElementById(`suggestion-buttons-value-${context}`);
    const pointContainer = document.getElementById(`suggestion-buttons-point-${context}`);
    if (!propertyType) return;
    suggestionTitle.textContent = `Existing ${allProperties[propertyType]} Values`;
    let values;
    if (propertyType === 'T') {
        values = points.map(p => p.visual_T);
    } else if (propertyType === 's') {
        values = points.map(p => p.visual_s);
    } else {
        values = points.map(p => p[propertyType]);
    }
    const uniqueValues = [...new Set(values.filter(val => val !== null && val !== undefined))];
    if (uniqueValues.length === 0) {
        valueContainer.innerHTML = `<p style="color:#888; font-size:0.9em; text-align: center;">No saved values for ${allProperties[propertyType]}.</p>`;
    } else {
        uniqueValues.sort((a, b) => a - b);
        valueContainer.innerHTML = uniqueValues.map(val => {
            const displayVal = typeof val === 'number' ? (propertyType === 'x' || propertyType === 's' ? val.toFixed(4) : val.toFixed(2)) : val;
            return `<button class="value-btn" onclick="selectSuggestedValue('${val}')">${displayVal}</button>`;
        }).join('');
    }
    if (points.length === 0) {
        pointContainer.innerHTML = `<p style="color:#888; font-size:0.9em; text-align: center;">No points to copy from.</p>`;
    } else {
        pointContainer.innerHTML = points.map((p, i) => `<button class="value-btn" onclick="selectSuggestedPoint(${i})">${p.name}</button>`).join('');
    }
    suggestionSection.classList.remove('collapsed');
    switchSuggestionMode('value', context);
}

function selectSuggestedValue(value) {
    if (activeSuggestionInput) {
        activeSuggestionInput.value = value;
    }
    document.getElementById('value-suggestion-section-xsteam').classList.add('collapsed');
    document.getElementById('value-suggestion-section-direct').classList.add('collapsed');
    document.getElementById('value-suggestion-section-isoline').classList.add('collapsed');
    activeSuggestionInput = null;
    activeSuggestionPropType = null;
}

function selectSuggestedPoint(pointIndex) {
    if (activeSuggestionInput && activeSuggestionPropType && points[pointIndex]) {
        const point = points[pointIndex];
        let valueToCopy;
        if (activeSuggestionPropType === 'T') {
            valueToCopy = point.visual_T;
        } else if (activeSuggestionPropType === 's') {
            valueToCopy = point.visual_s;
        } else {
            valueToCopy = point[activeSuggestionPropType];
        }
        if (valueToCopy !== null && valueToCopy !== undefined) {
            activeSuggestionInput.value = valueToCopy;
        } else {
            showNotification(`Point '${point.name}' does not have a value for ${allProperties[activeSuggestionPropType]}.`, 'error');
        }
    }
    document.getElementById('value-suggestion-section-xsteam').classList.add('collapsed');
    document.getElementById('value-suggestion-section-direct').classList.add('collapsed');
    document.getElementById('value-suggestion-section-isoline').classList.add('collapsed');
    activeSuggestionInput = null;
    activeSuggestionPropType = null;
}

function showHint(propNum) {
    const hintBox = document.getElementById(`${propNum}_hint`);
    const propType = document.getElementById(`${propNum}_type`).value;
    let hintText = `Valid Range: ${propInfo[propType]?.range || 'N/A'}`;
    if (propNum === 'prop2') {
        const prop1Type = document.getElementById('prop1_type').value;
        const prop1Val = document.getElementById('prop1_value').value.trim();
        if (prop1Val) {
            if (prop1Type === 'P' && propType === 'T') {
                hintText += `. Use 'Tsat' for saturation temp.`;
            } else if (prop1Type === 'T' && propType === 'P') {
                 hintText += `. Use 'Psat' for saturation press.`;
            }
        }
    }
    hintBox.textContent = hintText;
    hintBox.style.display = 'block';
}
function hideHint(propNum) {
    document.getElementById(`${propNum}_hint`).style.display = 'none';
}

function addDirectPoint() {
    const name = document.getElementById('pointName').value.trim();
    const tValue = parseFloat(document.getElementById('directT').value.trim());
    const sValue = parseFloat(document.getElementById('directs').value.trim());
    if (!name || isNaN(tValue) || isNaN(sValue)) return showNotification("Please provide a name, Temperature, and Entropy.", "error");
    addPoint({ name, T: tValue, s: sValue, phase: 'Custom' });
    document.getElementById('pointName').value = (parseInt(name, 10) || 0) + 1;
    document.getElementById('directT').value = '';
    document.getElementById('directs').value = '';
    requestSaveState(); updateUI();
}

function onKeyDown(e) {
    e = e || window.event;
    const isCtrlOrMeta = e.ctrlKey || e.metaKey; 

    if (isCtrlOrMeta && (e.key.toLowerCase() === 'z' || e.key.toLowerCase() === 'y')) {
        
        const activeElement = document.activeElement;
        
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            return; 
        }

        e.preventDefault(); 

        if (e.key.toLowerCase() === 'z') {
            undo();
        } else {
            redo();
        }
        return; 
    }

    const activeElement = document.activeElement;
    const isEditingText = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

    if (isEditingText && e.key !== 'Escape') {
        return;
    }

    switch (e.key) {
        case 'Delete':
            e.preventDefault();
            if (activePointIndex !== null) deleteActivePoint();
            if (selectedCustomTextIndex !== null) {
                customTexts.splice(selectedCustomTextIndex, 1);
                selectedCustomTextIndex = null;
                requestSaveState();
                draw();
            }
            break;
        case 'Escape':
            e.preventDefault();
            if (connectionMode.active) toggleConnectionMode();
            hideQuickActionMenu();
            canvas.focus(); 
            break;
    }
}
function onWheel(e) {
    e.preventDefault();
    if (!settings.isZoomEnabled) return;
    hideQuickActionMenu();
    
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    
    const sRange = domain.s.max - domain.s.min;
    const tRange = domain.T.max - domain.T.min;
    
    const newSRange = sRange / zoomFactor;
    const newTRange = tRange / zoomFactor;
    
    if ((newSRange < 0.1 && zoomFactor > 1) || (newSRange > 50 && zoomFactor < 1)) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const mouseData = fromCanvas(mouseX, mouseY);
    
    const sRatio = (mouseData.s - domain.s.min) / sRange;
    const tRatio = (mouseData.T - domain.T.min) / tRange;
    
    domain.s.min = mouseData.s - newSRange * sRatio;
    domain.s.max = mouseData.s + newSRange * (1 - sRatio);
    domain.T.min = mouseData.T - newTRange * tRatio;
    domain.T.max = mouseData.T + newTRange * (1 - tRatio);
    
    draw();
}
function showQuickActionMenu(index) { const menu = document.getElementById('quick-action-menu'); if (index === null || index >= points.length) return; activePointIndex = index; const point = points[index]; const { x, y } = toCanvas(point.visual_s, point.visual_T); menu.style.left = `${x}px`; menu.style.top = `${y}px`; menu.style.display = 'block'; }
function hideQuickActionMenu() { 
    document.getElementById('quick-action-menu').style.display = 'none'; 
}
function deleteActivePoint() { if (activePointIndex !== null) { deletePoint(activePointIndex); hideQuickActionMenu(); } }
function addPoint(data) { 
    const pointData = { 
        name: data.name || '?', 
        T: data.T || 0, 
        s: data.s || 0, 
        P: data.P || null, 
        h: data.h || null, 
        v: data.v || null, 
        x: data.x ?? null, 
        phase: data.phase || null, 
        saturation: data.saturation || null, 
        visual_T: data.visual_T || data.T || 0, 
        visual_s: data.visual_s || data.s || 0, 
        connections: data.connections || [], 
        showLabel: data.showLabel !== false, 
        labelOffset: data.labelOffset || { x: 0, y: -15 }, 
        color: data.color || '#000000', 
        size: data.size || 6, 
        labelColor: data.labelColor || settings.pointLabelColor 
    }; 
    
    if (pointData.x !== null && pointData.x !== undefined) {
        const epsilon = 0.001; 
        if (Math.abs(pointData.x - 0) < epsilon) {
            pointData.visual_s = getSaturatedLiquidEntropyAtTemp(pointData.T) || pointData.s;
        } else if (Math.abs(pointData.x - 1) < epsilon) {
            pointData.visual_s = getSaturatedVaporEntropyAtTemp(pointData.T) || pointData.s;
        }
    }
    
    points.push(pointData); 
}
function redrawCanvas(isExport = false, originalCanvasForExport = null) {
    needsRedraw = false;
    if (!ctx || !canvas.width || !canvas.height) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    const clipPath = new Path2D();
    clipPath.rect(padding.left, padding.top, canvas.width - padding.left - padding.right, canvas.height - padding.top - padding.bottom);
    ctx.clip(clipPath);
    drawGridAndAxes(isExport);
    if (document.getElementById('showSaturation').checked) drawSaturationCurve(isExport);
    drawIsoLines(isExport);
    if (document.getElementById('showLines').checked) { drawConnections(isExport); }
    drawSnapLines();
    drawPoints(isExport);
    drawCustomTextObjects(isExport);
    drawConnectionPreview(isExport);
    ctx.restore();
    drawAxesLabels(isExport);
    if (isExport) {
        drawUIToCanvas(ctx, originalCanvasForExport);
    } else {
        updateLegend();
    }
}

function drawGridAndAxes(isExport) { const lw = isExport ? 2 : 0.5; ctx.lineWidth = lw; ctx.strokeStyle = '#e8e8e8'; for(let t = domain.T.min; t <= domain.T.max; t += (domain.T.max-domain.T.min)/8) { const y = toCanvas(0, t).y; ctx.beginPath(); ctx.moveTo(padding.left, y); ctx.lineTo(canvas.width-padding.right, y); ctx.stroke(); } for(let s = domain.s.min; s <= domain.s.max; s += (domain.s.max-domain.s.min)/10) { const x = toCanvas(s, 0).x; ctx.beginPath(); ctx.moveTo(x, padding.top); ctx.lineTo(x, canvas.height-padding.bottom); ctx.stroke(); } }
function drawAxesLabels(isExport) { const fontSize = isExport ? 24 : 10; const titleSize = isExport ? 28 : 13; ctx.font=`${fontSize}px Arial`; ctx.fillStyle = '#000000'; for(let t = domain.T.min; t <= domain.T.max; t += (domain.T.max-domain.T.min)/8) { ctx.textAlign = 'right'; ctx.fillText(t.toFixed(0), padding.left-10, toCanvas(0,t).y+3); } for(let s = domain.s.min; s <= domain.s.max; s += (domain.s.max-domain.s.min)/10) { ctx.textAlign = 'center'; ctx.fillText(s.toFixed(1), toCanvas(s,0).x, canvas.height-padding.bottom+ (isExport ? 30 : 15)); } ctx.fillStyle="#000",ctx.font=`bold ${titleSize}px Arial`,ctx.textAlign="center",ctx.fillText("Entropy, s (kJ/kg·K)",canvas.width/2,canvas.height-padding.bottom+(isExport ? 80 : 40)),ctx.save(),ctx.translate(padding.left-(isExport ? 100: 50),canvas.height/2),ctx.rotate(-Math.PI/2),ctx.fillText("Temperature, T (°C)",0,0),ctx.restore(); }
function drawSnapLines() { if (!isDragging) return; ctx.save(); ctx.strokeStyle = '#F44336'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]); const p = points[selectedPointIndex]; const currentPos = toCanvas(p.visual_s, p.visual_T); if (snapLines.x !== null) { ctx.beginPath(); ctx.moveTo(snapLines.x, currentPos.y); ctx.lineTo(snapLines.x, snapLines.xPoint.y); ctx.stroke(); } if (snapLines.y !== null) { ctx.beginPath(); ctx.moveTo(currentPos.x, snapLines.y); ctx.lineTo(snapLines.yPoint.x, snapLines.y); ctx.stroke(); } ctx.restore(); }
function drawPoints(isExport) { const baseSize = isExport ? 10 : 6; const labelSize = isExport ? 24 : 12; const showAllLabels = document.getElementById('showLabels').checked; points.forEach((p, i) => { const { x, y } = toCanvas(p.visual_s, p.visual_T); ctx.fillStyle = p.color || '#000000'; ctx.beginPath(); ctx.arc(x, y, p.size ? (p.size / 6 * baseSize) : baseSize, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.lineWidth = isExport ? 4 : 2; ctx.stroke(); if (showAllLabels && p.showLabel) { const labelX = x + p.labelOffset.x, labelY = y + p.labelOffset.y; if (p.labelOffset.x !== 0 || p.labelOffset.y !== -15) { ctx.save(); ctx.strokeStyle = '#cccccc'; ctx.lineWidth = 1; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(labelX, labelY - 6); ctx.stroke(); ctx.restore(); } ctx.textAlign = 'center'; ctx.font = `bold ${labelSize}px Arial`; ctx.fillStyle = (p.labelColor || settings.pointLabelColor); ctx.fillText(p.name, labelX, labelY); } }); }
function drawConnections(isExport) {
    const baseLW = isExport ? 4 : 2;
    const labelSize = isExport ? 24 : 12;
    const massFlowLabelSize = isExport ? 22 : 11;

    points.forEach((p, i) => {
        p.connections.forEach((conn, j) => {
            const target = points[conn.target];
            if (!target) return;
            
            const waypoints = planConnectionPath(p, target);
            const canvasPoints = waypoints.map(wp => toCanvas(wp.s, wp.T));
            
            ctx.save();
            ctx.strokeStyle = conn.color || settings.lineColor;
            ctx.lineWidth = conn.lineWidth ? (conn.lineWidth / 2 * baseLW) : baseLW;
            if (conn.style === 'dashed') ctx.setLineDash([10, 5]);
            else if (conn.style === 'dotted') ctx.setLineDash([2, 3]);
            
            const cpOffsetX = conn.controlPointOffset?.x || 0;
            const cpOffsetY = conn.controlPointOffset?.y || 0;
            const usesBezier = (cpOffsetX !== 0 || cpOffsetY !== 0) && canvasPoints.length === 2;
            
            if (usesBezier) {
                const p1 = canvasPoints[0];
                const p2 = canvasPoints[1];
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                const cpX = midX + cpOffsetX;
                const cpY = midY + cpOffsetY;
                
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.quadraticCurveTo(cpX, cpY, p2.x, p2.y);
                ctx.stroke();
                
                const isHovered = hoveredControlPointIndices && hoveredControlPointIndices.source === i && hoveredControlPointIndices.conn === j;
                if (settings.isBendingEnabled && (isHovered || (isDraggingControlPoint && selectedControlPointIndices && selectedControlPointIndices.source === i && selectedControlPointIndices.conn === j)) && !isExport) {
                    ctx.fillStyle = 'rgba(142, 68, 173, 0.5)';
                    ctx.strokeStyle = 'rgba(142, 68, 173, 1)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(cpX, cpY, 6, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                }
            } else {
                for (let k = 0; k < canvasPoints.length - 1; k++) {
                    ctx.beginPath();
                    ctx.moveTo(canvasPoints[k].x, canvasPoints[k].y);
                    ctx.lineTo(canvasPoints[k + 1].x, canvasPoints[k + 1].y);
                    ctx.stroke();
                }
            }
            
            ctx.restore();
            
            if (document.getElementById('showArrows').checked && conn.showArrow !== false) {
                if (usesBezier) {
                    const p1 = canvasPoints[0];
                    const p2 = canvasPoints[1];
                    const midX_straight = (p1.x + p2.x) / 2;
                    const midY_straight = (p1.y + p2.y) / 2;
                    const cpX = midX_straight + cpOffsetX;
                    const cpY = midY_straight + cpOffsetY;

                    const curveMidX = 0.25 * p1.x + 0.5 * cpX + 0.25 * p2.x;
                    const curveMidY = 0.25 * p1.y + 0.5 * cpY + 0.25 * p2.y;

                    const tangentX = (cpX - p1.x) + (p2.x - cpX);
                    const tangentY = (cpY - p1.y) + (p2.y - cpY);
                    const angle = Math.atan2(tangentY, tangentX);

                    drawArrow(curveMidX, curveMidY, angle, conn.color || settings.lineColor, isExport);
                } else {
                    for (let k = 0; k < canvasPoints.length - 1; k++) {
                        const p1_seg = canvasPoints[k];
                        const p2_seg = canvasPoints[k + 1];
                        const midX_seg = (p1_seg.x + p2_seg.x) / 2;
                        const midY_seg = (p1_seg.y + p2_seg.y) / 2;
                        const angle_seg = Math.atan2(p2_seg.y - p1_seg.y, p2_seg.x - p1_seg.x);
                        drawArrow(midX_seg, midY_seg, angle_seg, conn.color || settings.lineColor, isExport);
                    }
                }
            }
            
            const p1 = canvasPoints[0];
            const p2 = canvasPoints[canvasPoints.length - 1];
            const totalMidX = (p1.x + p2.x) / 2;
            const totalMidY = (p1.y + p2.y) / 2;
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
            
            if (conn.label) {
                const isDefaultPos = conn.labelOffset.x === 0 && conn.labelOffset.y === 0;
                const defaultOffset = 10 + labelSize / 2;
                const offsetX = isDefaultPos ? -Math.sin(angle) * defaultOffset : conn.labelOffset.x;
                const offsetY = isDefaultPos ? Math.cos(angle) * defaultOffset : conn.labelOffset.y;
                const labelX = totalMidX + offsetX;
                const labelY = totalMidY + offsetY;
                
                ctx.font = `${labelSize}px Arial`;
                const textMetrics = ctx.measureText(conn.label);
                ctx.fillStyle = 'white';
                ctx.fillRect(labelX - textMetrics.width / 2 - 2, labelY - labelSize/2 - 2, textMetrics.width + 4, labelSize + 4);
                ctx.fillStyle = (conn.color || settings.lineLabelColor);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(conn.label, labelX, labelY);
            }

            if (conn.massFlow !== undefined && conn.massFlow !== null) {
                const massFlowText = `ṁ = ${conn.massFlow} kg/s`;
                const massFlowOffset = (conn.label ? 15 : 0) + 10;
                const offsetX = -Math.sin(angle) * massFlowOffset;
                const offsetY = Math.cos(angle) * massFlowOffset;
                
                const labelX = totalMidX + offsetX;
                const labelY = totalMidY + offsetY;

                ctx.font = `italic ${massFlowLabelSize}px Arial`;
                const textMetrics = ctx.measureText(massFlowText);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillRect(labelX - textMetrics.width / 2 - 2, labelY - massFlowLabelSize/2 - 2, textMetrics.width + 4, massFlowLabelSize + 4);
                ctx.fillStyle = '#0056b3';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(massFlowText, labelX, labelY);
            }
        });
    });
}
function drawArrow(midX, midY, angle, color, isExport) {
    const size = isExport ? 2 : 1;
    ctx.save();
    ctx.translate(midX, midY); 
    ctx.rotate(angle);         
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10 * size, -6 * size);
    ctx.lineTo(-10 * size, 6 * size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}
function drawSaturationCurve(isExport) { const lw = isExport ? 6 : settings.saturationWidth; const combined = [...saturationData.liquid, ...saturationData.vapor.slice(1)], pts = combined.map(p => toCanvas(p.s, p.T)); function getBezierSegments(allPts, tension = 0.5) { const segs = []; const t = tension; for (let i = 0; i < allPts.length - 1; i++) { const p0 = (i > 0) ? allPts[i - 1] : allPts[i], p1 = allPts[i], p2 = allPts[i + 1], p3 = (i < allPts.length - 2) ? allPts[i + 2] : allPts[i + 1]; const cp1x = p1.x+(p2.x-p0.x)/6*t, cp1y = p1.y+(p2.y-p0.y)/6*t, cp2x = p2.x-(p3.x-p1.x)/6*t, cp2y = p2.y-(p3.y-p1.y)/6*t; segs.push({ p1, p2, cp1x, cp1y, cp2x, cp2y }); } return segs; } const segments = getBezierSegments(pts, 0.9), criticalIdx = saturationData.liquid.length - 1, lastIdx = segments.length - 1; ctx.save(); ctx.lineWidth = lw; ctx.strokeStyle = '#2196F3'; ctx.beginPath(); ctx.moveTo(segments[0].p1.x, segments[0].p1.y); for (let i = 0; i <= criticalIdx - 1; i++) { const s = segments[i]; ctx.bezierCurveTo(s.cp1x, s.cp1y, s.cp2x, s.cp2y, s.p2.x, s.p2.y); } ctx.stroke(); ctx.restore(); ctx.save(); ctx.lineWidth = lw; ctx.strokeStyle = '#F44336'; ctx.beginPath(); ctx.moveTo(segments[criticalIdx].p1.x, segments[criticalIdx].p1.y); for (let i = criticalIdx; i <= lastIdx; i++) { const s = segments[i]; ctx.bezierCurveTo(s.cp1x, s.cp1y, s.cp2x, s.cp2y, s.p2.x, s.p2.y); } ctx.stroke(); ctx.restore(); }
function drawConnectionPreview() { if (connectionMode.active && connectionMode.sourceIndex !== null) { const sourcePoint = points[connectionMode.sourceIndex]; const startPos = toCanvas(sourcePoint.visual_s, sourcePoint.visual_T); ctx.save(); ctx.strokeStyle = '#8e44ad'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(startPos.x, startPos.y); ctx.lineTo(mousePos.x, mousePos.y); ctx.stroke(); ctx.restore(); } }
function drawCustomTextObjects(isExport) { const sizeMultiplier = isExport ? 2 : 1; customTexts.forEach((textObj, i) => { ctx.font = `${textObj.size * sizeMultiplier}px Arial`; ctx.fillStyle = textObj.color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(textObj.text, textObj.x, textObj.y); if (selectedCustomTextIndex === i && !isExport) { const metrics = ctx.measureText(textObj.text); ctx.strokeStyle = '#007bff'; ctx.lineWidth = 1; ctx.setLineDash([4, 2]); ctx.strokeRect(textObj.x - metrics.width / 2 - 4, textObj.y - textObj.size / 2 - 4, metrics.width + 8, textObj.size + 8); ctx.setLineDash([]); } }); }
function updateUI(forceRedraw = false) { 
    updatePointsList();
    updateConnectionSelectors();
    updateUndoRedoButtons();
    updateSettingsUI();
    updatePointAppearanceUI();
    updatePropertiesPanel(activePointIndex);
    updateIsoLinesList();
    
    const analysisFieldset = document.getElementById('analysis-fieldset');
    const analysisWarning = document.getElementById('analysis-warning');
    if (points.length >= 3) {
        analysisFieldset.style.display = 'block';
        analysisFieldset.disabled = false;
        analysisWarning.style.display = 'none';
        renderAnalysisUI();
    } else {
        analysisFieldset.style.display = 'none';
        analysisFieldset.disabled = true;
        analysisWarning.style.display = 'block';
        analysisWarning.textContent = `At least 3 points are required to perform a cycle analysis. Please add ${3 - points.length} more point(s).`;
        document.getElementById('analysis-results-container').innerHTML = '';
    }

    draw(forceRedraw); 
}
function updatePointsList() { document.getElementById('pointsList').innerHTML = points.map((p, i) => `<div class="point-item" style="border-left-color: ${activePointIndex === i && !isFinalized ? '#F44336' : '#2a5298'};"><div class="point-info"><div class="point-name">${p.name}</div><div class="point-coords">T: ${p.T.toFixed(2)}, s: ${p.s.toFixed(4)}</div></div><div class="point-actions">${(p.phase) ? `<button class="btn btn-sm" style="background:transparent; color:#333;" onclick="showPropertiesModal(${i})" title="Show All Properties">📊</button>` : ''}<button class="btn btn-sm" style="background:transparent; color:#333; opacity:${p.showLabel ? '1' : '0.4'}" onclick="togglePointLabel(${i})" title="Toggle Label">👁️</button><button class="btn btn-sm" style="background:#17a2b8; color:white;" onclick="openEditModal(${i})">✏️</button><button class="btn btn-sm" style="background:#dc3545; color:white;" onclick="deletePoint(${i})">✕</button></div></div>`).join('') || '<p style="text-align:center;color:#999;padding:20px;">No points</p>'; }
function updateConnectionSelectors() { const s = document.getElementById('sourcePoint'), t = document.getElementById('targetPoint'), ps = s.value, pt = t.value, o = points.map((p, i) => `<option value="${i}">${p.name}</option>`).join(''); s.innerHTML=o; t.innerHTML=o; if(s.querySelector(`option[value="${ps}"]`)) s.value=ps; if(t.querySelector(`option[value="${pt}"]`)) t.value=pt; document.getElementById('connectionsList').innerHTML = ''; points.forEach((p, i) => { p.connections.forEach((conn, connIndex) => { const targetPoint = points[conn.target]; if (targetPoint) { document.getElementById('connectionsList').innerHTML += `<div class="connection-item"><span><strong>${p.name}</strong> → <strong>${targetPoint.name}</strong></span><div class="connection-actions"><button class="btn btn-sm" style="background:transparent; color:#333; opacity:${conn.showArrow !== false ? '1' : '0.4'}" onclick="toggleConnectionArrow(${i}, ${connIndex})" title="Toggle Arrow">👁️</button><button class="btn btn-sm" style="background:#eee;color:#333;" onclick="swapSingleConnection(${i}, ${connIndex})" title="Swap direction">↔︎</button><button class="btn btn-sm" style="background:#dc3545; color:white;" onclick="removeConnection(${i}, ${connIndex})">✕</button></div></div>`; } }); }); updateConnectionManagerUI(); }
function updateConnectionManagerUI() { const s = parseInt(document.getElementById('sourcePoint').value), t = parseInt(document.getElementById('targetPoint').value), btn = document.getElementById('connectionManagerBtn'); const inv = isNaN(s) || isNaN(t) || s === t || !points[s] || !points[t]; btn.disabled = inv; if (inv) { btn.textContent = '➕ Add / Update Connection'; btn.style.background = ''; document.getElementById('connLabelInput').value = ''; document.getElementById('connLegendInput').value = ''; document.getElementById('connShowLegend').checked = false; document.getElementById('connColorInput').value = '#000000'; document.getElementById('connWidthInput').value = 2; return; } const f = getConn(s, t); if (f.conn) { selectLineStyle(f.conn.style || 'solid'); document.getElementById('connLabelInput').value = f.conn.label || ''; document.getElementById('connLegendInput').value = f.conn.legendLabel || ''; document.getElementById('connShowLegend').checked = !!f.conn.showInLegend; document.getElementById('connColorInput').value = f.conn.color || '#000000'; document.getElementById('connWidthInput').value = f.conn.lineWidth || 2; btn.textContent = '🔄 Update Connection'; btn.style.background = '#28a745'; } else { btn.textContent = '➕ Add Connection'; btn.style.background = ''; document.getElementById('connLabelInput').value = ''; document.getElementById('connLegendInput').value = ''; document.getElementById('connShowLegend').checked = false; document.getElementById('connColorInput').value = '#000000'; document.getElementById('connWidthInput').value = 2; } }
function updateSettingsUI() {
    document.getElementById('lineWidth').value = settings.lineWidth;
    document.getElementById('lineWidthValue').textContent = parseFloat(settings.lineWidth).toFixed(1);
    document.getElementById('saturationWidth').value = settings.saturationWidth;
    document.getElementById('saturationWidthValue').textContent = parseFloat(settings.saturationWidth).toFixed(1);
    document.getElementById('showLegend').checked = settings.showLegend;
    document.getElementById('legendTitle').value = settings.legendTitle;
    document.getElementById('allowDragging').checked = settings.isDraggingEnabled;
    document.getElementById('allowZoom').checked = settings.isZoomEnabled;
    document.getElementById('allowBending').checked = settings.isBendingEnabled;
}
function updatePointAppearanceUI() { const s = document.getElementById('pointAppearanceSelector'), cv = s.value, o = points.map((p, i) => `<option value="${i}">${p.name}</option>`).join(''); s.innerHTML = '<option value="-1">-- Select --</option>' + o; s.value = (s.querySelector(`option[value="${cv}"]`)) ? cv : "-1"; updatePointAppearanceControls(); }
function updatePointAppearanceControls() { const s = document.getElementById('pointAppearanceSelector'), f = document.getElementById('pointAppearanceFieldset'), pi = parseInt(s.value); if (pi > -1 && points[pi]) { f.disabled = false; const p = points[pi]; document.getElementById('pointColor').value = p.color || '#000000'; document.getElementById('pointCustomLabelColor').value = p.labelColor || '#000000'; document.getElementById('pointSize').value = p.size || 6; document.getElementById('pointSizeValue').textContent = p.size || 6; } else { f.disabled = true; } }
function requestSaveState() {
    clearTimeout(saveStateTimer);
    
    saveStateTimer = setTimeout(saveState, 100);
}
function saveState() { 
    if (historyIndex < history.length - 1) {
        history.splice(historyIndex + 1);
    }
    customNotes = document.getElementById('customNotes').value;
    
    const state = {
        points: structuredClone(points),
        customTexts: structuredClone(customTexts),
        isoLines: structuredClone(isoLines),
        domain: structuredClone(domain),
        settings: structuredClone(settings),
        uiPositions: structuredClone(uiPositions),
        heatInProcesses: structuredClone(heatInProcesses),
        heatOutProcesses: structuredClone(heatOutProcesses),
        customNotes: customNotes
    };
    
    history.push(state);

    if (history.length > HISTORY_LIMIT) {
        history.shift();
    }
    historyIndex = history.length - 1;
    
    saveToSessionStorage(); 
    updateUndoRedoButtons();
}

function loadState(stateToLoad, isInitialLoad = false) {
    points = structuredClone(stateToLoad.points || []);
    customTexts = structuredClone(stateToLoad.customTexts || []);
    isoLines = structuredClone(stateToLoad.isoLines || []);
    domain = structuredClone(stateToLoad.domain || { T: {min: 0, max: 400}, s: {min: 0, max: 10} });
    settings = structuredClone(stateToLoad.settings || { lineColor: '#000000', lineWidth: 2, saturationWidth: 3, showLegend: true, legendTitle: 'Legend' });
    uiPositions = structuredClone(stateToLoad.uiPositions || { legend: {}, notes: {} });
    heatInProcesses = structuredClone(stateToLoad.heatInProcesses || []);
    heatOutProcesses = structuredClone(stateToLoad.heatOutProcesses || []);
    customNotes = stateToLoad.customNotes || "";

    if (isInitialLoad) {
        setBaseDomain();
    }
    
    updateUI();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        loadState(structuredClone(history[historyIndex]));
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        loadState(structuredClone(history[historyIndex]));
    }
}

function loadFromSessionStorage() { 
    const savedStateJSON = sessionStorage.getItem('tsDiagramSession'); 
    
    if (savedStateJSON) {
        try {
            const savedState = JSON.parse(savedStateJSON);
            history = [savedState];
            historyIndex = 0;
            loadState(savedState, true);
            showNotification("Your session has been restored after refresh.", "info");
        } catch (e) {
            console.error("Failed to load state from sessionStorage:", e);
            initializeNewHistory();
        }
    } else {
        initializeNewHistory();
    }
}

function saveToSessionStorage() { 
    if (history.length > 0 && historyIndex >= 0) {
        sessionStorage.setItem('tsDiagramSession', JSON.stringify(history[historyIndex]));
    }
}

function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    if (undoBtn) undoBtn.disabled = historyIndex <= 0;
    if (redoBtn) redoBtn.disabled = historyIndex >= history.length - 1;
}

function importProject(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const projectData = JSON.parse(e.target.result);
            if (!projectData.points) throw new Error('Invalid file format.');
            
            initializeNewHistory(); 
            loadState(projectData, true); 
            requestSaveState(); 

            if (projectData.uiSettings) {
                document.getElementById('showSaturation').checked = projectData.uiSettings.showSaturation;
                document.getElementById('showLines').checked = projectData.uiSettings.showLines;
                document.getElementById('showLabels').checked = projectData.uiSettings.showLabels;
                document.getElementById('showArrows').checked = projectData.uiSettings.showArrows;
                document.getElementById('showLegend').checked = projectData.uiSettings.showLegend;
                document.getElementById('allowZoom').checked = projectData.uiSettings.allowZoom ?? true;
            }
            showNotification('Project loaded successfully!', 'success');
        } catch (error) {
            showNotification('Error reading project file.\n' + error, 'error');
            console.error(error);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function initializeNewHistory() {
    points = []; customTexts = []; isoLines = []; heatInProcesses = []; heatOutProcesses = [];
    customNotes = ""; domain = { T: {min: 0, max: 400}, s: {min: 0, max: 10} };
    history = [];
    historyIndex = -1;
    requestSaveState();
}
function exportProject() { if (points.length === 0 && customTexts.length === 0 && !document.getElementById('customNotes').value && isoLines.length === 0) { showNotification("Nothing to save.", "info"); return; } customNotes = document.getElementById('customNotes').value; const projectData = { version: 6, points, customTexts, customNotes, domain, settings, uiPositions, isoLines, uiSettings: { showSaturation: document.getElementById('showSaturation').checked, showLines: document.getElementById('showLines').checked, showLabels: document.getElementById('showLabels').checked, showArrows: document.getElementById('showArrows').checked, showLegend: document.getElementById('showLegend').checked, allowZoom: document.getElementById('allowZoom').checked } }; const dataStr = JSON.stringify(projectData, null, 2); const dataBlob = new Blob([dataStr], { type: "application/json" }); const link = document.createElement('a'); link.download = "ts-diagram-project.json"; link.href = URL.createObjectURL(dataBlob); link.click(); URL.revokeObjectURL(link.href); }
function updateInputLabels() { const p1s = document.getElementById('prop1_type'), p2s = document.getElementById('prop2_type'), p1l = document.getElementById('prop1_label'), p2l = document.getElementById('prop2_label'), p1i = document.getElementById('prop1_value'), p2i = document.getElementById('prop2_value'); p1l.textContent = allProperties[p1s.value] || 'Property 1'; p2l.textContent = allProperties[p2s.value] || 'Property 2'; p1i.placeholder = propInfo[p1s.value]?.placeholder || ''; p2i.placeholder = propInfo[p2s.value]?.placeholder || ''; }
function validateInputs(p1t, p1v, p2t, p2v) { let temp, quality; if (p1t === 'T' && p2t === 'x') { temp = parseFloat(p1v); quality = parseFloat(p2v); } else if (p1t === 'x' && p2t === 'T') { temp = parseFloat(p2v); quality = parseFloat(p1v); } if (temp !== undefined) { if (temp < 0.01 || temp > 373.95) { showNotification(`Validation Error:\nQuality (x) is only valid for temperatures within the saturation range (0.01°C to 374°C). You entered ${temp}°C.`, 'error'); return false; } if (quality < 0 || quality > 1) { showNotification(`Validation Error:\nQuality (x) must be between 0 and 1. You entered ${quality}.`, 'error'); return false; } } return true; }
async function addSinglePointUnified() {
    const name = document.getElementById('pointName').value.trim();
    const p1t = document.getElementById('prop1_type').value;
    const p2t = document.getElementById('prop2_type').value;
    let p1v_raw = document.getElementById('prop1_value').value.trim();
    let p2v_raw = document.getElementById('prop2_value').value.trim();
    const spinner = document.getElementById('singlePointSpinner');
    if (!name || !p1v_raw || !p2v_raw) return showNotification("Please fill in all required fields.", "error");
    if (!p1t || !p2t) return showNotification("Please select valid properties.", "error");
    if (!validateInputs(p1t, p1v_raw, p2t, p2v_raw)) return;
    const p1v_str_lower = p1v_raw.toLowerCase();
    const p2v_str_lower = p2v_raw.toLowerCase();
    try {
        if ((p1t === 'T' && p1v_str_lower === 'tsat') || (p2t === 'T' && p2v_str_lower === 'tsat')) { const pressure = (p1t === 'P') ? p1v_raw : p2v_raw; if (p1t !== 'P' && p2t !== 'P' || isNaN(parseFloat(pressure))) throw new Error("To use 'Tsat', a numeric pressure value must be provided."); showNotification(`Resolving Tsat for ${pressure} kPa...`, "info"); spinner.style.display = 'block'; const resolvedT = await resolveSaturationValue('P', parseFloat(pressure), 'T'); if (p1t === 'T') p1v_raw = resolvedT; else p2v_raw = resolvedT; showNotification(`Resolved Tsat to ${resolvedT.toFixed(2)} °C.`, "success"); }
        else if ((p1t === 'P' && p1v_str_lower === 'psat') || (p2t === 'P' && p2v_str_lower === 'psat')) { const temp = (p1t === 'T') ? p1v_raw : p2v_raw; if (p1t !== 'T' && p2t !== 'T' || isNaN(parseFloat(temp))) throw new Error("To use 'Psat', a numeric temperature value must be provided."); showNotification(`Resolving Psat for ${temp} °C...`, "info"); spinner.style.display = 'block'; const resolvedP = await resolveSaturationValue('T', parseFloat(temp), 'P'); if (p1t === 'P') p1v_raw = resolvedP; else p2v_raw = resolvedP; showNotification(`Resolved Psat to ${resolvedP.toFixed(2)} kPa.`, "success"); }
    } catch (error) { showNotification(error.message, 'error'); spinner.style.display = 'none'; return; }
    spinner.style.display = 'block';
    const p1v = isNaN(parseFloat(p1v_raw)) ? p1v_raw : parseFloat(p1v_raw);
    const p2v = isNaN(parseFloat(p2v_raw)) ? p2v_raw : parseFloat(p2v_raw);
    const payload = { name, prop1: { type: p1t, value: p1v }, prop2: { type: p2t, value: p2v } };
    try {
        const response = await fetch(API_URL_PAIRS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unknown server error.");
        if (result.notice) showNotification(result.notice, 'info');
        addPoint(result.point);
        document.getElementById('pointName').value = (parseInt(name, 10) || 0) + 1;
        document.getElementById('prop1_value').value = '';
        document.getElementById('prop2_value').value = '';
        requestSaveState();
        updateUI();
    } catch (error) {
        showNotification(`Calculation Error: ${error.message}`, 'error');
    } finally {
        spinner.style.display = 'none';
    }
}
async function resolveSaturationValue(knownProp, knownValue, targetProp) { const payload = { name: "resolver", prop1: { type: knownProp, value: knownValue }, prop2: { type: 'x', value: 0 } }; const response = await fetch(API_URL_PAIRS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || `Could not resolve saturation ${targetProp}.`); return result.point[targetProp]; }
function addConnection(s, t, o={}) {
    if(s>-1 && s<points.length && t>-1 && t<points.length){
        points[s].connections.push({
            target: t, 
            style: 'solid', 
            color: '#000000', 
            lineWidth: 2, 
            label: '', 
            labelOffset: {x:0, y:0}, 
            controlPointOffset: {x: 0, y: 0}, 
            showArrow: true, 
            ...o
        });
    } 
}
function getConn(s, t) { if (!points[s] || !points[t]) return {conn:null}; const fwd = points[s].connections.findIndex(c => c.target === t); if (fwd > -1) return { conn: points[s].connections[fwd], dir: "fwd", src: s, idx: fwd }; const rev = points[t].connections.findIndex(c => c.target === s); if (rev > -1) return { conn: points[t].connections[rev], dir: "rev", src: t, idx: rev }; return {conn:null}; }
function ensureConn(s, t, d = {}) { const f = getConn(s, t); if (f.conn) return f; addConnection(s, t, d); return getConn(s, t); }
function applyConnectionFromUI() { const s = parseInt(document.getElementById('sourcePoint').value), t = parseInt(document.getElementById('targetPoint').value); if (isNaN(s) || isNaN(t) || s === t || !points[s] || !points[t]) return showNotification("Invalid points.", 'error'); const label = document.getElementById('connLabelInput').value.trim(), legLbl = document.getElementById('connLegendInput').value.trim(), showInLegend = document.getElementById('connShowLegend').checked, color = document.getElementById('connColorInput').value, lineWidth = parseFloat(document.getElementById('connWidthInput').value) || 2, style = currentLineStyle, bidi = document.getElementById('bidirectionalChk').checked; const fwd = ensureConn(s, t, { style, color, label, lineWidth }); Object.assign(fwd.conn, { style, color, lineWidth, label, legendLabel: legLbl, showInLegend }); if (bidi) { const rev = ensureConn(t, s, { style, color, label, lineWidth }); Object.assign(rev.conn, { style, color, lineWidth, label, legendLabel: legLbl, showInLegend }); } requestSaveState(); updateUI(); }
function toggleConnectionArrow(sourceIndex, connIndex) { const conn = points[sourceIndex].connections[connIndex]; if (conn) { conn.showArrow = conn.showArrow === false; requestSaveState(); updateUI(); } }
function clearDrawing() {
    if (confirm('Are you sure you want to clear all connections, iso-lines, and custom text? Your points and cycle definitions will not be deleted.')) {
        
        points.forEach(p => {
            p.connections = [];
        });

        isoLines = [];
        customTexts = [];

        requestSaveState();
        updateUI();
        showNotification('All drawing elements (lines, texts, etc.) have been cleared.', 'info');
    }
}
function clearAll() {
    if (confirm('Are you sure you want to clear everything? This will delete all points and start a new project.')) {
        
        points = [];
        customTexts = [];
        isoLines = [];
        heatInProcesses = [];
        heatOutProcesses = [];
        document.getElementById('customNotes').value = "";
        
        activePointIndex = null;
        selectedPointIndex = null;
        
        updatePropertiesPanel(null);
        hideQuickActionMenu();
        
        initializeNewHistory(); 
        
        updateUI();
        
        showNotification('Canvas cleared. New project started.', 'info');
    }
}
function deletePoint(index) { if (!confirm(`Are you sure you want to delete point '${points[index].name}'?`)) return; points.splice(index, 1); points.forEach(p => { p.connections = p.connections.filter(c => c.target !== index); p.connections.forEach(c => { if (c.target > index) c.target--; }); }); activePointIndex = null; hideQuickActionMenu(); requestSaveState(); updateUI(); }
function removeConnection(sourceIndex, connIndex) { points[sourceIndex].connections.splice(connIndex, 1); requestSaveState(); updateUI(); }
function removeCurrentFromUI(){ const s=parseInt(document.getElementById('sourcePoint').value), t=parseInt(document.getElementById('targetPoint').value); const f=getConn(s,t); if(f.conn){ points[f.src].connections.splice(f.idx,1); requestSaveState(); updateUI(); } }
function swapEndpoints(){ const s = document.getElementById('sourcePoint'), t = document.getElementById('targetPoint'), tmp = s.value; s.value = t.value; t.value = tmp; updateConnectionManagerUI(); }
function resetSelectedCurve() {
    const s = parseInt(document.getElementById('sourcePoint').value);
    const t = parseInt(document.getElementById('targetPoint').value);
    if (isNaN(s) || isNaN(t)) return;

    const connInfo = getConn(s, t);
    if (connInfo.conn && connInfo.conn.controlPointOffset) {
        connInfo.conn.controlPointOffset.x = 0;
        connInfo.conn.controlPointOffset.y = 0;
    }

    const revConnInfo = getConn(t, s);
    if (revConnInfo.conn && revConnInfo.conn.controlPointOffset) {
        revConnInfo.conn.controlPointOffset.x = 0;
        revConnInfo.conn.controlPointOffset.y = 0;
    }

    if (connInfo.conn || revConnInfo.conn) {
         requestSaveState();
         draw();
         showNotification('Connection curve has been reset to a straight line.', 'info');
    } else {
        showNotification('No curve to reset for the selected connection.', 'info');
    }
}
function swapSingleConnection(s, i){ const c = points[s].connections[i]; if (!c) return; const t = c.target, snap = {...c}; points[s].connections.splice(i,1); const created = ensureConn(t, s, {}); Object.assign(created.conn, snap, { target: s }); requestSaveState(); updateUI(); }
function openEditModal(index) { const point = points[index]; document.getElementById('editPointIndex').value = index; document.getElementById('editPointName').value = point.name; document.getElementById('editTemp').value = point.T; document.getElementById('editEntropy').value = point.s; document.getElementById('editModal').classList.add('visible'); }
function closeEditModal(){document.getElementById('editModal').classList.remove('visible')}
function savePointData() { 
    const index = document.getElementById('editPointIndex').value; 
    const point = points[index]; 
    point.name = document.getElementById('editPointName').value; 
    point.T = parseFloat(document.getElementById('editTemp').value); 
    point.s = parseFloat(document.getElementById('editEntropy').value); 
    point.visual_T = point.T; 
    point.visual_s = point.s; 
    
    if (point.x !== null && point.x !== undefined) {
        const epsilon = 0.001;
        if (Math.abs(point.x - 0) < epsilon) {
            point.visual_s = getSaturatedLiquidEntropyAtTemp(point.T) || point.s;
        } else if (Math.abs(point.x - 1) < epsilon) {
            point.visual_s = getSaturatedVaporEntropyAtTemp(point.T) || point.s;
        }
    }
    
    closeEditModal(); 
    requestSaveState(); 
    updateUI(); 
}
function showPropertiesModal(index) { 
    const point = points[index]; 
    if (!point) return; 
    
    console.log('===== SHOWING PROPERTIES FOR POINT =====');
    console.log('Point:', point);
    console.log('Saturation data:', point.saturation);
    console.log('Has saturation?', !!point.saturation);
    
    document.getElementById('propertiesModalTitle').textContent = `Properties for Point: ${point.name}`; 
    document.getElementById('properties-list').innerHTML = `
        <li><span class="prop-name">Phase</span><span class="prop-value copyable" onclick="copyToClipboard('${point.phase||'N/A'}')" title="Click to copy">${point.phase||'N/A'} 📋</span></li>
        <li><span class="prop-name">Pressure (P)</span><span class="prop-value copyable" onclick="copyToClipboard('${point.P?point.P.toFixed(2):''}')" title="Click to copy">${point.P?point.P.toFixed(2)+' kPa':'N/A'} 📋</span></li>
        <li><span class="prop-name">Temperature (T)</span><span class="prop-value copyable" onclick="copyToClipboard('${point.T?point.T.toFixed(2):''}')" title="Click to copy">${point.T?point.T.toFixed(2)+' °C':'N/A'} 📋</span></li>
        <li><span class="prop-name">Enthalpy (h)</span><span class="prop-value copyable" onclick="copyToClipboard('${point.h?point.h.toFixed(4):''}')" title="Click to copy">${point.h?point.h.toFixed(4)+' kJ/kg':'N/A'} 📋</span></li>
        <li><span class="prop-name">Entropy (s)</span><span class="prop-value copyable" onclick="copyToClipboard('${point.s?point.s.toFixed(4):''}')" title="Click to copy">${point.s?point.s.toFixed(4)+' kJ/kg·K':'N/A'} 📋</span></li>
        <li><span class="prop-name">Specific Vol. (v)</span><span class="prop-value copyable" onclick="copyToClipboard('${point.v?point.v.toFixed(5):''}')" title="Click to copy">${point.v?point.v.toFixed(5)+' m³/kg':'N/A'} 📋</span></li>
        <li><span class="prop-name">Quality (x)</span><span class="prop-value copyable" onclick="copyToClipboard('${(point.x!==null&&point.x!==undefined)?point.x.toFixed(4):''}')" title="Click to copy">${(point.x!==null&&point.x!==undefined)?point.x.toFixed(4):'N/A'} 📋</span></li>
    `; 
    
    const satSection = document.getElementById('saturation-section');
    const satList = document.getElementById('saturation-list');
    
    console.log('Sat section element:', satSection);
    console.log('Sat list element:', satList);
    
    let satHtml = '';
    
    if (point.saturation && Object.keys(point.saturation).length > 0) {
        const sat = point.saturation;
        console.log('Processing saturation data...');
        
        if (sat.h_f !== undefined || sat.h_fg !== undefined || sat.h_g !== undefined) {
            satHtml += '<li class="prop-group-title">Enthalpy Properties</li>';
            if (!isNaN(sat.h_f)) satHtml += `<li><span class="prop-name">h<sub>f</sub> (Saturated Liquid)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.h_f.toFixed(4)}')" title="Click to copy">${sat.h_f.toFixed(4)} kJ/kg 📋</span></li>`;
            if (!isNaN(sat.h_fg)) satHtml += `<li><span class="prop-name">h<sub>fg</sub> (Evaporation)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.h_fg.toFixed(4)}')" title="Click to copy">${sat.h_fg.toFixed(4)} kJ/kg 📋</span></li>`;
            if (!isNaN(sat.h_g)) satHtml += `<li><span class="prop-name">h<sub>g</sub> (Saturated Vapor)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.h_g.toFixed(4)}')" title="Click to copy">${sat.h_g.toFixed(4)} kJ/kg 📋</span></li>`;
        }
        
        if (sat.s_f !== undefined || sat.s_fg !== undefined || sat.s_g !== undefined) {
            satHtml += '<li class="prop-group-title">Entropy Properties</li>';
            if (!isNaN(sat.s_f)) satHtml += `<li><span class="prop-name">s<sub>f</sub> (Saturated Liquid)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.s_f.toFixed(4)}')" title="Click to copy">${sat.s_f.toFixed(4)} kJ/kg·K 📋</span></li>`;
            if (!isNaN(sat.s_fg)) satHtml += `<li><span class="prop-name">s<sub>fg</sub> (Evaporation)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.s_fg.toFixed(4)}')" title="Click to copy">${sat.s_fg.toFixed(4)} kJ/kg·K 📋</span></li>`;
            if (!isNaN(sat.s_g)) satHtml += `<li><span class="prop-name">s<sub>g</sub> (Saturated Vapor)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.s_g.toFixed(4)}')" title="Click to copy">${sat.s_g.toFixed(4)} kJ/kg·K 📋</span></li>`;
        }
        
        if (sat.v_f !== undefined || sat.v_fg !== undefined || sat.v_g !== undefined) {
            satHtml += '<li class="prop-group-title">Specific Volume Properties</li>';
            if (!isNaN(sat.v_f)) satHtml += `<li><span class="prop-name">v<sub>f</sub> (Saturated Liquid)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.v_f.toFixed(6)}')" title="Click to copy">${sat.v_f.toFixed(6)} m³/kg 📋</span></li>`;
            if (!isNaN(sat.v_fg)) satHtml += `<li><span class="prop-name">v<sub>fg</sub> (Evaporation)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.v_fg.toFixed(6)}')" title="Click to copy">${sat.v_fg.toFixed(6)} m³/kg 📋</span></li>`;
            if (!isNaN(sat.v_g)) satHtml += `<li><span class="prop-name">v<sub>g</sub> (Saturated Vapor)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.v_g.toFixed(6)}')" title="Click to copy">${sat.v_g.toFixed(6)} m³/kg 📋</span></li>`;
        }
        
        if (!isNaN(sat.T_sat)) {
            satHtml += '<li class="prop-group-title">Saturation State</li>';
            satHtml += `<li><span class="prop-name">T<sub>sat</sub> (Saturation Temp.)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.T_sat.toFixed(2)}')" title="Click to copy">${sat.T_sat.toFixed(2)} °C 📋</span></li>`;
        }
        if (!isNaN(sat.P_sat)) {
            if (satHtml.indexOf('Saturation State') === -1) satHtml += '<li class="prop-group-title">Saturation State</li>';
            satHtml += `<li><span class="prop-name">P<sub>sat</sub> (Saturation Press.)</span><span class="prop-value copyable" onclick="copyToClipboard('${sat.P_sat.toFixed(2)}')" title="Click to copy">${sat.P_sat.toFixed(2)} kPa 📋</span></li>`;
        }
    } else {
        console.log('NO saturation data - showing message');
    }
    
    if (satHtml === '') {
        satHtml = '<li style="text-align:center; color:#888; padding:15px; font-style: italic;">⚠️ No saturation data available.<br><br>This point was likely added before the saturation feature was enabled.<br><br>💡 <strong>Solution:</strong> Add a new point using XSteam to see saturation properties.</li>';
    }
    
    console.log('Generated HTML length:', satHtml.length);
    console.log('Setting innerHTML...');
    
    satList.innerHTML = satHtml;
    
    satSection.style.display = 'block';
    satSection.style.visibility = 'visible';
    satSection.style.opacity = '1';
    satSection.classList.remove('collapsed'); 
    
    console.log('Sat section display:', satSection.style.display);
    console.log('Sat section has collapsed class?', satSection.classList.contains('collapsed'));
    console.log('Sat section computed display:', window.getComputedStyle(satSection).display);
    console.log('========================================');
    
    document.getElementById('propertiesModal').classList.add('visible'); 
}

function toggleSaturationProperties() {
    const section = document.getElementById('saturation-section');
    section.classList.toggle('collapsed');
}

function toggleSideSaturationProperties() {
    const section = document.getElementById('side-saturation-section');
    section.classList.toggle('collapsed');
}

function updateSideSaturationProperties(point) {
    const sideSatSection = document.getElementById('side-saturation-section');
    const sideSatList = document.getElementById('side-saturation-list');
    
    if (!sideSatSection || !sideSatList) return;
    
    let satHtml = '';
    
    if (point.saturation && Object.keys(point.saturation).length > 0) {
        const sat = point.saturation;
        
        if (sat.h_f !== undefined || sat.h_fg !== undefined || sat.h_g !== undefined) {
            satHtml += '<li class="prop-group-title">Enthalpy Properties</li>';
            if (!isNaN(sat.h_f)) satHtml += `<li><span class="prop-name">h<sub>f</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.h_f.toFixed(4)}')" title="Click to copy">${sat.h_f.toFixed(4)} kJ/kg 📋</span></li>`;
            if (!isNaN(sat.h_fg)) satHtml += `<li><span class="prop-name">h<sub>fg</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.h_fg.toFixed(4)}')" title="Click to copy">${sat.h_fg.toFixed(4)} kJ/kg 📋</span></li>`;
            if (!isNaN(sat.h_g)) satHtml += `<li><span class="prop-name">h<sub>g</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.h_g.toFixed(4)}')" title="Click to copy">${sat.h_g.toFixed(4)} kJ/kg 📋</span></li>`;
        }
        
        if (sat.s_f !== undefined || sat.s_fg !== undefined || sat.s_g !== undefined) {
            satHtml += '<li class="prop-group-title">Entropy Properties</li>';
            if (!isNaN(sat.s_f)) satHtml += `<li><span class="prop-name">s<sub>f</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.s_f.toFixed(4)}')" title="Click to copy">${sat.s_f.toFixed(4)} kJ/kg·K 📋</span></li>`;
            if (!isNaN(sat.s_fg)) satHtml += `<li><span class="prop-name">s<sub>fg</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.s_fg.toFixed(4)}')" title="Click to copy">${sat.s_fg.toFixed(4)} kJ/kg·K 📋</span></li>`;
            if (!isNaN(sat.s_g)) satHtml += `<li><span class="prop-name">s<sub>g</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.s_g.toFixed(4)}')" title="Click to copy">${sat.s_g.toFixed(4)} kJ/kg·K 📋</span></li>`;
        }
        
        if (sat.v_f !== undefined || sat.v_fg !== undefined || sat.v_g !== undefined) {
            satHtml += '<li class="prop-group-title">Specific Volume</li>';
            if (!isNaN(sat.v_f)) satHtml += `<li><span class="prop-name">v<sub>f</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.v_f.toFixed(6)}')" title="Click to copy">${sat.v_f.toFixed(6)} m³/kg 📋</span></li>`;
            if (!isNaN(sat.v_fg)) satHtml += `<li><span class="prop-name">v<sub>fg</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.v_fg.toFixed(6)}')" title="Click to copy">${sat.v_fg.toFixed(6)} m³/kg 📋</span></li>`;
            if (!isNaN(sat.v_g)) satHtml += `<li><span class="prop-name">v<sub>g</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.v_g.toFixed(6)}')" title="Click to copy">${sat.v_g.toFixed(6)} m³/kg 📋</span></li>`;
        }
        
        if (!isNaN(sat.T_sat)) {
            satHtml += '<li class="prop-group-title">Saturation State</li>';
            satHtml += `<li><span class="prop-name">T<sub>sat</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.T_sat.toFixed(2)}')" title="Click to copy">${sat.T_sat.toFixed(2)} °C 📋</span></li>`;
        }
        if (!isNaN(sat.P_sat)) {
            if (satHtml.indexOf('Saturation State') === -1) satHtml += '<li class="prop-group-title">Saturation State</li>';
            satHtml += `<li><span class="prop-name">P<sub>sat</sub></span><span class="prop-value copyable" onclick="copyToClipboard('${sat.P_sat.toFixed(2)}')" title="Click to copy">${sat.P_sat.toFixed(2)} kPa 📋</span></li>`;
        }
        
        sideSatList.innerHTML = satHtml;
        sideSatSection.style.display = 'block';
        sideSatSection.classList.remove('collapsed'); 
    } else {
        satHtml = '<li style="text-align:center; color:#888; padding:10px; font-size:12px; font-style: italic;">No saturation data</li>';
        sideSatList.innerHTML = satHtml;
        sideSatSection.style.display = 'block';
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(`Copied: ${text}`, 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}
function closePropertiesModal() { 
    document.getElementById('propertiesModal').classList.remove('visible'); 
    const satSection = document.getElementById('saturation-section');
    if (satSection) satSection.classList.remove('collapsed');
}
function toggleSection(element) { element.parentElement.classList.toggle('collapsed'); }
function togglePointLabel(index) { points[index].showLabel = !points[index].showLabel; requestSaveState(); updateUI(); }
function toggleConnectionMode() { connectionMode.active = !connectionMode.active; connectionMode.sourceIndex = null; const btn = document.getElementById('connectModeBtn'); btn.style.background = connectionMode.active ? '#e74c3c' : '#8e44ad'; btn.textContent = connectionMode.active ? '🔗 Cancel' : '🔗 Connect'; canvas.classList.toggle('connecting', connectionMode.active); draw(); }
function toggleFinalizeMode() { isFinalized = !isFinalized; const button = document.getElementById('finalizeButton'); if (isFinalized) { button.textContent = "Continue Editing"; button.style.background = '#ffc107'; button.style.color = '#333'; selectedPointIndex = null; } else { button.textContent = "Presentation"; button.style.background = '#17a2b8'; button.style.color = 'white'; } document.getElementById('showLabels').checked = isFinalized; hideQuickActionMenu(); draw(); }
function selectLineStyle(style) { currentLineStyle = style; document.querySelectorAll('.style-btn').forEach(btn => btn.classList.remove('active')); document.querySelector(`.style-btn[data-style="${style}"]`).classList.add('active'); }
function updateSettings(key, value) { settings[key] = value; if (key === 'lineWidth') document.getElementById('lineWidthValue').textContent = parseFloat(value).toFixed(1); if (key === 'saturationWidth') document.getElementById('saturationWidthValue').textContent = parseFloat(value).toFixed(1); draw(); }
function updatePointProperty(property, value) { const selector = document.getElementById('pointAppearanceSelector'), pointIndex = parseInt(selector.value); if (pointIndex > -1 && points[pointIndex]) { points[pointIndex][property] = (property === 'size') ? parseInt(value, 10) : value; if (property === 'size') document.getElementById('pointSizeValue').textContent = value; draw(); requestSaveState(); } }

function autoScaleAxes() {
    hideQuickActionMenu();

    const criticalPoint = { T: 374.14, s: 4.43 };

    let maxT = criticalPoint.T; 
    let maxs = criticalPoint.s; 

    const validPoints = points.filter(p => 
        p.visual_T !== null && !isNaN(p.visual_T) &&
        p.visual_s !== null && !isNaN(p.visual_s)
    );

    if (validPoints.length > 0) {
        validPoints.forEach(p => {
            if (p.visual_T > maxT) maxT = p.visual_T;
            if (p.visual_s > maxs) maxs = p.visual_s;
        });
    }

    const tPadding = (maxT - 0) * 0.10;
    const sPadding = (maxs - 0) * 0.10;
    
    domain.T.min = 0;
    domain.s.min = 0;
    
    domain.T.max = Math.ceil((maxT + tPadding) / 50) * 50; 
    domain.s.max = Math.ceil(maxs + sPadding); 

    if (validPoints.length === 0) {
        domain.T.max = 400;
        domain.s.max = 10;
    }

    setBaseDomain(); 
    draw();
}
function makeDraggable(element, handle, key) { let isDragging = false, offsetX, offsetY; handle.addEventListener('mousedown', (e) => { isDragging = true; const rect = element.getBoundingClientRect(); offsetX = e.clientX - rect.left; offsetY = e.clientY - rect.top; element.style.transition = 'none'; }); document.addEventListener('mousemove', (e) => { if (!isDragging) return; const wrapper = document.getElementById('canvas-wrapper'), wrapperRect = wrapper.getBoundingClientRect(); let newLeft = (e.clientX - wrapperRect.left) - offsetX, newTop = (e.clientY - wrapperRect.top) - offsetY; newLeft = Math.max(0, Math.min(newLeft, wrapperRect.width - element.offsetWidth)); newTop = Math.max(0, Math.min(newTop, wrapperRect.height - element.offsetHeight)); element.style.left = `${newLeft}px`; element.style.top = `${newTop}px`; }); document.addEventListener('mouseup', () => { isDragging = false; element.style.transition = ''; uiPositions[key] = { left: element.style.left, top: element.style.top }; requestSaveState(); }); }
function updateLegend() { const legendBox = document.getElementById('legend-box'); if (!settings.showLegend) { legendBox.style.display = 'none'; return; } const legendContent = legendBox.querySelector('.legend-content'), legendHeader = legendBox.querySelector('.legend-header'); legendHeader.textContent = settings.legendTitle || ''; legendHeader.style.borderBottom = settings.legendTitle ? '2px solid #2a5298' : 'none'; let legendItems = []; if (document.getElementById('showSaturation').checked) { legendItems.push({ text: 'Saturation Liquid Line', color: '#2196F3', style: 'solid', lineWidth: settings.saturationWidth }); legendItems.push({ text: 'Saturation Vapor Line', color: '#F44336', style: 'solid', lineWidth: settings.saturationWidth }); } points.forEach(p => { p.connections.forEach(conn => { if (conn.showInLegend && conn.legendLabel) { legendItems.push({ text: conn.legendLabel, color: conn.color || settings.lineColor, style: conn.style, lineWidth: conn.lineWidth || settings.lineWidth }); } }); }); if (legendItems.length === 0) { legendBox.style.display = 'none'; return; } legendContent.innerHTML = ''; legendItems.forEach(item => { const itemDiv = document.createElement('div'); itemDiv.className = 'legend-item'; let dashArray = (item.style === 'dashed')?'stroke-dasharray="5, 3"':(item.style === 'dotted')?'stroke-dasharray="1, 2"':''; itemDiv.innerHTML = `<svg width="40" height="10"><line x1="0" y1="5" x2="40" y2="5" stroke="${item.color}" stroke-width="${item.lineWidth}" ${dashArray} stroke-linecap="round"/></svg><span>${item.text}</span>`; legendContent.appendChild(itemDiv); }); legendBox.style.display = 'block'; }
function esc(text) { if (!text) return ''; return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&quot;').replace(/'/g, '&#039;'); }
function catmullRomToBezierPaths_Sat(toSvg) { const combined = [...saturationData.liquid, ...saturationData.vapor.slice(1)], pts = combined.map(p => toSvg(p.s, p.T)); function getBezierSegments(allPts, tension=0.5) { const segs = [], t=tension; for(let i=0;i<allPts.length-1;i++){ const p0=(i>0)?allPts[i-1]:allPts[i],p1=allPts[i],p2=allPts[i+1],p3=(i<allPts.length-2)?allPts[i+2]:allPts[i+1]; const cp1x=p1.x+(p2.x-p0.x)/6*t,cp1y=p1.y+(p2.y-p0.y)/6*t,cp2x=p2.x-(p3.x-p1.x)/6*t,cp2y=p2.y-(p3.y-p1.y)/6*t; segs.push({p1,p2,cp1x,cp1y,cp2x,cp2y});} return segs; } const segments = getBezierSegments(pts, 0.9), criticalIdx=saturationData.liquid.length-1; const pathBlue=[`M ${segments[0].p1.x} ${segments[0].p1.y}`]; for(let i=0;i<=criticalIdx-1;i++){const s=segments[i]; pathBlue.push(`C ${s.cp1x} ${s.cp1y}, ${s.cp2x} ${s.cp2y}, ${s.p2.x} ${s.p2.y}`);} const pathRed=[`M ${segments[criticalIdx].p1.x} ${segments[criticalIdx].p1.y}`]; for(let i=criticalIdx; i<segments.length; i++){const s=segments[i]; pathRed.push(`C ${s.cp1x} ${s.cp1y}, ${s.cp2x} ${s.cp2y}, ${s.p2.x} ${s.p2.y}`);} return {blue:pathBlue.join(' '),red:pathRed.join(' ')};}
function downloadImage() { hideQuickActionMenu(); const wasFinalized = isFinalized; if (!wasFinalized) { isFinalized = true; draw(); } const exportCanvas = document.createElement('canvas'); exportCanvas.width = 3840; exportCanvas.height = 2160; const exportCtx = exportCanvas.getContext('2d'); const originalCanvas = canvas, originalCtx = ctx, originalPadding = { ...padding }; Object.assign(padding, { top: 120, right: 150, bottom: 210, left: 210 }); canvas = exportCanvas; ctx = exportCtx; redrawCanvas(true, originalCanvas); exportCanvas.toBlob(blob => { const link = document.createElement("a"); link.download = "ts-diagram-4k.png"; link.href = URL.createObjectURL(blob); link.click(); URL.revokeObjectURL(link.href); canvas = originalCanvas; ctx = originalCtx; Object.assign(padding, originalPadding); if (!wasFinalized) { isFinalized = false; } draw(); }); }
function drawUIToCanvas(targetCtx, originalCanvas) { if (!originalCanvas) return; const originalRect = originalCanvas.getBoundingClientRect(); const scaleX = targetCtx.canvas.width / originalRect.width; const scaleY = targetCtx.canvas.height / originalRect.height; const DPR = (window.devicePixelRatio || 1); const s = Math.min(scaleX, scaleY) * Math.sqrt(DPR); const clamp = (min, val, max) => Math.max(min, Math.min(val, max)); const fontSizes = { legendTitle: Math.round(clamp(18, 22 * s, 28)), legendItem:  Math.round(clamp(12, 14 * s, 25)), notesTitle:  Math.round(clamp(14, 16 * s, 28)), notesBody:   Math.round(clamp(10, 12 * s, 25)), }; const lineHeights = { legendItem: Math.round(fontSizes.legendItem * 1.4), notesBody:  Math.round(fontSizes.notesBody  * 1.6), }; const strokeWidths = { legendDivider: clamp(2, 2.5 * s, 4), legendSample:  clamp(2, 2.5 * s, 4), boxBorder:     clamp(1, 1 * s, 2), saturation:    clamp(1, 1.5 * s, 3), }; const radii = { box: clamp(8, 12 * s, 16), }; const spacings = { boxPad: Math.round(clamp(10, 12 * s, 18)), innerGap: Math.round(clamp(8, 10 * s, 14)), titleGap: Math.round(clamp(10, 12 * s, 16)), itemGap:  Math.round(clamp(8, 10 * s, 14)), sampleStartX: Math.round(clamp(16, 20 * s, 28)), sampleEndX:   Math.round(clamp(56, 70 * s, 90)), textOffsetX:  Math.round(clamp(66, 85 * s, 110)), shadowBlur:   clamp(8, 16 * s, 24), shadowOffsetY: clamp(4, 8 * s, 12), }; if (settings.showLegend) { const legendBox = document.getElementById('legend-box'); const rect = legendBox.getBoundingClientRect(); const wrapperRect = document.getElementById('canvas-wrapper').getBoundingClientRect(); const x = (rect.left - wrapperRect.left) * scaleX; const y = (rect.top - wrapperRect.top) * scaleY; const width = rect.width * scaleX; let legendItems = []; if (document.getElementById('showSaturation').checked) { legendItems.push({ text: 'Saturation Liquid Line', color: '#2196F3', style: 'solid', lineWidth: settings.saturationWidth }); legendItems.push({ text: 'Saturation Vapor Line',  color: '#F44336', style: 'solid', lineWidth: settings.saturationWidth }); } points.forEach(p => { p.connections.forEach(conn => { if (conn.showInLegend && conn.legendLabel) { legendItems.push({ text: conn.legendLabel, color: conn.color || settings.lineColor, style: conn.style, lineWidth: conn.lineWidth || settings.lineWidth }); } }); }); const hasTitle = Boolean(settings.legendTitle); const titleBlock = hasTitle ? (fontSizes.legendTitle + spacings.titleGap + strokeWidths.legendDivider + spacings.titleGap) : 0; const contentBlock = legendItems.length * (lineHeights.legendItem + spacings.itemGap); const height = (spacings.boxPad) + titleBlock + contentBlock + (spacings.boxPad); targetCtx.save(); targetCtx.fillStyle = 'rgba(255, 255, 255, 0.9)'; targetCtx.strokeStyle = 'rgba(0, 0, 0, 0.1)'; targetCtx.lineWidth = strokeWidths.boxBorder; targetCtx.shadowColor = 'rgba(0,0,0,0.15)'; targetCtx.shadowBlur = spacings.shadowBlur; targetCtx.shadowOffsetY = spacings.shadowOffsetY; targetCtx.beginPath(); if (targetCtx.roundRect) { targetCtx.roundRect(x, y, width, height, radii.box); } else { targetCtx.rect(x, y, width, height); } targetCtx.fill(); targetCtx.shadowColor = 'transparent'; targetCtx.stroke(); targetCtx.restore(); let currentY = y + spacings.boxPad; if (hasTitle) { targetCtx.font = `700 ${fontSizes.legendTitle}px system-ui, Arial, sans-serif`; targetCtx.fillStyle = '#2a5298'; targetCtx.textAlign = 'left'; targetCtx.textBaseline = 'top'; targetCtx.fillText(settings.legendTitle, x + spacings.boxPad, currentY); currentY += fontSizes.legendTitle + spacings.titleGap; targetCtx.strokeStyle = '#2a5298'; targetCtx.lineWidth = strokeWidths.legendDivider; targetCtx.beginPath(); targetCtx.moveTo(x + spacings.boxPad, currentY); targetCtx.lineTo(x + width - spacings.boxPad, currentY); targetCtx.stroke(); currentY += spacings.titleGap; } legendItems.forEach(item => { targetCtx.strokeStyle = item.color; targetCtx.lineWidth = (item.lineWidth || settings.lineWidth) * (strokeWidths.legendSample / 2); const dash = (item.style === 'dashed') ? [10, 5] : (item.style === 'dotted') ? [2, 3] : []; if (dash.length > 0) targetCtx.setLineDash(dash.map(d => Math.max(1, Math.round(d * s)))); const midY = currentY + Math.round(lineHeights.legendItem / 2); targetCtx.beginPath(); targetCtx.moveTo(x + spacings.sampleStartX, midY); targetCtx.lineTo(x + spacings.sampleEndX,   midY); targetCtx.stroke(); targetCtx.setLineDash([]); targetCtx.font = `${fontSizes.legendItem}px system-ui, Arial, sans-serif`; targetCtx.fillStyle = '#333'; targetCtx.textAlign = 'left'; targetCtx.textBaseline = 'middle'; targetCtx.fillText(item.text, x + spacings.textOffsetX, midY); currentY += lineHeights.legendItem + spacings.itemGap; }); } const notes = document.getElementById('customNotes').value; if (notes) { const notesBox = document.getElementById('custom-notes-container'); const rect = notesBox.getBoundingClientRect(); const wrapperRect = document.getElementById('canvas-wrapper').getBoundingClientRect(); const x = (rect.left - wrapperRect.left) * scaleX; const y = (rect.top - wrapperRect.top) * scaleY; targetCtx.font = `700 ${fontSizes.notesTitle}px system-ui, Arial, sans-serif`; targetCtx.fillStyle = '#2a5298'; targetCtx.textAlign = 'left'; targetCtx.textBaseline = 'top'; targetCtx.fillText("Notes", x, y); const lines = notes.split('\n'); targetCtx.font = `${fontSizes.notesBody}px system-ui, Arial, sans-serif`; targetCtx.fillStyle = '#333'; const bodyStartY = y + fontSizes.notesTitle + Math.round(spacings.innerGap * 1.25); const stepY = lineHeights.notesBody; for (let i = 0; i < lines.length; i++) { targetCtx.fillText(lines[i], x, bodyStartY + i * stepY); } } }
function downloadSVG() { hideQuickActionMenu(); const wasFinalized = isFinalized; if (!wasFinalized) toggleFinalizeMode(); const w = 1920, h = 1080; let svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="background-color:white; font-family: 'Segoe UI', Arial, sans-serif;">`; const tempCanvas = { width: w, height: h }; const toSvg = (s, T) => ({ x: padding.left + ((s - domain.s.min) / (domain.s.max - domain.s.min)) * (w - padding.left - padding.right), y: h - padding.bottom - ((T - domain.T.min) / (domain.T.max - domain.T.min)) * (h - padding.top - padding.bottom) }); for(let t = domain.T.min; t <= domain.T.max; t+=(domain.T.max-domain.T.min)/8) { const y = toSvg(0, t).y; svg += `<line x1="${padding.left}" y1="${y}" x2="${w - padding.right}" y2="${y}" stroke="#e8e8e8" stroke-width="0.5"/>`; } for(let s = domain.s.min; s <= domain.s.max; s+=(domain.s.max-domain.s.min)/10) { const x = toSvg(s, 0).x; svg += `<line x1="${x}" y1="${padding.top}" x2="${x}" y2="${h - padding.bottom}" stroke="#e8e8e8" stroke-width="0.5"/>`; } for(let t = domain.T.min; t <= domain.T.max; t+=(domain.T.max-domain.T.min)/8) { const y = toSvg(0, t).y; svg += `<text x="${padding.left - 10}" y="${y + 3}" text-anchor="end" font-size="10px" fill="#000">${t.toFixed(0)}</text>`; } for(let s = domain.s.min; s <= domain.s.max; s+=(domain.s.max-domain.s.min)/10) { const x = toSvg(s, 0).x; svg += `<text x="${x}" y="${h - padding.bottom + 15}" text-anchor="middle" font-size="10px" fill="#000">${s.toFixed(1)}</text>`; } svg += `<text x="${w/2}" y="${h-padding.bottom+40}" text-anchor="middle" font-weight="bold" font-size="13px">Entropy, s (kJ/kg·K)</text><text transform="translate(${padding.left - 50}, ${h/2}) rotate(-90)" text-anchor="middle" font-weight="bold" font-size="13px">Temperature, T (°C)</text>`; if (document.getElementById('showSaturation').checked) { const p = catmullRomToBezierPaths_Sat(toSvg); svg += `<path d="${p.blue}" stroke="#2196F3" stroke-width="${settings.saturationWidth}" fill="none"/><path d="${p.red}" stroke="#F44336" stroke-width="${settings.saturationWidth}" fill="none"/>`; } if (document.getElementById('showLines').checked) { points.forEach(p => { p.connections.forEach(conn => { const target = points[conn.target]; if (!target) return; const p1 = toSvg(p.visual_s, p.visual_T), p2 = toSvg(target.visual_s, target.visual_T); let da=(conn.style==='dashed')?'stroke-dasharray="10,5"':(conn.style==='dotted')?'stroke-dasharray="2,3"':''; svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${conn.color||'#000'}" stroke-width="${conn.lineWidth||2}" ${da}/>`; if (document.getElementById('showArrows').checked && conn.showArrow !== false) { const midX=(p1.x+p2.x)/2, midY=(p1.y+p2.y)/2, ang=Math.atan2(p2.y-p1.y,p2.x-p1.x)*180/Math.PI; svg += `<polygon points="0,0 -10,-6 -10,6" fill="${conn.color||'#000'}" transform="translate(${midX},${midY}) rotate(${ang})"/>`; } if (conn.label) { const midX=(p1.x+p2.x)/2, midY=(p1.y+p2.y)/2; const ang=Math.atan2(p2.y-p1.y,p2.x-p1.x), isDef=conn.labelOffset.x===0&&conn.labelOffset.y===0; const oX=isDef?-Math.sin(ang)*16:conn.labelOffset.x, oY=isDef?Math.cos(ang)*16:conn.labelOffset.y; const lX=midX+oX, lY=midY+oY; const tEl=`<text x="${lX}" y="${lY}" text-anchor="middle" dominant-baseline="middle" font-size="12px" fill="${conn.color||'#000'}">${esc(conn.label)}</text>`; const tW=conn.label.length*7, tH=12; const bg=`<rect x="${lX-tW/2-2}" y="${lY-tH/2-2}" width="${tW+4}" height="${tH+4}" fill="white"/>`; if(!isDef) svg+=`<line x1="${midX}" y1="${midY}" x2="${lX}" y2="${lY}" stroke="#ccc" stroke-width="1" stroke-dasharray="2,3"/>`; svg+=bg+tEl; } }); }); } points.forEach(p => { const { x, y } = toSvg(p.visual_s, p.visual_T); if (document.getElementById('showLabels').checked && p.showLabel) { const lX=x+p.labelOffset.x, lY=y+p.labelOffset.y; if(p.labelOffset.x!==0||p.labelOffset.y!==-15) svg+=`<line x1="${x}" y1="${y}" x2="${lX}" y2="${lY-6}" stroke="#ccc" stroke-width="1" stroke-dasharray="2,3"/>`; svg+=`<text x="${lX}" y="${lY}" text-anchor="middle" font-weight="bold" font-size="12px" fill="${p.labelColor||'#000'}">${esc(p.name)}</text>`; } svg+=`<circle cx="${x}" cy="${y}" r="${p.size||6}" fill="${p.color||'#000'}" stroke="#fff" stroke-width="2"/>`; }); customTexts.forEach(t => { svg+=`<text x="${t.x}" y="${t.y}" text-anchor="middle" dominant-baseline="middle" font-size="${t.size}px" fill="${t.color}">${esc(t.text)}</text>`; }); if (settings.showLegend) { let legendItems = []; if(document.getElementById('showSaturation').checked){legendItems.push({text:'Saturation Liquid Line',color:'#2196F3',style:'solid',lineWidth:settings.saturationWidth}); legendItems.push({text:'Saturation Vapor Line',color:'#F44336',style:'solid',lineWidth:settings.saturationWidth});} points.forEach(p => p.connections.forEach(conn => { if (conn.showInLegend && conn.legendLabel) { legendItems.push({text: conn.legendLabel,color: conn.color||'#000',style: conn.style,lineWidth: conn.lineWidth||2});}})); if(legendItems.length > 0) { const legendBox = document.getElementById('legend-box').getBoundingClientRect(); const wrapperBox = document.getElementById('canvas-wrapper').getBoundingClientRect(); const scaleX = w / wrapperBox.width; const scaleY = h / wrapperBox.height; const lx = (legendBox.left-wrapperBox.left)*scaleX, ly = (legendBox.top-wrapperBox.top)*scaleY; const lineHeight=22, boxPadding=12, titleHeight=settings.legendTitle?28:0; const boxHeight = legendItems.length * lineHeight + boxPadding * 2 + titleHeight; svg += `<g transform="translate(${lx}, ${ly})"><rect x="0" y="0" width="${legendBox.width*scaleX}" height="${boxHeight}" rx="8" fill="rgba(255,255,255,0.9)" stroke="#bbb"/>`; if(settings.legendTitle){ svg += `<text x="${boxPadding}" y="${boxPadding+4}" font-weight="bold" fill="#2a5298">${esc(settings.legendTitle)}</text><line x1="${boxPadding}" y1="${boxPadding*2}" x2="${legendBox.width*scaleX-boxPadding}" y2="${boxPadding*2}" stroke="#2a5298" stroke-width="2"/>`; } legendItems.forEach((item, index) => { const itemY=titleHeight+boxPadding+(index*lineHeight)+10; let da=(item.style==='dashed')?'stroke-dasharray="8,4"':(item.style==='dotted')?'stroke-dasharray="2,2"':''; svg += `<line x1="${boxPadding}" y1="${itemY}" x2="${boxPadding+40}" y2="${itemY}" stroke="${item.color}" stroke-width="${item.lineWidth}" ${da}/><text x="${boxPadding+50}" y="${itemY}" dominant-baseline="middle" font-size="12px" fill="#333">${esc(item.text)}</text>`; }); svg += `</g>`; } } const notes = document.getElementById('customNotes').value; if(notes){ const notesBox = document.getElementById('custom-notes-container').getBoundingClientRect(); const wrapperBox = document.getElementById('canvas-wrapper').getBoundingClientRect(); const scaleX = w / wrapperBox.width; const scaleY = h / wrapperBox.height; const nx = (notesBox.left-wrapperBox.left)*scaleX, ny=(notesBox.top-wrapperBox.top)*scaleY; const lines = notes.split('\n'); let textBlock = `<g transform="translate(${nx+10}, ${ny+30})"><text font-size="12px" fill="#333">`; lines.forEach((line) => { textBlock += `<tspan x="0" dy="1.2em">${esc(line)}</tspan>`; }); textBlock += `</text></g>`; svg += textBlock; } svg += '</svg>'; const blob = new Blob([svg], { type: 'image/svg+xml' }); const link = document.createElement("a"); link.download = "ts-diagram.svg"; link.href = URL.createObjectURL(blob); link.click(); URL.revokeObjectURL(link.href); if (!wasFinalized) toggleFinalizeMode(); }
function isColor(strColor){ const s = new Option().style; s.color = strColor; return s.color !== ''; }

function loadPhToEditor() {
    const editor = document.getElementById('ph_table_input');
    
    const validPoints = points.filter(p => p.P !== null && !isNaN(p.P) && p.h !== null && !isNaN(p.h));

    if (validPoints.length === 0) {
        showNotification("No points with valid P and h data to load.", "info");
        return;
    }

    const lines = validPoints.map(p => {
        const name = p.name;
        const pressure = p.P.toFixed(4);
        const enthalpy = p.h.toFixed(4);
        return `${name}\t${pressure}\t${enthalpy}`;
    });

    editor.value = lines.join('\n');
    showNotification(`${validPoints.length} points loaded into the editor.`, 'success');
}
function importPoints() {
    const text = document.getElementById('tableInput').value.trim();
    if (!text) {
        showNotification("Text area is empty.", "info");
        return;
    }
    requestSaveState();
    const lines = text.split('\n');
    let updatedCount = 0;
    let addedCount = 0;
    lines.forEach(line => {
        const parts = line.trim().split(/[\t\s,]+/);
        if (parts.length < 3 || isNaN(parseFloat(parts[1])) || isNaN(parseFloat(parts[2]))) return;
        const [name, T_str, s_str] = parts;
        const T = parseFloat(T_str);
        const s = parseFloat(s_str);
        const existingPointIndex = points.findIndex(p => p.name === name);
        if (existingPointIndex !== -1) {
            const point = points[existingPointIndex];
            point.T = T;
            point.s = s;
            point.visual_T = T;
            point.visual_s = s;
            Object.assign(point, { P: null, h: null, v: null, x: null, phase: 'Custom' });
            updatedCount++;
        } else {
            addPoint({ name, T, s, phase: 'Custom' });
            addedCount++;
        }
    });
    autoScaleAxes();
    updateUI();
    showNotification(`Applied changes: ${updatedCount} updated, ${addedCount} added.`, 'success');
}

async function importAndCalculate_PH_Data() {
    const text = document.getElementById('ph_table_input').value.trim();
    if (!text) {
        showNotification("Text area is empty.", "info");
        return;
    }
    requestSaveState();
    const spinner = document.getElementById('batchSpinner');
    spinner.style.display = 'block';
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    let updatedCount = 0;
    let addedCount = 0;
    const failedPoints = [];

    for (const line of lines) {
        const parts = line.split(/[\t\s,]+/).filter(p => p);
        if (parts.length < 3) {
            failedPoints.push({ line: line, reason: "Invalid format." });
            continue; 
        }
        const [name, p_val_str, h_val_str] = parts;
        const p_val = parseFloat(p_val_str);
        const h_val = isNaN(parseFloat(h_val_str)) ? h_val_str : parseFloat(h_val_str);

        if (isNaN(p_val) || (isNaN(h_val) && h_val_str.toLowerCase() !== 'hf' && h_val_str.toLowerCase() !== 'hg')) {
            failedPoints.push({ line: `Point '${name}'`, reason: `Invalid numeric value for P or h.` });
            continue;
        }

        const payload = { 
            name: name, 
            prop1: { type: 'P', value: p_val }, 
            prop2: { type: 'h', value: h_val } 
        };

        try {
            const response = await fetch(API_URL_PAIRS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Calculation failed on server.');
            }

            const newPointData = result.point;
            const existingPointIndex = points.findIndex(p => p.name === newPointData.name);
            
            if (existingPointIndex !== -1) {
                const oldPoint = points[existingPointIndex];
                
                points[existingPointIndex] = { 
                    ...oldPoint,
                    ...newPointData,
                    visual_T: newPointData.T,
                    visual_s: newPointData.s
                };
                
                const point = points[existingPointIndex];
                if (point.x !== null && point.x !== undefined) {
                    const epsilon = 0.001;
                    if (Math.abs(point.x - 0) < epsilon) {
                        point.visual_s = getSaturatedLiquidEntropyAtTemp(point.T) || point.s;
                    } else if (Math.abs(point.x - 1) < epsilon) {
                        point.visual_s = getSaturatedVaporEntropyAtTemp(point.T) || point.s;
                    }
                }
                
                updatedCount++;
            } else {
                addPoint(newPointData);
                addedCount++;
            }
        } catch (error) {
            failedPoints.push({ line: `Point '${name}'`, reason: error.message });
        }
    } 

    spinner.style.display = 'none';

    if (updatedCount > 0 || addedCount > 0) {
        autoScaleAxes();
        updateUI();
        showNotification(`Applied changes: ${updatedCount} updated, ${addedCount} added.`, 'success');
    }

    if (failedPoints.length > 0) {
        const errorDetails = failedPoints.map(f => `- ${f.line}: ${f.reason}`).slice(0, 5).join('\n');
        const fullError = `${failedPoints.length} points failed:\n${errorDetails}${failedPoints.length > 5 ? '\n(See console for more details)' : ''}`;
        showNotification(fullError, 'error');
        console.error("Full list of failed points:", failedPoints);
    }
}

function loadConnectionsToEditor() {
    const editor = document.getElementById('bulkConnectionsEditor');
    const allConnections = [];

    points.forEach((p, sourceIndex) => {
        p.connections.forEach(conn => {
            const targetIndex = conn.target;
            if (points[targetIndex]) {
                allConnections.push({
                    sourceName: p.name,
                    targetName: points[targetIndex].name,
                    conn: conn
                });
            }
        });
    });

    allConnections.sort((a, b) => {
        const sourceA = isNaN(parseInt(a.sourceName)) ? a.sourceName : parseInt(a.sourceName);
        const sourceB = isNaN(parseInt(b.sourceName)) ? b.sourceName : parseInt(b.sourceName);
        const targetA = isNaN(parseInt(a.targetName)) ? a.targetName : parseInt(a.targetName);
        const targetB = isNaN(parseInt(b.targetName)) ? b.targetName : parseInt(b.targetName);

        if (sourceA < sourceB) return -1;
        if (sourceA > sourceB) return 1;
        if (targetA < targetB) return -1;
        if (targetA > targetB) return 1;
        return 0;
    });

    const lines = allConnections.map(item => {
        const { sourceName, targetName, conn } = item;
        const parts = [
            sourceName,
            targetName,
            `"${conn.label || ''}"`,
            conn.color,
            conn.style,
            conn.lineWidth
        ];
        return parts.filter(part => part !== undefined && part !== null).join(',');
    });

    editor.value = lines.join('\n');
    showNotification('Current connections sorted and loaded into the editor.', 'info');
}

async function applyBulkConnections() {
    const confirmationMessage = `
This will parse the text in the editor:
- Create new points if defined (e.g., "10a(p=100,h=2500)").
- Add or update connections (e.g., "1,2,red").
- Update properties of existing points if defined (e.g., "10a(color=blue,size=10)").
Existing connections not mentioned will be kept. Continue?
    `;
    if (!confirm(confirmationMessage)) {
        return;
    }

    const editor = document.getElementById('bulkConnectionsEditor');
    const text = editor.value.trim();
    saveState();

    const spinner = document.getElementById('batchSpinner');
    spinner.style.display = 'block';

    const lines = text.split('\n').filter(line => line.trim());
    let newPointsToCreate = [];
    const connectionsToMake = [];
    const pointsToUpdate = [];
    const errorLines = [];

    const parsePointDefinition = (pointStr, index) => {
        const match = pointStr.match(/^([a-zA-Z0-9_.-]+)\((.+)\)$/);
        if (!match) return null;
        const name = match[1];
        const paramsStr = match[2];
        const params = paramsStr.split(',').map(p => p.trim().split('='));
        const thermoProps = [];
        const visualProps = {};
        params.forEach(param => {
            if (param.length !== 2) return;
            const key = param[0].trim().toLowerCase();
            const value = param[1].trim();
            const thermoKeys = ['p', 't', 'h', 's', 'x', 'v'];
            const visualKeys = ['color', 'size', 'labelcolor'];
            if (thermoKeys.includes(key)) thermoProps.push({ type: key, value: value });
            else if (visualKeys.includes(key)) visualProps[key] = value;
        });
        if (thermoProps.length > 0 && thermoProps.length !== 2) {
            errorLines.push({ line: index + 1, reason: `Point '${name}' must have 0 or 2 thermodynamic properties.` });
            return null;
        }
        return { name, thermoProps, visualProps, line: index + 1 };
    };

    for (const [index, line] of lines.entries()) {
        const parts = line.match(/([a-zA-Z0-9_.-]+\(.*?\)|"[^"]*"|[^,]+)(?=\s*,|\s*$)/g) || [];
        if (parts.length === 1 && parts[0].includes('(')) {
            const pointDef = parsePointDefinition(parts[0], index);
            if (pointDef) {
                if (points.some(p => p.name === pointDef.name)) pointsToUpdate.push(pointDef);
                else newPointsToCreate.push(pointDef);
            }
            continue;
        }
        if (parts.length < 2) {
            errorLines.push({ line: index + 1, reason: "Invalid format: Line must define a point or a connection (source,target)." });
            continue;
        }
        const [sourceStr, targetStr, ...remainingParts] = parts.map(p => p.trim());
        let sourceName = sourceStr;
        let targetName = targetStr;
        const sourceDef = parsePointDefinition(sourceStr, index);
        const targetDef = parsePointDefinition(targetStr, index);
        if (sourceDef) {
            sourceName = sourceDef.name;
            if (points.some(p => p.name === sourceName)) pointsToUpdate.push(sourceDef);
            else if (!newPointsToCreate.some(p => p.name === sourceName)) newPointsToCreate.push(sourceDef);
        }
        if (targetDef) {
            targetName = targetDef.name;
            if (points.some(p => p.name === targetName)) pointsToUpdate.push(targetDef);
            else if (!newPointsToCreate.some(p => p.name === targetName)) newPointsToCreate.push(targetDef);
        }
        connectionsToMake.push({ sourceName, targetName, remainingParts, line: index + 1 });
    }
    
    try {
        const allPointsToProcess = [...newPointsToCreate, ...pointsToUpdate];
        allPointsToProcess.forEach(pointDef => {
            pointDef.thermoProps.forEach(prop => {
                if (typeof prop.value === 'string' && prop.value.startsWith('*')) {
                    const refPointName = prop.value.substring(1);
                    const refPoint = points.find(p => p.name === refPointName);
                    if (!refPoint) throw new Error(`Reference point '*${refPointName}' not found for creating new point '${pointDef.name}'.`);
                    
                    const key_lower = prop.type.toLowerCase(); 
                    const key_upper = prop.type.toUpperCase(); 

                    if (refPoint[key_upper] !== null && refPoint[key_upper] !== undefined) {
                        prop.value = refPoint[key_upper];
                    } else if (refPoint[key_lower] !== null && refPoint[key_lower] !== undefined) {
                        prop.value = refPoint[key_lower];
                    } else {
                        throw new Error(`Property '${prop.type}' not found or is null in reference point '${refPointName}'.`);
                    }

                } else if (!isNaN(parseFloat(prop.value))) {
                    prop.value = parseFloat(prop.value);
                } else {
                    const allowedStrings = ['hf', 'hg', 'sf', 'sg', 'vf', 'vg'];
                    if (!allowedStrings.includes(prop.value.toLowerCase())) {
                        throw new Error(`Invalid non-numeric value '${prop.value}' for property '${prop.type}'.`);
                    }
                }
            });
        });
    } catch(error) {
        showNotification(`Error resolving references: ${error.message}`, 'error');
        spinner.style.display = 'none';
        return;
    }

    if (newPointsToCreate.length > 0) {
        showNotification(`Found ${newPointsToCreate.length} new points to create. Calculating...`, 'info');
        const creationPromises = newPointsToCreate.map(p => {
            const payload = { name: p.name, prop1: p.thermoProps[0], prop2: p.thermoProps[1] };
            return fetch(API_URL_PAIRS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).then(async res => {
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({ error: `Server responded with status ${res.status}` }));
                    throw new Error(errorData.error);
                }
                return res.json();
            }).then(result => ({ ...result.point, visualProps: p.visualProps }));
        });

        try {
            const createdResults = await Promise.all(creationPromises);
            createdResults.forEach(pointData => {
                addPoint(pointData);
                const createdPoint = points.find(p => p.name === pointData.name);
                if (createdPoint && pointData.visualProps) {
                    applyVisualProps(createdPoint, pointData.visualProps);
                }
            });
        } catch (error) {
            showNotification(`Error creating new points: ${error.message}. Aborting.`, 'error');
            spinner.style.display = 'none';
            return;
        }
    }
    
    let updatedPointCount = 0;
    pointsToUpdate.forEach(pointDef => {
        const pointToUpdate = points.find(p => p.name === pointDef.name);
        if (pointToUpdate && pointDef.visualProps) {
            applyVisualProps(pointToUpdate, pointDef.visualProps);
            updatedPointCount++;
        }
    });

    let addedConnCount = 0;
    let updatedConnCount = 0;
    for (const conn of connectionsToMake) {
        const sourceIndex = points.findIndex(p => p.name === conn.sourceName);
        const targetIndex = points.findIndex(p => p.name === conn.targetName);

        if (sourceIndex !== -1 && targetIndex !== -1) {
            const options = {};
            conn.remainingParts.forEach(part => {
                part = part.trim();
                if (part.startsWith('"') && part.endsWith('"')) options.label = part.substring(1, part.length - 1);
                else if (['solid', 'dashed', 'dotted'].includes(part.toLowerCase())) options.style = part.toLowerCase();
                else if (isColor(part.toLowerCase())) options.color = part.toLowerCase();
                else if (!isNaN(parseFloat(part))) options.lineWidth = parseFloat(part);
                else if (options.label === undefined) options.label = part;
            });

            const existingConnIndex = points[sourceIndex].connections.findIndex(c => c.target === targetIndex);
            if (existingConnIndex !== -1) {
                Object.assign(points[sourceIndex].connections[existingConnIndex], options);
                updatedConnCount++;
            } else {
                addConnection(sourceIndex, targetIndex, options);
                addedConnCount++;
            }
        } else {
            errorLines.push({ line: conn.line, reason: `Point '${sourceIndex === -1 ? conn.sourceName : conn.targetName}' not found after creation step.` });
        }
    }

    spinner.style.display = 'none';
    requestSaveState();
    updateUI();
    autoScaleAxes();
    
    let summaryMessage = `Process finished.`;
    const details = [];
    if (newPointsToCreate.length > 0) details.push(`${newPointsToCreate.length} points created`);
    if (updatedPointCount > 0) details.push(`${updatedPointCount} points updated`);
    if (addedConnCount > 0) details.push(`${addedConnCount} connections added`);
    if (updatedConnCount > 0) details.push(`${updatedConnCount} connections updated`);

    if (details.length > 0) {
        summaryMessage = `${details.join(', ')}.`;
    }

    if (errorLines.length > 0) {
        showNotification(`Finished with some errors. ${summaryMessage} Failed on lines: ${errorLines.map(e => e.line).join(', ')}`, 'warning');
        console.error("Failed lines:", errorLines);
    } else {
        showNotification(summaryMessage, 'success');
    }
}

function applyVisualProps(point, visualProps) {
    if (visualProps.color && isColor(visualProps.color)) {
        point.color = visualProps.color;
    }
    if (visualProps.size && !isNaN(parseInt(visualProps.size))) {
        point.size = parseInt(visualProps.size);
    }
    if (visualProps.labelcolor && isColor(visualProps.labelcolor)) {
        point.labelColor = visualProps.labelcolor;
    }
}
function showContextMenu(event, pointIndex) {
    event.preventDefault();
    const contextMenu = document.getElementById('context-menu');
    activePointIndex = pointIndex;
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    let x = event.clientX;
    let y = event.clientY;
    if (x + menuWidth > window.innerWidth) x -= menuWidth;
    if (y + menuHeight > window.innerHeight) y -= menuHeight;
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.display = 'block';
}

function hideContextMenu() {
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) contextMenu.style.display = 'none';
}

function ctxMenuEdit() {
    if (activePointIndex !== null) openEditModal(activePointIndex);
    hideContextMenu();
}

function ctxMenuDelete() {
    if (activePointIndex !== null) deletePoint(activePointIndex);
    hideContextMenu();
}

function ctxMenuConnect() {
    if (activePointIndex !== null) {
        if (!connectionMode.active) toggleConnectionMode();
        connectionMode.sourceIndex = activePointIndex;
        draw();
    }
    hideContextMenu();
}

async function plotIsoLine() {
    const value = parseFloat(document.getElementById('isobarValue').value);
    if (isNaN(value)) {
        showNotification('Please enter a valid pressure value.', 'error');
        return;
    }
    const spinner = document.getElementById('isolineSpinner');
    spinner.style.display = 'block';
    try {
        const response = await fetch(`${API_BASE_URL}/calculate_iso_line`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ property_type: 'P', property_value: value })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch data.');
        }
        isoLines.push({
            type: 'P',
            value: value,
            points: data.points,
            color: `hsl(${isoLines.length * 40}, 70%, 50%)`,
            labelPositionRatio: 0.4
        });
        updateUI();
    } catch (error) {
        showNotification(`Error plotting line: ${error.message}`, 'error');
    } finally {
        spinner.style.display = 'none';
    }
}

async function plotAllPressures() {
    if (points.length === 0) {
        showNotification('No points available to plot.', 'info');
        return;
    }
    
    const uniquePressures = [...new Set(
        points
            .filter(p => p.P !== null && p.P !== undefined && !isNaN(p.P))
            .map(p => Math.round(p.P * 100) / 100) 
    )].sort((a, b) => a - b);
    
    if (uniquePressures.length === 0) {
        showNotification('No valid pressure values found in points.', 'error');
        return;
    }
    
    const spinner = document.getElementById('isolineSpinner');
    spinner.style.display = 'block';
    
    showNotification(`Plotting ${uniquePressures.length} pressure line(s)...`, 'info');
    
    let successCount = 0;
    let failCount = 0;
    
    try {
        for (const pressure of uniquePressures) {
            try {
                const response = await fetch(`${API_BASE_URL}/calculate_iso_line`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ property_type: 'P', property_value: pressure })
                });
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch data.');
                }
                
                const alreadyExists = isoLines.some(line => 
                    line.type === 'P' && Math.abs(line.value - pressure) < 0.01
                );
                
                if (!alreadyExists) {
                    isoLines.push({
                        type: 'P',
                        value: pressure,
                        points: data.points,
                        color: `hsl(${isoLines.length * 40}, 70%, 50%)`,
                        labelPositionRatio: 0.4
                    });
                    successCount++;
                }
            } catch (error) {
                console.error(`Failed to plot P=${pressure}: ${error.message}`);
                failCount++;
            }
        }
        
        updateUI();
        
        if (successCount > 0) {
            showNotification(`Successfully plotted ${successCount} pressure line(s)!`, 'success');
        }
        if (failCount > 0) {
            showNotification(`Failed to plot ${failCount} line(s).`, 'warning');
        }
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        spinner.style.display = 'none';
    }
}

function drawIsoLines(isExport = false) {
    const baseLW = isExport ? 2 : 1.5;
    isoLines.forEach(line => {
        if (line.points.length < 2) return;
        ctx.save();
        ctx.strokeStyle = line.color || 'rgba(0, 123, 255, 0.7)';
        ctx.lineWidth = baseLW;
        ctx.setLineDash([5, 5]);
        const path = new Path2D();
        const startPoint = toCanvas(line.points[0].s, line.points[0].T);
        path.moveTo(startPoint.x, startPoint.y);
        for (let i = 1; i < line.points.length; i++) {
            const point = toCanvas(line.points[i].s, line.points[i].T);
            path.lineTo(point.x, point.y);
        }
        ctx.stroke(path);
        const anchorIndex = Math.floor(line.points.length * line.labelPositionRatio);
        const anchorPoint = toCanvas(line.points[anchorIndex].s, line.points[anchorIndex].T);
        const labelX = anchorPoint.x;
        const labelY = anchorPoint.y;
        ctx.font = isExport ? '18px Arial' : '10px Arial';
        ctx.textAlign = 'center';
        const labelText = `${line.value} kPa`;
        ctx.save();
        ctx.translate(labelX, labelY);
        let angle = 0;
        if (anchorIndex > 0) {
            const prevPoint = toCanvas(line.points[anchorIndex - 1].s, line.points[anchorIndex - 1].T);
            angle = Math.atan2(anchorPoint.y - prevPoint.y, anchorPoint.x - prevPoint.x);
        }
        if (angle < -Math.PI / 2 || angle > Math.PI / 2) {
             angle += Math.PI;
        }
        ctx.rotate(angle);
        ctx.fillStyle = line.color;
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, 0, -8);
        ctx.restore();
        ctx.restore();
    });
}

function updateIsoLinesList() {
    const listDiv = document.getElementById('isoLinesList');
    if (isoLines.length === 0) {
        listDiv.innerHTML = '';
        return;
    }
    listDiv.innerHTML = '<h4>Active Isobars:</h4>' + isoLines.map((line, index) => {
        return `<div class="isoline-item" style="border-left-color: ${line.color};">
                    <span>${line.value} kPa</span>
                    <button class="btn btn-sm" style="background:transparent; color:#dc3545;" onclick="isoLines.splice(${index}, 1); requestSaveState(); updateUI();">✕</button>
                </div>`;
    }).join('');
}

function updatePropertiesPanel(index) {
    const placeholder = document.getElementById('prop-panel-placeholder');
    const list = document.getElementById('properties-panel-list');
    const title = document.getElementById('prop-panel-title');
    if (index === null || index < 0 || !points[index]) {
        placeholder.style.display = 'block';
        list.style.display = 'none';
        title.textContent = 'Point Properties';
        const sideSatSection = document.getElementById('side-saturation-section');
        if (sideSatSection) sideSatSection.style.display = 'none';
        return;
    }
    placeholder.style.display = 'none';
    list.style.display = 'block';
    const point = points[index];
    title.textContent = `Properties for: ${point.name}`;
    const formatValue = (value, precision, unit = '') => {
        if (value === null || value === undefined || (typeof value === 'number' && isNaN(value))) {
            return 'N/A';
        }
        if (typeof value === 'number') {
            return `${value.toFixed(precision)}${unit}`;
        }
        return value;
    };
    
    const makeCopyable = (elementId, value, displayText) => {
        const element = document.getElementById(elementId);
        element.textContent = displayText + ' 📋';
        element.className = 'prop-value copyable';
        element.onclick = () => copyToClipboard(value.toString());
        element.title = 'Click to copy';
    };
    
    makeCopyable('prop-panel-phase', point.phase || 'N/A', point.phase || 'N/A');
    makeCopyable('prop-panel-P', point.P?.toFixed(2) || 'N/A', formatValue(point.P, 2, ' kPa'));
    makeCopyable('prop-panel-h', point.h?.toFixed(4) || 'N/A', formatValue(point.h, 4, ' kJ/kg'));
    makeCopyable('prop-panel-v', point.v?.toFixed(6) || 'N/A', formatValue(point.v, 6, ' m³/kg'));
    makeCopyable('prop-panel-x', point.x?.toFixed(4) || 'N/A', formatValue(point.x, 4));
    makeCopyable('prop-panel-T', point.T?.toFixed(2) || 'N/A', formatValue(point.T, 2, ' °C'));
    makeCopyable('prop-panel-s', point.s?.toFixed(4) || 'N/A', formatValue(point.s, 4, ' kJ/kg·K'));
    
    const visualTRow = document.getElementById('visual-T-row');
    const visualSRow = document.getElementById('visual-s-row');
    const t_diff = Math.abs(point.T - point.visual_T);
    const s_diff = Math.abs(point.s - point.visual_s);
    if (t_diff > 0.01) {
        makeCopyable('prop-panel-visual-T', point.visual_T?.toFixed(2) || 'N/A', formatValue(point.visual_T, 2, ' °C'));
        visualTRow.style.display = 'flex';
    } else {
        visualTRow.style.display = 'none';
    }
    if (s_diff > 0.0001) {
        makeCopyable('prop-panel-visual-s', point.visual_s?.toFixed(4) || 'N/A', formatValue(point.visual_s, 4, ' kJ/kg·K'));
        visualSRow.style.display = 'flex';
    } else {
        visualSRow.style.display = 'none';
    }
    
    updateSideSaturationProperties(point);
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`tab-btn-${tabName}`).classList.add('active');
    document.getElementById(`tab-content-${tabName}`).classList.add('active');
}

function findClosedCycle() {
    if (points.length < 3) return null;
    const visited = new Set();
    const path = [];
    function traverse(currentIndex) {
        visited.add(currentIndex);
        path.push(points[currentIndex]);
        const connections = points[currentIndex].connections;
        for (const conn of connections) {
            const nextIndex = conn.target;
            if (nextIndex === 0 && path.length >= 3) {
                return path;
            }
            if (!visited.has(nextIndex)) {
                const result = traverse(nextIndex);
                if (result) return result;
            }
        }
        path.pop();
        return null;
    }
    return traverse(0);
}

function renderAnalysisUI() {
    const heatInSection = document.getElementById('heat-in-list');
    const heatOutSection = document.getElementById('heat-out-list');
    
    if (!heatInSection || !heatOutSection) return;

    const pointOptions = points.map(p => `<option value="${p.name}">${p.name}</option>`).join('');

    const renderList = (processes, type) => {
        const listContainer = (type === 'in') ? heatInSection : heatOutSection;
        if (processes.length === 0) {
            listContainer.innerHTML = `<div style="padding: 8px; color: #888; font-style: italic; font-size: 0.9em;">No processes defined.</div>`;
            return;
        }
        listContainer.innerHTML = processes.map((proc, index) => `
            <div class="process-row" data-id="${index}">
                <select required onchange="updateProcess('${type}', ${index}, 'inlet', this.value)">
                    <option value="" disabled selected>Inlet</option> 
                    ${pointOptions}
                </select>
                <select required onchange="updateProcess('${type}', ${index}, 'outlet', this.value)">
                    <option value="" disabled selected>Outlet</option> 
                    ${pointOptions}
                </select>
                <input type="number" placeholder="Mass Flow (kg/s)" value="${proc.mass_flow}" oninput="updateProcess('${type}', ${index}, 'mass_flow', this.value)">
                <button class="btn-remove-process" onclick="removeProcess('${type}', ${index})" title="Remove Process">×</button>
            </div>
        `).join('');

        processes.forEach((proc, index) => {
            const row = listContainer.querySelector(`[data-id='${index}']`);
            if (row) {
                row.querySelector('select:nth-of-type(1)').value = proc.inlet;
                row.querySelector('select:nth-of-type(2)').value = proc.outlet;
            }
        });
    };

    renderList(heatInProcesses, 'in');
    renderList(heatOutProcesses, 'out');
}

function addProcess(type) {
    const process = { inlet: '', outlet: '', mass_flow: 1 };
    if (type === 'in') {
        heatInProcesses.push(process);
    } else {
        heatOutProcesses.push(process);
    }
    renderAnalysisUI();
}

function removeProcess(type, index) {
    if (type === 'in') {
        heatInProcesses.splice(index, 1);
    } else {
        heatOutProcesses.splice(index, 1);
    }
    renderAnalysisUI();
}

function updateProcess(type, index, field, value) {
    if (type === 'in') {
        heatInProcesses[index][field] = value;
    } else {
        heatOutProcesses[index][field] = value;
    }
}

async function calculateCustomEfficiency() {
    const spinner = document.getElementById('analysisSpinner');
    const resultsContainer = document.getElementById('analysis-results-container');
    spinner.style.display = 'block';
    resultsContainer.innerHTML = '';

    const allProcesses = [...heatInProcesses, ...heatOutProcesses];
    for (const proc of allProcesses) {
        if (!proc.inlet || !proc.outlet || !proc.mass_flow || isNaN(parseFloat(proc.mass_flow))) {
            showNotification('Please fill all fields for every process and ensure mass flow is a number.', 'error');
            spinner.style.display = 'none';
            return;
        }
        if (proc.inlet === proc.outlet) {
            showNotification(`Inlet and outlet points must be different for process ${proc.inlet} -> ${proc.outlet}.`, 'error');
            spinner.style.display = 'none';
            return;
        }
    }
    
    const payload = {
        heat_in_processes: heatInProcesses,
        heat_out_processes: heatOutProcesses,
        points_map: points.reduce((map, p) => {
            map[p.name] = p;
            return map;
        }, {})
    };

    try {
        const response = await fetch(`${API_BASE_URL}/calculate_efficiency_custom`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Calculation failed.');
        }
        displayCycleAnalysisResults(data);
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        spinner.style.display = 'none';
    }
}

function displayCycleAnalysisResults(data) {
    const container = document.getElementById('analysis-results-container');
    const formatNum = (num, precision = 2) => (num !== null && !isNaN(num)) ? num.toFixed(precision) : '---';

    container.innerHTML = `
        <div class="efficiency-result-card">
            <span class="label">Thermal Efficiency (η)</span>
            <div class="value">${formatNum(data.efficiency, 2)} %</div>
            <div class="details">
                (Based on Q_H = ${formatNum(data.total_qh, 2)} kJ and Q_L = ${formatNum(data.total_ql, 2)} kJ)
            </div>
        </div>
    `;
}
async function downloadExcel() {
    if (points.length === 0) {
        showNotification("No points to export.", "info");
        return;
    }

    const payload = {
        points: points
    };

    try {
        const response = await fetch(`${API_BASE_URL}/export_xlsx`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to generate Excel file.");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'thermodynamic_properties.xlsx'; 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

    } catch (error) {
        showNotification(`Export Error: ${error.message}`, 'error');
    }
}

async function downloadText() {
    if (points.length === 0) {
        showNotification("No points to export.", "info");
        return;
    }

    const payload = {
        points: points
    };

    try {
        const response = await fetch(`${API_BASE_URL}/export_txt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to generate text file.");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'properties_report.txt'; 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

    } catch (error) {
        showNotification(`Export Error: ${error.message}`, 'error');
    }
}


function showBulkEditorHelp(event) {
    event.stopPropagation(); 

    const helpHTML = `
        <div class="help-section">
            <div class="help-tip">
                <strong>📝 Overview:</strong> Each line represents a connection, a new point creation, or a point update.
            </div>
        </div>

        <div class="help-section">
            <div class="help-section-title">📌 CONNECTIONS</div>
            <p><strong>Format:</strong> Source,Target,"Label",Color,Style,LineWidth</p>
            
            <p><strong>Required Fields:</strong></p>
            <ul>
                <li>• <strong>Source:</strong> The name of the source point</li>
                <li>• <strong>Target:</strong> The name of the target point</li>
            </ul>
            
            <p><strong>Optional Fields</strong> (in any order after source/target):</p>
            <ul>
                <li>• <strong>"Label":</strong> Text label (must be in quotes if it contains spaces)</li>
                <li>• <strong>Color:</strong> red, blue, green, #ff0000, rgb(255,0,0), etc.</li>
                <li>• <strong>Style:</strong> solid, dashed, dotted</li>
                <li>• <strong>LineWidth:</strong> A number (e.g., 2, 3.5)</li>
            </ul>
            
            <div class="help-example">
                <strong>Examples:</strong>
                <div class="help-code">1,2
1,2,red
1,2,"Heat Input"
1,2,"Heat Input",red,dashed,3
Point1,Point2,blue,3
Boiler,Turbine,"Expansion Process",#ff6600,solid,2.5</div>
            </div>
        </div>

        <div class="help-section">
            <div class="help-section-title">🔧 CREATING NEW POINTS (With Thermodynamic Properties)</div>
            <p>Enter <strong>EXACTLY 2</strong> thermodynamic properties to calculate a point.</p>
            <p><strong>Format:</strong> PointName(property1=value, property2=value)</p>
            
            <p><strong>Available Properties:</strong></p>
            <ul>
                <li>• <strong>p</strong> = Pressure (kPa)</li>
                <li>• <strong>t</strong> = Temperature (°C)</li>
                <li>• <strong>h</strong> = Specific enthalpy (kJ/kg)</li>
                <li>• <strong>s</strong> = Specific entropy (kJ/kg·K)</li>
                <li>• <strong>x</strong> = Quality (0-1 for two-phase region)</li>
                <li>• <strong>v</strong> = Specific volume (m³/kg)</li>
            </ul>
            
            <p><strong>Special Values:</strong></p>
            <ul>
                <li>• <strong>hf, hg</strong> = saturated liquid/vapor enthalpy</li>
                <li>• <strong>sf, sg</strong> = saturated liquid/vapor entropy</li>
                <li>• <strong>vf, vg</strong> = saturated liquid/vapor volume</li>
            </ul>
            
            <div class="help-example">
                <strong>Examples:</strong>
                <div class="help-code">3(p=1000, x=0)                    // Saturated liquid at 1000 kPa
4(p=5000, t=400)                  // Superheated vapor
5(h=2800, s=6.5)                  // With enthalpy and entropy
SaturatedVapor(p=500, x=1)        // Saturated vapor
CompressorExit(p=3000, s=sf)    // Using a special value</div>
            </div>
        </div>

        <div class="help-section">
            <div class="help-section-title">🎨 UPDATING POINT APPEARANCE</div>
            <p>Update the visual properties of existing points (no calculation is performed).</p>
            <p><strong>Format:</strong> PointName(property=value, ...)</p>
            
            <p><strong>Available Visual Properties:</strong></p>
            <ul>
                <li>• <strong>color:</strong> Color of the point marker</li>
                <li>• <strong>size:</strong> Size of the point marker (number)</li>
                <li>• <strong>labelcolor:</strong> Color of the label text</li>
            </ul>
            
            <div class="help-example">
                <strong>Examples:</strong>
                <div class="help-code">1(color=red, size=12)
TurbineInlet(color=#00ff00, size=15, labelcolor=blue)
Point2(labelcolor=black)</div>
            </div>
        </div>

        <div class="help-section">
            <div class="help-section-title">🔗 POINT REFERENCES (★ Feature)</div>
            <p>Copy properties from existing points using an asterisk (*).</p>
            <p><strong>Format:</strong> NewPoint(property=*ReferencePoint, ...)</p>
            
            <div class="help-example">
                <strong>Examples:</strong>
                <div class="help-code">PumpExit(p=*TurbineInlet, s=*PumpInlet)   // Isentropic compression
Condenser(p=10, s=*TurbineExit)             // Exhaust conditions
Reheater(p=*HPTurbineExit, t=500)       // Maintain pressure, reheat</div>
            </div>
            
            <div class="help-tip">
                <strong>Common Patterns:</strong>
                <div class="help-code">// Isentropic Process (constant entropy)
CompExit(p=3000, s=*CompInlet)

// Isobaric Process (constant pressure)
Heater(p=*Boiler, h=2900)

// Isochoric Process (constant volume)
State3(t=500, v=*State2)</div>
            </div>
        </div>

        <div class="help-section">
            <div class="help-section-title">🚀 COMBINED USAGE (Points + Connections)</div>
            <p>Define points and create connections on the same line!</p>
            <p><strong>Format:</strong> Point1(...), Point2(...), "Label", Color, Style, Thickness</p>
            
            <div class="help-example">
                <strong>Examples:</strong>
                <div class="help-code">// Create two points and connect them
1(p=1000,x=0), 2(p=1000,x=1), "Boiling", blue

// Styled turbine expansion
TurbineInlet(p=5000,t=500), TurbineExit(p=10,s=*TurbineInlet), "Expansion", red, dashed, 3

// Pump compression
PumpInlet(p=10,x=0), PumpExit(p=5000,s=*PumpInlet), "Compression", green, solid, 2

// Heat input with visual properties
3(p=5000,h=1000,color=orange), 4(p=5000,t=500,color=red), "Heat Input", #ff0000, 2.5</div>
            </div>
        </div>

        <div class="help-section">
            <div class="help-section-title">💡 FULL CYCLE EXAMPLES</div>
            
            <div class="help-example">
                <strong>Example 1: Simple Rankine Cycle</strong>
                <div class="help-code">State1(p=10,x=0)
State2(p=5000,s=*State1)
State3(p=5000,t=500)
State4(p=10,s=*State3)
State1,State2,"Pump",green,solid,2
State2,State3,"Boiler",red,solid,2
State3,State4,"Turbine",blue,dashed,3
State4,State1,"Condenser",cyan,solid,2</div>
            </div>
            
            <div class="help-example">
                <strong>Example 2: Cycle with In-line Point Creation + Connections</strong>
                <div class="help-code">1(p=10,x=0,color=blue,size=10), 2(p=5000,s=*1,color=green,size=10), "Pump Work", green, 2
2, 3(p=5000,t=500,color=red,size=12), "Heat Input", red, solid, 3
3, 4(p=10,s=*3,color=orange,size=10), "Turbine Work", blue, dashed, 3
4, 1, "Heat Rejection", cyan, 2</div>
            </div>
            
            <div class="help-example">
                <strong>Example 3: Reheat Rankine Cycle</strong>
                <div class="help-code">BoilerInlet(p=10,x=0)
PumpExit(p=10000,s=*BoilerInlet)
HPTInlet(p=10000,t=600)
HPTExit(p=2000,s=*HPTInlet)
ReheaterExit(p=2000,t=550)
LPTExit(p=10,s=*ReheaterExit)
BoilerInlet,PumpExit,"Pump",green
PumpExit,HPTInlet,"Boiler",red,solid,3
HPTInlet,HPTExit,"HP Turbine",blue,dashed,3
HPTExit,ReheaterExit,"Reheater",orange,solid,2
ReheaterExit,LPTExit,"LP Turbine",blue,dashed,3
LPTExit,BoilerInlet,"Condenser",cyan</div>
            </div>
        </div>

        <div class="help-section">
            <div class="help-section-title">⚠️ COMMON MISTAKES TO AVOID</div>
            
            <div class="help-error">
                ❌ NewPoint(p=1000) → 2 properties are required for calculation
            </div>
            <div class="help-success">
                ✅ NewPoint(p=1000, x=0)
            </div>
            
            <div class="help-error">
                ❌ NewPoint(p=1000, x=0, h=500) → Cannot specify 3 thermo properties
            </div>
            <div class="help-success">
                ✅ NewPoint(p=1000, x=0)
            </div>
            
            <div class="help-error">
                ❌ Point1, Point2, Heat Input → Labels with spaces must be in quotes
            </div>
            <div class="help-success">
                ✅ Point1, Point2, "Heat Input"
            </div>
            
            <div class="help-error">
                ❌ Point(p=*MissingPoint, t=300) → Reference point must exist
            </div>
            <div class="help-success">
                ✅ Create the referenced point first
            </div>
        </div>

        <div class="help-warning" style="margin-top: 20px; text-align: center;">
            <strong>💡 Ready to start?</strong> Click "Apply Changes" when you're done editing!
        </div>
    `;
    
    const modal = document.getElementById('helpModal');
    const modalBody = document.getElementById('helpModalBody');
    modalBody.innerHTML = helpHTML;
    modal.style.display = 'flex';
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeHelpModal();
        }
    };
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    modal.style.display = 'none';
}
let touchStartDistance = 0;
let touchStartDomain = null;
let touchCenterData = null;

function getTouchDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function getTouchCenter(touch1, touch2) {
    return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
    };
}

function onTouchStart(e) {
    if (e.touches.length === 2) {
        e.preventDefault();
        hideQuickActionMenu();
        
        touchStartDistance = getTouchDistance(e.touches[0], e.touches[1]);
        
        touchStartDomain = {
            s: { min: domain.s.min, max: domain.s.max },
            T: { min: domain.T.min, max: domain.T.max }
        };
        
        const center = getTouchCenter(e.touches[0], e.touches[1]);
        const rect = canvas.getBoundingClientRect();
        const canvasX = center.x - rect.left;
        const canvasY = center.y - rect.top;
        touchCenterData = fromCanvas(canvasX, canvasY);
    }
}

function onTouchMove(e) {
    if (e.touches.length === 2 && touchStartDistance > 0) {
        e.preventDefault();
        
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        
        const zoomFactor = currentDistance / touchStartDistance;
        
        const originalSRange = touchStartDomain.s.max - touchStartDomain.s.min;
        const originalTRange = touchStartDomain.T.max - touchStartDomain.T.min;
        
        const newSRange = originalSRange / zoomFactor;
        const newTRange = originalTRange / zoomFactor;
        
        if (newSRange < 0.1 || newSRange > 50) return;
        
        const sRatio = (touchCenterData.s - touchStartDomain.s.min) / originalSRange;
        const tRatio = (touchCenterData.T - touchStartDomain.T.min) / originalTRange;
        
        domain.s.min = touchCenterData.s - newSRange * sRatio;
        domain.s.max = touchCenterData.s + newSRange * (1 - sRatio);
        domain.T.min = touchCenterData.T - newTRange * tRatio;
        domain.T.max = touchCenterData.T + newTRange * (1 - tRatio);
        
        draw();
    }
}

function onTouchEnd(e) {
    if (e.touches.length < 2) {
        touchStartDistance = 0;
        touchStartDomain = null;
        touchCenterData = null;
    }
}
function showHelpModal(title, htmlContent) {
    const modal = document.getElementById('helpModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = document.getElementById('helpModalBody');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;
    modal.style.display = 'flex';
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    modal.style.display = 'none';
}

function showGeneralHelp() {
    const title = 'T-S Diagram Tool - User Guide';
    
    const markdownContent = `
Welcome to the T-S Diagram Tool! This powerful web-based application is designed for visualizing, analyzing, and exporting thermodynamic processes and cycles. Whether you're an engineering student, an educator, or a professional, this guide will help you unlock the full potential of the tool.

##  Table of Contents

1.  [Introduction: What Does This Tool Do?](#introduction)
2.  [A Quick Look at the Interface](#a-quick-look-at-the-interface)
3.  [**Part 1: Basic Usage - Adding Points**](#part-1-basic-usage---adding-points)
    *   [Method A: Add a Single Point (Calculated)](#method-a-add-a-single-point-calculated)
    *   [Method B: Add a Single Point (Direct T-s)](#method-b-add-a-single-point-direct-t-s)
    *   [Method C: Bulk Data Import (P-h or T-s)](#method-c-bulk-data-import-p-h-or-t-s)
4.  [**Part 2: Defining Processes - Connections**](#part-2-defining-processes---connections)
    *   [Creating Connections Manually](#creating-connections-manually)
    *   [Using the Connection Settings Panel](#using-the-connection-settings-panel)
    *   [The Bulk Connection Editor (Advanced)](#the-bulk-connection-editor-advanced)
5.  [**Part 3: Interacting with the Canvas**](#part-3-interacting-with-the-canvas)
    *   [Managing Points](#managing-points)
    *   [Panning & Zooming the View](#panning--zooming-the-view)
    *   [Bending Lines (Curved Processes)](#bending-lines-curved-processes)
    *   [Presentation Mode](#presentation-mode)
6.  [**Part 4: Advanced Tools & Analysis**](#part-4-advanced-tools--analysis)
    *   [Plotting Iso-Lines (Isobars)](#plotting-iso-lines-isobars)
    *   [Custom Cycle Efficiency Calculation](#custom-cycle-efficiency-calculation)
7.  [**Part 5: Customizing the Appearance**](#part-5-customizing-the-appearance)
    *   [Global View Settings](#global-view-settings)
    *   [Changing Point and Line Properties](#changing-point-and-line-properties)
    *   [The Legend and Notes Boxes](#the-legend-and-notes-boxes)
8.  [**Part 6: Project & Data Management**](#part-6-project--data-management)
    *   [Saving and Loading a Project](#saving-and-loading-a-project)
    *   [Exporting Data and Graphics](#exporting-data-and-graphics)

---

### Introduction

This tool allows you to create T-s (Temperature-Entropy) diagrams for water/steam with a rich set of features:
*   **Flexible Point Input:** Calculate state points from any two known thermodynamic properties (P, T, h, s, x) or plot them directly with T and s values.
*   **Visual Process Definition:** Create, label, and style connections between points to represent thermodynamic processes.
*   **Analysis Tools:** Plot constant pressure lines (isobars) and calculate the thermal efficiency for custom-defined cycles.
*   **Deep Customization:** Control every visual detail, from line widths and colors to labels and the legend.
*   **Full Data Management:** Save your entire project to a file, load it back later, export your data to Excel or Text files, and save your diagram as a high-resolution PNG or a scalable SVG.

---

### A Quick Look at the Interface

The interface is divided into three main sections:

| Left Panel (Controls)                                 | Center Area (Canvas)                                     | Right Panel (Details & Settings)                        |
| ----------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| Add points, perform bulk edits, run analysis, and manage project files. | The T-s diagram itself, where all points and lines are drawn. | View properties of a selected point and manage connection settings. |

---

### Part 1: Basic Usage - Adding Points

The first step in creating a diagram is to add your state points. There are several ways to do this.

#### Method A: Add a Single Point (Calculated)

This is the most powerful method. It calculates all other properties from two known ones using the XSteam library.

1.  In the **left panel**, expand the \`➕ Add Points & Data\` section.
2.  Click the \`Single Point\` tab.
3.  Ensure the \`Calculate (XSteam)\` mode is active.
4.  In the **Point Name** field, give your point a name (e.g., \`1\`, \`Turbine Inlet\`).
5.  Select the two properties you know from the **Known Property 1** and **Known Property 2** dropdowns (e.g., \`Pressure (P)\` and \`Quality (x)\`).
6.  Enter the corresponding values in the input boxes below.
    *   **Pro Tip:** You can also use special string values like \`hf\` (saturated liquid enthalpy), \`hg\` (saturated vapor enthalpy), or \`Tsat\` (saturation temperature).
7.  Click the \`🧮 Calculate & Add Point\` button. Your point will be calculated and added to the diagram.

#### Method B: Add a Single Point (Direct T-s)

If you already know the T and s values for a point and don't need calculations:

1.  In the \`Single Point\` tab, switch to the \`Direct (T, s)\` mode.
2.  Enter the **Point Name**, **Temperature (°C)**, and **Entropy (kJ/kg·K)**.
3.  Click the \`📍 Add T-s Point\` button.

#### Method C: Bulk Data Import (P-h or T-s)

If you have data for multiple points in a table, you can import them all at once.

1.  Click the \`Bulk Import / Update\` tab.
2.  **For T-s Data:**
    *   In the first text area, paste your data in the format \`Name Temperature Entropy\` for each line. Values can be separated by spaces or tabs.
    *   Click the \`Apply T-s Data\` button.
3.  **For P-h Data (with XSteam calculation):**
    *   In the second text area, paste your data in the format \`Name Pressure(kPa) Enthalpy(kJ/kg)\`. You can use \`hf\` or \`hg\` for the enthalpy value.
    *   Click the \`Apply P-h Data\` button. The system will calculate and add all points.
    *   The \`Load Current\` button will populate this text area with the P-h data of all points currently on your canvas.

---

### Part 2: Defining Processes - Connections

Once you have points, you can create connections between them to represent processes (steps in a cycle).

#### Creating Connections Manually

1.  Click the \`🔗 Connect\` button in the control bar above the canvas. The button will turn red, and your cursor will change.
2.  Click on the starting point of your process.
3.  Move your mouse toward the target point; a dashed line will follow.
4.  Click on the target point. A connection (line) will be created.
5.  To exit connect mode, click the \`🔗 Cancel\` button or press the \`ESC\` key.

#### Using the Connection Settings Panel

Use the **right panel** to customize any connection you've created.

1.  Expand the \`🔗 Connection Settings\` section.
2.  Select the **Source Point** and **Target Point** of the connection you want to edit from the dropdowns.
3.  The panel's settings will automatically load that connection's properties:
    *   **Line Style:** Choose \`Solid\`, \`Dashed\`, or \`Dotted\`.
    *   **Label (on-line):** A text label that appears on the line itself (e.g., \`Heat Addition\`, \`Work Output\`).
    *   **Legend Label:** A label that appears in the diagram's legend box.
    *   **Color Picker & Width:** Set the line's color and thickness.
    *   **Show in Legend:** Check this box to make the connection appear in the legend.
4.  Click the \`🔄 Update Connection\` button to apply your changes.

#### The Bulk Connection Editor (Advanced)

This is the fastest way to script complex cycles like the Rankine cycle.

1.  In the **left panel**, expand the \`🔗 Bulk Connection Editor\` section.
2.  Enter commands into the text area using a special syntax. Click the \`ⓘ\` help icon for a detailed guide.
3.  **Basic Formats:**
    *   **Connection:** \`SourcePoint,TargetPoint,"Label",Color,Style\`
    *   **Point Creation:** \`PointName(p=1000,x=0)\`
    *   **All-in-one:** \`1(p=10,x=0), 2(p=5000,s=*1), "Pump Work"\`
        *   This command creates point 1, calculates point 2 isentropically (using the entropy of point 1 as a reference), and draws a line between them labeled "Pump Work".
4.  Click the \`↥ Apply Changes\` button to execute all commands.

---

### Part 3: Interacting with the Canvas

#### Managing Points

*   **Select:** Click a point to make it active. Its properties will appear in the right-hand panel.
*   **Move (Drag):** Click, hold, and drag a selected point to change its position. This changes its *visual* T and s values but does not affect its calculated thermodynamic properties.
*   **Delete:** After selecting a point, click the small \`🗑️\` icon that appears above it, or press the \`Delete\` key on your keyboard.
*   **Right-Click Menu:** Right-clicking on a point opens a context menu with options to Edit, Delete, or Start a Connection.

#### Panning & Zooming the View

*   **Pan:** Click and drag on any empty area of the canvas to move the diagram around.
*   **Zoom:** Use your mouse wheel to zoom in and out, centered on your cursor's position. These features can be disabled via the \`Allow Dragging\` and \`Allow Zoom\` checkboxes in the top control bar.

#### Bending Lines (Curved Processes)

Real-world processes are not always ideal straight lines.

1.  Ensure \`Allow Bending\` is checked in the top control bar.
2.  Hover your mouse over the middle of a line; a small control point will appear.
3.  Click and drag this control point to give the line a curve.
4.  To straighten the line again, use the \`Reset Curve\` button under \`Connection Settings\` in the right panel.

#### Presentation Mode

Clicking the \`Presentation\` button simplifies the UI, automatically shows all point labels, and prepares the diagram for a clean, focused view. Click it again to return to editing mode.

---

### Part 4: Advanced Tools & Analysis

#### Plotting Iso-Lines (Isobars)

To draw constant pressure lines (isobars) on your diagram:

1.  In the **left panel**, expand the \`〰️ Plot Iso-Lines\` section.
2.  Enter a pressure value in the **Pressure (kPa)** field.
3.  Click the \`Plot Isobar\` button.
4.  The \`Plot All Point Pressures\` button will automatically draw isobars for the pressure values of all points currently on the canvas.

#### Custom Cycle Efficiency Calculation

You can calculate the thermal efficiency of any cycle you define.

1.  In the **left panel**, expand the \`📊 Custom Cycle Efficiency\` section. (This is enabled once you have at least 3 points).
2.  Under **Heat Input (Q_H) Processes**, define the processes where heat is added to your cycle. Click \`+ Add Boiler/Heater\` and select the inlet and outlet points for that process.
3.  Under **Heat Rejection (Q_L) Processes**, define the processes where heat is removed from your cycle (e.g., the condenser).
4.  Enter the **Mass Flow** rate in kg/s for each process.
5.  Click the \`🧮 Calculate Efficiency\` button. The result will be displayed below.

---

### Part 5: Customizing the Appearance

#### Global View Settings

The checkboxes in the control bar above the canvas allow you to instantly toggle major visual elements:
*   \`Saturation Curve\`: Shows/hides the saturation dome.
*   \`Show Lines\`: Shows/hides the connections between points.
*   \`Show Labels\`: Shows/hides the names of the points.
*   \`Show Arrows\`: Shows/hides the direction arrows on the process lines.

#### Changing Point and Line Properties

The \`🎨 Appearance Settings\` section in the **right panel** gives you full control over visuals:
*   **Global:** Adjust the default thickness for all lines and the saturation curve.
*   **Point Specific:** Select a point from the dropdown and change its color, size, or label color individually.

#### The Legend and Notes Boxes

*   **Legend:** Located in the top-right of the canvas. It displays any connection that has the \`Show in Legend\` box checked in its settings. You can drag the legend box by its header to reposition it.
*   **Notes:** A draggable text box in the top-left where you can add custom notes about your project. These notes are saved with your project file.

---

### Part 6: Project & Data Management

#### Saving and Loading a Project

You can save your entire session to resume work later.

1.  Go to the \`💾 Project & Data Export\` section in the **left panel**.
2.  Click \`📥 Save (.json)\` to download a \`.json\` file containing everything (points, connections, settings, notes).
3.  To resume, click \`📤 Load (.json)\` and select the project file you previously saved.

#### Exporting Data and Graphics

*   **Data Export:**
    *   \`📊 Excel (.xlsx)\`: Generates a detailed Excel report with all thermodynamic and saturation properties for your points.
    *   \`📋 Text (.txt)\`: Creates a clean, easy-to-copy plain text report of all properties.
*   **Graphics Export:**
    *   \`💾 4K PNG\`: Downloads a high-resolution (3840x2160) image of your diagram.
    *   \`✨ SVG\`: Downloads a vector version of your diagram. This format is perfect for reports and presentations as it can be scaled to any size without losing quality.
    `;
    
    const converter = new showdown.Converter({
        ghCompatibleHeaderId: true,
        tables: true
    });
    
    const htmlContent = converter.makeHtml(markdownContent);
    
    showHelpModal(title, htmlContent);
}
function showAddPointsHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Adding Points & Data';
    const content = `
        <p>You can add points in several ways:</p>
        <ul>
            <li><strong>Bulk Import (T,s):</strong> Paste a list of points with their Name, Temperature, and Entropy to plot them directly.</li>
            <li><strong>Bulk Import (P,h):</strong> Paste a list of points with Name, Pressure (kPa), and Enthalpy (kJ/kg). The tool will calculate all other properties. You can use 'hf' or 'hg' for enthalpy.</li>
            <li><strong>Single Point (Calculate):</strong> The most powerful method. Enter any two known properties (like Pressure and Temperature), and the tool will calculate the rest for you.</li>
            <li><strong>Single Point (Direct):</strong> If you already know the T and s coordinates, you can plot the point manually without any calculations.</li>
        </ul>
    `;
    showHelpModal(title, content);
}

function showIsoLinesHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Plotting Iso-Lines';
    const content = `
        <p>This feature allows you to draw constant property lines on the diagram.</p>
        <ul>
            <li><strong>What is an Isobar?</strong> An isobar is a line representing all states at a constant pressure.</li>
            <li><strong>How to use:</strong> Enter a pressure value in kPa into the input field and click "Plot Isobar". The corresponding constant pressure line will be drawn across the diagram.</li>
            <li><strong>Plot All Point Pressures:</strong> This useful button automatically finds the pressure of every point you've created and plots an isobar for each unique pressure value.</li>
        </ul>
    `;
    showHelpModal(title, content);
}

function showCycleAnalysisHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Custom Cycle Efficiency';
    const content = `
        <p>This tool calculates the thermal efficiency (η) of any cycle you define. The formula used is: <strong>η = 1 - (Q_L / Q_H)</strong>.</p>
        <h4>How to use:</h4>
        <ol>
            <li><strong>Define Heat Input (Q_H):</strong> Click "+ Add Boiler/Heater" for each process where heat is added to your cycle. Select the inlet and outlet points (e.g., from boiler inlet to boiler outlet).</li>
            <li><strong>Define Heat Rejection (Q_L):</strong> Click "+ Add Condenser/Cooler" for each process where heat is removed from your cycle (e.g., from condenser inlet to condenser outlet).</li>
            <li><strong>Enter Mass Flow:</strong> Specify the mass flow rate (in kg/s) for each process. For a simple Rankine cycle, this is usually the same for all processes.</li>
            <li><strong>Calculate:</strong> Click the "Calculate Efficiency" button to see the result.</li>
        </ol>
        <p><strong>Important:</strong> The tool automatically checks if heat is actually being added or rejected based on the enthalpy change (h_out - h_in). If you define a process incorrectly (e.g., defining a cooling process as Q_H), it will give an error.</p>
    `;
    showHelpModal(title, content);
}

function showBulkEditorHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Bulk Connection Editor';
    const content = `
        <div class="help-section">
            <div class="help-tip">
                <strong>📝 Overview:</strong> Each line represents a connection, a new point creation, or a point update.
            </div>
        </div>
        <div class="help-section">
            <div class="help-section-title">📌 CONNECTIONS</div>
            <p><strong>Format:</strong> Source,Target,"Label",Color,Style,LineWidth</p>
            <p><strong>Required Fields:</strong></p>
            <ul>
                <li>• <strong>Source:</strong> The name of the source point</li>
                <li>• <strong>Target:</strong> The name of the target point</li>
            </ul>
            <p><strong>Optional Fields</strong> (in any order after source/target):</p>
            <ul>
                <li>• <strong>"Label":</strong> Text label (must be in quotes if it contains spaces)</li>
                <li>• <strong>Color:</strong> red, blue, green, #ff0000, rgb(255,0,0), etc.</li>
                <li>• <strong>Style:</strong> solid, dashed, dotted</li>
                <li>• <strong>LineWidth:</strong> A number (e.g., 2, 3.5)</li>
            </ul>
        </div>
        <div class="help-section">
            <div class="help-section-title">🔧 CREATING NEW POINTS</div>
            <p>Enter <strong>EXACTLY 2</strong> thermodynamic properties to calculate a point.</p>
            <p><strong>Format:</strong> PointName(property1=value, property2=value)</p>
            <p><strong>Available Properties:</strong> p, t, h, s, x, v</p>
        </div>
        <div class="help-section">
            <div class="help-section-title">🔗 POINT REFERENCES (★ Feature)</div>
            <p>Copy properties from existing points using an asterisk (*).</p>
            <p><strong>Format:</strong> NewPoint(property=*ReferencePoint, ...)</p>
        </div>
        <div class="help-warning" style="margin-top: 20px; text-align: center;">
            <strong>💡 Ready to start?</strong> Click "Apply Changes" when you're done editing!
        </div>
    `;
    showHelpModal(title, content);
}
function showPointsListHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Points List';
    const content = `
        <p>This section lists all the points you have added to the diagram.</p>
        <ul>
            <li>Each item shows the point's <strong>Name</strong>, calculated <strong>Temperature (T)</strong>, and <strong>Entropy (s)</strong>.</li>
            <li>The active point is highlighted with a red border.</li>
        </ul>
        <h4>Action Buttons:</h4>
        <ul>
            <li><strong>📊 (Properties):</strong> Opens a detailed modal with all thermodynamic properties of that point.</li>
            <li><strong>👁️ (Toggle Label):</strong> Shows or hides the point's name label on the canvas.</li>
            <li><strong>✏️ (Edit):</strong> Allows you to manually change the Name, T, and s values of a point.</li>
            <li><strong>✕ (Delete):</strong> Permanently removes the point and any connections to it.</li>
        </ul>
    `;
    showHelpModal(title, content);
}

function showOperationsHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Operations';
    const content = `
        <p>This panel contains general actions for managing your diagram and project.</p>
        <ul>
            <li><strong>Undo/Redo:</strong> Step backward or forward through your recent changes.</li>
            <li><strong>Auto-Scale:</strong> Automatically adjusts the Temperature and Entropy axes to fit all of your points perfectly on the canvas.</li>
            <li><strong>Clear Drawing:</strong> Removes all connections, iso-lines, and custom text. <strong>Your points will NOT be deleted.</strong></li>
            <li><strong>Clear All Project:</strong> Deletes <strong>everything</strong> on the canvas (points, lines, etc.) and starts a new, empty project. This action cannot be undone.</li>
        </ul>
    `;
    showHelpModal(title, content);
}

function showExportHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Project & Data Export';
    const content = `
        <h4>Project File</h4>
        <p>This allows you to save your entire session and continue your work later.</p>
        <ul>
            <li><strong>📥 Save (.json):</strong> Downloads a single <code>.json</code> file that contains all your points, connections, settings, notes, and visual styles.</li>
            <li><strong>📤 Load (.json):</strong> Opens a saved project file and restores your session exactly as you left it.</li>
        </ul>
        <h4>Data Export</h4>
        <p>Export your diagram and point data in various formats for reports and presentations.</p>
        <ul>
            <li><strong>📊 Excel (.xlsx):</strong> Creates a detailed, multi-sheet Excel file with thermodynamic properties, saturation data, and comparative analysis.</li>
            <li><strong>📋 Text (.txt):</strong> Generates a simple, easy-to-read text file of all point properties, suitable for quick copy-pasting.</li>
            <li><strong>💾 4K PNG:</strong> Saves a high-resolution (3840x2160) image of your current diagram view.</li>
            <li><strong>✨ SVG:</strong> Saves a vector graphic of your diagram. This format is infinitely scalable without losing quality, perfect for publications and high-quality prints.</li>
        </ul>
    `;
    showHelpModal(title, content);
}

function showConnectionSettingsHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Connection Settings';
    const content = `
        <p>This panel in the right sidebar gives you full control over individual connections (processes).</p>
        <ol>
            <li>Select the <strong>Source Point</strong> and <strong>Target Point</strong> of the connection you want to create or edit.</li>
            <li>Adjust the settings:
                <ul>
                    <li><strong>Line Style:</strong> Choose solid, dashed, or dotted.</li>
                    <li><strong>Label (on-line):</strong> Text that appears directly on the line in the diagram.</li>
                    <li><strong>Legend Label:</strong> Text that appears in the legend box (if enabled).</li>
                    <li><strong>Color & Width:</strong> Set the visual style of the line.</li>
                </ul>
            </li>
            <li>Use the action buttons for quick tasks:
                <ul>
                    <li><strong>Swap ↔︎:</strong> Swaps the source and target points.</li>
                    <li><strong>Reset Curve:</strong> Straightens a line that you have bent.</li>
                    <li><strong>Bidirectional:</strong> Creates arrows in both directions.</li>
                    <li><strong>Remove:</strong> Deletes the selected connection.</li>
                </ul>
            </li>
            <li>Click <strong>Add / Update Connection</strong> to apply your changes.</li>
        </ol>
    `;
    showHelpModal(title, content);
}

function showAppearanceHelp(event) {
    event.stopPropagation();
    const title = 'Guide: Appearance Settings';
    const content = `
        <p>Customize the look and feel of your diagram from this panel in the right sidebar.</p>
        <h4>Global Settings</h4>
        <p>These settings affect all elements of a certain type.</p>
        <ul>
            <li><strong>Line Width:</strong> Sets the default thickness for all new connections.</li>
            <li><strong>Saturation Curve Width:</strong> Adjusts the thickness of the saturation dome.</li>
        </ul>
        <h4>Point Specific Settings</h4>
        <p>These settings affect only a single, selected point.</p>
        <ol>
            <li>First, choose a point from the <strong>Select Point</strong> dropdown menu.</li>
            <li>Then, you can change its individual:
                <ul>
                    <li><strong>Point Color:</strong> The color of the circle marker.</li>
                    <li><strong>Label Color:</strong> The color of the point's name text.</li>
                    <li><strong>Point Size:</strong> The diameter of the circle marker.</li>
                </ul>
            </li>
        </ol>
        <h4>Legend</h4>
        <p><strong>Legend Title:</strong> Changes the title text displayed at the top of the legend box.</p>
    `;
    showHelpModal(title, content);
}
