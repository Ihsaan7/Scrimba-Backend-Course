// // ─── CHALLENGE TEMPLATE ───
// const receivedJson = '{"name": "Alex", "role": "Student", "skills": ["HTML", "CSS"]}';

// // // Step 1: Parse the string into an object
// let userObj = JSON.parse(receivedJson);

// // // Step 2: Add the "status" property with the value "learning"
// userObj.status = "learning";
// // // Step 3: Convert the object back into a JSON string
// const updatedJson = JSON.stringify(userObj)

// console.log(updatedJson);

//------------- TASK 2 ------------------
// Write an async function called fetchPokemon that accepts a pokemonName string parameter
// async function fetchPokemon (pokemonName)
// {
//     const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//     const data = await response.json();

//     console.log(data.name , data.id)
// }
// fetchPokemon("pikachu")
// Inside the function, use await fetch() to make a request to the PokéAPI
// .
// Endpoint URL: https://pokeapi.co/api/v2/pokemon/ followed by the pokemon's name
// .
// Parse the response into a JavaScript object using await response.json()
// .
// Log the Pokemon's name and its id to the console.
// Call your function, passing "pikachu" as the argument

// ─── CHALLENGE TEMPLATE ───

// Step 1: Declare your async function
// async function fetchPokemon(pokemonName) {
// Step 2 & 3: Fetch and parse the data

// Step 4: Log the name and id properties from the returned object

// }

// Step 5: Call the function with "pikachu"
// fetchPokemon("pikachu");

// -------------- TASK 3 --------------------------
// 🧠 Your Topic 3 Challenge: Bulletproof Fetch!
// Let's upgrade your previous fetching skills. Try writing a protected fetch function.
// Your Mission:
// Create an async function called fetchUserData(username).
// Wrap the logic inside a try...catch block.
// Use fetch to get data from this URL: https://jsonplaceholder.typicode.com/users/ followed by a user ID (e.g., a number from 1 to 10).
// Add an if check: if response.ok is false, throw a new Error with the message "User ID does not exist!".
// If it is successful, parse the JSON and log the user's name and email.
// In your catch block, log the error's message.
// Test it twice: call it once with a valid ID (like 3), and once with an invalid ID (like 99).

// async function fetchUserData(username)
// {
//     try
//     {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${username}`)
//         if(!response.ok)
//             {
//                 throw new Error(`User ID does not exist!: ${response.status}`)
//             }
//         const data = await response.json();
//         console.log(`Username: ${data.username}` , `Email: ${data.email}`)
//     }catch(err)
//     {
//         console.log(`Internal server error: ${err}`)
//     }
// }

// fetchUserData(1)

// ------------------- TASK 4 ---------------------
// Your Mission:
// Create an async function called registerUser(newUserObj).
// Inside, use await fetch() to send a POST request to the JSONPlaceholder users endpoint: https://jsonplaceholder.typicode.com/users
// Provide the options object inside your fetch call:
// Set the method to "POST".
// Set the headers to have "Content-Type": "application/json".
// Set the body to be newUserObj converted into a JSON string using JSON.stringify().
// Parse the response back into an object using await response.json().
// Log a success message showing the returned data.
// Test it by calling registerUser(myDetails) using the template below.
// // ─── CHALLENGE TEMPLATE ───

// const myDetails = {
//     name: "Alex",
//     username: "alex_coder",
//     email: "Alex@Mail.com"
// }

// async function registerUser(newUserObj)
// {
//     try
//     {
//         const response = await fetch("https://jsonplaceholder.typicode.com/users",
//             {
//                 method: "POST",
//                 header:{ "Content-type":"application/json"},
//                 body: JSON.stringify(newUserObj)
//             })
//         if(!response.ok)
//             {
//                 throw new Error(`Error with Code: ${response.status}`)
//             }

