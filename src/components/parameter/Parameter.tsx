import React from 'react'
import ParameterFormStore from '../../store/ParameterFormStore'
import { observer } from "mobx-react";
import UserInput from '../common/user-input/UserInput'
import Select from '../common/select/select'
import EnumOptions from '../enumeration/Enum'
import './styles.css';

interface ParamProps {
    id: string;
}

interface ParamState {
    defaultParamState: string;
    parametersValues?: JSX.Element;
}
@observer
export default class Parameter extends React.Component<ParamProps, ParamState> {

    constructor(props: ParamProps | Readonly<ParamProps>) {
        super(props)
        this.state = {
            defaultParamState: 'Not selected',
            parametersValues: <></>
        }

        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addParameter = this.addParameter.bind(this);
        this.handleValueChangeValue = this.handleValueChangeValue.bind(this);
        this.handleCheckBoxValueChange = this.handleCheckBoxValueChange.bind(this);
    }

    handleValueChange = (e) => {
        const {
            name,
            value
        } = e.target;
        ParameterFormStore.changeParameter(e.target.parentNode.parentNode.parentNode.id, name, value)
    };

    handleValueChangeValue = (e) => {
        const {
            name,
            value
        } = e.currentTarget;
        ParameterFormStore.changeParameterValue(e.target.parentNode.parentNode.parentNode.id, name, value)
    };

    handleCheckBoxValueChange(e) {
        let id = e.target.parentNode.parentNode.id;
        ParameterFormStore.changeParameter(id, e.target.name, e.target.checked);
    }

    addParameter(state) {
        const { id, ...props } = this.props;
        switch (state) {
            case 'Integer':
                let val = { minValue: '', maxValue: '' };
                let type = 'integer'
                ParameterFormStore.switchParameterTypeValues(id, type, val)
                return (
                    <div id={id} className="row parameter-choice">
                        <div className="col"><UserInput labelName='Minumum value' name='minValue' inputName='minValue' onChange={this.handleValueChangeValue} /></div>
                        <div className="col"><UserInput labelName='Maximum value' name='maxValue' inputName='maxValue' onChange={this.handleValueChangeValue} /></div>
                    </div>
                );
                break;
            case 'String':
                let val1 = { minValue: '', maxValue: '' };
                let type1 = 'string';
                ParameterFormStore.switchParameterTypeValues(id, type1, val1)
                return (
                    <div id={id} className="row parameter-choice">
                        <div className="col"><UserInput labelName='Minimum length' name='minValue' inputName='minValue' onChange={this.handleValueChangeValue} /></div>
                        <div className="col"><UserInput labelName='Maximum length' name='maxValue' inputName='maxValue' onChange={this.handleValueChangeValue} /></div>
                    </div>
                );
                break;
            case 'Enumeration':
                let val2 = { enumVariants: {} };
                let type2 = 'enum';
                ParameterFormStore.switchParameterTypeValues(id, type2, val2)
                return (
                    <div id={id}>
                        <EnumOptions id={id} />
                    </div>
                );
                break;
            case 'Mediafile':
                let val3 = {};
                let type3 = 'Mediafile';
                ParameterFormStore.switchParameterTypeValues(id, type3, val3)
                return (
                    <div id={id}>
                    </div>
                );
                break;
            case 'Not selected':
                let val4 = {};
                let type4 = '';
                ParameterFormStore.switchParameterTypeValues(id, type4, val4)
                return (<div> </div>);
                break;
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            defaultParamState: event.target.value
        }, () =>
            this.setState({
                parametersValues: this.addParameter(this.state.defaultParamState)
            })
        )

    }

    handleDelete(event) {
        event.preventDefault();
        ParameterFormStore.removeParameter(event.target.parentNode.parentNode.id)
        event.target.parentElement.parentElement.remove()
    }

    render() {
        const { id, ...props } = this.props;
        return (
            <div className="row parameter-choice" id={id}>
                <div className="col">
                    <UserInput labelName='Parameter name' name='name' inputName='name' onChange={this.handleValueChange} />
                </div>
                <div className="col">
                    <Select
                        selectOptions={['Not selected', 'String', 'Integer', 'Enumeration', 'Mediafile']}
                        name="select"
                        onChange={this.handleChange}
                        value={this.state.defaultParamState}
                        className='form-select select-list'
                        labelName='Parameter type'
                    />
                </div>
                {this.state.parametersValues}
                <div className='flex-center'><button onClick={this.handleDelete} className='text btn btn-blue btn-block btn-sub'> - Delete parameter </button></div>
            </div>
        )
    }
}
