import { connect } from "react-redux";

import Member from "../components/Member";

const mapStateToProps = state => ({
  face: state.faces.member,
  name: state.faces.name
});

export default connect(
  mapStateToProps,
  null
)(Member);