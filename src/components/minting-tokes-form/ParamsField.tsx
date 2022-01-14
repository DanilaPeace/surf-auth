const ParamsField = ({ variables, setParam, mintParams }) => {
  const onParamChange = (event) => {
    let eventTargetValue = event.target.value;
    if (event.target.type === "number") {
      eventTargetValue = +eventTargetValue;
    }
    setParam({ ...mintParams, [event.target.name]: eventTargetValue });
  };

  const parameters = variables.map((parameter, idx: number) => {
    return (
      <div className="parameter-block" key={idx}>
        <div className="parameter-title">{parameter.name}</div>
        <input
          onChange={onParamChange}
          className="form-control user-input"
          type={parameter.type === "uint" ? "number" : "text"}
          name={parameter.name}
          min={parameter.minValue}
          max={parameter.maxValue}
          required
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
