export const EnumField = ({ enums, setParam, mintParams }) => {
  const onEnumSelect = (event) => {
    let enumValue: number = 0;
    for (const enumItem of enums) {
      if (enumItem.name === event.target.name) {
        enumValue = enumItem.enumVariants.indexOf(event.target.value);
      }
    }

    setParam({
      ...mintParams,
      [event.target.name]: enumValue,
    });
  };

  const enumSelects = enums.map((enumsItem) => {
    return (
      <div className="select-item">
        <div className="select-title">{enumsItem.name}</div>
        <select
          onFocus={onEnumSelect}
          onChange={onEnumSelect}
          className="EnumsField-select form-select"
          name={enumsItem.name}
        >
          {enumsItem.enumVariants.map((enumVarianItem, idx) => {
            return <option>{enumVarianItem}</option>;
          })}
        </select>
      </div>
    );
  });

  return (
    <div className="RaritiesField">
      <div className="EnumsField-title">Enums</div>
      {enumSelects}
    </div>
  );
};

export default EnumField;
