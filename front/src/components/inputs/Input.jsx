
export function Input({
  label,
  type = "text",
  placeholder,
  value,
  setValue,
}) {
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className={"form-group"}>
            <label>{label}</label>
            <div className="mb-3">
                <input type={type}
                       className="form-control"
                       placeholder={placeholder}
                       value={value}
                       onChange={handleChange}
                />
            </div>
        </div>
    )
}