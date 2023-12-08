const Table = ({ children, className, ...props }) => {
  return (
    <table
      {...props}
      className={`w-full border-collapse border rounded overflow-hidden ${className}`}
    >
      {children}
    </table>
  );
};

const Header = ({ children, ...props }) => {
  return (
    <thead {...props} className="bg-gray-200">
      {children}
    </thead>
  );
};

const Head = ({ children, ...props }) => {
  return (
    <th {...props} className="border border-gray-300 px-4 py-2">
      {children}
    </th>
  );
};

const Body = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>;
};

const Row = ({ children, ...props }) => {
  return <tr {...props}>{children}</tr>;
};

const Data = ({ children, ...props }) => {
  return <td {...props} className="border border-gray-300 px-4 py-2">{children}</td>;
};

Table.Header = Header;
Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Data = Data;

export default Table;
