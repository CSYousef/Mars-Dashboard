let store = Immutable.Map({
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    
});

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (oldstore, newState) => {
    store = store.set(oldstore,newState)
    console.log(store.get())
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    // ${ImageOfTheDay(store)}
    // let { rovers, apod } = state
    return `
        <header></header>
        <main>
        ${Greeting(state.get("user").name)}
            <section>
            <h3>Here are Photos from diffrent mars's rovers!</h3>
           
            <button onclick='getCuriosity(getImageOfTheDay)'> ${state.get("rovers")[0]} </button>
            <button onclick='getOpportunity(getImageOfTheDay)'> ${state.get("rovers")[1]} </button>
            <button onclick='getSpirit(getImageOfTheDay)'> ${state.get("rovers")[2]} </button>
            <br>
            ${getInfromations()()}
            </section>
        </main>
        <footer></footer>
    `
}


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

//HOF
function getInfromations(){
    return information;
}


function information(){
    apod = store.get("apod");

    return apod!=""?`
    <img src="${apod.imageObject.latest_photos[0].img_src}" height="350px" width="100%" />
    <p> Name of rover: ${apod.imageObject.latest_photos[0].rover.name}</p>
    <p> Launch date: ${apod.imageObject.latest_photos[0].rover.launch_date}</p>
    <p> Landing date: ${apod.imageObject.latest_photos[0].rover.landing_date}</p>
    <p> Date: ${apod.imageObject.latest_photos[0].earth_date}</p>
    <p> Status: ${apod.imageObject.latest_photos[0].rover.status}</p>

`: ""

}
//HOF
function getSpirit(s){

    s("Spirit")
}
//HOF
function getOpportunity(y){

    y("Opportunity")
}
//HOF
function getCuriosity(m){

    m("Curiosity")
}



// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// // // Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod , rover) => {
    
//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());

//     // console.log(store)
//     // if (!apod || apod.date === today.getDate() ) {
//         getImageOfTheDay(rover)
//     // }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         console.log(apod.get("apod"))
    
//     }
// }

// ------------------------------------------------------  API CALLS

// Example API call
// const getImageOfTheDay = (state) => {
//     let { apod } = state

//     fetch(`http://localhost:3000/apod`)
//         .then(res => res.json())
//         .then(apod => updateStore(store, { apod }))

//     return data
// }

const getImageOfTheDay = (x) => {
 
    fetch(`http://localhost:3000/rover/${x}`)
        .then(res => res.json())
        .then(apod => updateStore("apod",  apod ))

}