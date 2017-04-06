function buildSvg(selector, data){
	/* Stop, When Don't Have Data */
	if(!data || !selector){
		return;
	}

	/* Start Params */
	var d  = 100;
	var cx = d/2;
	var cy = d/2;
	var r  = d/2;
	var pieces = data.length;
	var angle = 360/data.length;
	var counter = 0;

	/* Default Params for Ellipse */
	var xRot = 0;  // rotate by x-axis
	var lAF = 0;   // long (1)/short(0) ellipse
	var fL = 1;    // go by time line(1) / -time line(0)

	/* Create SVG Element */
	var svgElem = createSvg();

	/* Append SVG Element Into Selector */
	selector.appendChild(svgElem);

	/* Create Circle */
	svgElem.appendChild(createCircle());

	createPath();

	/* Functions */
	function createSvg(){
		var svgElem = document.createElementNS("http://www.w3.org/2000/svg","svg");
				svgElem.setAttribute("viewbox", "0 0 "+d+" "+d);
				svgElem.setAttribute("width", d);
				svgElem.setAttribute("height", d);
				svgElem.setAttribute("class", "color-circle");
		return svgElem;
	};

	function rad(deg){
		return deg*Math.PI/180;
	};

	function createCircle(svgEl){
		var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
				circle.setAttribute("cx", cx);
				circle.setAttribute("cy", cy);
				circle.setAttribute("r", r);
				circle.setAttribute("stroke", "#777");
				circle.setAttribute("stroke-width", 1);
			circle.setAttribute("fill", data[0].hexFormat);

		return circle;
	};

	function createPath(){
		if(counter >= pieces){
			return;
		};

		/* Create Path Group */
		var group = document.createElementNS("http://www.w3.org/2000/svg","g");
		svgElem.appendChild(group);

		/* Create Path */
		var path = document.createElementNS("http://www.w3.org/2000/svg","path");
		group.appendChild(path);

		/* Count End Point */
		var toX = cx + r*Math.cos(rad(angle));
		var toY = cy + r*Math.sin(rad(angle));

		var d = [
					"M", cx+r, " ", cy,
					"A", r, ",", r, " ", 0, " ", (Math.abs(angle) < 180) ? 0 : 1 , " ", fL, " ", toX ,",", toY,
					"L", cx, ",", cy,
					"z"
				].join("");

		path.setAttribute("d", d);
		path.setAttribute("fill", data[counter].hexFormat);
		
		group.setAttribute("transform", "rotate("+angle*counter+", "+cx+","+cy+")");

		/* Add Counter */
		counter++;

		/* Create Next Path */
		createPath();
	};
}

var data = [
	{
		id: "",
		name: "",
		hexFormat: "#0ff"
	},
	{
		id: "",
		name: "",
		hexFormat: "#f0f"
	},
	{
		id: "",
		name: "",
		hexFormat: "#ff0"
	},
	{
		id: "",
		name: "",
		hexFormat: "#0f0"
	},
	{
		id: "",
		name: "",
		hexFormat: "#00f"
	}
];

buildSvg(document.body, data);