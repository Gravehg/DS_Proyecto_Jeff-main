import { Navigate } from "react-router-dom";
const Protected = ({ ctx, loggedIn, forRole, children }) => {
  if (loggedIn && !forRole) {
    return children;
  }
  if (loggedIn && !ctx) {
    return <Navigate to="/" replace />;
  } else if (loggedIn && ctx && ctx.role !== forRole) {
    if (ctx.role === 1) {
      return <Navigate to="/client_menu" replace />;
    } else {
      return <Navigate to="/admin_menu" replace />;
    }
  } else if (!loggedIn && ctx) {
    if (ctx.role === 1) {
      return <Navigate to="/client_menu" replace />;
    } else {
      return <Navigate to="/admin_menu" replace />;
    }
  }
  return children;
};
export default Protected;
