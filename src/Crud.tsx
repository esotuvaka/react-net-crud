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

			<div className="flex justify-between items-center mb-4">
				<div className="flex-grow mr-4">
					<input
						type="text"
						className="w-full rounded-md  border-gray-400 border py-2 px-3"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex-grow mr-4">
					<input
						type="text"
						className="w-full rounded-md border-gray-400 border py-2 px-3"
						placeholder="Enter age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
				</div>
				<div className="flex-grow mr-4">
					<input
						type="checkbox"
						checked={isActive === 1 ? true : false}
						onChange={(e) => handleActiveChange(e)}
						value={isActive}
						className="mr-2 leading-tight"
					/>
					<label className="text-sm">IsActive</label>
				</div>
				<div className="flex-grow">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => handleSubmit()}
					>
						Submit
					</button>
				</div>
			</div>
			<div className="table-responsive">
				<table className="table-fixed w-full">
					<thead>
						<tr>
							<th className="w-1/6">ID</th>
							<th className="w-2/6">Name</th>
							<th className="w-1/6">Age</th>
							<th className="w-1/6">isActive</th>
							<th className="w-1/6">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data && data.length > 0 ? (
							data.map((item, index) => {
								return (
									<tr key={index}>
										<td className="py-2 px-4">{item.id}</td>
										<td className="py-2 px-4">{item.name}</td>
										<td className="py-2 px-4">{item.age}</td>
										<td className="py-2 px-4">
											{item.isActive ? "Yes" : "No"}
										</td>
										<td className="py-2 px-4">
											<button
												className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
												onClick={() => handleEdit(item.id)}
											>
												Edit
											</button>
											<button
												className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
												onClick={() => handleDelete(item.id)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td className="py-2 px-4 col-span-5">Loading</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<div
				className={`fixed z-10 inset-0 overflow-y-auto ${show ? "" : "hidden"}`}
			>
				<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<div className="fixed inset-0 transition-opacity" aria-hidden="true">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>

					<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								Edit Account
							</h3>
							<div className="mt-2">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="editName"
											className="block text-sm font-medium text-gray-700"
										>
											Name
										</label>
										<input
											type="text"
											name="editName"
											id="editName"
											value={editName}
											onChange={(e) => setEditName(e.target.value)}
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											placeholder="Enter name"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="editAge"
											className="block text-sm font-medium text-gray-700"
										>
											Age
										</label>
										<input
											type="text"
											name="editAge"
											id="editAge"
											value={editAge}
											onChange={(e) => setEditAge(e.target.value)}
											className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
											placeholder="Enter age"
										/>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<div className="flex items-center">
											<input
												type="checkbox"
												name="editIsActive"
												id="editIsActive"
												checked={editIsActive === 1}
												onChange={(e) => handleEditActiveChange(e)}
												className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
											/>
											<label
												htmlFor="editIsActive"
												className="ml-2 block text-sm text-gray-900"
											>
												IsActive
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
							<button
								type="button"
								className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
								onClick={handleUpdate}
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default CRUD;
