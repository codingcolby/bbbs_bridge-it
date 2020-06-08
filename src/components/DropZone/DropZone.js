import React from "react";
import DropZoneUploader from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

function DropZone(props) {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "/api/pdf/upload" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };
  return (
    <DropZoneUploader
      getUploadParams={getUploadParams}
      // onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
      accept={"application/pdf"}
      // The files are automatically uploaded
      // The submit button will "clear" all the files currently displayed in the drop zone, so let's rename it.
      submitButtonContent={"Clear All"}
    />
  );
}

export default DropZone;
