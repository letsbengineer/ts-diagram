<img width="1903" height="984" alt="image" src="https://github.com/user-attachments/assets/97bd77a4-723d-4eb7-b70d-37ff0784da3a" 
/>Welcome to the T-S Diagram Tool! This powerful web-based application is designed for visualizing, analyzing, and exporting thermodynamic processes and cycles. Whether you're an engineering student, an educator, or a professional, this guide will help you unlock the full potential of the tool.

<img width="356" height="314" alt="image" src="https://github.com/user-attachments/assets/a399f346-f12d-41eb-a55a-5e7022512476" />

##Example: Simple Input and Diagram

<img width="1819" height="954" alt="image" src="https://github.com/user-attachments/assets/6c663176-0c17-4f03-9158-7e3d52c44b13" />

Point Name	Phase	Pressure (kPa)	Temperature (°C)	Enthalpy (kJ/kg)	Entropy (kJ/kg·K)	Spec. Vol. (m³/kg)	Quality
1	Saturated Liquid (x=0.0000e+00)	8.532608	42.75209903	178.9825103	0.608993726	0.001008975	0.0000
2	Subcooled Liquid	80	42.75425679	179.05484	0.608993015	0.001008944	Not Available
3	Subcooled Liquid	80	69.85981881	292.46767	0.953252246	0.001022652	Not Available
4	Subcooled Liquid	6600	70.17326745	299.13536	0.953199204	0.001019867	Not Available
5	Subcooled Liquid	6600	275.8678416	1214.9845	3.028162005	0.001318548	Not Available
6	Subcooled Liquid	7100	276.0386435	1215.6437	3.028165855	0.001317744	Not Available
7	Two Phase Mixture (x=0.1450)	6600	281.8758973	1468.5212	3.485390537	0.005383159	0.1450
8	Two Phase Mixture (x=0.0500)	6600	281.8758973	1323.066	3.223321563	0.00273342	0.0500
9	Two Phase Mixture (x=0.9500)	6600	281.8758973	2701.0622	5.706079483	0.027836202	0.9500
10	Two Phase Mixture (x=0.8412)	1240	189.4514741	2470.5372	5.830660743	0.133256377	0.8412
11	Two Phase Mixture (x=0.9900)	1240	189.4514741	2765.103	6.467422779	0.15662397	0.9900
12	Two Phase Mixture (x=0.8841)	80	93.48535413	2401.6876	6.715225938	1.845416497	0.8841
13	Saturated Liquid (x=0.0000e+00)	1240	189.46601	805.1206316	2.230674225	0.001140668	0.0000
14	Two Phase Mixture (x=0.1819)	80	93.48535413	805.12063	2.360602506	0.380440651	0.1819
15	Saturated Liquid (x=0.0000e+00)	80	93.48532053	391.6387578	1.232833675	0.001038492	0.0000
16	Two Phase Mixture (x=0.9900)	80	93.48535413	2642.4423	7.371882425	2.066327881	0.9900
17	Two Phase Mixture (x=0.9176)	8.532608	42.73774311	2380.7705	7.578975993	15.6306411	0.9176
<img width="1058" height="614" alt="image" src="https://github.com/user-attachments/assets/e6b1a6c1-5105-42f9-86ed-248b3df1a528" />


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

1.  In the **left panel**, expand the `➕ Add Points & Data` section.
2.  Click the `Single Point` tab.
3.  Ensure the `Calculate (XSteam)` mode is active.
4.  In the **Point Name** field, give your point a name (e.g., `1`, `Turbine Inlet`).
5.  Select the two properties you know from the **Known Property 1** and **Known Property 2** dropdowns (e.g., `Pressure (P)` and `Quality (x)`).
6.  Enter the corresponding values in the input boxes below.
    *   **Pro Tip:** You can also use special string values like `hf` (saturated liquid enthalpy), `hg` (saturated vapor enthalpy), or `Tsat` (saturation temperature).
