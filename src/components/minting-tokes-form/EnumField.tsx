export const EnumField = ({ enums, setParam, mintParams }) => {
  const onEnumSelect = (event) => {
    let enumValue: number = 0;
    for (const enumItem of testEnum) {
      if (enumItem.name === event.target.name) {
          enumValue = enumItem.enumVariants.indexOf(event.target.value);
      }
    }

    console.log(enumValue);

    setParam({
      ...mintParams,
      [event.target.name]: enumValue,
    });

    console.log("PARAMS: ", mintParams);
  };

  const testEnum = [
    {
      name: "enumOne",
      enumVariants: ["firstVar", "secondVar", "theerdVar"],
    },
    {
      name: "enumTWO",
      enumVariants: ["firstVar", "secondVar", "theerdVar"],
    },
    {
      name: "enum3333333",
      enumVariants: ["firstVar", "secondVar", "theerdVar"],
    },
  ];

  const enumSelects = testEnum.map((enumsItem) => {
    return (
      <div className="select-item">
        <div className="select-title">{enumsItem.name}</div>
        <select
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
