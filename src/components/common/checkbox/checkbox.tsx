import * as React from 'react';
import { observer } from 'mobx-react';
import { CheckboxProps } from '../../../types/checkbox'
import styles from './styles.module.css';

@observer
export default class Checkbox extends React.Component<CheckboxProps> {
    constructor(props) {
        super(props);
    }

    onChange = (e) => {
        this.props.onChange && this.props.onChange(e);
    };

    render() {

        let checkboxClass = styles.checkbox;

        return (
            <div>
                <input
                    type="checkbox"
                    checked={this.props.value}
                    value={(this.props.value)?.toString()}
                    className={checkboxClass}
                    onChange={this.onChange}
                    name={this.props.name}
                />
            </div>);
    }
}
