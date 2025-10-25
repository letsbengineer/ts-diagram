# T-S Diagram Tool - Comprehensive User Guide

This tool is a powerful T-s (Temperature-Entropy) diagram generator designed for visualizing, analyzing, and exporting thermodynamic processes and cycles. Whether you're an engineering student or a professional, this guide will help you fully leverage all the tool's features.

## Table of Contents

- [T-S Diagram Tool - Comprehensive User Guide](#t-s-diagram-tool---comprehensive-user-guide)
  - [Table of Contents](#table-of-contents)
    - [Introduction](#introduction)
    - [Interface Overview](#interface-overview)
    - [Section 1: Basic Usage - Adding Points](#section-1-basic-usage---adding-points)
      - [Method A: Individual Point Addition (Calculated)](#method-a-individual-point-addition-calculated)
      - [Method B: Individual Point Addition (Manual T-s)](#method-b-individual-point-addition-manual-t-s)
      - [Method C: Bulk Data Entry (P-h or T-s)](#method-c-bulk-data-entry-p-h-or-t-s)
    - [Section 2: Defining Processes - Connections](#section-2-defining-processes---connections)
      - [Manual Connection Creation](#manual-connection-creation)
      - [Connection Settings Panel](#connection-settings-panel)
      - [Bulk Connection Editor (Expert User)](#bulk-connection-editor-expert-user)
    - [Section 3: Canvas Interaction](#section-3-canvas-interaction)
      - [Managing Points](#managing-points)
      - [Panning and Zooming](#panning-and-zooming)
      - [Bending Lines (Curved Processes)](#bending-lines-curved-processes)
      - [Presentation Mode](#presentation-mode)
    - [Section 4: Advanced Tools and Analysis](#section-4-advanced-tools-and-analysis)
      - [Plotting Iso-lines (Isobars)](#plotting-iso-lines-isobars)
      - [Custom Cycle Efficiency Calculation](#custom-cycle-efficiency-calculation)
    - [Section 5: Customizing Appearance](#section-5-customizing-appearance)
      - [General Appearance Settings](#general-appearance-settings)
      - [Modifying Point and Line Properties](#modifying-point-and-line-properties)
      - [Legend and Notes](#legend-and-notes)
    - [Section 6: Project and Data Management](#section-6-project-and-data-management)
      - [Saving and Loading Projects](#saving-and-loading-projects)
      - [Data and Graphics Export](#data-and-graphics-export)

---

### Introduction

This web-based tool enables you to create T-s diagrams for water/steam systems. Key features include:

* **Flexible Point Input:** Calculate points from two known thermodynamic properties (P, T, h, s, x) or enter T and s values directly.
* **Visual Process Definition:** Create, label, and style connections (processes) between points.
* **Analysis Tools:** Plot constant pressure curves (isobars) and calculate thermal efficiency for defined cycles.
* **Advanced Customization:** Control every detail from line thickness to colors, labels to legends.
* **Data Management:** Save and reload your projects, export data as Excel or text files, save diagrams as high-resolution PNG or vector SVG.

---

### Interface Overview

The interface consists of three main sections:

| Left Panel (Control)                                          | Center Area (Canvas)                                    | Right Panel (Details and Settings)                      |
| ------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| Point addition, bulk data entry, analysis, and project management | The T-s diagram itself, with points and lines          | Selected point properties and connection settings       |

---

### Section 1: Basic Usage - Adding Points

The first step in creating a diagram is adding state points. Multiple methods are available.

#### Method A: Individual Point Addition (Calculated)

This is the most powerful method. It adds a point by calculating all properties from two known thermodynamic properties.

1. In the **left panel**, open the `➕ Add Points & Data` section.
2. Click on the `Single Point` tab.
3. Ensure `Calculate (XSteam)` mode is selected.
4. In the **Point Name** field, enter a name for your point (e.g., `1`, `Boiler Inlet`).
5. From the **Known Property 1** and **Known Property 2** menus, select the two properties you know (e.g., `Pressure (P)` and `Quality (x)`).
6. Enter the values for these properties in the boxes below.
    * **Tip:** You can also use special text like `hf` (saturated liquid enthalpy), `hg` (saturated vapor enthalpy), or `Tsat` (saturation temperature).
7. Click the `🧮 Calculate & Add Point` button. Your point will be calculated and added to the diagram.

#### Method B: Individual Point Addition (Manual T-s)

If you already know a point's T and s values and don't want to perform calculations:

1. While in the `Single Point` tab, switch to `Direct (T, s)` mode.
2. Enter the **Point Name**, **Temperature (°C)**, and **Entropy (kJ/kg·K)** values.
3. Click the `📍 Add T-s Point` button.

#### Method C: Bulk Data Entry (P-h or T-s)

If you have data for multiple points in tabular form, you can enter them all at once.

1. Click on the `Bulk Import / Update` tab.
2. **For Points (T,s):**
    * Paste your data into the first text area in `Name Temperature Entropy` format, with one point per line. Values can be separated by spaces or tabs.
    * Click the `Apply T-s Data` button.
3. **For XSteam (P,h):**
    * Enter your data in the second text area in `Name Pressure(kPa) Enthalpy(kJ/kg)` format. You can also use `hf` or `hg` as enthalpy values.
    * Click the `Apply P-h Data` button. The system will calculate and add all points.
    * The `Load Current` button loads the P-h values of existing points into this area.

---

### Section 2: Defining Processes - Connections

After adding points, you can create connections to show the processes (cycle steps) between them.

#### Manual Connection Creation

1. Click the `🔗 Connect` button in the control bar above the canvas. The button will turn red and your cursor will change.
2. Click on the starting point.
3. Drag your mouse toward the ending point; a dashed line will appear.
4. Click on the ending point. A connection (line) will be created between them.
5. To exit connection mode, click the `🔗 Cancel` button or press the `ESC` key.

#### Connection Settings Panel

To customize a connection you've created, use the **right panel**.

1. Open the `🔗 Connection Settings` section.
2. From the **Source Point** and **Target Point** menus, select the start and end points of the connection you want to edit.
3. The panel settings will automatically populate with that connection's properties:
    * **Line Style:** Choose `Solid`, `Dashed`, or `Dotted`.
    * **Label (on-line):** Label that appears on the line (e.g., `Heat Input`, `Work Output`).
    * **Legend Label:** Label that appears in the legend box.
    * **Color Box and Width:** Adjust the line's color and thickness.
    * **Show in Legend:** Choose whether this connection appears in the legend.
4. Click the `🔄 Update Connection` button to apply changes.

#### Bulk Connection Editor (Expert User)

This is the most efficient way to quickly create complex structures like Rankine cycles.

1. In the **left panel**, open the `🔗 Bulk Connection Editor` section.
2. Write your commands in a special format in the text area. Click the `ⓘ` icon to open the help menu for detailed information.
3. **Basic Formats:**
    * **Connection:** `SourcePoint,TargetPoint,"Label",Color,Style`
    * **Point Creation:** `PointName(p=1000,x=0)`
    * **All-in-One:** `1(p=10,x=0), 2(p=5000,s=*1), "Pump Work"`
        * This command creates point 1, calculates point 2 isentropically referencing point 1's entropy, and draws a line labeled "Pump Work" between them.
4. Click the `↥ Apply Changes` button to execute all commands.

---

### Section 3: Canvas Interaction

#### Managing Points

* **Selecting:** Click on a point to make it active and view its details in the right properties panel.
* **Moving (Dragging):** Click and hold a selected point, then drag to change its position. This changes the point's *visual* T and s values but doesn't affect its calculated thermodynamic properties.
* **Deleting:** After selecting a point, click the small `🗑️` icon that appears on it or press the `Delete` key.
* **Right-Click Menu:** Right-clicking on a point opens a menu offering edit, delete, and connection initiation options.

#### Panning and Zooming

* **Panning:** Click and hold on an empty area of the canvas and drag to navigate the diagram.
* **Zooming:** Use the mouse wheel to zoom in and out at your cursor's location. These features can be disabled with the `Allow Dragging` and `Allow Zoom` options in the top control bar.

#### Bending Lines (Curved Processes)

Real-world processes aren't always straight lines.

1. Ensure the `Allow Bending` option in the top control bar is active.
2. When you hover your mouse over the middle of a line, a small control point will appear.
3. Click and hold this control point and drag to curve the line.
4. To straighten the line again, use the `Reset Curve` button in the `Connection Settings` section of the right panel.

#### Presentation Mode

Clicking the `Presentation` button simplifies parts of the interface, automatically displays point labels, and prepares the diagram for a cleaner presentation. Click again to return to editing mode.

---

### Section 4: Advanced Tools and Analysis

#### Plotting Iso-lines (Isobars)

To plot constant pressure curves (isobars) on the diagram:

1. In the **left panel**, open the `〰️ Plot Iso-Lines` section.
2. Enter the pressure value you want to plot in the **Pressure (kPa)** field.
3. Click the `Plot Isobar` button.
4. The `Plot All Point Pressures` button automatically plots isobars for all your existing points' pressure values.

#### Custom Cycle Efficiency Calculation

You can calculate the thermal efficiency of any cycle you've defined.

1. In the **left panel**, open the `📊 Custom Cycle Efficiency` section. (This section becomes active after at least 3 points are added).
2. Under **Heat Input (Q_H) Processes**, define processes where heat enters the cycle. For example, for the boiler process, click `+ Add Boiler/Heater`, then select the inlet and outlet points.
3. Under **Heat Rejection (Q_L) Processes**, define processes where heat leaves the cycle (e.g., condenser).
4. For each process, enter the mass flow rate (`Mass Flow`) in kg/s.
5. Click the `🧮 Calculate Efficiency` button. The result will be displayed below.

---

### Section 5: Customizing Appearance

#### General Appearance Settings

With the checkboxes in the control bar above the canvas, you can instantly change the diagram's general appearance:

* `Saturation Curve`: Shows/hides the saturation curve.
* `Show Lines`: Shows/hides connections between points.
* `Show Labels`: Shows/hides point names.
* `Show Arrows`: Shows/hides arrows indicating process direction.

#### Modifying Point and Line Properties

The `🎨 Appearance Settings` section in the **right panel** allows you to customize all visual elements:

* **Global:** Set the default thickness for all lines and the saturation curve.
* **Point Specific:** Select a point and change its color, size, or label color.

#### Legend and Notes

* **Legend:** Located in the top right corner of the canvas. Connections with `Show in Legend` checked in the `Connection Settings` panel are displayed here. You can drag the legend box by its title to move it anywhere.
* **Notes:** You can take custom notes about your project in the note box at the top left. These notes are also saved with your project.

---

### Section 6: Project and Data Management

#### Saving and Loading Projects

You can save your work to continue later.

1. In the **left panel**, go to the `💾 Project & Data Export` section.
2. Click the `📥 Save (.json)` button to download your entire project (points, connections, settings, notes) as a `.json` file.
3. To open this project later, click the `📤 Load (.json)` button and select the file you downloaded.

#### Data and Graphics Export

* **Data:**
    * `📊 Excel (.xlsx)`: Generates a detailed Excel report containing all points' thermodynamic and saturation properties.
    * `📋 Text (.txt)`: Generates an easily copyable property report in plain text format.
* **Graphics:**
    * `💾 4K PNG`: Downloads a high-resolution (3840x2160) image of your diagram.
    * `✨ SVG`: Downloads a vector version of your diagram that can be scaled without quality loss. Ideal for reports and presentations.
