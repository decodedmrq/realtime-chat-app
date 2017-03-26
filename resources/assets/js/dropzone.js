/**
 * Created by mon.ls on 12/2/2016.
 */
import Alert from "./alert";
import {formatBytes, getFileExtension, inArray} from "./helper";
import React from "react";
class FileUpload {
  constructor() {
    this.isUploaded = false;
    this.inProgress = false;
    this.isRemoved = false;
    this.action = 'upload';
    this.error = '';
    this.id = '';
    this.isProgressFinished = false;
    this.percent = 0;
    this.name = '';
    this.hashName = '';
    this.size = '';
    this.extension = '';
    this.content = '';
    this.type = '';
  }
}
class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.files,
      message: '',
      messageType: Alert.TYPE_INFO,
    };
    let dragTimer;
    let dropClassContainer = `.${this.props.dropContainerClass}`;
    let onDragClass = this.props.onDragClass;
    document.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.stopPropagation();
      let dt = event.dataTransfer;
      if (dt.types !== null && (dt.types.indexOf ? dt.types.indexOf('Files') !== -1 : dt.types.contains('application/x-moz-file'))) {
        $(dropClassContainer).addClass(onDragClass);
        window.clearTimeout(dragTimer);
      }
    });
    document.addEventListener('dragleave', (event) => {
      event.preventDefault();
      event.stopPropagation();
      dragTimer = window.setTimeout(function () {
        $(dropClassContainer).removeClass(onDragClass);
      }, 25);
    });
  }

  prepareFilesAndUpload(filesUpload) {
    let files = this.state.files;
    Object.keys(filesUpload).forEach((index) => {
      let fileUpload = filesUpload[index];
      let file = new FileUpload();
      file.name = fileUpload.name;
      file.content = fileUpload;
      file.extension = getFileExtension(fileUpload.name);
      file.type = fileUpload.type;
      file.size = fileUpload.size;
      if (this.validateAndFilter(file)) {
        URL.revokeObjectURL(fileUpload);
        file.src = URL.createObjectURL(fileUpload);
        if (!this.props.beforeUpload(file)) return;
        files.push(file);
        if (!this.props.multiple) {
          files = [file];
        }
        this.uploadFile(file);
      }
    });
    this.setState({files});
  }

  onDrop(event) {
    this.setState({message: ''});
    event.preventDefault();
    event.stopPropagation();
    $(`.${this.props.dropContainerClass}`).removeClass(this.props.onDragClass);
    if (event.dataTransfer.files.length > 0) {
      let files = this.state.files;
      let oldFile = files[0] || undefined;
      if (oldFile !== undefined && oldFile.isUploaded === true && !this.props.multiple) {
        return this.setState({
          message: `Vui lòng xóa file cũ trước khi tải lên file mới.`,
          messageType: Alert.TYPE_WARNING
        });
      }
      let filesUpload = event.dataTransfer.files;
      this.prepareFilesAndUpload(filesUpload);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('dragover');
    document.removeEventListener('dragleave');
  }

  calculateProgress(file, event) {
    file.inProgress = true;
    file.percent = Math.round((event.loaded * 100) / event.total);
    file.isProgressFinished = event.total === event.loaded;
    return file;
  }

  uploadFile(file) {
    let files = this.state.files;
    let fileUploadIndex = files.findIndex((f) => f === file);
    let formData = new FormData();
    formData.append('file', file.content);
    _.forIn(this.props.requestUploadData, (val, key) => {
      formData.append(key, val);
    });
    const self = this;
    const config = {
      onUploadProgress: (e) => {
        file = self.calculateProgress(file, e);
        files[fileUploadIndex] = file;
        self.setState({files});
      }
    };
    http.post(this.props.uploadUrl, formData, config).then((respond) => {
      if (!this.props.afterUpload(respond)) return;
      file.inProgress = false;
      file.error = '';
      file.isUploaded = true;
      file.hashName = respond.data.name || '';
      files[fileUploadIndex] = file;
      this.setState({files});
    }).catch((error) => {
      file.inProgress = false;
      file.error = error.response.data;
      files[fileUploadIndex] = file;
      this.setState({files});
    });
  }

  removeFile(file) {
    this.cleanRemovedFile();
    if (!this.props.beforeRemove(file)) return;
    let files = this.state.files;
    let index = files.indexOf(file);
    let requestData = Object.assign(this.props.requestRemoveData, {index: index, name: file.hashName});
    http.delete(this.props.removeUrl, {
      data: requestData,
      onUploadProgress: (e) => {
        file.inProgress = true;
        file.action = 'remove';
        files[index] = file;
        this.setState({files});
      }
    }).then((respond) => {
      if (!this.props.afterUpload(respond)) return;
      file.isRemoved = true;
      files[index] = file;
      this.setState({
        files,
        message: `Đã xóa tệp tin ${file.name}`,
        messageType: Alert.TYPE_SUCCESS
      });
      this.cleanRemovedFile();
      setTimeout(() => {
        this.setState({message: ''});
      }, 3000);
    }).catch((error) => {
      file.inProgress = false;
      files[index] = file;
      file.error = error.response.data;
      files[index] = file;
      this.setState({files});
    });
  }

  cleanRemovedFile() {
    this.setState({files: this.state.files.filter((f) => f.isRemoved !== true)});
  }

  onChange(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({message: ''});
    let files = this.state.files;
    let oldFile = files[0] || undefined;
    if (oldFile !== undefined && oldFile.isUploaded === true && !this.props.multiple) {
      return this.setState({
        message: `Vui lòng xóa file cũ trước khi tải lên file mới.`,
        messageType: Alert.TYPE_WARNING
      });
    }
    let filesUpload = event.target.files;
    this.prepareFilesAndUpload(filesUpload);
  }

  validateAndFilter(file) {
    let fileExtension = getFileExtension(file.name.toLowerCase());
    let contains = this.state.files.find((currentFile) => {
      return file.size === currentFile.size && file.type === currentFile.type;
    });
    if (contains instanceof FileUpload) {
      this.setState({
        message: 'Đã tự động lọc các file trùng lặp.',
        messageType: Alert.TYPE_WARNING
      });
      return false;
    }

    let maxFileSize = this.props.maxSize * 1024 * 1024;
    if (file.size >= maxFileSize) {
      this.setState({
        message: `Dung lượng file vượt quá ${this.props.maxSize} MB`,
        messageType: Alert.TYPE_DANGER
      });
      return false;
    }

    if (this.props.extensions === '*') {
      return true;
    }
    //Trim
    let allowedExtensions = this.props.extensions.split(',').map((extension) => {
      return extension.trim();
    });
    if (!inArray(fileExtension, allowedExtensions)) {
      this.setState({
        message: 'Chỉ chấp nhận định dạng: <strong>' + this.props.extensions + '</strong>.',
        messageType: Alert.TYPE_DANGER
      });
      return false;
    }

    return true;

  }

  render() {
    let listFiles = '';
    if (this.props.multiple) {
      listFiles = this.state.files.map((file, index) => {
        let deleteBtn = '', uploadedText = '', reuploadBtn = '';
        if (file.isUploaded) {
          uploadedText = <span className="tag tag-success upload-status">Uploaded</span>;
          deleteBtn = <span className="btn btn-link" onClick={this.removeFile.bind(this, file)}>&times;</span>;
        }
        if (file.error) {
          uploadedText = <span className="tag tag-warning upload-status">Error</span>;
          reuploadBtn = <span className="btn btn-link" onClick={this.uploadFile.bind(this, file)}>&#x21bb;</span>
        }
        let progressBar = '', progressClass = '';
        if (file.inProgress) {
          deleteBtn = '';
          progressClass = 'in-progress ';
          let text = 'Tải lên file...';
          text += `${file.percent}%`;
          if (file.isProgressFinished) {
            text = 'Đang đợi phản hồi từ máy chủ...'
          }
          progressBar = <div>
            <div className="text-xs-center"
                 id="upload-caption">{text}
            </div>
            <progress className="progress progress-animated progress-striped" value={file.percent} max="100"
                      aria-describedby="upload-caption"/>
          </div>;
          if (file.action === 'remove') {
            progressBar = '';
          }
        }
        if (file.isRemoved) {
          return '';
        }
        return <li key={index} className={progressClass + 'clearfix'}>
          {progressBar}
          {uploadedText}
          {file.name}
          <div className="float-xs-right">
            <span className="tag tag-info">{ formatBytes(file.size, 1) }</span>
            <span className="tag tag-primary">{ file.type }</span>
            {reuploadBtn}
            {deleteBtn}
          </div>
        </li>;
      });
    }
    let alert = '', style = {}, btnRemoveSingleFile = '';
    if (this.state.message.length > 0) {
      alert = <Alert type={this.state.messageType} message={this.state.message}/>
    }
    let fakeFile = <div className={this.props.dropTextClass}>
      {this.props.dropText}
    </div>;
    let progressBar = '', reuploadBtn = '', uploadClass = '';
    if (!this.props.multiple &&this.state.files.length > 0) {
      let file = this.state.files[0];
      style['position'] = 'relative';
      fakeFile = <img src={file.src} alt={file.name} className="img-thumbnail"/>;
      btnRemoveSingleFile =
        <span className="btn btn-link" onClick={this.removeFile.bind(this, file)}>Remove file</span>;
      if (file.inProgress) {
        let text = 'Tải lên tệp tin...';
        btnRemoveSingleFile = '';
        uploadClass = ' uploading';
        text += `${file.percent}%`;
        if (file.isProgressFinished) {
          text = 'Đang chờ phản hồi từ máy chủ...'
        }
        if (file.error) {
          reuploadBtn = <span className="btn btn-link" onClick={this.uploadFile.bind(this, file)}>&#x21bb;</span>
        }
        progressBar = <div>
          <div className="text-xs-center" id="upload-caption">{text}</div>
          <progress className="progress progress-animated progress-striped" value={file.percent} max="100"
                    aria-describedby="upload-caption"/>
        </div>;
        if (file.action === 'remove') {
          progressBar = '';
        }
      }
    }
    return (
      <div className="dropzone" disabled={this.props.disabled}>
        { alert }
        {progressBar}
        <label htmlFor={this.props.dropFileId} className={this.props.containerClass + ' dropable'}
               onDrop={this.onDrop.bind(this)}>
          <div className={this.props.dropContainerClass + uploadClass} style={style}>
            {fakeFile}
          </div>
          <input onChange={this.onChange.bind(this)} className={this.props.dropFileClass} id={this.props.dropFileId}
                 multiple={this.props.multiple ? 'multiple' : null} name={this.props.dropFileName} type="file"/>
        </label>
        <ul className="list-unstyled file-list">
          {listFiles}
          {btnRemoveSingleFile}
          {reuploadBtn}
        </ul>
      </div>
    );
  }
}
Dropzone.defaultProps = {
  containerClass: '',
  dropText: 'Chọn hoặc thả tệp tin',
  dropFileId: 'file',
  dropFileClass: 'file',
  dropFileName: 'files',
  dropTextClass: 'text',
  dropContainerClass: 'fakefile',
  onDragClass: 'drop-file',
  multiple: true,
  extensions: '*',
  maxSize: 2,
  files: [],
  disabled: '',
  requestRemoveData: {},
  requestUploadData: {},
  requestOptions: {},
  beforeRemove: () => true,
  beforeUpload: () => true,
  afterUpload: () => true,
  afterRemove: () => true,
};
export default Dropzone;
