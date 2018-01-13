import React, { PropTypes, Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import { Components, registerComponent, withList, withCurrentUser, withEdit } from 'meteor/vulcan:core';
import Notifications from '../../lib/collections/notifications/collection.js';

class NotificationsList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lastNotificationsCheck: props.currentUser.lastNotificationsCheck,
    }
  }

  render() {
    const results = this.props.results;
    const loadMore = this.props.loadMore;
    if (results && results.length) {
      return (
        <List style={{width: '300px', overflowY: 'auto', padding: '0px'}}>
          {results.map(notification => <Components.NotificationsItem notification={notification} lastNotificationsCheck={this.state.lastNotificationsCheck} />)}
          {results.length >= 20 && <ListItem onClick={() => loadMore()} primaryText="Load More" style={{textAlign: 'center', fontSize: '14px'}} />}
        </List>
      )
    } else {
      return <Components.Loading />
    }
  }
}

const options = {
  collection: Notifications,
  queryName: 'notificationsListQuery',
  fragmentName: 'notificationsNavFragment',
  limit: 20,
  totalResolver: false,
};

const withEditOptions = {
  collection: Notifications,
  fragmentName: 'notificationsNavFragment',
};

registerComponent('NotificationsList', NotificationsList, [withList, options], [withEdit, withEditOptions], withCurrentUser);
