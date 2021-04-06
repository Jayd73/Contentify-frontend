import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  linkStyle: {
    wordWrap: "break-word",
    color: theme.palette.primary.main,
  },
  titleStyle: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
  copyBar: {
    backgroundColor: theme.palette.appBg.darker,
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function ShareLinkDialog({ open, setOpen, linkAddress }) {
  const classes = useStyles();
  const handleCopy = () => {
    //copy to clipboard here
    navigator.clipboard.writeText(linkAddress);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={classes.titleStyle}
        >
          Share
        </DialogTitle>
        <DialogContent dividers>
          <Typography className={classes.linkStyle} gutterBottom>
            {linkAddress}
          </Typography>
        </DialogContent>
        <DialogActions className={classes.copyBar}>
          <Button autoFocus onClick={handleCopy} color="primary">
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShareLinkDialog;
