const planes = {
  "principiante-3": [
    ["Día 1", "Sentadillas", "3x12"],
    ["", "Press banca", "3x10"],
    ["", "Remo con mancuerna", "3x10"],
    ["", "Elevaciones laterales", "3x15"],
    ["", "Abdominales", "3x20"],
    ["Día 2", "Zancadas", "3x12"],
    ["", "Elevaciones laterales", "3x15"],
    ["", "Abdominales", "3x20"],
    ["Día 3", "Peso muerto rumano", "3x10"],
    ["", "Plancha", "3x30 seg"]
  ],
  "principiante-4": [
    ["Día 1", "Sentadilla goblet", "3x15"],
    ["", "Press militar con mancuernas", "3x10"],
    ["", "Remo en máquina", "3x10"],
    ["", "Elevaciones laterales", "3x12"],
    ["Día 2", "Zancadas laterales", "3x12"],
    ["", "Curl bíceps", "3x12"],
    ["Día 3", "Press inclinado", "3x10"],
    ["", "Elevaciones frontales", "3x12"],
    ["Día 4", "Abdominales", "3x20"],
    ["", "Press inclinado", "3x10"]
  ],
  "principiante-5": [
    ["Día 1", "Peso muerto rumano", "3x10"],
    ["", "Press banca", "3x10"],
    ["", "Curl de piernas", "3x12"],
    ["", "Press militar", "3x10"],
    ["Día 2", "Bicicleta", "25 min"],
    ["", "Crunches", "3x20"],
    ["Día 3", "Elevaciones de talones", "3x15"],
    ["Día 4", "Plancha", "3x30 seg"]
  ],
  "principiante-6": [
    ["Día 1", "Sentadilla con barra", "3x10"],
    ["", "Remo con mancuerna", "3x10"],
    ["", "Elevaciones laterales", "3x15"],
    ["Día 2", "Zancadas", "3x12"],
    ["", "Remo en máquina", "3x12"],
    ["Día 3", "Abdominales", "3x20"],
    ["Día 4", "Remo sentado", "3x10"],
    ["Día 5", "Plancha frontal", "3x30 seg"],
    ["Día 6", "Curl bíceps", "3x12"]
  ],
  "intermedio-3": [
    ["Día 1", "Sentadilla frontal", "4x8"],
    ["", "Press banca", "4x8"],
    ["", "Elevaciones frontales", "3x12"],
    ["Día 2", "Dominadas", "4x6"],
    ["", "Curl bíceps barra", "3x10"],
    ["Día 3", "Peso muerto", "4x6"],
    ["", "Crunches con peso", "3x15"]
  ],
  "intermedio-4": [
    ["Día 1", "Sentadillas", "4x8"],
    ["", "Press militar", "4x8"],
    ["", "Elevaciones frontales", "3x12"],
    ["Día 2", "Remo con barra", "3x10"],
    ["", "Plancha lateral", "3x30 seg"],
    ["Día 3", "Fondos en banco", "3x10"],
    ["Día 4", "Burpees", "3x15"],
    ["", "Curl bíceps barra", "3x10"]
  ],
  "intermedio-5": [
    ["Día 1", "Peso muerto", "4x6"],
    ["", "Press banca", "4x8"],
    ["Día 2", "Remo en polea", "4x10"],
    ["", "Curl femoral", "3x10"],
    ["Día 3", "Press militar", "3x10"],
    ["Día 4", "Abdominales", "4x15"],
    ["Día 5", "Bicicleta", "30 min"]
  ],
  "intermedio-6": [
    ["Día 1", "Sentadillas", "4x8"],
    ["", "Pull-over", "3x12"],
    ["Día 2", "Peso muerto", "4x6"],
    ["Día 3", "Press banca", "3x10"],
    ["Día 4", "Elevaciones laterales", "3x15"],
    ["Día 5", "Remo con barra", "4x8"],
    ["Día 6", "Plancha", "3x45 seg"]
  ],
  "avanzado-3": [
    ["Día 1", "Squat con barra", "4x6"],
    ["", "Clean & press", "3x6"],
    ["Día 2", "Peso muerto convencional", "4x6"],
    ["", "Press de banca", "4x6"],
    ["Día 3", "Muscle ups", "3x8"],
    ["", "Burpees", "3x15"]
  ],
  "avanzado-4": [
    ["Día 1", "Front squat", "4x6"],
    ["", "Snatch", "3x5"],
    ["Día 2", "Remo explosivo", "4x8"],
    ["Día 3", "Handstand push-ups", "3x6"],
    ["Día 4", "Dominadas lastre", "3x8"],
    ["", "Planchas con peso", "3x30 seg"]
  ],
  "avanzado-5": [
    ["Día 1", "Sentadilla pesada", "4x5"],
    ["Día 2", "Clean & jerk", "4x5"],
    ["", "Ring dips", "4x6"],
    ["Día 3", "Snatch", "3x5"],
    ["Día 4", "Press militar", "4x6"],
    ["Día 5", "Mountain climbers", "3x30 seg"],
    ["", "Salto al cajón", "3x10"]
  ],
  "avanzado-6": [
    ["Día 1", "Peso muerto", "4x5"],
    ["Día 2", "Sentadilla frontal", "4x6"],
    ["Día 3", "Pull-ups", "4x8"],
    ["Día 4", "Clean & press", "4x6"],
    ["Día 5", "Toes to bar", "3x15"],
    ["Día 6", "Cardio HIIT", "20 min"],
    ["", "Crunch con disco", "3x20"]
  ]
};

const tablaContainer = document.getElementById("tabla-container");
const selectPlan = document.getElementById("plan-select");

function mostrarTabla(planId) {
  const datos = planes[planId];
  let tablaHTML = `<table class="tabla-ejercicios">
    <tr><th>Día</th><th>Ejercicio</th><th>Series/Reps</th></tr>`;
  datos.forEach(fila => {
    if (fila[1].toLowerCase().includes("cardio")) return;  // Excluir cardio por errores
    tablaHTML += `<tr><td>${fila[0]}</td><td>${fila[1]}</td><td>${fila[2]}</td></tr>`;
  });
  tablaHTML += "</table>";

  tablaContainer.innerHTML = tablaHTML;
}

selectPlan.addEventListener("change", () => {
  mostrarTabla(selectPlan.value);
});

mostrarTabla(selectPlan.value);
