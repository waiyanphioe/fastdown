import { useState } from "react";
import "./App.css";

const App = () => {
	const [isurl, setIsUrl] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const [isData, setIsData] = useState({});

	async function postData(api = "", data = {}) {
		const response = await fetch(api, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(data),
		});
		return response.json();
	}

	return (
		<div className="App">
			<div className="w-auto bg-white">
				<input
					type="text"
					placeholder="Enter Url"
					onChange={(e) => setIsUrl(e.target.value)}
					className="p-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					required
				/>
				<button
					onClick={() => {
						postData("https://ssyoutube.com/api/convert", {
							url: isurl,
						}).then((data) => {
							setIsLoaded(true);
							setIsData(data);
							console.log(data.url);
						});
					}}
					className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Download
				</button>
			</div>

			{isLoaded ? (
				<div className="">
					<div className="col-xs-12 col-sm-5 col-md-5">
						<img src={isData.thumb} alt="" />
						<h3>{isData.meta.title}</h3>
					</div>
					<div className="col-xs-12 col-sm-7 col-md-7">
						{isData.url.map((item) => {
							<div className="">
								<h3 className="">{item.attr.title}</h3>
							</div>;
						})}
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default App;
