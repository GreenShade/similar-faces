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
    <Member id="member1" />
    <Member id="member2" />
    <Member id="member3" />
    <Socket />
  </div>
);

export default App;
