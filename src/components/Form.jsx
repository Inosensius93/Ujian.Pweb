const Form = ({ children, ...props }) => {
  return (
    <form {...props} className="my-4">
      {children}
    </form>
  );
};

const FieldSet = ({ children, ...props }) => {
  return (
    <fieldset {...props} className="grid gap-4">
      {children}
    </fieldset>
  );
};

const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="block w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
    />
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
    >
      {children}
    </button>
  );
};

Form.FieldSet = FieldSet;
Form.Input = Input;
Form.Button = Button;

export default Form;
