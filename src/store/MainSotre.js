import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { Component } from "react";

export const MainStore = observer(class extends Component{
    constructor(props) {
        super(props);
        makeObservable(this, {
            rootAddress: observable
        })
    }
});