import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import DropZone from "../../components/DropZone/DropZone";

function UploadPage(props) {
  const [docType, setDocType] = useState(null);

  const handleChange = (event) => {
    setDocType(event.target.value);
  };

  return (
    <div>
      <form>
        <FormControl required>
          <InputLabel id="s3-dropzone-uploader-mat-ui-label">Type</InputLabel>
          <Select
            labelId="s3-dropzone-uploader-mat-ui-label"
            onChange={handleChange}
          >
            <MenuItem value={"big"}>Big</MenuItem>
            <MenuItem value={"little"}>Little</MenuItem>
          </Select>
          <FormHelperText>Please select a document type</FormHelperText>
        </FormControl>

        {/* Drop zone is disabled until type is selected*/}
        <DropZone disabled={!Boolean(docType)} />
      </form>
    </div>
  );
}

export default UploadPage;
