import React, { useState } from "react";

import { paramStore } from "../../store/ParamStore";

const InputForEnum = ({ enumVariants, addEnumVariant, deleteEnumVariant }) => {
  console.log("RERENDER!!!");

  const [newEnumVariant, setNewEnumVariant] = useState("");
  const onAddVariant = (event) => {
    event.preventDefault();
    console.log("NEW: ", newEnumVariant);

    addEnumVariant(newEnumVariant);
    setNewEnumVariant("");
  };

  const onDeleteVariant = (event, deletedEnumVariantName: string) => {
    event.preventDefault();
    deleteEnumVariant(deletedEnumVariantName);
  };

  const havingEnumVariants = enumVariants?.map((enumVariantName) => {
    return (
      <div>
        {enumVariantName}
        <button
          className="btn btn-blue"
          onClick={(event) => onDeleteVariant(event, enumVariantName)}
        >
          + DELETE THIS VARIANT
        </button>
      </div>
    );
  });

  const onEnumVariantChange = (event) => {
    setNewEnumVariant(event.target.value);
  };

  return (
    <div className="">
      {havingEnumVariants}
      <input
        type="text"
        className="form-control user-input"
        value={newEnumVariant || ""}
        onChange={onEnumVariantChange}
        placeholder="Type new enum variant here"
      />
      <button className="btn btn-blue" onClick={onAddVariant}>
        + ADD VARIANT
      </button>
    </div>
  );
};

export default InputForEnum;
