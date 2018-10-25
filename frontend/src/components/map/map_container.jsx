import { connect } from "react-redux";
import {
  removehighlightMarker,
  highlightMarker
} from "../../actions/map_actions";
import Map from "./map";

const mapStateToProps = state => {
  // debugger;
  // return {
  //   venues: events.venues,
  //   artistSearch: state.artist_search
  // };
};

const mapDispatchToProps = dispatch => ({
  highlightMarker: place => dispatch(highlightMarker(place)),
  removehighlightMarker: () => dispatch(removehighlightMarker())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
