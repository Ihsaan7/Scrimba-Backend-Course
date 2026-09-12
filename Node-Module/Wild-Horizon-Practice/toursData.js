// This file is the small "database" for the exercise.
// The controller imports this data; server.js should not filter it directly.

export const tours = [
  {
    id: 1,
    name: "Pine Valley Walk",
    price: 180,
    difficulty: "Easy",
    location: "Oregon"
  },
  {
    id: 2,
    name: "Red Rock Traverse",
    price: 360,
    difficulty: "Medium",
    location: "Utah"
  },
  {
    id: 3,
    name: "Alpine Summit Challenge",
    price: 620,
    difficulty: "Hard",
    location: "Colorado"
  }
];
