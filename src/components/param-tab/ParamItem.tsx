import { intStringParamStore } from "../../store/IntStringParamStore";
import styled from "styled-components";

const ParamItemElement = styled.div`
  .param-name,
  .param-type {
    font-weight: 700;
  }

  .param-value {
    &:first-child {
      margin-right: 10px;
    }
    span {
      font-weight: 700;
    }
  }
`;
const ParamItem = ({ name, type, paramId, minValue, maxValue }) => {
  const onDeleteParam = (event) => {
    event.preventDefault();
    intStringParamStore.deleteParam(paramId);
  };

  return (
    <ParamItemElement>
      <div>
        Name: <span className="param-name">{name}</span>
      </div>
      <div>
        Type: <span className="param-type">{type}</span>
      </div>
      <div>
        <span className="param-value">
          MinValue: <span>{minValue}</span>
        </span>
        <span className="param-value">
          MaxValue: <span>{maxValue}</span>
        </span>
      </div>
      <button className="btn btn-blue" onClick={onDeleteParam}>
        - DELETE PARAM
      </button>
    </ParamItemElement>
  );
};

export default ParamItem;
