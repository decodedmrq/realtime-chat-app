/**
 * Created by mon.ls on 12/4/2016.
 */
import Alert from "./alert";
import React from "react";
class AutocompleteSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        total: 0,
        per_page: 10,
        current_page: 1,
        last_page: 0,
        next_page_url: null,
        prev_page_url: null,
        from: null,
        to: null,
        data: []
      },
      message: '',
      messageType: Alert.TYPE_INFO,
      searching: false,
      keyword: '',
      value: '',
      selectedItems: [],
      notFound: false,
      type: this.props.type,
    };
    this.handleSearch = _.debounce(this.handleSearch, 250);
  }

  componentDidMount() {
    http.get(this.props.url, {
      onUploadProgress: () => {
        this.setState({searching: true})
      },
      params: this.props.query
    }).then((res) => {
      this.setState({searching: false, items: res.data.items});
    }).catch((err) => {
      this.setState({searching: false, message: err.response.data});
    });
  }

  handleScroll(event) {
    let reached = (event.target.clientHeight + event.target.scrollTop) === event.target.scrollHeight;
    if (reached && this.state.items.next_page_url) {
      this.handleSearch(event, true);
    }
  }

  handleChange(event) {
    event.preventDefault();
    event.stopPropagation();
    let keyword = event.target.value;
    if (!keyword) {
      this.setState({notFound: false});
    }
    this.setState({keyword});
  }

  handleSearch(event, loadMore) {
    if (this.state.loadMore) {
      return false;
    }
    let keyword = this.state.keyword;
    this.setState({notFound: false, searching: true});
    let query = {keyword};
    if (loadMore === true) {
      let page = this.state.items.current_page + 1;
      this.setState({loadMore: true});
      query = {keyword, page};
    }
    http.get(this.props.url, {params: query})
      .then((response) => {
      this.setState({searching: false, loadMore: false});
      let items = response.data.items;
      const notFound = items.data.length  === 0;

      let currentData = this.state.items.data;
      if (loadMore === true) {
        items['data'] = currentData.concat(items.data);
      }

      this.setState({searching: false, loadMore: false, items, notFound});

    }).catch((error) => {
      this.setState({searching: false, message: error.response, messageType: Alert.TYPE_DANGER});
    });
  }

  handleSelected(item, event) {
    let selectedItems = this.state.selectedItems;
    let keyword = '';
    if (this.state.type === 'multiple') {
      selectedItems = _.concat(selectedItems.filter((i) => i !== item), item);
    }
    if (this.state.type !== 'multiple') {
      keyword = item.name;
      selectedItems = [item];
    }
    this.setState({keyword, value: item.id, selectedItems});
    this.props.onChange(item.id, selectedItems);
  }

  removeSelectedItem(item, event) {
    this.setState({selectedItems: this.state.selectedItems.filter((i) => i !== item)});
  }

  createItem() {
    let keyword = this.state.keyword;
    let items = this.state.items;
    if (keyword) {
      http.post(this.props.createUrl, {
        name: keyword
      }).then((res) => {
        items['data'] = [res.data.item];
        this.setState({
          items,
          notFound: false,
          message: `Created ${this.props.name} <strong>${res.data.item.name}</strong>`,
          messageType: Alert.TYPE_SUCCESS
        });
        this.handleSelected(res.data.item);
        setTimeout(() => {
          this.setState({message: ''});
        }, 3000);
      }).catch((err) => {
        this.setState({message: err.response.data, messageType: Alert.TYPE_DANGER});
      });
    }
  }

  render() {
    let alert = '', loadmore = '';
    if (this.state.message.length > 0) {
      alert = <Alert class="message" type={this.state.messageType} message={this.state.message}/>
    }
    let text = `Search ${this.props.name}`;
    let className = 'dropdown-item ';
    if (this.state.searching) {
      className += 'search-hint';
      text = <span>Searching for <strong>{this.state.keyword}...</strong></span>;
    }
    if (this.state.notFound) {
      className += 'create-hint';
      text =
        <span
          onClick={this.createItem.bind(this)}>No results match, create <strong>{this.state.keyword}</strong></span>;
    }
    let hint = <a className={className} href="javascript:void(0);">{text}</a>;
    if (!this.state.notFound && this.state.searching === false) {
      hint = '';
    }
    let listItem = this.state.items.data.map((item, index) => {
      let isSelected = typeof this.state.selectedItems.find((i) => i === item) === 'object';
      return <li onClick={this.handleSelected.bind(this, item)} className="dropdown-item" href="#"
                 aria-selected={isSelected} aria-disabled={item.disabled}
                 key={index}>{item.name}</li>
    });

    if (this.state.loadMore) {
      loadmore = <li className="dropdown-item loading">Loading..</li>;
    }
    let selectedList = '';
    if (this.state.type === 'multiple') {
      let listSelected = this.state.selectedItems.map((item, key) => {
        return <span key={key} className="tag tag-default">{item.name}
          <span className="remove-tag" onClick={this.removeSelectedItem.bind(this, item)}>&times;</span>
          </span>;
      });
      selectedList = <div className="selected-list">
        {listSelected}
      </div>;
    }
    let input = '';
    if (this.state.type !== 'multiple') {
      input = <input className="form-control"
                     id={this.props.name}
                     placeholder={trans(`string.${this.props.name}`)}
                     name={this.props.name} type="hidden"
                     value={this.state.value}/>;
    }
    return (
      <div className="search-dropdown">
        {alert}
        {input}
        <input className="dropdown-toggle form-control" type="search" autoCorrect="off" autoComplete="off"
               autoCapitalize="off" spellCheck="false" role="textbox" data-toggle="dropdown" aria-haspopup="true"
               onKeyPress={this.handleSearch.bind(this, false)}
               onKeyDown={this.handleSearch.bind(this, false)}
               onKeyUp={this.handleSearch.bind(this, false)}
               aria-expanded="false" value={this.state.keyword} onChange={this.handleChange.bind(this)}/>
        {selectedList}
        <ul id="results" className="dropdown-menu results" onScroll={this.handleScroll.bind(this)}>
          {hint}
          {listItem}
          {loadmore}
        </ul>
      </div>
    );
  }
}
AutocompleteSearch.defaultProps = {
  name: 'item',
  type: 'single',
};

export default AutocompleteSearch;
