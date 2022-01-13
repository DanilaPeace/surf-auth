import React from 'react'
import ParameterFormStore from '../../store/ParameterFormStore'
import { store } from '../../store/MainStore'
import { observer } from "mobx-react";
import Parameter from '../parameter/Parameter'
import './styles.css';

interface ParameterFormProps {
}

interface ParameterFormState {
    defaultParamState: string;
    parametersValues?: JSX.Element;
    params: JSX.Element[];
}

@observer
export default class ParameterForm extends React.Component<ParameterFormProps, ParameterFormState> {

    constructor(props: ParameterFormProps | Readonly<ParameterFormProps>) {
        super(props);
        this.state = {
            defaultParamState: 'Not selected',
            parametersValues: <></>,
            params: []
        };
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(event) {
        event.preventDefault();
        let uid = Math.random().toString();
        this.setState({
            params: [...this.state.params, <Parameter id={uid} />]
        })
        ParameterFormStore.addParameter(uid)
    }

    render() {
        return (
            <div>
                <div className="tab-pane fade active show">
                    <p className="form-title">Tokens parameters</p>
                    {this.state.params}
                    <div className="flex-center"><button onClick={this.handleAdd} className="text btn btn-blue btn-block btn-sub"> + Add parameter </button></div>
                </div>
            </div>
        );
    }
}
