import React from "react";
import DropZoneUploader from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import axios from "axios";
import CustomSubmit from "./CustomSubmit";
import swal from "@sweetalert/with-react";
import Review from "./Review";

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
      const profileId = JSON.parse(fileWithMeta.xhr.response).id;
      axios
        .get(`/api/pdf/review/start/${profileId}`)
        .then((response) => {
          console.log(response.data);
          const profile = response.data;
          swal(<Review profile={profile} />).then((confirmed) => {
            const data = { profile: profile };
            console.log(data);
            axios
              .put(`/api/pdf/review/finish/${profileId}`, data)
              .then((response) => {
                props.resetComponent();
              })
              .catch((err) => {
                console.log(err);
                props.resetComponent();
              });
          });
        })
        .catch((err) => {
          console.log("Err: Review process could not start", err);
        });
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
