function back(){
    window.location = "index.html";
}
img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("tvac.jpeg");

}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    
    Objectdetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}
function modelLoaded(){
    console.log("model is loaded");
    status = true;
    Objectdetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
    console.error(error);
    }
    console.log(results);
    objects = results;

}

function draw(){
    image(img,0,0,380,380);
    if(status != ""){
        for(i = 0; i <= objects.length(); i++){
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill(r,g,b);
            percentage = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }
    }
}