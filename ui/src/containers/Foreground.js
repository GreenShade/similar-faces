import { connect } from "react-redux";
import Foreground from "../components/Foreground"


const mapStateToProps = state => ({
  rects: state.faces.rects
});

export default connect(
  mapStateToProps,
  null
)(Foreground);