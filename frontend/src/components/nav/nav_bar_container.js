import { connect } from "react-redux";

import { logoutUser } from "../../util/session_api_util";
import NavBar from "./nav_bar";

const mapStateToProps = ({ session }) => {
  return {
    currentUser: session
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
