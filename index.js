var model;
var state = 0, cconv = 0;
linebreak = document.createElement("br");


function createModel(){
	console.log("creating model");
	model = tf.Sequential();
	console.log("Model is created");
}

function conv(){

	counter = increment_counter('conv');
	state = 0;

	var kernels = document.createElement("input");
	kernels.type = "text";
	kernels.id = "k";
	kernels.value = "64";
	var sizeOfFilters = document.createElement("INPUT");
	sizeOfFilters.id = "f";
	sizeOfFilters.type = "text";
	sizeOfFilters.value = "2";
	var sizeOfPadding = document.createElement("INPUT");
	sizeOfPadding.id = "p";
	sizeOfPadding.type = "text";
	sizeOfPadding.value = "0";
	var activation = document.createElement("input");
	activation.id = "convAct";
	activation.type = "text";
	activation.value = "relu"
	var addButton = document.createElement("button");
	addButton.id = "convBtn";
	addButton.type = "button";
	addButton.name = "convBtn1";
	addButton.value = "Add Layer";
	addButton.onclick = function(){
		if (state == 1){
			state =2;
		}
		else if(state == 0){addConvLayer(counter);}

		};
		var container = document.getElementById("container");
	container.appendChild(kernels);
	container.appendChild(sizeOfFilters);
	container.appendChild(sizeOfPadding);
	container.appendChild(activation);
	container.appendChild(addButton);
	container.appendChild(linebreak);
}

function addConvLayer(layer){
	if (state == 0){
	var k = parseInt(document.getElementById("k").value);
	var f = parseInt(document.getElementById("f").value);
	var p = parseInt(document.getElementById("p").value);
	var a = checkActivation(document.getElementById("convAct").value);
	//Add a convolution layer to the model
	if(firstLayer){
		model = tf.sequential({
    layers: [
        tf.layers.conv2d({filters: k, kernelSize: f, activation:a, inputShape: baseModel.outputs[0].shape.slice(1)})
    ]});
		console.log('first Layer of your model');
    firstLayer = false;
	}
	else{
		model.add(tf.layers.conv2d({filters: k, kernelSize: f, activation: a}));
	}
	var output = "Conv Layer "+layer+" added to Model with "+k+" kernels, "+f+" filter size, "+p+" padding, and "+a+" activation.";
	console.log(output);

	var out = document.createTextNode(output)
	var container = document.getElementById("container");
	container.appendChild(linebreak);
	container.appendChild(out);
	container.appendChild(linebreak);
	state = 2;
	}



		}

		function checkActivation(x)	{

		if (x =='relu' || x == 'sigmoid' || x == 'softmax' || x =='tanh')		
				return x;
			else		
				exit();	}

function maxPool(){
	model.add(tf.layers.maxPooling2d({poolSize:[2,2]}));
	output = "Added Max Pooling 2D to the Model";

	console.log("Max Pooling layer added");
	var out = document.createTextNode(output);
	var container = document.getElementById("container");
	container.appendChild(out);
}

function flatten(){
	if(firstLayer){
		model = tf.sequential({
    		layers: [
        		tf.layers.flatten({inputShape: baseModel.outputs[0].shape.slice(1)})
    ]});

    firstLayer = false;
	}
	console.log("flatten layer added");

	output = "Added the Flatten to Model";

	var out = document.createTextNode(output);
	var container = document.getElementById("container");
	container.appendChild(out);
}

function batchNorm(){
	model.add(tf.layers.batchNormalization());
	output = "Added Batch Normalization to the Model";
	console.log(output);

	var out = document.createTextNode(output);
	var container = document.getElementById("container");
	container.appendChild(out);
}

function dropout(){
	var dropout = document.createElement("INPUT");
	dropout.type = "text";
	dropout.id = "d1";
	dropout.value = "0.2";
	var addButton = document.createElement("button");
	addButton.id = "dropBtn";
	addButton.type = "button";
	addButton.name = "dropBtn1";
	addButton.innerHTML = "Add Layer";

	var container = document.getElementById("container");

	container.appendChild(dropout);
	container.appendChild(addButton);
	addButton.onclick = model.add(tf.layers.dropout(parseInt(document.getElementById("d1").value)));
	console.log("Dropout layer added");


}