//         const data = await response.json()
//         console.log("Data created successfully:", data)
//     }catch(err)
//     {
//         console.log("Error while fetching",err)
//     }
// }
// registerUser(myDetails)

// --------------- TASK 5 - MAJOR ---------------
// Your Objective:
// Create a script that fetches a developer's profile from the official GitHub API and displays their info.
// Requirements:
// Create an async function called getGithubProfile(username).
// Use a try...catch block.
// Use fetch() to call the GitHub API: https://api.github.com/users/ followed by the username.
// Add a check: If the user doesn't exist (GitHub returns a 404), throw an error saying "This GitHub user does not exist!".
// If successful, parse the JSON and log a clean dashboard using template literals:
// Show their Name (data.name)
// Show their Bio (data.bio — note that some users have a null bio, so handle that gracefully!)
// Show their Public Repos count (data.public_repos)
// Show their Followers count (data.followers)
// Test your function with your own GitHub username (or use mine: "octocat").

// async function getGithubProfile(username)
// {
//     try{
//         const response = await fetch(`https://api.github.com/users/${username}`)
//         if(response.status === 404)
//             {
//                 throw new Error("This github user does not exist!")
//             }
//         const data =await response.json();
//         if(data.bio === null)
//             {
//                 console.log(`Name: ${data.name}`)
//                 console.log("No Bio for this user!")
//                 console.log(`P-Repos: ${data.public_repos}`)
//                 console.log(`Followers_Count: ${data.followers}`)
//             }
//         else
//             {
//                 console.log(`Name: ${data.name}`)
//                 console.log(`Bio: ${data.bio}`)
//                 console.log(`P-Repos: ${data.public_repos}`)
//                 console.log(`Followers_Count: ${data.followers}`)

//             }
//     }catch(err)
//     {
//         console.log("Something went wrong: " , err)
//     }
// }

// getGithubProfile("octocat")

// ------------------ TASK 6 ----------------------
// 🧠 Your Concurrency Challenge:
// Create an async function called getCompleteDevData(username).
// Inside, use Promise.all() to trigger two fetch requests at the same time:
// Request 1 (Profile): https://api.github.com/users/${username}
// Request 2 (Repos): https://api.github.com/users/${username}/repos
// Check if both responses are ok. If not, throw an error.
// Use Promise.all() a second time to parse both raw responses into JSON in parallel.
// Log the user's name and the number of repositories they have (hint: the repos endpoint returns an array, so you can check .length).

// async function getCompleteDevData(username) {
//     const [ profileResponse , reposResponse] = await Promise.all(
//         [
//             fetch(`https://api.github.com/users/${username}`),
//             fetch(`https://api.github.com/users/${username}/repos`)
//         ])
//     if(!profileResponse.ok || !reposResponse.ok)
//         {
//             throw new Error("Error while fetching!!!")
//         }
//     const [profileData , reposData] = await Promise.all(
//         [
//             profileResponse.json(),
//             reposResponse.json()
//         ])

//     console.log(`Name: ${profileData.name}`)
//     console.log(`Repos: ${reposData.length}`)
// }

// getCompleteDevData("octocat")

// ======== TASK 7 ===================
// 🧠 Your Promise Constructor Challenge!
// Let's test this out with a real-world backend scenario: simulating a bank transaction delay.
// Your Mission:
// Create a function called processPayment(amount).
// Inside, return a new Promise((resolve, reject) => { ... }).
// Inside the Promise, use setTimeout to wait for 1.5 seconds (1500 milliseconds) to simulate talking to the bank.
// If the amount is greater than 0, call resolve("Payment approved! 💰").
// If the amount is 0 or less, call reject("Invalid payment amount! ❌").
// Write an async wrapper function to test your processPayment function with both a positive number and a negative/zero number.

// function processPayment(amount)
// {
//     return new Promise((resolve , reject)=>
//         {
//             setTimeout(()=>
//                 {
//                     if(amount > 0){ resolve("Payment approved!")}
//                     else{reject("Invalid payment amount!")}
//                 },1500)
//         })
// }

