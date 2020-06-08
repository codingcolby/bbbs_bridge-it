import React from "react";
import DropZoneUploader from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

import CustomSubmit from "./CustomSubmit";

function DropZone(props) {
  const disabled = props.disabled;
  // see ProtectedRoute for what's going on w/ otherProps
  // const {
  //   , ...otherProps} = props
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "/api/pdf/upload" };
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => {
      f.restart();
    });
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
      />
    </div>
  );
}

export default DropZone;
