# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## Answer 

- Edge cases:
  - Checks if the matrix is empty or of size 1.
    - These are constant time checks $O(1)$.
  - Checking if all distances in the matrix are 0.
    - Iterates over all rows and in each row iterates over $n$ elements.
      - This takes exponential time $O(n^{2})$.
- Generate initial random route:
  - Creates initial array of size $n$.
    - This is linear time $O(n)$.
  - Randomizing the route iterates $n$ times performing constant time swaps.
    - This is linear $O(n)$.
- Route optimization (2-opt):
  - Outer while loop at most iterates in exponential time
    - $O(n^{2})$
    - Nested for loops
      - The outer loop runs $n$ times for $i$.
      - The inner loop runs $n - i$ times which is about $n$ times for $k$
        - This gives us exponential time complexity $O(n^{2})$ per while loop iteration.
        - work done in nested loops
          - 2-opt swap
            - Uses operations that take linear time since the size of the reversed section is $k - i$.
              - $O(n)$
            - Calculating the distance of the new route.
              - iterates over the route and sums up the distance between cities.
              - $O(n)$
  - Total work per `while` loop iteration.
    - $O(n^{2}) \times O(n) = O(n^{3})$
  - Restart on stagnation
    - Generates a new route and recalculates it's distance.
    - $O(n)$

In our overall time complexity the edge case handling is $O(n^{2})$, but this is overshadowed by the route optimization.
The main bottle neck is the nested loops. The route randomization is linear which does not significantly affect the worst-case time complexity. 
During route optimization, the outer `while` loop iterates up to $O(n^2)$ times in the worst-case. Inside each `while` loop iteration, the nested `for` loops evaluate $O(n)$ combinations of indices $i$ and $k$. With each combination performing a 2-opt swap and distance calculation both requiring $O(n)$ work. Giving us $O(n^{3})$ work per `while` loop iteration. Restarting on stagnation involves generating a new random route and recalculating its distance which adds $O(n)$ complexity. Combining these factors the total worst-case time complexity is dominated by the route optimization resulting in  $\Theta(n^{2}) \times \Theta(n^{3}) = \Theta(n^{5})$. 

The worst- case memory complexity is dominated by the input distance matrix which stores $n^{2}$ entries. Even though our algorithm creates new arrays during each 2-opt swap operation. Only one array exists at a time. 

## Plagiarism Acknowledgement 
Starting with the provided pseudocode I focused on setting up the 2opt swap function. For the stopping criteria I explored various options these included using a constant iteration limit, checking for continuous improvement, using a dynamic value that grows with the size of the route, and stagnation where the loop is ended if the stagnation threshold is reached. Ultimately, after looking at two other repositories I decided to choose a combination of stagnation resets and a dynamic iteration limit proportional to the size of the distance matrix. The idea was to ensure a balance between solution quality and efficiency.

- https://github.com/COSC3020/tsp-local-search-Dhruv8806
- https://github.com/COSC3020/tsp-local-search-DJReflexive

“I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.”

























