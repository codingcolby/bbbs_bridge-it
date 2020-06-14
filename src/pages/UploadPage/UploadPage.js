import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DropZone from "../../components/DropZone/DropZone";

// core components
import Footer from "../../material-kit/components/Footer/Footer.js";
import GridContainer from "../../material-kit/components/Grid/GridContainer.js";
import GridItem from "../../material-kit/components/Grid/GridItem.js";
import Card from "../../material-kit/components/Card/Card.js";

import CardHeader from "../../material-kit/components/Card/CardHeader.js";

import image from "../../material-kit/assets/img/kc.jpg";

import styles from "../../material-kit/assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "60vw",
    height: "60vh",
  },
  containerz: {
    zIndex: "2",
    position: "relative",
    paddingTop: "10vh",
    color: "#FFFFFF",
    paddingBottom: "200px",
    textAlign: "center",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
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
  const classes = useStyles();

  const handleChange = (event) => {
    setDocType(event.target.value);
  };

  const handleClick = (event) => {
    props.dispatch({
      type: "UPLOAD_PDF_SUMMARY",
      // payload: { pdfUrl, docType },
    });
    props.resetComponent();
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.containerz}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={7}>
              <Card className={classes.card}>
                <CardHeader color="success" className={classes.cardHeader}>
                  <h1>Upload</h1>
                </CardHeader>

                <div className={classes.center}>
                  <div>
                    <FormControl required style={{ width: "10vw" }}>
                      <InputLabel id="s3-dropzone-uploader-mat-ui-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="s3-dropzone-uploader-mat-ui-label"
                        onChange={handleChange}
                        value={docType}
                      >
                        {/* I hardcoded docTypes in reference to the ids in "profile_type" table */}
                        <MenuItem value={1}>Big</MenuItem>
                        <MenuItem value={2}>Little</MenuItem>
                        {/* <MenuItem value={3}>Couple</MenuItem> TODO: handle couples */}
                      </Select>
                      <FormHelperText>
                        Please select a document type
                      </FormHelperText>
                    </FormControl>
                    <div style={{ margin: "30px" }}>
                      <DropZone
                        docType={docType}
                        disabled={!Boolean(docType)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

        <Footer whiteFont />
      </div>
    </div>
  );
}

export default connect(mapStoreToProps)(UploadPageResetter);
