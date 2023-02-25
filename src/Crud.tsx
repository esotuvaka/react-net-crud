import { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
	type TData = {
		id: number;
		name: string;
		age: number;
		isActive: number;
	};

	const empdata: TData[] = [
		{
			id: 1,
			name: "Eric",
			age: 22,
			isActive: 1,
		},
		{
			id: 2,
			name: "Bob",
			age: 37,
			isActive: 0,
		},
		{
			id: 3,
			name: "Simon",
			age: 29,
			isActive: 1,
		},
	];

	const [data, setData] = useState(empdata);

	const [show, setShow] = useState(false);

	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [isActive, setIsActive] = useState(0);

	const [editID, setEditID] = useState(0);
	const [editName, setEditName] = useState("");
	const [editAge, setEditAge] = useState("");
	const [editIsActive, setEditIsActive] = useState(0);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getData = () => {
		axios
			.get("https://localhost:7143/api/Account")
			.then((result) => {
				setData(result.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setIsActive(1);
		} else {
			setIsActive(0);
		}
	};

	const handleEditActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setEditIsActive(1);
		} else {
			setEditIsActive(0);
		}
	};

	const handleEdit = (id: number) => {
		//alert(id);
		handleShow();
		axios
			.get(`https://localhost:7143/api/Account/${id}`)
			.then((result) => {
				setEditName(result.data.name);
				setEditAge(result.data.age);
				setEditIsActive(result.data.isActive);
				setEditID(id);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleDelete = (id: number) => {
		if (
			window.confirm("Are you sure you want to delete this account?") === true
		) {
			axios
				.delete(`https://localhost:7143/api/Account/${id}`)
				.then((result) => {
					if (result.status === 200) {
						toast.success("Account has been deleted");
						getData();
					}
				})
				.catch((error) => {
					toast.error(error);
				});
		}
	};

	const handleUpdate = () => {
		const url = `https://localhost:7143/api/Account/${editID}`;
		const data = {
			"id": editID,
			"name": editName,
			"age": editAge,
			"isActive": editIsActive,
		};

		axios
			.put(url, data)
			.then((result) => {
				handleClose();
				getData();
				clear();
				toast.success("Employee has been updated");
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const handleSubmit = () => {
		const url = "https://localhost:7143/api/Account";
		const data = {
			"name": name,
			"age": age,
			"isActive": isActive,
		};

		console.log(name, age, isActive);

		axios
			.post(url, data)
			.then((result) => {
				getData();
				clear();
				toast.success("Account has been added");
			})
			.catch((error) => {
				toast.error(error);
			});
	};

	const clear = () => {
		setName("");
		setAge("");
		setIsActive(0);

		setEditName("");
		setEditAge("");
		setEditIsActive(0);
		setEditID(0);
	};

	return (
		<Fragment>
			<ToastContainer />
			<Container>
				<Row>
					<Col>
						<input
							type="text"
							className="form-control"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Col>
					<Col>
						<input
							type="text"
							className="form-control"
							placeholder="Enter age"
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
					</Col>
					<Col>
						<input
							type="checkbox"
							checked={isActive === 1 ? true : false}
							onChange={(e) => handleActiveChange(e)}
							value={isActive}
						/>
						<label>IsActive</label>
					</Col>
					<Col>
						<button className="btn btn-primary" onClick={() => handleSubmit()}>
							Submit
						</button>
					</Col>
				</Row>
			</Container>
			<br />
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>ID</th>
						<th colSpan={2}>Name</th>
						<th>Age</th>
						<th>isActive</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data && data.length > 0
						? data.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.id}</td>
										<td colSpan={2}>{item.name}</td>
										<td>{item.age}</td>
										{item.isActive ? <td>Yes</td> : <td>No</td>}
										<td colSpan={2}>
											<button
												className="btn btn-primary"
												onClick={() => handleEdit(item.id)}
											>
												Edit
											</button>{" "}
											&nbsp;
											<button
												className="btn btn-danger"
												onClick={() => handleDelete(item.id)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
						  })
						: "Loading"}
				</tbody>
			</Table>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Account</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
							<input
								type="text"
								className="form-control"
								placeholder="Enter name"
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
							/>
						</Col>
						<Col>
							<input
								type="text"
								className="form-control"
								placeholder="Enter age"
								value={editAge}
								onChange={(e) => setEditAge(e.target.value)}
							/>
						</Col>
						<Col>
							<input
								type="checkbox"
								checked={isActive === 1 ? true : false}
								onChange={(e) => handleEditActiveChange(e)}
								value={editIsActive}
							/>
							<label>IsActive</label>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleUpdate}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};

export default CRUD;
