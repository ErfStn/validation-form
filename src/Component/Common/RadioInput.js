import { Fragment } from "react";

const RadioInput = ({ formik, radioOptions,name }) => {
  return (
    <div className="listControl">
      {radioOptions.map((item) => (
        <Fragment key={item.name}>
          <input
            type="radio"
            id={item.value}
            name="gender"
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
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

export default RadioInput;
