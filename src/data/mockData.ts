import { User, PipelineStage, Customer, Deal } from '../types';

export const USERS: User[] = [
  {
    id: "u1",
    full_name: "Ana García",
    email: "ana.garcia@aerolineavirtual.com",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    quota_amount: 150000,
    status: "active",
    department: "Cuentas Corporativas B2B"
  },
  {
    id: "u2",
    full_name: "James Passaquindici",
    email: "james.p@aerolineavirtual.com",
    role: "manager",
    avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    quota_amount: 180000,
    status: "active",
    department: "Convenios Internacionales & Charters"
  },
  {
    id: "u3",
    full_name: "Luis Martínez",
    email: "luis.martinez@aerolineavirtual.com",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    quota_amount: 120000,
    status: "active",
    department: "Agencias Mayoristas & Turismo"
  },
  {
    id: "u4",
    full_name: "Sofía Torres",
    email: "sofia.torres@aerolineavirtual.com",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    quota_amount: 130000,
    status: "active",
    department: "Sector Minero, Energía & Gobiernos"
  },
  {
    id: "u5",
    full_name: "Carlos Mendoza",
    email: "carlos.m@aerolineavirtual.com",
    role: "sales_rep",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    quota_amount: 110000,
    status: "active",
    department: "Eventos, Congresos & Incentivos"
  }
];

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: "s1", name: "Prospect", display_order: 1, win_probability: 10, color: "#94A3B8" },
  { id: "s2", name: "Lead", display_order: 2, win_probability: 30, color: "#38BDF8" },
  { id: "s3", name: "Negotiation", display_order: 3, win_probability: 60, color: "#FF5C35" }, // Color Naranja/Coral referencia Dribbble
  { id: "s4", name: "Closing", display_order: 4, win_probability: 85, color: "#818CF8" },
  { id: "s5", name: "Closed Won", display_order: 5, win_probability: 100, color: "#10B981" }, // Verde
  { id: "s6", name: "Closed Lost", display_order: 6, win_probability: 0, color: "#F43F5E" }    // Rojo
];

