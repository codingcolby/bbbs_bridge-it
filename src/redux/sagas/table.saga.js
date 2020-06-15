import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { response } from "express";

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

function* upsertStatus(action) {
	try {
		const upsertTableData = action.payload;
		yield axios.put(`/api/table`, action.payload);
		console.log("RESPONSE.DATA", response.data);

		yield put({
			type: "SET_TABLE",
			payload: upsertTableData,
		});
	} catch (error) {
		console.log("upsertStatus request failed", error);
	}
}

function* tableSaga() {
	yield takeLatest("FETCH_TABLE", fetchMatchCandidates);
	yield takeLatest("UPSERT_TABLE", upsertStatus);
}

export default tableSaga;
