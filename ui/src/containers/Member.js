import { connect } from "react-redux";

import Member from "../components/Member";

const mapStateToProps = state => ({
  face: state.faces.member
});

export default connect(
  mapStateToProps,
  null
)(Member);