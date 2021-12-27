import React from 'react';
import { observer } from "mobx-react";
import { action, makeObservable } from 'mobx';
import { SelectProps } from '../../../types/select'
import styles from './styles.module.scss';

function getOptions(selectOptions) {
  let options = [] as any;
  for (let i = 0; i < selectOptions.length; i++) {
    options.push(<option value={selectOptions[i]}>{selectOptions[i]}</option>)
  }
  return (options)
}

@observer
class SelectComponent extends React.Component<SelectProps> {

  constructor(props: SelectProps | Readonly<SelectProps>) {
    super(props);
    makeObservable(this);
    this.state = {}
  }

  @action
  onChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {

    let selectOptions = this.props.selectOptions;
    let options = getOptions(selectOptions);

    return (
    <div>
    <label htmlFor={this.props.name}>{this.props.labelName}</label>
      <select name={this.props.name} onChange={this.onChange} value={this.props.value} className={this.props.className}>
        {options}
      </select>
      </div>
    );
  }
}

export default SelectComponent;
