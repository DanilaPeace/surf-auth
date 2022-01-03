const ParamsField = ({ variables, onParamsChange, paramsForMint }) => {
  const onParamChange = (event) => {
    let eventTargetValue = event.target.value;
    if (event.target.type === "number") {
      eventTargetValue = +eventTargetValue;
    }
    onParamsChange({ ...paramsForMint, [event.target.name]: eventTargetValue });
  };

  const parameters = variables.map((parameter, idx: number) => {
    return (
      <div key={idx} className="parameter-block">
        <div className="parameter-title">{parameter.name}</div>
        <input
          onChange={onParamChange}
          className="form-control user-input"
          type={parameter.type === "uint" ? "number" : "text"}
          name={parameter.name}
          value={paramsForMint[parameter.name]}
        />
      </div>
    );
  });

  return (
    <div className="ParamsField">
      <div className="ParamsField-title">Enter the follow parameters...</div>
      {parameters}
    </div>
  );
};

export default ParamsField;
