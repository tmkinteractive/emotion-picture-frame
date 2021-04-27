//IMPORTS
const NodeWebcam = require("node-webcam");
const AWS = require('aws-sdk');
const osc = require("osc")

require('dotenv').config();
fs = require('fs');

//CREATE OSC UDP PORT AND OPEN IT
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});
udpPort.open()

//INIT AWS SDK
var rekognition = new AWS.Rekognition({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-1'
})

//WEBCAM OPTIONS
const opts = {
    width: 1280,
    height: 720,
    quality: 100,
}

//MAIN LOOP
setInterval(() => {

    //TAKE PICTURE
    NodeWebcam.capture("img", opts, function (err, data) {
        console.log('Image Captured')

        //READ IMAGE THAT WAS JUST CAPTURED
        fs.readFile('img.jpg', (err, img) => {

            //UPLOAD IMAGE TO AWS
            rekognition.detectFaces({
                Image: {
                    Bytes: img
                },
                Attributes: [
                    "ALL"
                ]
            }, (err, result) => {
                if (err) {
                    console.log(err)
                }

                //ITERATE OVER EMOTIONS TO FIND ONE WITH HIGHEST CONFIDENCE
                const currentEmotion = {emotion: '', confidence: 0}
                result.FaceDetails[0].Emotions.forEach(emotion => {
                    if (emotion.Confidence > currentEmotion.confidence) {
                        currentEmotion.emotion = emotion.Type;
                        currentEmotion.confidence = emotion.Confidence
                    }
                })

                //CALL HELPER FUNCTION
                console.log(currentEmotion);
                playPicture(currentEmotion.emotion);

            })
        })
    });

//10 SECOND INTERVAL
}, 10000)


//OSC HELPER FUNCTION
function playPicture(emotion) {

    // TODO - Copy workspace id from QLab
    const workspaceId = '01C05A38-2EC9-49E9-A8F7-09864B9BCB13';

    //STOP ALL RUNNING CUES
    udpPort.send({
        address: `/workspace/${workspaceId}/panic`,
        args: []
    }, "localhost", 53000);

    //SELECT CORRECT EMOTION
    setTimeout(() => {
        udpPort.send({
            address: `/workspace/${workspaceId}/select/${emotion}`,
            args: []
        }, "localhost", 53000);
    }, 50)

    //RUN SELECTED EMOTION
    setTimeout(() => {
        udpPort.send({
            address: `/workspace/${workspaceId}/go`,
            args: []
        }, "localhost", 53000);
    }, 100)
}
