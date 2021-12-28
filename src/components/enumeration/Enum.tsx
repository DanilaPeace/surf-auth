import React from 'react'
import ParameterFormStore from '../../store/ParameterFormStore'
import { observer } from "mobx-react";
import { action, makeObservable, observable } from 'mobx';
import UserInput from '../common/user-input/UserInput'
import Checkbox from '../common/checkbox/checkbox'
import './styles.css';

interface EnumOptionsState {
    enumVariants: EnumType[];
    rendered: JSX.Element[];
}

interface EnumType {
    id: string;
    value: any;
}

interface EnumOptionsProps {
    id?: string;
}

export default class EnumOptions extends React.Component<EnumOptionsProps, EnumOptionsState> {

    constructor(props: EnumOptionsProps | Readonly<EnumOptionsProps>) {
        super(props);
        this.state = {
            enumVariants: [],
            rendered: []
        };

        this.handleAddEnumVariant = this.handleAddEnumVariant.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCheckBoxValueChange = this.handleCheckBoxValueChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleAddEnumVariant(e) {
        e.preventDefault();
        let uid = Math.random();
        let enumid = uid;
        const { id, ...props } = this.props;
        ParameterFormStore.changeParameterValueEnum(id, enumid, {})
        this.setState({
            rendered: [...this.state.rendered,
            <div>
                <UserInput inputType='text' labelName='Variant:' name='enumoption' inputName='enumoption' onChange={(e) => this.handleChange(id, enumid, e)} />
                <div className="flex-center"><button className="text btn btn-blue btn-block btn-sub" onClick={(e) => this.handleDelete(id, enumid, e)}> - Delete variant </button></div>
            </div>
            ]
        })
    }

    handleChange(id, enumid, e) {
        ParameterFormStore.changeParameterValueEnum(id, enumid, e.target.value)
    }

    async handleDelete(id, enumid, event) {
        event.preventDefault();
        ParameterFormStore.removeEnum(id, enumid)

        event.target.parentElement.parentElement.remove()
    }

    handleCheckBoxValueChange(e) {
        let id = this.props.id;
        ParameterFormStore.changeParameter(id, e.target.name, e.target.checked);
    }

    render() {
        return (
            <div>
                {this.state.rendered}
                <div className="flex-center"><button onClick={this.handleAddEnumVariant} className="text btn btn-blue btn-block btn-sub"> + Add variant </button></div>
            </div>
        );

    }
}