7.  Click the `🧮 Calculate & Add Point` button. Your point will be calculated and added to the diagram.

#### Method B: Add a Single Point (Direct T-s)

If you already know the T and s values for a point and don't need calculations:

1.  In the `Single Point` tab, switch to the `Direct (T, s)` mode.
2.  Enter the **Point Name**, **Temperature (°C)**, and **Entropy (kJ/kg·K)**.
3.  Click the `📍 Add T-s Point` button.

#### Method C: Bulk Data Import (P-h or T-s)

If you have data for multiple points in a table, you can import them all at once.

1.  Click the `Bulk Import / Update` tab.
2.  **For T-s Data:**
    *   In the first text area, paste your data in the format `Name Temperature Entropy` for each line. Values can be separated by spaces or tabs.
    *   Click the `Apply T-s Data` button.
3.  **For P-h Data (with XSteam calculation):**
    *   In the second text area, paste your data in the format `Name Pressure(kPa) Enthalpy(kJ/kg)`. You can use `hf` or `hg` for the enthalpy value.
    *   Click the `Apply P-h Data` button. The system will calculate and add all points.
    *   The `Load Current` button will populate this text area with the P-h data of all points currently on your canvas.

---

### Part 2: Defining Processes - Connections

Once you have points, you can create connections between them to represent processes (steps in a cycle).

#### Creating Connections Manually

1.  Click the `🔗 Connect` button in the control bar above the canvas. The button will turn red, and your cursor will change.
2.  Click on the starting point of your process.
3.  Move your mouse toward the target point; a dashed line will follow.
4.  Click on the target point. A connection (line) will be created.
5.  To exit connect mode, click the `🔗 Cancel` button or press the `ESC` key.

#### Using the Connection Settings Panel

Use the **right panel** to customize any connection you've created.

1.  Expand the `🔗 Connection Settings` section.
2.  Select the **Source Point** and **Target Point** of the connection you want to edit from the dropdowns.
3.  The panel's settings will automatically load that connection's properties:
    *   **Line Style:** Choose `Solid`, `Dashed`, or `Dotted`.
    *   **Label (on-line):** A text label that appears on the line itself (e.g., `Heat Addition`, `Work Output`).
    *   **Legend Label:** A label that appears in the diagram's legend box.
    *   **Color Picker & Width:** Set the line's color and thickness.
    *   **Show in Legend:** Check this box to make the connection appear in the legend.
4.  Click the `🔄 Update Connection` button to apply your changes.

#### The Bulk Connection Editor (Advanced)

This is the fastest way to script complex cycles like the Rankine cycle.

1.  In the **left panel**, expand the `🔗 Bulk Connection Editor` section.
2.  Enter commands into the text area using a special syntax. Click the `ⓘ` help icon for a detailed guide.
3.  **Basic Formats:**
    *   **Connection:** `SourcePoint,TargetPoint,"Label",Color,Style`
    *   **Point Creation:** `PointName(p=1000,x=0)`
    *   **All-in-one:** `1(p=10,x=0), 2(p=5000,s=*1), "Pump Work"`
        *   This command creates point 1, calculates point 2 isentropically (using the entropy of point 1 as a reference), and draws a line between them labeled "Pump Work".
4.  Click the `↥ Apply Changes` button to execute all commands.

---

### Part 3: Interacting with the Canvas

#### Managing Points

*   **Select:** Click a point to make it active. Its properties will appear in the right-hand panel.
*   **Move (Drag):** Click, hold, and drag a selected point to change its position. This changes its *visual* T and s values but does not affect its calculated thermodynamic properties.
*   **Delete:** After selecting a point, click the small `🗑️` icon that appears above it, or press the `Delete` key on your keyboard.
*   **Right-Click Menu:** Right-clicking on a point opens a context menu with options to Edit, Delete, or Start a Connection.

#### Panning & Zooming the View

