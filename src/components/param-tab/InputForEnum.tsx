import React, { useState } from "react";
import nextId from "react-id-generator";
import styled from "styled-components";

const InputForEnumElement = styled.div`
  margin-top: 10px;

  .add-btn {
    margin-top: 10px;
    width: 300px;
  }
`;

const EnumVariant = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  .text {
    flex: 2;
    span {
      font-weight: 700;
    }
  }

  .btn {
    flex: 1.5;
  }
`;

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
      <EnumVariant key={nextId()}>
        <div className="text">
          Enum variant: <span>{enumVariantName}</span>
        </div>
        <button
          className="btn btn-blue"
          onClick={(event) => onDeleteVariant(event, enumVariantName)}
        >
          + DELETE THIS VARIANT
        </button>
      </EnumVariant>
    );
  });

  const onEnumVariantChange = (event) => {
    setNewEnumVariant(event.target.value);
  };

  return (
    <InputForEnumElement>
      {havingEnumVariants}
      <input
        type="text"
        className="form-control user-input"
        value={newEnumVariant || ""}
        onChange={onEnumVariantChange}
        placeholder="Type new enum variant here"
      />
      <button className="btn btn-blue add-btn" onClick={onAddVariant}>
        + ADD VARIANT
      </button>
    </InputForEnumElement>
  );
};

export default InputForEnum;
