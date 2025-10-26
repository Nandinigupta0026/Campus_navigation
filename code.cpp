#include <bits/stdc++.h>
using namespace std;

const int n = 15; // number of vertices
const int inf = 1e9;
int adj[n][n]; // adjacency matrix

struct edge {
    int u, v, w, s;
};

// Location names
string locations[n] = {
    "GJCH", "Main gate", "Admin block", "Central avenue - first right",
    "Central avenue - second right", "Central avenue - third right", "MIG",
    "Orion", "Logos", "EEE Dept", "MME Dept", "Library",
    "Central avenue - first left", "CSE Dept", "Anjappar"
};

// Initialize adjacency matrix
void matrix() {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            adj[i][j] = (i == j) ? 0 : inf;

    edge edges[] = {
        {1, 2, 98,0}, {2, 3, 125,1}, {3, 4, 140,1}, {4, 5, 92,1}, {5, 6, 55,0},
        {6, 7, 132,0}, {7, 8, 447,0}, {8, 9, 370,1}, {9, 10, 125,0}, {10, 11, 250,0},
        {2, 12, 93,0}, {3, 7, 207,0}, {4, 7, 140,0}, {9, 12, 55,1}, {12, 8, 320,0},
        {7, 0, 300,0}, {8, 0, 294,0}, {14, 0, 700,1}, {8, 14, 600,1}, {8, 13, 590,0},
        {11, 13, 250,0}, {13, 14, 140,0}, {8, 10, 440,1}
    };
    for (auto e : edges) {
        adj[e.u][e.v] = e.w + e.s*300;
        adj[e.v][e.u] = e.w - e.s*300;
    }
}

// Get node number from location name
int getNode(string s) {
    for (int i = 0; i < n; i++) {
        if (locations[i] == s)
            return i;
    }
    return -1;
}

// Dijkstra shortest path
string dijkstra(int src, int dest) {
    vector<int> P, T;
    int dist[n], parent[n];
    for (int i = 0; i < n; i++) {
        dist[i] = inf;
        parent[i] = -1;
        if (i != src) T.push_back(i);
    }
    dist[src] = 0;
    P.push_back(src);

    while (P.back() != dest) {
        int last = P.back();
        for (int v : T) {
            if (adj[last][v] != inf) {
                int newDist = dist[last] + adj[last][v];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    parent[v] = last;
                }
            }
        }
        int minDist = inf, minNode = -1;
        for (int v : T) {
            if (dist[v] < minDist) {
                minDist = dist[v];
                minNode = v;
            }
        }
        if (minNode == -1) break; // unreachable
        P.push_back(minNode);
        T.erase(remove(T.begin(), T.end(), minNode), T.end());
    }

    if (dist[dest] == inf) {
        return "{\"error\":\"No path exists\"}";
    }

    vector<int> path;
    for (int v = dest; v != -1; v = parent[v]) path.push_back(v);
    reverse(path.begin(), path.end());

    stringstream ss;
    ss << "{\"path\":[";
    for (int i = 0; i < path.size(); i++) {
        ss << "\"" << locations[path[i]] << "\"";
        if (i != path.size()-1) ss << ",";
    }
    ss << "],\"totalDist\":" << dist[dest] << "}";
    return ss.str();
}

// Prim MST
string prim() {
    vector<int> P, T;
    int parent[n];
    P.push_back(1);
    for (int i = 0; i < n; i++) {
        if (i != 1) T.push_back(i);
        parent[i] = -1;
    }

    while (!T.empty()) {
        int minVal = inf, minNode = -1;
        for (int node : P) {
            for (int i : T) {
                if (adj[node][i] < minVal) {
                    minVal = adj[node][i];
                    minNode = i;
                    parent[minNode] = node;
                }
            }
        }
        if (minNode == -1) return "{\"error\":\"Disconnected graph\"}";
        P.push_back(minNode);
        T.erase(remove(T.begin(), T.end(), minNode), T.end());
    }

    int totWeight = 0;
    stringstream ss;
    ss << "{\"edges\":[";
    bool first = true;
    for (int i = 0; i < n; i++) {
        if (parent[i] != -1) {
            if (!first) ss << ",";
            ss << "[\"" << locations[parent[i]] << "\",\"" << locations[i] << "\"," << adj[parent[i]][i] << "]";
            totWeight += adj[parent[i]][i];
            first = false;
        }
    }
    ss << "],\"totalWeight\":" << totWeight << "}";
    return ss.str();
}

int main(int argc, char* argv[]) {
    matrix();

    // If 2 arguments provided → Dijkstra
    if (argc >= 3) {
        string start = argv[1];
        string end = argv[2];
        int src = getNode(start);
        int dest = getNode(end);
        if (src == -1 || dest == -1) {
            cerr << "{\"error\":\"Invalid location\"}";
            return 1;
        }
        cout << dijkstra(src, dest) << endl;
    } else {
        // No arguments → output Prim MST
        cout << prim() << endl;
    }

    return 0;
}

