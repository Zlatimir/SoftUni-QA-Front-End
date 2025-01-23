async function fetchDataWithErrorHandling() {
    const response = await fetch('https://swapi.dev/api/peole/1');
    try{
        if (!response.ok) {
            throw new Error(`HTTP error! with status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
        
}

fetchDataWithErrorHandling();