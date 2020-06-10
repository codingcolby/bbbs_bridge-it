import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchMatchCandidates() {
	try {
		// const config = {
		//   headers: { "Content-Type": "application/json" },
		//   withCredentials: true,
		// };

		// the config includes credentials which
		// allow the server session to recognize the user
		// If a user is logged in, this will return their information
		// from the server session (req.user)
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

function* tableSaga() {
	yield takeLatest("FETCH_TABLE", fetchTable);
}

export default tableSaga;
