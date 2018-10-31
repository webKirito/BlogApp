import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

class SnackBar extends React.Component {
  render() {
    const { isOpened } = this.props.isOpened;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          isOpened={isOpened}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.props.message}</span>}
        />
      </div>
    );
  }
}

export default SnackBar;
