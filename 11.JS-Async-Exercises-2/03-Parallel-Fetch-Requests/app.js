async function fetchParallel() {
    const [response1, response2] = await Promise.all([
        fetch('https://swapi.dev/api/people/1'),
        fetch('https://swapi.dev/api/people/2')
    ]);
    const data1 = await response1.json();
    const data2 = await response2.json();
    console.log(data1);
    console.log(data2);
}

fetchParallel();