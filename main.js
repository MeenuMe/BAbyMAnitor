img = "";
objects = [];
objects_status = "";

function preload() {
    alarm = loadSound("warning.mp3");

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status:detecting objects";
}

function modelLoaded() {
    console.log("modelLoaded");
    objects_status = true;

}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (objects_status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "status: object detected";
        
        for (i = 0; i < objects.length; i++) {
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Luckily Found ";
                alarm.stop();
            }
            else {
                document.getElementById("number_of_objects").innerHTML = "BABY NOT FOUND";
                alarm.play();
            }
        }
    }

}