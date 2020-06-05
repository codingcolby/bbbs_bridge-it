import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DropZone from "../../components/DropZone/DropZone";

/**
 * This component doesn't do anything other than reset the Upload Page.
 *
 * By targeting the "key" prop of the parent div here, we can destruct that div and all it's children (the UploadPage) by
 * updating that "key" value. I passed down the resetComponent function to make the UploadPage destroy itself.
 *
 * Oh I also sent a redux connection on props for now, I'd like to just connect the Upload
 */
function UploadPageResetter(props) {
  const [keyValue, setKeyValue] = useState(0);

  const resetComponent = (event) => {
    setKeyValue(keyValue + 1); // increment the state to force reset
    // setReady(false);
  };

  return (
    <div key={keyValue}>
      <UploadPage resetComponent={resetComponent} dispatch={props.dispatch} />
    </div>
  );
}

function UploadPage(props) {
  const [docType, setDocType] = useState("");
  const [ready, setReady] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleChange = (event) => {
    setDocType(event.target.value);
  };

  const handleClick = (event) => {
    props.dispatch({
      type: "UPLOAD_PDF_SUMMARY",
      payload: { pdfUrl, docType },
    });
    props.resetComponent();
  };

  return (
    // <div key={keyValue}>
    <div>
      <FormControl required>
        <InputLabel id="s3-dropzone-uploader-mat-ui-label">Type</InputLabel>
        <Select
          labelId="s3-dropzone-uploader-mat-ui-label"
          onChange={handleChange}
          value={docType}
        >
          {/* I hardcoded docTypes in reference to the ids in "profile_type" table */}
          <MenuItem value={1}>Big</MenuItem>
          <MenuItem value={2}>Little</MenuItem>
          <MenuItem value={3}>Couple</MenuItem>
        </Select>
        <FormHelperText>Please select a document type</FormHelperText>
      </FormControl>

      {/* Drop zone is disabled until type is selected*/}
      <DropZone
        setReady={setReady}
        setPdfUrl={setPdfUrl}
        disabled={!Boolean(docType)}
      />
      {ready && <Button onClick={handleClick}>Save</Button>}
    </div>
  );
}

export default connect(mapStoreToProps)(UploadPageResetter);
