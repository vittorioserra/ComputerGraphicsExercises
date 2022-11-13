"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

let polygon = new Polygon([new Point(100, 10),
                            new Point(120, 72),
                            new Point(186, 72),
                            new Point(136, 112),
                            new Point(153, 173),
                            new Point(100, 138),
                            new Point(47, 173),
                            new Point(64, 112),
                            new Point(14, 72),
                            new Point(80, 72)],
                        new Color(255, 127, 0));

/////////////////////
//// edge table  ////
/////////////////////

// edge table entry
function EdgeTableEntry(edge) {
    let dx = 0;
    let dy = 0;
    if (edge.startPoint.y < edge.endPoint.y) {
        this.y_lower = edge.startPoint.y;
        this.x_lower = edge.startPoint.x;
        this.y_upper = edge.endPoint.y;
        dx = edge.endPoint.x - edge.startPoint.x;
        dy = edge.endPoint.y - edge.startPoint.y;
    }
    else {
        this.y_lower = edge.endPoint.y;
        this.x_lower = edge.endPoint.x;
        this.y_upper = edge.startPoint.y;
        dx = edge.startPoint.x - edge.endPoint.x;
        dy = edge.startPoint.y - edge.endPoint.y;
    }

    this.invSlope = dx / dy;
}

function compareEdgeTableEntries(a, b) {
    return a.y_lower - b.y_lower;
}

function printEdgeTableEntry(e) {
    console.log("ET: " + e.y_lower + " " + e.x_lower + " " + e.y_upper + " " + e.invSlope);
}

// edge table
function EdgeTable(polygon) {
    this.entries = new Array(polygon.nEdges);
    this.nEntries = polygon.nEdges;

    for (let i = 0; i < polygon.nEdges; i++) {
        this.entries[i] = new EdgeTableEntry(polygon.edges[i]);
    }
    this.entries.sort(compareEdgeTableEntries);

    for (let i = 0; i < polygon.nEdges; i++) {
        printEdgeTableEntry(this.entries[i]);
    }
}

////////////////////////////
//// active edge table  ////
////////////////////////////

// active edge table entry
function ActiveEdgeTableEntry(edgeTableEntry) {
    this.x_intersect = edgeTableEntry.x_lower;
    this.y_upper = edgeTableEntry.y_upper;
    this.invSlope = edgeTableEntry.invSlope;
}

function compareActiveEdgeTableEntries(a, b) {
    return a.x_intersect - b.x_intersect;
}

// active edge table
function ActiveEdgeTable() {
    this.entries = new Array();
    this.nEntries = 0;
}


/////////////////////////////
//// scanline algorithm  ////
/////////////////////////////

function scanline(image, polygon) {

    let edgeTable = new EdgeTable(polygon);
    let activeEdgeTable = new ActiveEdgeTable();
    
    // TODO 2.3     Perform the scanline algorithm 
    //              by following the single comments.
    //              In order to reach the full number of
    //              points, you only have to do the man-
    //              datory part.

    for (let y_scanline = 0; y_scanline < image.height ; y_scanline++) {
        // [optimization]
        // if the active edge table is empty (nEntries==0) we can step to the next edge, i.e. we can set y_scanline = myEdgeTableEntry.y_lower
        // note that the edge table is sorted by y_lower!


        // [mandatory]
        // as we cannot delete entries from the active edge table:
        // - build a new active edge table
        // - copy all those edges from the previous active edge table which should still be in the active edge table for this scanline
        // - assign the new active edge table to activeEdgeTable
        let curr_ET = new ActiveEdgeTable(); // built new active edge table
        //copy all edges from old active edge table
        for(let i = 0; i < activeEdgeTable.nEntries; i++){
            let cp_elem = activeEdgeTable.entries[i];
            if((cp_elem.y_upper > y_scanline)&(Math.abs(cp_elem.invSlope) != Infinity)){
                //console.log("Keeping element");
                curr_ET.entries.push(cp_elem);
                curr_ET.nEntries++;
            }
        }
        //assigning new active edge-table to edge table
        activeEdgeTable = curr_ET;


        // [mandatory]
        // add new edges from the edge table to the active edge table

        //check all entries in ET
        for(let i = 0; i < edgeTable.nEntries ; i++){
            let curr_elem = edgeTable.entries[i];
            if ((curr_elem.y_lower == y_scanline)&(Math.abs(curr_elem.invSlope) != Infinity)){ //with this check there is no need to pop elements from the EdgeTable
                let new_edgeEntry = new ActiveEdgeTableEntry(curr_elem); // insert element in active edge table
                activeEdgeTable.entries.push(new_edgeEntry); // push on table
                activeEdgeTable.nEntries++;
            }
        }

        activeEdgeTable.entries.sort(compareActiveEdgeTableEntries);

        // [mandatory]
        // rasterize the line:
        // for every two successive active edge entries set the pixels in between the x intersections (the first and the second entry build a line segment, the third and the fourth build a line segment and so on)
        // note that setPixel() requires integer pixel coordinates!

        for(let i = 0; i < activeEdgeTable.nEntries ; i=i+2){

            let x_start = Math.floor(activeEdgeTable.entries[i+0].x_intersect);
            let x_end   = Math.ceil(activeEdgeTable.entries[i+1].x_intersect);

            let px_diff = Math.abs(x_end - x_start);

            //set the pixels
            if(px_diff > 0){
                for(let px_cnt = 0; px_cnt <= px_diff; px_cnt++){
                    let px_elem_local = new Point(x_start+px_cnt, y_scanline);
                    setPixel(image, px_elem_local, polygon.color);
                    //console.log("setting pixel")
                }
            }

        }

        // [mandatory]
        // update the x_intersect of the active edge table entries
        for(let i = 0; i < activeEdgeTable.nEntries ; i++){
            activeEdgeTable.entries[i].x_intersect = activeEdgeTable.entries[i].x_intersect + activeEdgeTable.entries[i].invSlope;
        }
    }
}


//////////////////////////
//// render function  ////
//////////////////////////

function RenderCanvas3() {
    // get canvas handle
    let context = document.getElementById("canvas3").getContext("2d");
    let canvas = context.createImageData(200, 200);

    // clear canvas
    clearImage(canvas, new Color(255, 255, 255));

    // draw line
    scanline(canvas, polygon);

    // show image
    context.putImageData(canvas, 0, 0);
}

function setupScanline(canvas) {
    // execute rendering
    RenderCanvas3();
}
