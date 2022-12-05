

var x = new Point(1, 0);
var y = new Point(0, 1);

function config(treeColor, leafColor) {
    return {
        treeColor: treeColor,
        leafColor: leafColor
    }
}

function leaf(pt, angle, length, cfg) {
    var r = length / 3;
    var tip = pt - y * length;
    var mid = pt - y * (length / 2);
    var l = new Path([
        new Segment(pt, - x * r, + x * r),
        new Segment(tip, + x * (r / 2), - x * (r / 2)),
        new Segment(pt, - x * r, + x * r)
    ]);
    l.rotate(angle, pt);
    l.style = { fillColor: cfg.leafColor, closed: true };
}

function branchpart(pt, angle, width, length, cfg) {
    var wh = width / 2;
    var rect = Path.Rectangle(
        pt - x * wh + y * wh,
        pt + x * wh - y * (length + wh));
    rect.style = { fillColor: cfg.treeColor };
    rect.rotate(angle, pt);

    var nextroot = (pt - y * length).rotate(angle, pt);
    return {
        rect: rect,
        next: nextroot,
    }
}

function branch(pt, angle, width, length, cfg) {
    var b = branchpart(pt, angle, width, length, cfg);

    if (width > 3) {
        // Recurse
        var n = b.next;
        var area = width * width;
        var ffrac = Math.random(); // first branch fraction of area
        var sfrac = 1 - ffrac;  // same for second branch


        if (ffrac > 0.05) {
            var fangle = angle + (1 - ffrac) * 45;
            branch(n, fangle, Math.sqrt(area * ffrac), length * 0.92, cfg);
        }
        if (sfrac > 0.05) {
            var sangle = angle - (1 - sfrac) * 45;
            branch(n, sangle, Math.sqrt(area * sfrac), length * 0.92, cfg);
        }
    } else {
        leaf(b.next, angle, 20, cfg);
    }
}

function tree(pt, cfg) {
    branch(pt, 0, 40, 35, cfg);
}

function threeTreeHorizontalScene(season) {
    //clear canvas
    paper.project.activeLayer.removeChildren();
    var fullwidth = paper.view.size.width;
    var height = paper.view.size.height;
    var border = Math.round(fullwidth / 12) + 50;
    var frame = Path.Rectangle(new Point(border, height - 322), new Point(fullwidth - border, height - 2));
    frame.style = {
        fillColor: 'white',
        strokeColor: 'black',
        strokeWidth: 0
    }

    //log season
    console.log(season);

    var innerwidth = fullwidth - 2 * border;
    //set variable winterColor to white blue
    var winterColor = ["#79C0D7", "#2377A4", "#C7E2E9", "#EEF3F2"];
    var springColor = ["#A0DB9E","#E3F8B3"]
    var summerColor = ["#087830","#059033"]
    var fallColor = ["#BA6300","#E88E1C"]

    //add hex color winterColor by amount season
    
 
 /*
    winterColor = winterColor.map(function (x) { return "#"+((parseInt(x.replace("#",""), 16)+parseInt(season)).toString(16)) });
    springColor = springColor.map(function (x) { return "#"+((parseInt(x.replace("#",""), 16)+parseInt(season)).toString(16)) });
    summerColor = summerColor.map(function (x) { return "#"+((parseInt(x.replace("#",""), 16)+parseInt(season)).toString(16)) });
    fallColor = fallColor.map(function (x) { return "#"+((parseInt(x.replace("#",""), 16)+parseInt(season)).toString(16)) });
*/

   



    if (innerwidth > 320) {
        //if season is < 25 set to winterColor
        if (season < 25) {
            tree(new Point(border + Math.round(innerwidth * (1 / 2)), height - 23), config("black", springColor[0]));
            tree(new Point(border + Math.round(innerwidth * (2 / 3)), height - 23), config("black", springColor[1]));
        } else if (season < 50) {
            tree(new Point(border + Math.round(innerwidth * (1 / 2)), height - 23), config("black", summerColor[0]));
            tree(new Point(border + Math.round(innerwidth * (2 / 3)), height - 23), config("black", summerColor[1]));
        } else if (season < 75) {
            tree(new Point(border + Math.round(innerwidth * (1 / 2)), height - 23), config("black", fallColor[0]));
            tree(new Point(border + Math.round(innerwidth * (2 / 3)), height - 23), config("black", fallColor[1]));
        } else {
             
            tree(new Point(border + Math.round(innerwidth * (1 / 2)), height - 23), config("black", winterColor[0]));
            tree(new Point(border + Math.round(innerwidth * (2 / 3)), height - 23), config("black", winterColor[1]));
        }


         
    } else {
        tree(new Point(border + Math.round(innerwidth * (1 / 2)), height - 23), config("black", "#03992c"));
    }
}

threeTreeHorizontalScene(12);

//jquery document ready 
$(document).ready(function () {
 
    

    //event handler for formControlRange change
    $("#formControlRange").on("input", function () {
        //get value of formControlRange
        var value = $(this).val();
        //set value of formControlRange to span

        threeTreeHorizontalScene(value);
    });

});
