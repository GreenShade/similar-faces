# Which deputy are you?

This is a simple application that allows you to find out which deputies of Polish parliament are most similar to you. 

Table of contents
=================

<!--ts-->
   * [Usage](#usage)
   * [Architecture](#architecture)
      * [Technology stack](#technology-stack)
      * [UI](#ui)
      * [Local files](#local-files)
      * [Server](#server)
   * [Experiment](#experiment)
<!--te-->


## Usage

To use our application just go to this URL:
 [http://13.95.133.4:3000](http://13.95.133.4:3000).
 Unfortunately, because of security settings it will work properly only in Mozilla Firefox and Microsoft Edge  browsers. You can also use it locally using docker and docker-compose. Run `docker-compose up` from `docker` directory. After starting the following page will appear:
![](https://raw.githubusercontent.com/GreenShade/similar-faces/master/images/sample1.png)
At the top you can see the image captured in real-time from your built-in camera. To use it you may have to accept permissions in your browser to use camera.
When your face will be detected in captured images, the app will show you three the most similar deputies of Polish parliament to you. During capturing the algorithm is learning your face so to get better results try to move your head around to capture it from different angles.
If the detection algorithm looses your face for 2 seconds the learned face will be reset and new face will be learned. 

Example:
![](https://raw.githubusercontent.com/GreenShade/similar-faces/master/images/sample2.png)

You can see 3 different people with their names. The bounding box on the image is shown when your face is detected. The red dot on the plot is your face embedded in 2 dimensional space, while blue dots are three most similar members of Polish Parliament.

## Architecture

The architecture consists of back-end written in Python and front-end written in JavaScript. It looks as follows:
![](https://raw.githubusercontent.com/GreenShade/similar-faces/master/images/arch.png)

### Technology stack

* Python (https://www.python.org/)
   * Numpy (http://www.numpy.org/)
   * Scikit-learn (https://scikit-learn.org/stable/)
   * Flask (http://flask.pocoo.org/)
   * OpenCV (https://opencv.org/)
* JavaScript (https://www.javascript.com/)
   * D3 (https://d3js.org/)
   * Node.js (https://nodejs.org/en/)
   * React (https://reactjs.org/)
* PostgreSQL (https://www.postgresql.org/)
* OpenFace (https://cmusatyalab.github.io/openface/)
* Docker (https://www.docker.com/)
* Azure (https://azure.microsoft.com/en-us/)


### UI
The web app uses Node.js and React as front-end framework. The front-end web page uses your built-in camera to capture frames and localize your face on the image which is sent to Flask back-end API. The back-end responses with localized face, images of 3 the most similar deputies and the data to plot two first principal components of the embedding space, so you can see the position of your face in the 128-dimensional space of other faces. This plot is created using D3 framework.

### Server

Server uses python and Flask framework to create API which communicates with front-end. It also uses OpenFace package to detect face and find the most similar face. Every image is embedded in 128-dimensional space and then the three nearest neighbors are found with euclidean distance. To find the embedding of face OpenFace uses pre-trainded Deep neural network model [nn4.v1](https://storage.cmusatyalab.org/openface-models/nn4.v1.t7). When face is continuously detected it is averaged, because predictions for single frame are really unstable. After 2 seconds with no face detected the embedding of face is reset and averaging starts from scratch. 

## Experiment

We wanted to know if people vote for people who are similar to themselves. To find out we conducted the experiment. We have downloaded the dataset [Labeled Faces in the Wild](http://vis-www.cs.umass.edu/lfw/?fbclid=IwAR2SAel2odDZiDP5U6cpwObCgDPg-eZ6eg1pPjt8QQQ2EBG41kMgXR5XMis#download) which contains more than 13000 images of faces collected from the web. After that we preprocessed all of the images, found the faces on them and emedded in 128-dimensional space. Then we poerformed t-SNE transoformation to receive 2-dimensional space. That space was clustered into 3 groups. In every one we found the closest member of parlament to the centroid. We assumed that 3 people are on average the most similar to the whole population. Their names are respectively Robert Tyszkiewicz, Anna Sobecka and Tadeusz Woźniak. On 2015 Polish parliamentary election they got the following number of votes:
* Robert Tyszkiewicz - 19 453 votes
* Anna Sobecka - 6 990 votes
* Tadeusz Woźniak - 11 011 votes

 On 2015 Polish parliamentary about 15 200 000 election votes were cast so the average score should be about 33 000 of votes. As we can see all three choosen MPs got lower number of votes. After conducting the experiment we can conclude that there is no connection between phisical similarity and voting for somebody.

![](https://raw.githubusercontent.com/GreenShade/similar-faces/master/images/top3.png)

The t-SNE projection of all deputies is shown below. The red points are the most average deputies in each cluster.

![](https://raw.githubusercontent.com/GreenShade/similar-faces/master/images/tsne.png)

We can see that the choosen deputies are in the middle of dataset. Also we can see two clusters of points. After investigating that we know that one cluster are men (crosses) and the other are women.

The project was made on [research workshops classes](https://github.com/pbiecek/WarsztatyBadawcze2018) at the [Warsaw University of Technology](https://www.pw.edu.pl/) at the [Faculty of Mathematics and Information Science](https://ww2.mini.pw.edu.pl/) by Rafał Kobiela and Adrian Bednarz.

