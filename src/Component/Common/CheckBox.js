import { Fragment } from "react";

const CheckBox = ({ formik, checkBoxOptions, name }) => {
  return (
    <div className="listControl">
      {checkBoxOptions.map((item) => (
        <Fragment key={item.name}>
          <input
            type="checkbox"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          />
          <label htmlFor={item.value}>{item.name}</label>
        </Fragment>
      ))}
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default CheckBox;
