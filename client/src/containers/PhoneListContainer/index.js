import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  selectedPhone,
  getPhoneList,
  toogleAnimations
} from '../../redux/actions';

import Loading from '../../features/Loading';
import PhoneItem from '../../features/PhoneItem';

import './PhoneListCointainer.css';

class PhoneListContainer extends Component {
  componentDidMount() {
    // Check if there are items already loaded
    if (!this.props.phoneList.items) {
      this.props.getPhoneList();
    }
  }

  _renderPhoneList = () => {
    const phones = this.props.phoneList.items;

    return phones.map(phone => (
      <PhoneItem key={phone.id} phone={phone} animations={this.props.appOptions.toogleAnimations} {...this.props} />
    ));
  }

  render() {
    if (this.props.phoneList.pending || !this.props.phoneList.items ) {
      return (
        <Loading message="Loading data..."/>
      );
    }

    return (
      <div>
        <div className="phone-list-container">
          <div className="content">
            { this._renderPhoneList() }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appOptions: state.appOptions,
    phoneList: state.phoneList
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onSelectedPhone: (id) => dispatch(selectedPhone(id)),
    onToogleAnimations: () => dispatch(toogleAnimations()),
    getPhoneList: () => dispatch(getPhoneList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneListContainer);
