// LightSwitch component using useReducer to toggle light on and off
import React, { useReducer } from "react";
import Button from "react-bootstrap/Button";

// Giá trị khởi tạo
const initialState = { isLightOn: false };

// Hàm reducer xử lý action
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { isLightOn: !state.isLightOn };
    default:
      return state;
  }
}

function LightSwitch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const buttonStyle = {
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>Công Tắc Đèn</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        Đèn hiện đang: {state.isLightOn ? "Bật" : "Tắt"}
      </p>
      <Button
        onClick={() => dispatch({ type: "TOGGLE" })}
        style={{
          ...buttonStyle,
          background: state.isLightOn ? "red" : "green",
          color: "white",
        }}
      >
        {state.isLightOn ? "Tắt Đèn" : "Bật Đèn"}
      </Button>
    </div>
  );
}

export default LightSwitch;
