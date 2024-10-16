function Button({
  text,
  color,
  bootstrap,
  onclickHandler,
  type,
  link,
  width,
  height,
  form,
}) {
  return (
    <button
      className={bootstrap}
      style={{ backgroundColor: color, width: width }}
      type={type}
      onClick={onclickHandler}
      form={form}
    >
      {text}
    </button>
  );
}

export default Button;