*   **Pan:** Click and drag on any empty area of the canvas to move the diagram around.
*   **Zoom:** Use your mouse wheel to zoom in and out, centered on your cursor's position. These features can be disabled via the `Allow Dragging` and `Allow Zoom` checkboxes in the top control bar.

#### Bending Lines (Curved Processes)

Real-world processes are not always ideal straight lines.

1.  Ensure `Allow Bending` is checked in the top control bar.
2.  Hover your mouse over the middle of a line; a small control point will appear.
3.  Click and drag this control point to give the line a curve.
4.  To straighten the line again, use the `Reset Curve` button under `Connection Settings` in the right panel.

#### Presentation Mode

Clicking the `Presentation` button simplifies the UI, automatically shows all point labels, and prepares the diagram for a clean, focused view. Click it again to return to editing mode.

---

### Part 4: Advanced Tools & Analysis

#### Plotting Iso-Lines (Isobars)

To draw constant pressure lines (isobars) on your diagram:

1.  In the **left panel**, expand the `〰️ Plot Iso-Lines` section.
2.  Enter a pressure value in the **Pressure (kPa)** field.
3.  Click the `Plot Isobar` button.
4.  The `Plot All Point Pressures` button will automatically draw isobars for the pressure values of all points currently on the canvas.

#### Custom Cycle Efficiency Calculation

You can calculate the thermal efficiency of any cycle you define.

1.  In the **left panel**, expand the `📊 Custom Cycle Efficiency` section. (This is enabled once you have at least 3 points).
2.  Under **Heat Input (Q_H) Processes**, define the processes where heat is added to your cycle. Click `+ Add Boiler/Heater` and select the inlet and outlet points for that process.
3.  Under **Heat Rejection (Q_L) Processes**, define the processes where heat is removed from your cycle (e.g., the condenser).
4.  Enter the **Mass Flow** rate in kg/s for each process.
5.  Click the `🧮 Calculate Efficiency` button. The result will be displayed below.

---

### Part 5: Customizing the Appearance

#### Global View Settings

The checkboxes in the control bar above the canvas allow you to instantly toggle major visual elements:
*   `Saturation Curve`: Shows/hides the saturation dome.
*   `Show Lines`: Shows/hides the connections between points.
*   `Show Labels`: Shows/hides the names of the points.
*   `Show Arrows`: Shows/hides the direction arrows on the process lines.

#### Changing Point and Line Properties

The `🎨 Appearance Settings` section in the **right panel** gives you full control over visuals:
*   **Global:** Adjust the default thickness for all lines and the saturation curve.
*   **Point Specific:** Select a point from the dropdown and change its color, size, or label color individually.

#### The Legend and Notes Boxes

*   **Legend:** Located in the top-right of the canvas. It displays any connection that has the `Show in Legend` box checked in its settings. You can drag the legend box by its header to reposition it.
*   **Notes:** A draggable text box in the top-left where you can add custom notes about your project. These notes are saved with your project file.

---

### Part 6: Project & Data Management

#### Saving and Loading a Project

You can save your entire session to resume work later.

1.  Go to the `💾 Project & Data Export` section in the **left panel**.
2.  Click `📥 Save (.json)` to download a `.json` file containing everything (points, connections, settings, notes).
3.  To resume, click `📤 Load (.json)` and select the project file you previously saved.

#### Exporting Data and Graphics

*   **Data Export:**
    *   `📊 Excel (.xlsx)`: Generates a detailed Excel report with all thermodynamic and saturation properties for your points.
    *   `📋 Text (.txt)`: Creates a clean, easy-to-copy plain text report of all properties.
*   **Graphics Export:**
    *   `💾 4K PNG`: Downloads a high-resolution (3840x2160) image of your diagram.
    *   `✨ SVG`: Downloads a vector version of your diagram. This format is perfect for reports and presentations as it can be scaled to any size without losing quality.
