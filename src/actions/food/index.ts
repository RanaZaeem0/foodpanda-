

export default async function getResturent() {
    try {
        const res = await fetch("http://localhost:3000/api/restaurant")
        const allResturant = await res.json()
        return allResturant
    } catch (error) {
        console.log("error", error);

    }
}