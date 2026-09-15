## **🎯 Route 3 Spec: `POST /api/tours` (Creating Data)**

Now let's test writing new data to our relational database!

### **Your Goal:**

Handle a `POST` request to `/api/tours` to insert a brand new tour into the database.

#### **Requirements:**

- Collect the incoming data stream (`req.on("data")` and `req.on("end")`).
- Wrap `JSON.parse(body)` in a `try...catch` block (return `400 Bad Request` if invalid JSON).
- Extract `name`, `price`, `difficulty`, and optional `guide_id` from the parsed body.
- Validate that `name`, `price`, and `difficulty` are provided (return `400 Bad Request` if any are missing).
- **SQL Query Goal:**
    - `INSERT INTO tours (name, price, difficulty, guide_id) VALUES (?, ?, ?, ?)`
- **JavaScript Goal:**
    - Use **db.run()** with a standard `function(err)` callback so you can access **this.lastID**.
    - Handle database errors cleanly with `500` and `return;`.
    - Return HTTP **201 Created** with the newly created tour object (including its generated `id`).

* * *

### **🧪 Expected Postman Setup**

**1. Set Method & URL:**

    POST http://localhost:8000/api/tours 

**2. Set Headers & Body in Postman:**

- Under the **Headers** tab: Set `Content-Type` to `application/json`.
- Under the **Body** tab: Select **raw** and choose **JSON** from the dropdown menu, then paste:

    { "name": "Alpine Helicopter Trek", "price": 1297, "difficulty": "Hard", "guide_id": 2} 

**3. Expected Response Body (** **201 Created** **):**

    { "id": 5, "name": "Alpine Helicopter Trek", "price": 1297, "difficulty": "Hard", "guide_id": 2} 

* * *

Add Route 3 to your `server.js` and `controller.js`, test it in Postman, and paste your result when you are ready to review! 🚀