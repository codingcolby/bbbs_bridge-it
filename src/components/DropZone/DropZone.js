import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DropZoneS3Uploader from "react-dropzone-s3-uploader";

// EXAMPLE STYLE===================
// const dropzoneStyle = {
//   position: "relative",
//   width: "400px",
//   height: "300px",
//   border: "2px dashed rgb(153, 153, 153)",
//   borderRadius: "5px",
//   cursor: "pointer",
//   overflow: "hidden",
// };

function DropZone(props) {
  //
  //  S3 Uploader Stuff
  const uploadOptions = {
    server: "http://localhost:5000", // change server for deployment, do not end the url with a "/", it will 404
  };
  const s3Url = "https://bridge-it-bucket.s3.amazonaws.com";

  const handleFinishedUpload = (info) => {
    const pdfUrl = info.fileUrl;

    props.dispatch({
      type: "UPLOAD_PDF_SUMMARY",
      payload: { pdfUrl },
    }); // pdf is now in our s3 bucket, send it to our server
  };
  //    end S3 Uploader Stuff
  //

  return (
    <div>
      <DropZoneS3Uploader
        onFinish={handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
        disabled={props.disabled}
        //   style={dropzoneStyle}  // style like so
      />
    </div>
  );
}

export default connect(mapStoreToProps)(DropZone);
