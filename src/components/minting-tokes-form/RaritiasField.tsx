const RaritiesField = ({ rarities, onRaritiesChange, paramsForMint }) => {
  const defaultSelectedValue = rarities[0].name;
  return (
    <div className="RaritiesField">
      <div className="RaritiesField-title">Rarities</div>
      <select
        onChange={(event) =>
          onRaritiesChange({
            ...paramsForMint,
            [event.target.name]: event.target.value,
          })
        }
        className="form-select"
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
