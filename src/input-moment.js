import cx from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar from './calendar';
import Time from './time';

export default class InputMoment extends Component {
  static defaultProps = {
    prevMonthIcon: 'ion-ios-arrow-left',
    nextMonthIcon: 'ion-ios-arrow-right',
    minStep: 1,
    hourStep: 1,
    tab: 0,
    handleclicktab: null,
    savebuttonlabel: 'Save',
    hoursLabel: 'Hours',
    minutesLabel: 'Minutes',
    dateLabel: 'Date',
    timeLabel: 'Time',
    currentLanguage: 'en'
  };


  constructor(props) {
    super();

    this.state = {
      m: props.moment
    };

    this.onMonthChange = this.onMonthChange.bind(this);
  }

  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  };

  onMonthChange(val) {
    this.setState({
      m: val
    })
  }

  render() {
    const { tab } = this.props;
    const {
      moment: m,
      className
    } = this.props;

    const props = {
      prevmonthicon: this.props.prevMonthIcon,
      nextmonthicon: this.props.nextMonthIcon,
      minstep: this.props.minStep,
      hourstep: this.props.hourStep,
    }

    const cls = cx('m-input-moment', className);

    return (
      <div className={cls} {...props}>
        <div className="options">
          <button
            type="button"
            className={cx('ion-calendar im-btn', { 'is-active': tab === 0 })}
            onClick={e => this.props.handleclicktab(e, 0)}
          >
            {this.props.dateLabel}
          </button>
          <button
            type="button"
            className={cx('ion-clock im-btn', { 'is-active': tab === 1 })}
            onClick={e => this.props.handleclicktab(e, 1)}
          >
            {this.props.timeLabel}
          </button>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', { 'is-active': tab === 0 })}
            moment={this.state.m}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
            onMonthChange={this.onMonthChange}
            currentLanguage={this.props.currentLanguage}
          />
          <Time
            className={cx('tab', { 'is-active': tab === 1 })}
            moment={m}
            minStep={this.props.minStep}
            hourStep={this.props.hourStep}
            onChange={this.props.onChange}
            hoursLabel={this.props.hoursLabel}
            minutesLabel={this.props.minutesLabel}
          />
        </div>

        {this.props.onSave ? (
          <button
            type="button"
            className="im-btn btn-save ion-checkmark"
            onClick={this.handleSave}
          >
            {this.props.savebuttonlabel}
          </button>
        ) : null}
      </div>
    );
  }
}
