function Terms(props) {
  return (
    <div className="listControl">
      <input
        type="checkbox"
        id="terms"
        name="terms"
        value={true}
        onChange={props.handleChange}
        checked={props.terms}
      />
      <label htmlFor="terms">Terms and conditional</label>
      {props.errors.terms && props._terms && (
        <div className="error">{props.errors.terms}</div>
      )}
    </div>
  );
}

export default Terms;
