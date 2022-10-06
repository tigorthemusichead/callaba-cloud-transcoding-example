<h1>Next generation video transcoding via graphics accelerator card with Callaba Cloud</h1>

<h2>How to set up GPU accelerator card transcoding</h2>
<ol>
<li>Register or log in to the <a href="https://aws.amazon.com/">AWS Console</a>.</li>
<li>In this tutorial we are going to use <b>VT1-type</b> of instances.
This means that even if you have any other instances with Callaba Cloud deployed, we will not use them in this tutorial. We are going to launch a brand new VT1 instance.
Open <a href="https://console.aws.amazon.com/ec2/v2/home">EC2 Console</a>.
Select your preferred region and go to <b>Instances</b>.
</li>
<li>Click <b>“Launch instances”</b>></li>
<li>Create a <b>Name</b> for your instance</li>
<li>In the Application and OS Images section look up Callaba Cloud Live Streaming</li>
<li>Switch to the <b>AWS Marketplace AMIs</b>
Click <b>“Select”</b>
Then <b>“Continue”</b> and <b>“Confirm Changes”</b></li>
<li><b>IMPORTANT</b><br/>
Pick the <b>Instance type.</b>
As we are going to set us GPU transcoding via accelerator cards, <b>pick any VT1 type instance.</b>
In our example we are using <b>vt1.3xlarge.</b></li>
<li>Create a <b>Key pair</b> by clicking <b>“Create new key pair”.</b>
Or choose an existing one if you already have it.
</li>
<li>In the <b>Security Group</b> section click <b>“Edit”</b></li>
<li>
Set up <b>Security group rule 1 :</b> <br><br>
<b>Type</b> : All TCP <br>
<b>Source type</b> : Anywhere<br><br>

Set up <b>Security group rule 2:</b><br>
<b>Type</b> : All UDP<br>
<b>Source type</b> : Anywhere<br><br>

Click <b>“Launch Instance”</b><br>
</li>
<li>
Next, you’ll see your instance launching.
Wait for a couple minutes until the <b>Status check</b> changes to <b>2/2 checks passed.</b>
</li>
<li>
    Make sure you know how to <b>Stop</b> or <b>Terminate</b> the resources you’ve been using upon completion of your tasks.

AWS and other cloud providers charge for <b>the time</b> when these resources are <b>“Running”</b>.
</li>
<li>
Select your instance. You’ll see some data below.
Copy the <b>Public IPv4</b> and open it in the new browser tab.
</li>

<li>
    Clone this example to your computer
    <pre>git clone https://gitlab.callabacloud.com/tigor/accelerated-transcoding-example.git</pre>
</li>
<li>
    Go to the project folder
    <pre>cd callaba-cloud-transcoding</pre>
</li>
<li>
    Install node dependencies<br>
    run
    <pre>npm install</pre>
</li>
<li>
    Run 
    <pre>npm start</pre>
    to start the react app
</li>
<li>
    Open <a href="http://localhost:3000">localhost:3000</a> to try out the example
</li>
<li>
    Paste the instance id and the instance ip address to the app authorize create an srt server and Restream.
</li>
<li>
    Click <b>Open</b> to see the api request code
</li>
</ol>
