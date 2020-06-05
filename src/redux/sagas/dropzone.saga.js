import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/**
 * Send pdf to the server.
 *
 * Expected payload: { pdfUrl: str, docType: num }
 */
function* savePdf(action) {
  try {
    const config = {
      header: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const data = { pdfUrl: action.payload.pdfUrl }; // stuff to send

    yield axios.post("/api/pdf/upload", data, config);
  } catch (err) {
    console.log("Error uploading pdf:", err);
  }
}

function* dropzoneSaga() {
  yield takeLatest("UPLOAD_PDF_SUMMARY", savePdf);
}

export default dropzoneSaga;
