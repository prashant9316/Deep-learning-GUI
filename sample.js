modelState = 0;
var modelName;
var firstLayer;
let baseModel;
var optimize = false;

function showLayers(){
	if(modelState == 0){
  	var convButton = document.createElement("button");
	convButton.id = "ConvBtn";
	convButton.type = "button";
	convButton.innerHTML = "Convoultion";
	convButton.onclick = function(){
		if(optimize == false)
		{	conv();
	}

	};

	var denseButton = document.createElement("button");
	denseButton.id = "DenseBtn";
	denseButton.type = "button";
	denseButton.innerHTML = "Dense";
	denseButton.onclick = function(){
		if(optimize == false){
		dense();
		}
	};

	var maxPoolButton = document.createElement("button");
	maxPoolButton.id = "maxPoolBtn";
	maxPoolButton.type = "button";
	maxPoolButton.innerHTML = "maxPool";
	maxPoolButton.onclick = function(){

		if(optimize == false){
			maxPool();
		}
		
	};

	var batchNormButton = document.createElement("button");
	batchNormButton.id = "batchNormBtn";
	batchNormButton.type = "button";
	batchNormButton.innerHTML = "BatchNorm";
	batchNormButton.onclick = function(){
		if(optimize == false){

			batchNorm();
		}
	};

	var flattenButton = document.createElement("button");
	flattenButton.id = "flattenBtn";
	flattenButton.type = "button";
	flattenButton.innerHTML = "Flatten";
	flattenButton.onclick = function(){
		if(optimize==false){
			flatten();
		}
	};

	var dropoutButton = document.createElement("button");
	dropoutButton.id = "dropoutBtn";
	dropoutButton.type = "button";
	dropoutButton.innerHTML = "Dropout";
	dropoutButton.onclick = function(){
		if(optimize == false){
			dropout();
		}
	};

	var optimizeButton = document.createElement("button");
	optimizeButton.id = "optimizeBtn";
	optimizeButton.type = "button";
	optimizeButton.innerHTML = "Optimize";
	optimizeButton.onclick = function(){
		if(optimize == false){
			optimizeInput();
		}
	}

	var container = document.getElementById("container");

	container.appendChild(convButton);
	container.appendChild(denseButton);
	container.appendChild(maxPoolButton);
	container.appendChild(batchNormButton);
	container.appendChild(flattenButton);
	container.appendChild(dropoutButton);
	container.appendChild(optimizeButton);

	container.appendChild(linebreak);
	}
}

async function loadMobilenet(){
  if(modelState == 0){

  console.log("loading model");
  const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json');
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  baseModel = tf.model({inputs: mobilenet.inputs, outputs: layer.output});
  modelName = document.getElementById("modelName").value;
  console.log(modelName +" locked and loaded");
  showLayers();
  modelState = 1;
  firstLayer = true;
}
else if(modelState == 1){
	console.warn("model is already locked and loaded!");
}
 else if (modelState == 1) {
 	console.log("Now you can add your own layers to this model.");
 	showLayers();
 	}

 else{
 	modelState = -1;
 	console.error("Unable to load Model");
 	console.error("Contact on mail: pgmd.9873@gmail.com to solve this error!");
 
 }

}

