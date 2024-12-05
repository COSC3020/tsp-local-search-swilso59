function tsp_ls(distance_matrix) {
    // Handle edge cases
    if (!distance_matrix || distance_matrix.length === 0) {
        return 0; 
    }
    if (distance_matrix.length === 1) {
        return 0; 
    }
    if (distance_matrix.every(row => row.every(val => val === 0))) {
        return 0; 
    }

    // Create the initial ordered route
    const n = distance_matrix.length;
    let route = generateRandomRoute(n); 

    // Optimize the route using 2-opt
    const maxIterations = n * n; 
    const maxStagnation = Math.floor(maxIterations / 4); 
    const maxStagnationResets = 2; 

    let bestDistance = calculateDistance(route, distance_matrix);
    let stagnationCount = 0;
    let stagnationResetCount = 0;
    let iterations = 0;

    while (iterations < maxIterations && stagnationResetCount < maxStagnationResets) {
        let improvement = false;

        for (let i = 1; i < n - 1; i++) {
            for (let k = i + 1; k < n; k++) {
                const newRoute = twoOptSwap(route, i, k);
                const newDistance = calculateDistance(newRoute, distance_matrix);

                if (newDistance < bestDistance) {
                    route = newRoute;
                    bestDistance = newDistance;
                    improvement = true;
                }
            }
        }

        if (!improvement) {
            stagnationCount++;
            if (stagnationCount >= maxStagnation) {
                stagnationCount = 0;
                stagnationResetCount++;
                route = generateRandomRoute(n);
                bestDistance = calculateDistance(route, distance_matrix);
            }
        } else {
            stagnationCount = 0; 
        }

        iterations++;
    }

    return bestDistance;
}

// Generates a random initial route for the given number of cities
function generateRandomRoute(n) {
    let route = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [route[i], route[j]] = [route[j], route[i]];
    }
    return route;
}

// Calculates the total distance of the given route using the distance matrix
function calculateDistance(route, distance_matrix) {
    let totalDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
        const fromCity = route[i];
        const toCity = route[i + 1];
        totalDistance += distance_matrix[fromCity][toCity];
    }
    return totalDistance; 
}

// Performs a 2-opt swap on the route between indices i and k
function twoOptSwap(route, i, k) {
    const newRoute = [
        ...route.slice(0, i),
        ...route.slice(i, k + 1).reverse(),
        ...route.slice(k + 1)
    ];
    return newRoute;
}
