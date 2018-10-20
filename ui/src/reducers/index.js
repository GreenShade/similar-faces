import { combineReducers } from "redux";
import faces from "./faces";
import computing from "./computing";
import video from "./video";

export default combineReducers({
  faces,
  computing,
  video
})