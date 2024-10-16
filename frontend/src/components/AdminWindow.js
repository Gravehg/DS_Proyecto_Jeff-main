import React from "react";
import AdminNavbar from "./AdminNavbar";

function AdminWindow({ children }) {
  return (
    <section>
      <AdminNavbar></AdminNavbar>
      <section className="mb-4 mt-4">
        <div className="container" id="client_window">
          {children}
        </div>
      </section>
    </section>
  );
}

export default AdminWindow;
