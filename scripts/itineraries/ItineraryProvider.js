import { zero, clear } from  "../utils.js"

const eventHub = document.querySelector(".main")
let itineraries = []
const url = "http://localhost:8087/itineraries"

const dispatchStateChangeEvent = () => {
    const e = new CustomEvent("itinerariesStateChanged")
    eventHub.dispatchEvent(e)
}

export const saveItinerary = (i) => {
    const json = JSON.stringify(i)

    return fetch(`${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: json
    })
    .then(getItineraries)
    .then(resetItineraryPreview)
    .then(dispatchStateChangeEvent)
}

export const useItineraries = () => itineraries.slice()

export const getItineraries = () => fetch(`${url}`)
.then(res => res.json())
.then(data => itineraries = data)


const resetItineraryPreview = () => {
    zero("eatery")
    zero("biz")
    zero("park")
    clear("eatery")
    clear("biz")
    clear("nat-park")
    clear("forecast")
}
