
const SelectOption = ({ formik, selectOptions, name }) => {
  return (
    <div className="formControl">
      <select {...formik.getFieldProps({ name })}>
        {selectOptions.map((item) => (
          <option key={item.value} value={item.value}>{item.name}</option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectOption;
