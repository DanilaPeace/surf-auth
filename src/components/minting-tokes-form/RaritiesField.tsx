const RaritiesField = ({ rarities, setRarity, mintParams }) => {
  const onRaritiesChange = (event) => {
    setRarity({
      ...mintParams,
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
