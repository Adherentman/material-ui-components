import React, { Component } from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      imageSrc: ""
    };
  }

  static defaultProps = {
    label: "Upload"
  };

  static propTypes = {
    label: propTypes.string
  };

  componentDidMount() {
    this.inputRef.current.addEventListener(
      "change",
      this.handleselectedFile,
      false
    );
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener(
      "change",
      this.handleselectedFile,
      false
    );
  }

  handleselectedFile = e => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.inputRef.current.files[0]);
    fileReader.onload = e => {
      this.setState({
        imageSrc: e.target.result
      });
    };
  };

  render() {
    const { label, inputProps, buttonProps } = this.props;
    const { imageSrc } = this.state;
    return (
      <React.Fragment>
        {imageSrc ? (
          <img src={imageSrc} alt="imageSrc" style={{maxWidth: 200, maxHeight: 200}}/>
        ) : null}
        <input
          type="file"
          id="raised-button-file"
          hidden
          ref={this.inputRef}
          {...inputProps}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" {...buttonProps}>
            {label}
          </Button>
        </label>
      </React.Fragment>
    );
  }
}
export default Upload;
