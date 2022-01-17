import React from "react";
import styled from 'styled-components';

const InputForIntStringElement = styled.div`
  margin-top: 10px;

  input:nth-child(2) {
    margin-top: 5px;
  }
`

const InputForIntString = ({minValue, maxValue, changeMinOrMaxValueOfParam}) => {
  return (
    <InputForIntStringElement>
      <input
        className="form-control user-input"
        type="number"
        name="minValue"
        placeholder="Type the min value param here"
        value={minValue || ""}
        onChange={changeMinOrMaxValueOfParam}
      />
      <input
        className="form-control user-input"
        type="number"
        name="maxValue"
        placeholder="Type the max value param here"
        value={maxValue || ""}
        onChange={changeMinOrMaxValueOfParam}
      />
    </InputForIntStringElement>
  );
};

export default InputForIntString;
