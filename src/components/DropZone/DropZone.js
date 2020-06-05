import React from "react";
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
    props.setReady(true); // tell the Upload Page that it's ready
    props.setPdfUrl(info.fileUrl); // pdf is now in our s3 bucket, prep it to send to the server on Upload Page
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
        multiple={false} // we only want 1 pdf at a time
        //  TODO: remove files from display after upload
        //   style={dropzoneStyle}  // style like so
      />
    </div>
  );
}

export default DropZone;
