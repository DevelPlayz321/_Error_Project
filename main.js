var music = "";
var leftWrist_x = 0;
var leftWrist_y = 0;
var rightWrist_x = 0;
var rightWrist_y = 0;
var scoreLeftWrist = 0;
var inNumberLeftWristY = 0;
var removeDecimals = 0;
var volume = 0;
var scoreRightWrist = 0;

function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    model = ml5.poseNet(video, modelLoaded);
    model.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#a202f7");    
    stroke("#a202f7");
if(scoreRightWrist > 0.2){
    circle(rightWrist_x, rightWrist_y,20);
    if(rightWrist_y >= 0 && rightWrist_y <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5";
        song.rate(0.5);
    }

    else if(rightWrist_y >= 100 && rightWrist_y <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1.0";
        song.rate(1.0);
    }

    else if(rightWrist_y >= 200 && rightWrist_y <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5";
        song.rate(1.5);
    }

    else if(rightWrist_y >= 300 && rightWrist_y <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2.0";
        song.rate(2.0);
    }

    else if(rightWrist_y >= 400 && rightWrist_y <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist > 0.2){
        circle(leftWrist_x, leftWrist_y, 20);
        inNumberLeftWristY = Number(leftWrist_y);
        removeDecimals = floor(inNumberLeftWristY);
        volume = removeDecimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function modelLoaded(){
    console.log("Model is successfully loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }

}

function play(){
    music.play();
    music.rate(1);
    music.setVolume(0.3);
}

