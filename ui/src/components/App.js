import React from 'react';
import Foreground from "../containers/Foreground"
import Video from "../containers/Video"
import Socket from "../containers/Socket"
import Member from "../containers/Member"
import Header from "./Header"
import Authors from "./Authors"
import PCA from "../containers/PCA";
import QR from "./QR";
import CaseStudies from "./CaseStudies";

const App = () => (
  <div id="container">
    <Header />
    <div id="content">
      <Video />
      <Foreground />
      <Member id="member1" idx={1} />
      <Member id="member2" idx={2} />
      <Member id="member3" idx={3} />
    </div>
    <div id="footer">
      <PCA />
      <div id="description">
        <p>
          There are times when you see somebody in the street but you cannot exactly recall who that person is.
          Old acquaintance? Somebody famous? Not a comfy situation to be in. But have you ever wondered which member of the Polish parliament looks just as you?
          There is only one way to find out.
        </p>
        <p>
          This application uses deep neural networks to find a MP whose face is closest to yours. It does so by calculating an embedding of your face -
          an unique vector representing your face. There are multiple ways to achieve that - we used <a href="http://cmusatyalab.github.io/openface">OpenFace</a>.
          Internally it uses <a href="https://arxiv.org/abs/1503.03832">FaceNet</a> - convolutional neural network architecture by Google.
        </p>

        <p>
          These vectors tend to be high dimensional thus it is not trivial to show the embedding itself.
          There are multiple techniques of dimensionality reduction though. On the left you can see a plot that uses PCA which
          projects vectors to a smaller space maximizing variance. The red dot indicates position of your face in this space whereas blue dots show three MPs closest to you.
          All other MPs are represented as green dots.
        </p>
      </div>
    </div>
    <QR />
    <CaseStudies />
    <Authors />
    <Socket />
  </div>
);

export default App;
