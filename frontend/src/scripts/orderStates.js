export function getState(stateId) {
  if (stateId === 1) {
    return "Pendiente";
  } else if (stateId === 2) {
    return "Aceptado";
  } else if (stateId === 3) {
    return "Entregado";
  } else if (stateId === 4) {
    return "Cancelado";
  }
}

// 1:Pendiente, 2:Aceptado, 3:Entregado, 4:Cancelado
