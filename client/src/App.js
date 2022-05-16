import React, { useState, useEffect } from "react";
import ProjectsForm from "./components/ProjectForm";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import FilteredList from "./components/FilteredList";
import Header from "./components/Header";

function App() {
	const [projects, setProjects] = useState([]);
	const [showList, setShowList] = useState(false);
	const [filteredList, setFilteredList] = useState([]);

	useEffect(() => {
		fetch("/api/projects/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				setProjects(data);
			})
			.catch((error) => console.error(error));
	}, []);

	const toggleShowList = () => {
		setShowList(!showList);
	};

	const getFilteredList = () => {
		fetch("/api/students/filter")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFilteredList(data);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className="App ">
			<Header />
			<div className="flex gap-2 flex-col md:flex-row">
				<ContactForm />
				<ProjectsForm projects={projects} setProjects={setProjects} />
			</div>

			<Projects
				projects={projects}
				setProjects={setProjects}
				filteredList={filteredList}
			/>
			<button
				onClick={() => {
					toggleShowList();
					getFilteredList();
				}}
				className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Show All Assignments
			</button>
			{showList && <FilteredList filteredList={filteredList} />}
		</div>
	);
}

export default App;
