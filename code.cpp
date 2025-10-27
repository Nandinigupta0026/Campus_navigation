#include <bits/stdc++.h>
using namespace std;

const int n = 15; 
const int inf = 1e9;
int adj[n][n]; 
int adj_ori[n][n];
struct edge {
    int u, v, w, s;
};

string locations[n] = {
    "GJCH", "Main gate", "Admin block", "Central avenue - first right",
    "Central avenue - second right", "Central avenue - third right", "MIG",
    "Orion", "Logos", "EEE Dept", "MME Dept", "Library",
    "Central avenue - first left", "CSE Dept", "Anjappar"
};

void matrix() {
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            adj[i][j] = (i == j) ? 0 : inf;

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            adj_ori[i][j] = (i == j) ? 0 : inf;

    edge edges[] = {
        {1, 2, 98,0}, {2, 3, 125,1}, {3, 4, 140,1}, {4, 5, 92,1}, {5, 6, 55,-1},
        {6, 7, 132,-1}, {7, 8, 447,-1}, {8, 9, 370,1}, {9, 10, 125,-1}, {10, 11, 250,-1},
        {2, 12, 93,-1}, {3, 7, 207,-1}, {4, 7, 140,-1}, {9, 12, 55,1}, {12, 8, 320,-1},
        {7, 0, 300,-1}, {8, 0, 294,-1}, {14, 0, 700,1}, {8, 14, 600,1}, {8, 13, 590,-1},
        {11, 13, 250,-1}, {13, 14, 140,-1}, {8, 10, 440,1}
    };


    for (auto e : edges) {
        adj[e.u][e.v] = e.w + e.s*(0.5*e.w);
        adj[e.v][e.u] = e.w - e.s*(0.5*e.w);
    }

    for (auto e : edges) {
        adj_ori[e.u][e.v] = e.w;
        adj_ori[e.v][e.u] = e.w;
    }


}

int getNode(string s) {
    for (int i = 0; i < n; i++) {
        if (locations[i] == s)
            return i;
    }
    return -1;
}


string dijkstra(int src, int dest) {
    vector<int> P, T;
    int dist[n], parent[n],dist_ori[n];
    for (int i = 0; i < n; i++) {
        dist[i] = inf;
        dist_ori[i]=inf;
        parent[i] = -1;
        if (i != src) T.push_back(i);
    }
    dist[src] = 0;
    dist_ori[src]=0;
    P.push_back(src);

    while (P.back() != dest) {
        int last = P.back();
        for (int v : T) {
            if (adj[last][v] != inf) {
                int newDist = dist[last] + adj[last][v];
                int newDist_ori = dist_ori[last] + adj_ori[last][v];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    dist_ori[v]=newDist_ori;
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
        if (minNode == -1) break; 
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
    ss << "],\"totalDist\":" << dist_ori[dest] <<",\"effectiveDist\":" << dist[dest] << "}";  
    return ss.str();
}


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
                if (adj_ori[node][i] < minVal) {
                    minVal = adj_ori[node][i];
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
            ss << "[\"" << locations[parent[i]] << "\",\"" << locations[i] << "\"," << adj_ori[parent[i]][i] << "]";
            totWeight += adj_ori[parent[i]][i];
            first = false;
        }
    }
    ss << "],\"totalWeight\":" << totWeight << "}";
    return ss.str();
}



void anjappar()
{
    map<pair<string,int>, int> m; 
     m[{"Prawn Masala", 250}] = 70;
    m[{"Chicken Biriyani", 150}] = 150;
    m[{"Naan", 65}] = 120;
    m[{"Mushroom Masala", 180}] = 100;
     m[{"Fish Curry", 200}] = 85;
    m[{"French Fries", 100}] = 80;
    m[{"Parotta", 80}] = 100;
    m[{"Idiyappam", 80}] = 120;
    m[{"Egg Biriyani", 100}] = 150;
    m[{"Chicken 65", 150}] = 140;
   
   

    cout << "{\"menu\":[";

    bool first = true;
   
    priority_queue<pair<int, pair<string,int>>> pq;
    for(auto &item : m) pq.push({item.second, item.first});

    while(!pq.empty()) {
        auto top = pq.top(); pq.pop();
        if(!first) cout << ",";
        cout << "{\"name\":\"" << top.second.first
             << "\",\"price\":" << top.second.second
             << ",\"sold\":" << top.first << "}";
        first = false;
    }
    cout << "]}"; 
}


int main(int argc, char* argv[]) {
    

    //cout<<"entered main";  
    matrix();
    //cout<<"Entered mian";
   
    if (argc >= 3) {
       // cout<<"dij";
        string start = argv[1];
        string end = argv[2];
        int src = getNode(start);
        int dest = getNode(end);
        if (src == -1 || dest == -1) {
            cerr << "{\"error\":\"Invalid location\"}";
            return 1;
        }
        cout << dijkstra(src, dest) << endl;
    } else if(argc==1) {
       // cout<<"prim";
      
        cout << prim() << endl;
    }
    else
    {
        anjappar();
    }

    return 0;
}