export const CUSTOMERS: Customer[] = [
  {
    id: "c1",
    company_name: "Bancolombia Corporate",
    industry: "Finanzas & Banca",
    contact_person: "Mauricio Restrepo",
    email: "mrestrepo@bancolombia.com.co",
    phone: "+57 (4) 404-0000",
    created_at: "2026-01-10T08:30:00Z"
  },
  {
    id: "c2",
    company_name: "Ecopetrol Operaciones",
    industry: "Petróleo & Energía",
    contact_person: "Elena Gómez",
    email: "elena.gomez@ecopetrol.com.co",
    phone: "+57 (1) 234-5678",
    created_at: "2026-01-15T09:15:00Z"
  },
  {
    id: "c3",
    company_name: "Viajes Éxito Mayorista",
    industry: "Turismo & Viajes",
    contact_person: "Carlos Ruiz",
    email: "carlos.ruiz@viajesexito.com",
    phone: "+57 (4) 339-6565",
    created_at: "2026-01-20T11:00:00Z"
  },
  {
    id: "c4",
    company_name: "Grupo Nutresa",
    industry: "Consumo Masivo",
    contact_person: "Patricia Henao",
    email: "phenao@gruponutresa.com",
    phone: "+57 (4) 325-8700",
    created_at: "2026-02-01T14:20:00Z"
  },
  {
    id: "c5",
    company_name: "Rappi Logistics Tech",
    industry: "Tecnología",
    contact_person: "Alejandro Silva",
    email: "asilva@rappi.com",
    phone: "+57 (1) 500-1122",
    created_at: "2026-02-12T10:45:00Z"
  },
  {
    id: "c6",
    company_name: "Copa Vacations Colombia",
    industry: "Agencias Mayoristas",
    contact_person: "Claudia Morales",
    email: "cmorales@copavacations.com",
    phone: "+57 (1) 320-9988",
    created_at: "2026-02-25T16:00:00Z"
  },
  {
    id: "c7",
    company_name: "Cerromatoso Minería",
    industry: "Minería",
    contact_person: "Gabriel Duarte",
    email: "gduarte@cerromatoso.com",
    phone: "+57 (4) 772-2300",
    created_at: "2026-03-01T08:00:00Z"
  },
  {
    id: "c8",
    company_name: "Universidad de Antioquia - Rectoría",
    industry: "Educación Superior",
    contact_person: "David Correa",
    email: "rectoria@udea.edu.co",
    phone: "+57 (4) 219-8332",
    created_at: "2026-03-05T13:30:00Z"
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: "d1",
    title: "Convenio Corporativo Anual - Rutas Nacionales",
    customer_id: "c1",
    owner_id: "u1",
    stage_id: "s5",
    amount: 68000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-01-12T10:00:00Z",
    closed_at: "2026-01-29T15:00:00Z",
    service_type: "Convenio B2B Frecuente",
    flight_route: "BOG-MDE-CLO",
    passengers_count: 420
  },
  {
    id: "d2",
    title: "Vuelos Charter Rotación Personal Petrolero",
    customer_id: "c2",
    owner_id: "u2",
    stage_id: "s5",
    amount: 94000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-01-18T09:30:00Z",
    closed_at: "2026-02-05T18:00:00Z",
    service_type: "Charter Privado",
    flight_route: "BOG-VVC-EYP",
    passengers_count: 650
  },
  {
    id: "d3",
    title: "Bloque de Cupos Temporada Media - Caribe",
    customer_id: "c3",
    owner_id: "u3",
    stage_id: "s5",
    amount: 52000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-01-25T11:15:00Z",
    closed_at: "2026-02-14T12:00:00Z",
    service_type: "Bloque Mayorista Asientos",
    flight_route: "MDE-ADZ / BOG-CTG",
    passengers_count: 320
  },
  {
    id: "d4",
    title: "Plan Viajes Ejecutivos Alta Gerencia 2026",
    customer_id: "c4",
    owner_id: "u1",
    stage_id: "s5",
    amount: 45000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-02-02T14:00:00Z",
    closed_at: "2026-02-28T16:30:00Z",
    service_type: "Pases Business Class",
    flight_route: "MDE-BOG-MIA",
    passengers_count: 180
  },
  {
    id: "d5",
    title: "Convención Anual Tech Summit - 200 Pasajes",
    customer_id: "c5",
    owner_id: "u2",
    stage_id: "s5",
    amount: 72000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-02-15T08:45:00Z",
    closed_at: "2026-03-02T11:10:00Z",
    service_type: "Grupo Corporativo",
    flight_route: "BOG-CTG",
    passengers_count: 200
  },
  {
    id: "d6",
    title: "Paquete Vacacional San Andrés & Cancún",
    customer_id: "c6",
    owner_id: "u3",
    stage_id: "s3", // Negotiation (Naranja en el gráfico)
    amount: 38500.00,
    currency: "USD",
    status: "open",
    created_at: "2026-02-28T10:20:00Z",
    expected_close_date: "2026-03-25",
    service_type: "Bloque Mayorista Asientos",
    flight_route: "CLO-ADZ-CUN",
    passengers_count: 240
  },
  {
    id: "d7",
    title: "Convenio Transporte Brigadas de Mantenimiento",
    customer_id: "c7",
    owner_id: "u4",
    stage_id: "s3", // Negotiation
    amount: 58000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-02T09:00:00Z",
    expected_close_date: "2026-03-30",
    service_type: "Vuelo Regional Contratado",
    flight_route: "MDE-MTR",
    passengers_count: 380
  },
  {
    id: "d8",
    title: "Misión Académica Internacional Europa 2026",
    customer_id: "c8",
    owner_id: "u5",
    stage_id: "s4", // Closing
    amount: 64000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-06T15:30:00Z",
    expected_close_date: "2026-03-28",
    service_type: "Grupo Académico Intercontinental",
    flight_route: "BOG-MAD-BCN",
    passengers_count: 85
  },
  {
    id: "d9",
    title: "Renovación Anual Tarifa Plana Corporativa",
    customer_id: "c1",
    owner_id: "u1",
    stage_id: "s4", // Closing
    amount: 82000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-08T11:00:00Z",
    expected_close_date: "2026-03-22",
    service_type: "Tarifa Plana Corporativa",
    flight_route: "Red Nacional Completa",
    passengers_count: 500
  },
  {
    id: "d10",
    title: "Vuelos Chárter Exploración Llanos Orientales",
    customer_id: "c2",
    owner_id: "u4",
    stage_id: "s2", // Lead
    amount: 47000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-09T08:15:00Z",
    expected_close_date: "2026-04-10",
    service_type: "Charter Especial",
    flight_route: "BOG-EYP",
    passengers_count: 220
  },
  {
    id: "d11",
    title: "Bloque Temporada Vacacional Semana Santa",
    customer_id: "c3",
    owner_id: "u3",
    stage_id: "s2", // Lead
    amount: 34000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-10T14:40:00Z",
    expected_close_date: "2026-04-05",
    service_type: "Bloque Mayorista Asientos",
    flight_route: "MDE-SMR / MDE-CTG",
    passengers_count: 210
  },
  {
    id: "d12",
    title: "Viajes de Incentivo Fuerza de Ventas",
    customer_id: "c4",
    owner_id: "u5",
    stage_id: "s1", // Prospect
    amount: 29000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-11T16:00:00Z",
    expected_close_date: "2026-04-20",
    service_type: "Vuelo Chárter Incentivos",
    flight_route: "MDE-AXM-BAQ",
    passengers_count: 150
  },
  {
    id: "d13",
    title: "Convenio Traslado de Ingenieros Cono Sur",
    customer_id: "c5",
    owner_id: "u2",
    stage_id: "s1", // Prospect
    amount: 41000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-12T10:10:00Z",
    expected_close_date: "2026-04-25",
    service_type: "Tarifa Corporativa Internacional",
    flight_route: "BOG-SCL-EZE",
    passengers_count: 90
  },
  {
    id: "d14",
    title: "Convenio Vuelo Chárter Fiestas del Mar",
    customer_id: "c6",
    owner_id: "u3",
    stage_id: "s6", // Closed Lost
    amount: 31000.00,
    currency: "USD",
    status: "lost",
    created_at: "2026-01-05T09:00:00Z",
    closed_at: "2026-01-22T17:00:00Z",
    loss_reason: "Precio más bajo ofrecido por aerolínea low-cost",
    service_type: "Charter Turístico",
    flight_route: "BOG-SMR",
    passengers_count: 160
  },
  {
    id: "d15",
    title: "Licitación Transporte de Empleados Costa Norte",
    customer_id: "c7",
    owner_id: "u4",
    stage_id: "s6", // Closed Lost
    amount: 55000.00,
    currency: "USD",
    status: "lost",
    created_at: "2026-01-14T11:20:00Z",
    closed_at: "2026-02-10T15:45:00Z",
    loss_reason: "Desacuerdo en los slots horarios y frecuencias matutinas",
    service_type: "Licitación Corporativa",
    flight_route: "MDE-CZU-MTR",
    passengers_count: 310
  },
  {
    id: "d16",
    title: "Convenio Pases de Movilidad Investigadores",
    customer_id: "c8",
    owner_id: "u1",
    stage_id: "s5",
    amount: 22000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-02-10T13:00:00Z",
    closed_at: "2026-02-26T14:00:00Z",
    service_type: "Convenio Institucional",
    flight_route: "Ruta Nacional e Internacional",
    passengers_count: 110
  },
  {
    id: "d17",
    title: "Ruta Especial Transporte Empleados Planta Palmira",
    customer_id: "c4",
    owner_id: "u5",
    stage_id: "s3", // Negotiation
    amount: 48000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-01T10:30:00Z",
    expected_close_date: "2026-03-29",
    service_type: "Ruta Semanal Fija",
    flight_route: "MDE-CLO",
    passengers_count: 260
  },
  {
    id: "d18",
    title: "Cupos Garantizados Temporada Mitad de Año",
    customer_id: "c3",
    owner_id: "u3",
    stage_id: "s4", // Closing
    amount: 76000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-03T11:00:00Z",
    expected_close_date: "2026-03-24",
    service_type: "Bloque Mayorista Asientos",
    flight_route: "BOG-MIA / MDE-MIA",
    passengers_count: 450
  },
  {
    id: "d19",
    title: "Plan Fidelización Millas Ejecutivas Grupo Tech",
    customer_id: "c5",
    owner_id: "u2",
    stage_id: "s5",
    amount: 39000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-01-20T10:00:00Z",
    closed_at: "2026-02-18T16:00:00Z",
    service_type: "Millas & Lounge Corporativo",
    flight_route: "BOG-MEX-MIA",
    passengers_count: 140
  },
  {
    id: "d20",
    title: "Transporte Directivos Cumbre Minero-Energética",
    customer_id: "c2",
    owner_id: "u4",
    stage_id: "s5",
    amount: 88000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-02-05T09:10:00Z",
    closed_at: "2026-02-27T17:30:00Z",
    service_type: "Vuelo Privado VIP",
    flight_route: "BOG-CTG-BAQ",
    passengers_count: 120
  },
  {
    id: "d21",
    title: "Contrato Anual Carga Aérea Liviana & Encomiendas",
    customer_id: "c1",
    owner_id: "u1",
    stage_id: "s2", // Lead
    amount: 62000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-05T08:00:00Z",
    expected_close_date: "2026-04-15",
    service_type: "Carga Aérea B2B",
    flight_route: "BOG-MDE-BAQ",
    passengers_count: 0
  },
  {
    id: "d22",
    title: "Chárter Lanzamiento Nuevo Producto Alimenticio",
    customer_id: "c4",
    owner_id: "u5",
    stage_id: "s6", // Closed Lost
    amount: 27000.00,
    currency: "USD",
    status: "lost",
    created_at: "2026-01-15T14:00:00Z",
    closed_at: "2026-02-08T11:00:00Z",
    loss_reason: "Cancelación interna del evento por parte del cliente",
    service_type: "Vuelo Chárter Eventos",
    flight_route: "MDE-BOG",
    passengers_count: 110
  },
  {
    id: "d23",
    title: "Convenio Pasajes Doctorandos y Posgrados",
    customer_id: "c8",
    owner_id: "u5",
    stage_id: "s3", // Negotiation
    amount: 32000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-04T12:00:00Z",
    expected_close_date: "2026-03-31",
    service_type: "Convenio Educativo",
    flight_route: "Rutas Nacionales",
    passengers_count: 190
  },
  {
    id: "d24",
    title: "Paquete Fin de Año Grupo Empresarial",
    customer_id: "c1",
    owner_id: "u1",
    stage_id: "s1", // Prospect
    amount: 45000.00,
    currency: "USD",
    status: "open",
    created_at: "2026-03-10T16:45:00Z",
    expected_close_date: "2026-05-15",
    service_type: "Reserva Anticipada Fin de Año",
    flight_route: "MDE-SMR / BOG-ADZ",
    passengers_count: 280
  },
  {
    id: "d25",
    title: "Transporte Brigada Médica y Rescate",
    customer_id: "c7",
    owner_id: "u4",
    stage_id: "s5",
    amount: 36000.00,
    currency: "USD",
    status: "won",
    created_at: "2026-02-12T08:00:00Z",
    closed_at: "2026-02-24T18:00:00Z",
    service_type: "Vuelo Humanitario / Emergencia",
    flight_route: "MDE-CZU",
    passengers_count: 95
  }
];
