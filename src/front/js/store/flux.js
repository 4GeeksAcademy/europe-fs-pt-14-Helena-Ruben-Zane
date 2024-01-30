const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

		},
		actions: {

			signupNewUser: async (formSignup) => {
				const url = process.env.BACKEND_URL;
				const signupRequirement = "/api/signup"
				try {

					const response = await fetch(url + signupRequirement, {
						method: "POST",
						body: JSON.stringify(formSignup),
						headers: {
							'Content-type': 'application/json'
						},
					})

					if (response.ok) {
						const jsonResponse = await response.json()
						console.log(jsonResponse)
						const store = getStore()
						setStore({ ...store, messageToShowAlert: jsonResponse })
					}

					else {
						const jsonResponse = await response.json()
						console.log(jsonResponse)

					}

				}

				catch (e) {

					console.log("An error has occured", e)

				}
			},

			loginUserExisting: async ({ email, password }) => {
				const url = process.env.BACKEND_URL;
				const loginRequirement = "/api/login"
				try {
					const response = await fetch(url + loginRequirement, {
						method: 'POST',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify({
							email,
							password
						})
					});

					if (response.status !== 200) return false

					const jsonResponse = await response.json()

					if (jsonResponse["token"]) {
						localStorage.setItem("userToken", jsonResponse["token"])
						return true;

					}
					return false;

				}

				catch (e) {
					console.log("An error was occurred, check it out!", e)
				}
			},

			getInformationOfToken: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";

				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`
						}
					});

					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}

					const jsonResponse = await response.json();

					return jsonResponse;

				} catch (error) {
					console.error("An error occurred: ", error);
				}
			},

			start_time: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";

				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							start_time: new Date().toISOString(),
						})
					});

					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}

					const data = await response.json();
					console.log(data);
				} catch (error) {
					console.error(error);
				}
			},

			finish_time: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";

				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							finish_time: new Date().toISOString(),
						})
					})

					const jsonResponse = await response.json();
					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}
					return jsonResponse;

				}

				catch (error) {
					console.error("An error occurred: ", error);
				}
			}, 
			
			set_location: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";
			  
				try {
				  const response = await fetch(url + tokenRequirement, {
					method: 'POST',
					headers: {
					  'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({
					  setLocation: {
						latitude: newLocation.latitude,
						longitude: newLocation.longitude,
						timestamp: new Date().toISOString(),
					  }
					})
				  });
			  
				  const jsonResponse = await response.json();
			  
				  if (response.status !== 200) {
					throw new Error(`Error: ${response.status}`);
				  }
			  
				  return jsonResponse;
				} catch (error) {
				  console.error("An error occurred: ", error);
				}
			  
			},
			
			set_liters: async () => {
				const url = process.env.BACKEND_URL;
				const tokenRequirement = "/api/userdata";
			  
				try {
				  const response = await fetch(url + tokenRequirement, {
					method: 'POST',
					headers: {
					  'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({
					  setLiters: value
					})
				  });
			  
				  const jsonResponse = await response.json();
			  
				  if (response.status !== 200) {
					throw new Error(`Error: ${response.status}`);
				  }
			  
				  return jsonResponse;
				} catch (error) {
				  console.error("An error occurred: ", error);
				}
			  
			}

		

		}
	}
}

	export default getState;