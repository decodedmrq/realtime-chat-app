/**
 * Created by mon.ls on 12/2/2016.
 */
import React from "react";
class Alert extends React.Component {
  /**
   * @return {number}
   */
  static get TYPE_SUCCESS() {
    return 1;
  };

  /**
   * @return {number}
   */
  static get TYPE_INFO() {
    return 2;
  };

  /**
   * @return {number}
   */
  static get TYPE_PRIMARY() {
    return 3;
  };

  /**
   * @return {number}
   */
  static get TYPE_WARNING() {
    return 4;
  };

  /**
   * @return {number}
   */
  static get TYPE_DANGER() {
    return 5;
  };

  render() {
    let alertClass = 'alert ' + this.props.class;
    switch (this.props.type) {
      case Alert.TYPE_SUCCESS:
        alertClass += ' alert-success';
        break;
      case Alert.TYPE_INFO:
        alertClass += ' alert-info';
        break;
      case Alert.TYPE_PRIMARY:
        alertClass += ' alert-primary';
        break;
      case Alert.TYPE_WARNING:
        alertClass += ' alert-warning';
        break;
      case Alert.TYPE_DANGER:
        alertClass += ' alert-danger';
        break;
    }
    return (
      <div className={alertClass} role="alert">
        <span dangerouslySetInnerHTML={{__html: this.props.message}}/>
        <button type="button" className="close" data-dismiss="alert"
                aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
Alert.defaultProps = {
  type: Alert.TYPE_INFO,
  message: '',
  class: '',
};
export default Alert;
