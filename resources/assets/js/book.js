/**
 * Created by mon.ls on 12/2/2016.
 */
import Dropzone from "./dropzone";
import Alert from "./alert";
import React from "react";
import AutocompleteSearch from "./autocomplete";
import {clean} from "./helper";
import {debounce} from "lodash";
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
export class BookCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        name: '',
        description: '',
        price: '',
        isbn: '',
        category_id: '',
        _token: Security.csrfToken,
      },
      isFree: true,
      bookFiles: [],
      isUpload: false,
      message: '',
      finished: false,
      percent: 0,
      bookId: 0,
      processing: false,
      messageType: Alert.TYPE_INFO,
      previewImage: '',
    };
    this.handleAutoSave = debounce(this.handleAutoSave.bind(this), 1000);
  }

  handleChange(name, event) {
    let input = this.state.input;
    input[name] = event.target.value;
    this.setState({input});
  }

  handleSelectBoxChange(name, value, values) {
    let input = this.state.input;
    input[name] = value;
    this.setState({input}, () => this.handleAutoSave());
  }

  handleAutoSave(event) {
    if (this.state.processing) {
      return;
    }
    let bookId = this.state.bookId;
    if (bookId !== 0) {
      return this.updateBook(bookId);
    }
    this.createBook();
  }

  updateBook(id) {
    this.setState({
      message: 'Đang lưu...',
      messageType: Alert.TYPE_WARNING,
      processing: true
    });
    clean(this.state.input);
    let input = this.state.input;
    http.put(`/book/${id}`, input).then((res) => {
      this.setState({processing: false});
      if (res.data.success === true) {
        this.setState({message: 'Auto saved', messageType: Alert.TYPE_SUCCESS});
        setTimeout(() => {
          this.setState({message: ''});
        }, 3000);
      }
    }).catch((error) => {
      this.setState({
        message: 'Connection Error',
        messageType: Alert.TYPE_DANGER,
        processing: false
      });
    });
  }

  createBook() {
    if (this.state.bookId === 0 && !this.state.input.name) {
      this.setState({
        message: 'Nhập tên để tạo sách trước khi nhập các trường khác.',
        messageType: Alert.TYPE_WARNING
      });
      return false;
    }
    this.setState({
      message: 'Đang lưu...',
      messageType: Alert.TYPE_WARNING,
      processing: true
    });
    clean(this.state.input);
    let input = this.state.input;
    http.post('/book', input).then((res) => {
      this.setState({processing: false});
      this.setState({
        message: `New book <strong>${res.data.name}</strong> created`,
        messageType: Alert.TYPE_SUCCESS,
        bookId: res.data.id
      });
      setTimeout(() => {
        this.setState({message: ''});
      }, 3000);

    }).catch((err) => {
      this.setState({
        message: 'Connection Error',
        messageType: Alert.TYPE_DANGER,
        processing: false
      });
    });
  }

  beforeUpload(file) {
    let bookId = this.state.bookId;
    if (bookId === 0) {
      this.setState({
        message: 'Nhập tên để tạo sách trước khi upload file',
        messageType: Alert.TYPE_WARNING
      });
      return false;
    }
    return true;
  }

  changeType(event) {
    let isFree = event.target.value;
    if (isFree) {
        this.setState({isFree : true});
    } else {
      this.setState({isFree : false});
    }
  }

  beforeRemove(index) {
    return window.confirm('Are you sure?');

  }

  render() {
    let alert = '';
    if (this.state.message.length > 0) {
      alert = <Alert class="message" type={this.state.messageType}
                     message={this.state.message}/>
    }
    let progressBar = '';
    if (this.state.isUpload) {
      let text = `Uploading... ${this.state.percent}%`;
      if (this.state.finished) {
        text = 'Waiting for server response...'
      }
      progressBar = <div>
        <div className="text-xs-center"
             id="upload-caption">{text}
        </div>
        <progress className="progress progress-animated progress-striped"
                  value={this.state.percent} max="100"
                  aria-describedby="upload-caption"/>
      </div>;
    }
    return (
        <form action="/book"
              method="post"
              formEncType="multipart/form-data"
              id="form-create"
              onChange={this.handleAutoSave.bind(this)}
              onSubmit={(e) => e.preventDefault()}>
          {alert}
          {progressBar}
          <input name="_token" type="hidden" value={Security.csrfToken}/>
          <fieldset>
            <div className="form-group">
              <div className="row">
                <div className="col-6">
                  <label htmlFor="name">{trans('string.name')}</label>
                  <input id="name"
                         className="form-control"
                         placeholder={trans('string.name')}
                         name="name"
                         spellCheck="false"
                         type="text"
                         value={this.state.input.name}
                         onChange={this.handleChange.bind(this, 'name')}
                         autoComplete="off"
                         autoCorrect="off"/>
                </div>
                <div className="col-3">
                  <label htmlFor="isFree">{trans('string.paid')}</label>
                  <input type="checkbox" className="form-control"
                         value={this.state.isFree}
                         onChange={this.changeType.bind(this)}/>
                </div>
                <div className="col-3">
                  <label htmlFor="price">{trans('string.price')}</label>
                  <input id="price"
                         className="form-control"
                         placeholder={trans('string.price')}
                         name="price"
                         type="number"
                         value={this.state.input.price}
                         onChange={this.handleChange.bind(this, 'price')}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="description">{trans(
                      'string.description')}</label>
                  <textarea id="description"
                            rows="10" cols="50"
                            className="form-control"
                            placeholder={trans('string.description')}
                            name="name"
                            spellCheck="false"
                            value={this.state.input.description}
                            onChange={this.handleChange.bind(this,
                                'description')}/>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="category_id">{trans(
                      'string.category')}</label>
                  <AutocompleteSearch url="/category/search"
                                      name="category"
                                      createUrl="/category"
                                      onChange={this.handleSelectBoxChange.bind(
                                          this, 'category_id')}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="files">{trans('string.file')}</label>
                  <Dropzone maxSize="200"
                            containerClass="book-files"
                            extensions="*"
                            uploadUrl={`/book/${this.state.bookId}/upload`}
                            removeUrl={`/book/${this.state.bookId}/files`}
                            files={this.state.bookFiles}
                            beforeRemove={this.beforeRemove.bind(this)}
                            beforeUpload={this.beforeUpload.bind(this)}/>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="cover_image">{trans(
                      'string.cover_image')}</label>
                  <Dropzone maxSize="2"
                            containerClass="book-files"
                            extensions="*"
                            multiple={false}
                            uploadUrl={`/book/${this.state.bookId}/upload`}
                            removeUrl={`/book/${this.state.bookId}/files`}
                            requestRemoveData={{cover_image: true}}
                            requestUploadData={{cover_image: true}}
                            accept="image/*"
                            dropFileId="cover_image"
                            dropFileName="cover_image"
                            beforeRemove={this.beforeRemove.bind(this)}
                            beforeUpload={this.beforeUpload.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="form-group text-xs-right">
              <button className="btn btn-primary"
                      onClick={this.handleAutoSave.bind(this)}>Lưu
              </button>
            </div>
          </fieldset>
        </form>
    )
  };
}