function optimizeInput(){

	var optimizer = document.createElement("input");
	optimizer.id = "opt";
	optimizer.type = "text";
	optimizer.value = "adam";

	var loss = document.createElement("input");
	loss.id = "loss";
	loss.type = "text";
	loss.value = "categoricalCrossentropy";

	var lr = document.createElement("input");
	lr.id = "learningRate";
	lr.type = "text";
	lr.value = "0.0001";

	var metrics = document.createElement("input");
	metrics.id = "metrics";
	metrics.type = "text";
	metrics.value = "accuracy";

	var optimize = document.createElement("button");
	optimize.id = "optimize";
	optimize.innerHTML = "optimize";
	optimize.onclick = function(){
		optimizeModel();
	};


	var container = document.getElementById("container");

	container.appendChild(optimizer);
	container.appendChild(loss);
	container.appendChild(lr);
	container.appendChild(metrics);
	container.appendChild(optimize);
	container.appendChild(linebreak);

}

function optimizeModel(){
	opt = document.getElementById("opt").value;
	loss = document.getElementById("loss").value;
	lr = parseFloat(document.getElementById("learningRate").value);
	metrics = document.getElementById("metrics").value;

	//Adding the button to show summary
	var summary = document.createElement("button");
	summary.id = "summary";
	summary.innerHTML = "Model Summary";
	summary.onclick = function(){
		modelSummary();
		console.log('model summary');
	}

	if(opt == "adam"){
		opt = tf.train.adam(lr);
	}
	else if(opt == "rmsprop"){
		opt = tf.train.rmsprop(lr);
	}

	model.compile({loss: loss,
		optimizer: opt,
		metrics:[metrics]});

	logTxt = "Optimizing "+modelName + "with "+opt+" optimizer, "+loss+" loss function, with a learning rate of "+lr;
	console.log("Congratulations!! You have created your own model!!!")
	console.log(logTxt);
	console.log("Now it is ready to be trained!");
	var container = document.getElementById("container");
	container.appendChild(summary);
}


function dense(){
	state = 0;
	var units = document.createElement("INPUT");
	units.id = "u";
	units.type = "text";
	units.value = "10";
	var activation = document.createElement("input");
	activation.id = "denseAct";
	activation.type = "text";
	activation.value = "relu";

	var addButton = document.createElement("button");
	addButton.id = "denseBtn";
	addButton.type = "button";
	addButton.value = "Add Layer";
	addButton.onclick = function(){
		if (state == 1){
					state =2;
		}
		else if(state == 0){
			addDenseLayer(1);
		}

	};
	var container = document.getElementById("container");

	container.appendChild(units);
	container.appendChild(activation);
	container.appendChild(addButton);

		}

function addDenseLayer(layer){
	if (state == 0){
	var u = parseInt(document.getElementById("u").value);
	var a = checkActivation(document.getElementById("denseAct").value);
	model.add(tf.layers.dense({units: u, activation: a}));
	var output = "Dense Layer"+layer +" added "+u+" units to Model with "+a+" activation.";

	var out = document.createTextNode(output);
	var container = document.getElementById("container");
	container.appendChild(linebreak);
	container.appendChild(out);
	container.appendChild(linebreak);
	console.log("Dense layer added");
	state = 2;
	}
}

function modelSummary(){
	tfvis.show.modelSummary({name:'Model Architecture'}, model);
}

function addValues(){
	var x = document.getElementById("units").value;
	document.getElementById("unit").innerHTML = "Number of Units in Layer 1: " + x;
	var y = document.getElementById("activation").value;
	if(y != 'sigmoid'|| y!=='relu' || y != 'softmax'){
		document.getElementById("act").innerHTML = "Error";
	}
	else document.getElementById("act").innerHTML = "Activation for Layer 1: " + y;
}

function increment_counter(val){
	if(val == "conv"){
		cconv = cconv + 1;
		return cconv;
	}		
}

function initialise_counter(){
	cconv = 0;
}