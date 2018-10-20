import React from 'react';
import Foreground from "../containers/Foreground"
import Video from "../containers/Video"
import Socket from "../containers/Socket"
import Member from "../containers/Member"
import Header from "./Header"

const App = () => (
  <div id="container">
    <Header />
    <Video />
    <Foreground />
    <Member />
    <Socket />
  </div>
);

export default App;
