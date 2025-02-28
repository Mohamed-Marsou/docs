# 📚 Documentation Hub

Welcome to the **Documentation Hub**! This repository hosts the **documentation site** for our project, making it easy to browse through  **modules**, and **guides**. The site is built to be **searchable**, **versioned**, and **user-friendly**.

---

## 🌐 **Live Site**

Visit the **documentation site** here:  
[Documentation Hub](https://mohamed-marsou.github.io/docs)

---

## 🚀 **Features**

- 🔍 **Search Functionality:** Quickly find relevant information using **partial matching** on **titles**.  
- 📁 **Versioned Documentation:** Browse different **versions** of the **documentation** seamlessly.  
- 🧭 **Dynamic Loading:** Automatically loads **search data** from all **available versions**.  
- 🛠️ **Automatic Updates:** Push new documentation versions without breaking the site.  
- 🎨 **Responsive Design:** Works well on both **desktop** and **mobile** devices.  

---

## 📂 **Project Structure**

```plaintext
📦 docs/
├─ 📁 assets/            # Static assets (images, icons, styles)
│   ├─ 📁 images/
│   ├─ 📁 css/
│   └─ 📁 js/
│       └─ main.js       # Core search and dynamic loading script
├─ 📁 v1.0.0/            # Example version folder
│   ├─ 📁 data/
│   │   └─ search.json   # Search data for this version
│   └─ 📄 index.html     # Documentation entry point for this version
├─ 📁 v2.0.0/            # Another version folder
└─ 📄 index.html         # Main entry point for the documentation site 
```

## 🆕 Adding a New Documentation Version

1. **Generate Documentation:** Use **JSDoc** to generate the **new documentation files**.
2. **Create a Version Folder:** Create a **new subfolder** (e.g., **`v1.1.0`** or **`v2.0.0`**) inside the **`docs`** directory.
3. **Add Generated Files:** Paste the **generated files** from **JSDoc** into the **new folder**.
4. **Update `index.html`:**  
   - Open **`docs/index.html`**.  
   - Add a **new link** to **point** to the **new documentation**.  
   - Follow the **example** in the **`index.html`** for **correct formatting**.

    Example:  
    ```html
        <div class="box">
            <div>
                <img src="./assets/images/icons8-version.png" alt="version">
            </div>
                <a href="./vX.X.X/index.html">
                    Project Documentation vX.X.X
                </a>
                <p>
                    Explore detailed guides for this version.
                    Stay informed and make the most of Cloud Marketing Hub's powerful features.
                </p>
        </div>
    ```

5. **Important:** The **search functionality** **depends on** the **available links** in **`index.html`** to **function correctly**.  
   - If the **version link** is **missing**, the **search data** for that **version** will **not load**, resulting in **incomplete search results**.