// async function paymentCheck(amount) {
//     try
//     {
//         console.log("Payment in process..");
//         const result = await processPayment(amount);
//         console.log(result)
//     }catch(err)
//     {
//         console.log("Error while processing payment:", err)
//     }
// }
// paymentCheck(-0);

// =============== TASK 8 ==================
// 🧠 Your Topic 5 Challenge: Escaping Callback Hell!
// Let's practice refactoring. Below is some messy, deeply nested asynchronous callback code.
// Your Mission: Convert this nesting nightmare into a clean, modern async/await function called deliverPackageWorkflow().
// Assume that the functions findDriver(), assignPackage(driver), and calculateRoute(package) all return modern Promises (meaning they are "awaitable").
// Messy Code to Refactor:
// // Nested callbacks
// findDriver("Express_Cargo", (driver) => {
//     assignPackage(driver, (packageInfo) => {
//         calculateRoute(packageInfo, (route) => {
//             console.log(`Package is on route: ${route}`);
//         });
//     });
// });

// async function deliverPackageWorkflow() {
//   try {
//     const driver = await findDriver("Express_Cargo");
//     const packageInfo = await assignPackage(driver);
//     const route = await calculateRoute(packageInfo);

//     console.log(route);
//   } catch (err) {
//     console.log("Error!: ", err);
//   }
// }

// deliverPackageWorkflow();


// ===================== TASK 9 ======================

// function loadImage(url)
// {
//     return new Promise((res , rej)=>
//         {
//             const img = new Image()
//             img.src = url;
//             img.onload = () => res(img)
//             img.onerror=()=>rej(new Error("Could not load image at url: ", url))
//         })
// }

// async function displayAvatar() {
//     try
//     {
//         console.log("Preloading avatar image...")
//         const avatarUrl = "https://picsum.photos/200"; 

//         const loadedImage = await loadImage(avatarUrl)
//         console.log("Success! Image is fully loaded and ready to use.")
//     }catch(err)
//     {
//         console.log("Failed to preload image:", err.message)
//     }
// }

// displayAvatar()


// ================== FINAL TASK ==================

// function loadImage(url)
// {
//     const img = new Image()
//     img.src = url

//     img.onload=()=>{ res(img1)}
//     img.onerror=()=>{ rej(`Error while processing image url: ${url}`)}
// }

// async function runDevTracker(username) {
//     try
//     {
//         console.log(`🔍 Searching GitHub for developer: "${username}"...`);
//         const [profileResponse , repoResponse] = await Promise.all(
//             [
//                 fetch(`https://api.github.com/users/${username}`),
//                 fetch(`https://api.github.com/users/${username}/repos`)
//             ])
//         if(!profileResponse.ok || !repoResponse.ok)
//             {
//                 throw new Error("Erorr while fetching one or both profiles")
//             }
//         const [profileData , repoData ] = await Promise.all(
//             [
//                 profileResponse.json(),
//                 repoResponse.json()
//             ])

//         console.log("🖼️ Pre-loading developer avatar in the background...");
//         const avatarUrl = profileData.avatar_url;
//         const loadedImage = loadImage(avatarUrl)
        
//          console.log(`\n=== DEVELOPER DASHBOARD: ${username.toUpperCase()} ===`);
//         console.log(
//             `Name: ${profileData.name}` , 
//             `Bio: ${profileData.bio ? profileData.bio :"No bio for this profile" }`
//             `Repo-Count: ${repoData.lenght}`,
//             `Followers: ${profileData.followers}`,
//             `Avatar URL: ${profileData.avatar_url}`
//         )
//         console.log("==================================================\n");
//     }catch(err)
//     {
//         console.log(`❌ Tracker Error: ${err.message}`);
//     }
// }

// runDevTracker("octocat");