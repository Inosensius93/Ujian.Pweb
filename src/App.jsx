import Table from "./components/Table";
import Form from "./components/Form";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name && age && email) {
      const newData = { name, age, email };
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          body: JSON.stringify(newData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to add user.");
        }
        const userData = await response.json();
        setData([...data, userData]);
        setName("");
        setAge("");
        setEmail("");
      } catch (error) {
        console.log("Error adding user: " + error);
      }
    } else {
      console.log("Please fill all fields.");
    }
  };

  const handleUpdate = async (userId, newName, newAge, newEmail) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ name: newName, age: newAge, email: newEmail }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update user.");
      }
      const updatedUserData = await response.json();
      const updatedData = data.map((user) =>
        user.id === userId ? { ...user, name: updatedUserData.name, age: updatedUserData.age, email: updatedUserData.email } : user
      );
      setData(updatedData);
    } catch (error) {
      console.log("Error updating user: " + error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
      const deletedUserData = await response.json();
      const updatedData = data.filter((user) => user.id !== userId);
      setData(updatedData);
    } catch (error) {
      console.log("Error deleting user: " + error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Form onSubmit={handleSubmit}>
        <Form.FieldSet>
          <Form.Input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <Form.Input
            type="number"
            value={age}
            onChange={handleAgeChange}
            placeholder="Age"
          />
          <Form.Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </Form.FieldSet>
        <Form.Button type="submit">Add User</Form.Button>
      </Form>

      <Table className="mt-8">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Age</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head>Update</Table.Head>
            <Table.Head>Delete</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((user, index) => (
            <Table.Row key={index}>
              <Table.Data>{user.name}</Table.Data>
              <Table.Data>{user.age}</Table.Data>
              <Table.Data>{user.email}</Table.Data>
              <Table.Data>
                <button onClick={() => handleUpdate(user.id, "New Name", 30, "newemail@example.com")}>
                  Update
                </button>
              </Table.Data>
              <Table.Data>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </Table.Data>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default App;
