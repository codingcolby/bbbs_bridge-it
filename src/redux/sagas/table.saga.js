import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchMatchCandidates() {
  try {
    const response = yield axios.get("/api/table");
    console.log("RESPONSE.DATA", response.data);

    yield put({
      type: "SET_TABLE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Match Table candidates get request failed", error);
  }
}

/**
 * Creates a new "status" entry
 * Expected action.payload:
 *   {
 *     comment: "the comment on the relationship. Added in the sweetalert on MapListPage",
 *     review: 1, 2 or 3, this number indicates the type of relationship between the individuals,
 * 	   big_id: the big's id,
 * 	   little_id: the little's id,
 *   }
 */
function* createStatusRelationship(action) {
  try {
    yield axios.post(`/api/table`, action.payload);

    yield put({
      type: "FETCH_TABLE",
    });
  } catch (error) {
    console.log("createStatusRelationship request failed", error);
  }
}

/**
 * Update match status (true/false) & update any comment changes made.
 * Expected action.payload:
 *   {
 *     big_id: Number,
 *     little_id: Number,
 *     comment: Text,
 *     match: Boolean
 *   }
 */
function* selectMatchStatus(action) {
  try {
    yield axios.put(`/api/table/match`, action.payload); // this is returning id, so you can grab that here if needed
    yield put({
      type: "FETCH_TABLE",
    });
  } catch (error) {
    console.log("selectMatchStatus request failed", error);
  }
}

function* tableSaga() {
  yield takeLatest("FETCH_TABLE", fetchMatchCandidates);
  yield takeLatest("CREATE_MATCH", createStatusRelationship);
  yield takeLatest("UPDATE_MATCH_STATUS", selectMatchStatus);
}

export default tableSaga;
