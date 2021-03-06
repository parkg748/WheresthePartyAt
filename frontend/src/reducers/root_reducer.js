import { combineReducers } from "redux";
import session from "./session/session_reducer";
import ui from "./ui/ui_reducer";
import selectedMarker from "./selected_marker/selected_marker_reducer";
import searchStatus from "./search_status/search_root_reducer";
import events from "./events/events_root_reducer";
import parties from "./parties/parties_reducer";
import opinions from "./opinions/opinions_reducer";
import errors from "./errors/errors_reducer";
import entities from './entities_reducer';

export default combineReducers({
  entities,
  session,
  ui,
  selectedMarker,
  searchStatus,
  parties,
  opinions,
  events,
  errors
});
