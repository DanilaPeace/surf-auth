import { enumStore } from "../../store/EnumStore";
import nextId from "react-id-generator";

const EnumItem = ({ name, type, enumId, enumVariants }) => {
  const onDeleteParam = (event) => {
    event.preventDefault();
    enumStore.deleteEnum(enumId);
  };

  const possibleValues = enumVariants?.map((variant) => (
    <span key={nextId()}>{variant} </span>
  ));

  return (
    <div>
      <div>
        Name: <span className="param-name">{name}</span>
      </div>
      <div>
        Type: <span className="param-type">{type}</span>
      </div>
      <div>
        Possible Values: <span className="param-type">[{possibleValues}]</span>
      </div>
      <button className="btn btn-blue" onClick={onDeleteParam}>
        - DELETE PARAM
      </button>
    </div>
  );
};

export default EnumItem;
