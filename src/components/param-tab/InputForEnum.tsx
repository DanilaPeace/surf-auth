import React, { useState } from "react";

import { paramStore } from "../../store/ParamStore";

const InputForEnum = ({ enumVariants, addEnumVariant }) => {
  const [newEnumVariant, setNewEnumVariant] = useState();
  const [enumVariant, setEnumVariant] = useState("");
  const onAddVariant = (event) => {
    event.preventDefault();
    console.log("NEW: ", newEnumVariant);

    addEnumVariant(newEnumVariant);
  };

  const onDeleteVariant = (event) => {};

  const havingEnumVariants = enumVariants?.map((enumVariantName) => {
    return (
      <>
        {/* <input
          type="text"
          className="form-control user-input"
          value={enumVariantName}
        /> */}
        {enumVariantName}
        <button
          className="btn btn-blue"
          onClick={() => onDeleteVariant(enumVariantName)}
        >
          + DELETE VARIANT
        </button>
      </>
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
      />
      <button className="btn btn-blue" onClick={onAddVariant}>
        + ADD VARIANT
      </button>
    </div>
  );
};

export default InputForEnum;
