import React, { useState } from "react";
import nextId from "react-id-generator";

const InputForEnum = ({ enumVariants, addEnumVariant, deleteEnumVariant }) => {
  const [newEnumVariant, setNewEnumVariant] = useState("");
  const onAddVariant = (event) => {
    event.preventDefault();

    addEnumVariant(newEnumVariant);
    setNewEnumVariant("");
  };

  const onDeleteVariant = (event, deletingEnumVariantName: string) => {
    event.preventDefault();
    deleteEnumVariant(deletingEnumVariantName);
  };

  const havingEnumVariants = enumVariants?.map((enumVariantName) => {
    return (
      <div key={nextId()}>
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
