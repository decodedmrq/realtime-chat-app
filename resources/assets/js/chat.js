/**
    * Created by quyennv.bg@gmail.com on 6/9/17.
*/

import React from "react";

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-xs-4 bg-white">
                    <div className=" row border-bottom ml-0" style={{height: 40 + 'px'}}>
                        <h5 className="pt-2 pb-1">Example Chat System</h5>
                    </div>
                    <div className="search-block">
                        <span>
                            <label className="search-friend-label">
                                <input type="text" className="form-control search-friend-input"
                                       placeholder="Tìm kiếm bạn bè"/>
                            </label>
                        </span>
                    </div>
                    <ul className="friend-list">
                        <li className="active bounceInDown">
                            <a href="#" className="clearfix text-left">
                                <img src="https://bootdey.com/img/Content/user_1.jpg" alt=""
                                     className="img-circle mr-2"/>
                                <div className="friend-name">
                                    <strong>John Doe</strong>
                                </div>
                                <div className="last-message text-muted">Hello, Are you there?</div>
                                <small className="time text-muted">Just now</small>
                                <small className="chat-alert badge badge-danger">1</small>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="clearfix text-left">
                                <img src="https://bootdey.com/img/Content/user_2.jpg" alt=""
                                     className="img-circle mr-2"/>
                                <div className="friend-name">
                                    <strong>Jane Doe</strong>
                                </div>
                                <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                                <small className="time text-muted">5 mins ago</small>
                                <small className="chat-alert text-muted"><i className="fa fa-check"/></small>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="clearfix text-left">
                                <img src="https://bootdey.com/img/Content/user_3.jpg" alt=""
                                     className="img-circle mr-2"/>
                                <div className="friend-name">
                                    <strong>Kate</strong>
                                </div>
                                <div className="last-message text-muted">Lorem ipsum dolor sit amet.</div>
                                <small className="time text-muted">Yesterday</small>
                                <small className="chat-alert text-muted"><i className="fa fa-reply"/></small>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col-md-8 col-xs-8 bg-white ">
                    <div className="chat-message">
                        <ul className="chat">
                            <li className="left clearfix text-left">
                    	        <span className="chat-img pull-left">
                    		        <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar"/>
                    	        </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">John Doe</strong>
                                        <small className="pull-right text-muted"><i className="fa fa-clock-o"/> 12 mins
                                            ago
                                        </small>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </li>
                            <li className="right clearfix text-left">
                                <span className="chat-img pull-right">
                                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar"/>
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">Sarah</strong>
                                        <small className="pull-right text-muted"><i className="fa fa-clock-o"/> 13 mins
                                            ago
                                        </small>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum
                                        ornare dolor, quis
                                        ullamcorper ligula sodales at.
                                    </p>
                                </div>
                            </li>
                            <li className="left clearfix text-left">
                                <span className="chat-img pull-left">
                                    <img src="https://bootdey.com/img/Content/user_3.jpg" alt="User Avatar"/>
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">John Doe</strong>
                                        <small className="pull-right text-muted"><i className="fa fa-clock-o"/> 12 mins
                                            ago
                                        </small>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </div>
                            </li>
                            <li className="right clearfix text-left">
                                <span className="chat-img pull-right">
                                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt="User Avatar"/>
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">Sarah</strong>
                                        <small className="pull-right text-muted"><i className="fa fa-clock-o"/> 13 mins ago
                                        </small>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum
                                        ornare dolor, quis
                                        ullamcorper ligula sodales at.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="chat-box bg-white">
                        <div className="input-group">
                            <textarea className="form-control border no-shadow no-rounded mr-2" rows="3"
                                      placeholder="Type your message here"/>
                            <button className="btn btn-success no-rounded" type="button">Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;