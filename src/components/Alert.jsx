import React from "react";

const Alert = ({ msg, type, data, removeAlert }) => {
  const style = {
    color: type === "success" ? "rgb(103, 197, 221)" : "rgb(170, 36, 36)",
  };

  React.useEffect(() => {
   const timeout = setTimeout(() => {
      removeAlert(false, "", "");
    }, 3000);

    return () => {
      clearTimeout(timeout)
    };
  }, [data]);

  return (
    <div className="alert">
      <p style={style}>{msg}</p>
    </div>
  );
};

export default Alert;
