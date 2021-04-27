<h1>Emotion Picture Frame</h1>
<h3>This project is the code from the YouTube video found here:</h3>
<a href="https://youtu.be/jgpittEiz3Y">https://youtu.be/jgpittEiz3Y</a>
<hr>
<h3>Code Instructions</h3>

<p>To get up and running you need to clone this repo and then run <code>npm install</code> to install any needed dependencies.</p>
<p>You will need to create the file <code>.env</code> in the root of the project and provide your <code>accessKeyId</code> and <code>secretAccessKey</code>. Without these, AWS will refuse any request made to the endpoint.</p>
<p>You will also need to set <code>workspaceId</code> in the <code>app.js</code> file to the workspace id that corresponds to your QLab project</p>
<p>To run the code type <code>npm start</code> into your terminal an hit return.</p>
<hr>
<h3>QLab Project</h3>
<p>Create a new QLab project and drag your files into it. The only thing you need to do in order to make sure that the code can trigger the correct cue is set the cue number to one of the following<code>CALM, HAPPY, SAD, or ANGRY</code>. Additionally you can add any emotions that the AWS service supports.</p>


