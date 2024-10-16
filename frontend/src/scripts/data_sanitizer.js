// Toma un string y pone todas las primeras letras de cada palabra en mayúscula
// y las demás letras en minúscula
function capitalize(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

// Pone todo el nombre en minúscula expecto las primeras letras de cada palabra
export function sanitizeName(name) {
  name = name.trim().replace(/\s+/g, " ");
  name = capitalize(name);
  return name;
}

// Pone todo el email en minúscula
export function sanitizeEmail(email) {
  return email.trim().toLowerCase();
}
