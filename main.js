song1 = "";
song2 = "";
scoreleftWrist = 0;
scorerightWrist = 0;
song1_status = "";
song2_status = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is initialized!")
}
function draw(){
    image(video, 0, 0, 600, 600);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("red");
    stroke("red");
    if (scorerightWrist > 0.2){
        circle(rightWristX, rightWristY, 20)
        song2.stop()
        if (song1_status == false){
            song1.play()
            document.getElementById("song").innerHTML = "playing - Harry Potter";
        }
    }
    if (scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "playing - Peter Pan";
        }
    }
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results)
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = "+scoreleftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}