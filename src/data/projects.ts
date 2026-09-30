// Données NON traduites des projets (identifiants, technos, liens).
// Les textes (titre, description…) sont dans src/i18n/fr.json et en.json → "projects.items.<id>".
// Les médias sont détectés automatiquement dans public/media/<id>/ (voir README).

export type TagId = "data" | "ai" | "engineering";

export interface Project {
  id: string; // = nom du dossier dans public/media/
  tags: TagId[];
  tech: string[];
  githubUrl?: string;
  /** URL d'un déploiement public. Vide par défaut : le bouton "Voir la démo live" n'apparaît que si rempli. */
  liveUrl?: string;
  award?: boolean;
  /** Projet réalisé pendant un stage : nom de l'organisation (affiché dans le badge « Stage · … »). */
  internship?: string;
}

// Ordre = ordre d'affichage : Data & IA d'abord, ingénierie/production ensuite.
export const projects: Project[] = [
  {
    id: "copilote-devis",
    tags: ["ai", "engineering"],
    tech: ["Python", "FastAPI", "NetworkX", "Ollama", "AWS", "MCP", "Odoo"],
    liveUrl: "",
    internship: "Yonnov'IA",
  },
  {
    id: "ai-emergency-savior",
    tags: ["ai"],
    tech: ["Python", "NLP", "Whisper", "LoRA", "NSGA-II", "FastAPI", "TypeScript"],
    githubUrl: "https://github.com/youssefhadjkacem/AI-Emergency-Savior",
    liveUrl: "",
  },
  {
    id: "genai-rag-agent",
    tags: ["ai"],
    tech: ["LangChain", "LangGraph", "FAISS", "Django REST", "Ollama", "Docker"],
    githubUrl: "https://github.com/youssefhadjkacem/genai-rag-agent-pipeline",
    liveUrl: "",
  },
  {
    id: "llm-ticket-classification",
    tags: ["ai", "data"],
    tech: ["PEFT", "MLflow", "GGUF", "LLM"],
    liveUrl: "",
  },
  {
    id: "jumeau-numerique-exosquelette",
    tags: ["ai", "engineering"],
    tech: ["Python", "Blender", "OpenSim", "MuJoCo", "MyoSuite", "Docker"],
    liveUrl: "",
    internship: "Université de Lorraine",
  },
  {
    id: "sales-forecasting",
    tags: ["data"],
    tech: ["Prophet", "Pandas", "EDA", "MAE / RMSE"],
    liveUrl: "",
  },
  {
    id: "financial-inclusion",
    tags: ["engineering"],
    tech: ["Django REST", "JWT", "Python", "Mobile money (simulation)"],
    liveUrl: "",
    award: true,
  },
  {
    id: "microservices-cicd",
    tags: ["engineering"],
    tech: ["FastAPI", "Redis", "Docker Compose", "GitHub Actions"],
    liveUrl: "",
  },
  {
    id: "secure-transaction-api",
    tags: ["engineering"],
    tech: ["JWT", "Celery", "Chiffrement", "RGPD"],
    liveUrl: "",
  },
];

export const tagIds: TagId[] = ["data", "ai", "engineering"];
