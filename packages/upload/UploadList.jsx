import React, { Component } from "react";
import propTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";

class UploadList extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      imageSrc: {}
    };
  }

  static defaultProps = {
    label: "Upload"
  };

  static propTypes = {
    label: propTypes.string
  };

  componentDidMount() {
    const Ref = this.inputRef.current;
    Ref.addEventListener("change", this.handleselectedFile, false);
  }

  componentWillUnmount() {
    const Ref = this.inputRef.current;
    Ref.removeEventListener("change", this.handleselectedFile, false);
  }

  handleselectedFile = e => {
    const Ref = this.inputRef.current.files;
    if (Ref) {
      let fileList = {};
      for (let i in Ref) {
        if (/\.(jpe?g|png|gif)$/i.test(Ref[i].name)) {
          let fileReader = new FileReader();
          fileReader.readAsDataURL(Ref[i]);
          fileReader.onload = e => {
            // console.log(e.target.result);
            fileList[i] = e.target.result;
          };
        }
      }
      console.log(fileList[0])
    }
  };

  render() {
    const { label, inputProps, buttonProps } = this.props;
    const { imageSrc } = this.state;
    return (
      <React.Fragment>
        <Card style={{ maxWidth: 400 }}>
          {/*imageSrc.map((x, y) => (
            <CardMedia
              key={y}
              component="img"
              alt="Contemplative Reptile"
              image={x.imageSrc}
            />
          ))}
          {/*<CardMedia
                key={y}
                component="img"
                alt="Contemplative Reptile"
                image={x.imageSrc}
              />*/}
          <CardActions disableActionSpacing>
            <input
              type="file"
              id="raised-button-file"
              hidden
              multiple
              ref={this.inputRef}
              {...inputProps}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" {...buttonProps}>
                {label}
              </Button>
            </label>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}
export default UploadList;
