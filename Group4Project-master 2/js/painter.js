//Yee Sin Joan Poon- Group project
//Javascript and Jquery part for simple painter app
$(document).ready( function() {
	var canvas = document.getElementById('canvasInAPerfectWorld');
	var context = canvas.getContext("2d");

	$('#canvasInAPerfectWorld').mousedown(function(e){
	  var mouseX = e.pageX - this.offsetLeft;
	  var mouseY = e.pageY - this.offsetTop;
			
	  paint = true;
	  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	  redraw();
	});

	$('#canvasInAPerfectWorld').mousemove(function(e){
	  if(paint){
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	  }
	});
	$('#canvasInAPerfectWorld').mouseup(function(e){
	  paint = false;
	});
	$('#canvasInAPerfectWorld').mouseleave(function(e){
	  paint = false;
	});

	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;
	var colorRed = "#ff0000";
	var colorGreen = "#00ff72";
	var colorYellow = "#fff200";
	var colorBlue = "#0000ff";
	var colorBlack = "#000000";
	var colorWhite = "#ffffff";
	var clickColor = new Array();
	var curColor = colorBlack;

	$('#red').click(function(e){
		curColor = colorRed;
	});
	$('#green').mousedown(function(e){
		curColor = colorGreen;
	});
	$('#yellow').mousedown(function(e){
		curColor = colorYellow;
	});
	$('#blue').mousedown(function(e){
		curColor = colorBlue;
	});
	$('#black').mousedown(function(e){
		curColor = colorBlack;
	});
	$('#white').mousedown(function(e){
		curColor = colorWhite;
	});
	$('#reset').click(function(e){
		location.reload();
	});
	function addClick(x, y, dragging)
	{
	  clickX.push(x);
	  clickY.push(y);
	  clickDrag.push(dragging);
	  clickColor.push(curColor);
	}
	function redraw(){
	  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	  context.lineJoin = "round";
	  context.lineWidth = 5;
	  for(var i=0; i < clickX.length; i++) {		
		context.beginPath();
		if(clickDrag[i] && i){
		  context.moveTo(clickX[i-1], clickY[i-1]);
		 }else{
		   context.moveTo(clickX[i]-1, clickY[i]);
		 }
		 context.lineTo(clickX[i], clickY[i]);
		 context.closePath();
		 context.strokeStyle = clickColor[i];
		 context.stroke();
	  }
	}

	$("#paintButton").click(function(){
		$("#paintString").text("Please draw...  " + str[rand]);
	});
	var str = ["A tree","An apple","An orange","A flower","A car","A house","A sun","A star","A fish","A bee","A pencil","A pear"];
	var rand = Math.floor(Math.random() * 12); //12 elements in str array


});