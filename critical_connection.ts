function criticalConnections(n: number, connections: number[][]): number[][] {
  // Create adjacency list
  const graph: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const discoveryTime = Array(n).fill(-1); // Discovery time of each node
  const lowTime = Array(n).fill(-1); // Lowest discovery time reachable
  const visited = new Set<number>();
  const result: number[][] = []; // To store critical connections
  let time = 0; // Timestamp

  function dfs(node: number, parent: number) {
    discoveryTime[node] = lowTime[node] = time++;
    visited.add(node);

    for (const neighbor of graph[node]) {
      if (neighbor === parent) continue; // Skip the parent node

      if (!visited.has(neighbor)) {
        dfs(neighbor, node);
        lowTime[node] = Math.min(lowTime[node], lowTime[neighbor]);

        // Check if the edge is a critical connection (bridge)
        if (lowTime[neighbor] > discoveryTime[node]) {
          result.push([node, neighbor]);
        }
      } else {
        // Update lowTime if the neighbor is already visited
        lowTime[node] = Math.min(lowTime[node], discoveryTime[neighbor]);
      }
    }
  }

  // Start DFS from node 0
  dfs(0, -1);

  return result;
}

describe("1192. Critical Connections in a Network", () => {
  it("Happy Path - 01", () => {
    expect(
      criticalConnections(4, [
        [0, 1],
        [1, 2],
        [2, 0],
        [1, 3],
      ])
    ).toEqual([[1, 3]]);
  });
});
