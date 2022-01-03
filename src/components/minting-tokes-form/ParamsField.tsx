const ParamsField = ({ variables, onRaritiesChange, paramsForMint }) => {
  const onParamChange = (event) => {
    let eventValue = event.target.value;
    if (event.target.type === "number") {
      eventValue = +eventValue;
    }
    onRaritiesChange({ ...paramsForMint, [event.target.name]: eventValue });
  };

  return (
    <div className="ParamsField">
      <div className="ParamsField-title">Parameters</div>
      {variables.map((parameter, idx) => {
        return (
          <div key={idx} className="parameter">
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
      })}
    </div>
  );
};

export default ParamsField;
