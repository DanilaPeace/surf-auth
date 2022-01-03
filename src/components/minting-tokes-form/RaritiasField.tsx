const RaritiesField = ({ rarities, onRaritiesSelect, paramsForMint }) => {
  const defaultSelectedValue = rarities[0].name;

  const onRaritiesChange = (event) => {
    onRaritiesSelect({
      ...paramsForMint,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="RaritiesField">
      <div className="RaritiesField-title">Rarities</div>
      <select
        onChange={onRaritiesChange}
        className="RaritiesField-select form-select"
        name="rarities"
        defaultValue={defaultSelectedValue}
        id="rarities"
      >
        {rarities.map((rarity, idx) => {
          return <option key={idx}>{rarity.name}</option>;
        })}
      </select>
    </div>
  );
};

export default RaritiesField;
