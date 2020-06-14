import React from "react";
import DropZoneUploader from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

import CustomSubmit from "./CustomSubmit";

function DropZone(props) {
  const disabled = props.disabled;
  const docType = props.docType;
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    let pdfType = "";
    if (docType === 1) {
      pdfType = "big";
    } else {
      pdfType = "little";
    }
    return { url: `/api/pdf/upload/${pdfType}` };
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => {
      f.restart();
    });
  };

  // starts the review process on successful upload
  const startReview = (fileWithMeta, status, allFilesWithMeta) => {
    if (status === "done") {
      console.log(JSON.parse(fileWithMeta.xhr.response).id);
    }
  };
  console.log(props.disabled);
  return (
    <div>
      <DropZoneUploader
        getUploadParams={getUploadParams}
        onSubmit={handleSubmit}
        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
        accept={"application/pdf"}
        submitButtonContent={"Submit"}
        SubmitButtonComponent={(props) => (
          <CustomSubmit {...props} disabled={disabled} />
        )}
        canRestart={false}
        autoUpload={false}
        multiple={false}
        maxFiles={1}
        onChangeStatus={startReview}
      />
    </div>
  );
}

export default DropZone;
