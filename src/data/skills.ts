// Compétences : la section Stats calcule automatiquement le nombre de technologies distinctes ici.
export type SkillCategoryId = "languages" | "data" | "ai" | "backend" | "databases" | "cloud" | "security" | "tools";

export const skills: { id: SkillCategoryId; items: string[] }[] = [
  { id: "languages", items: ["Python", "SQL", "C", "C++", "Java"] },
  { id: "data", items: ["Pandas", "NumPy", "EDA", "Feature Engineering", "Scikit-learn", "TensorFlow", "PyTorch", "NLP"] },
  { id: "ai", items: ["LangChain", "LangGraph", "Ollama", "LoRA", "FAISS", "RAG", "Agents ReAct"] },
  { id: "backend", items: ["FastAPI", "Django REST", "Flask", "Odoo / CRM", "Microservices"] },
  { id: "databases", items: ["PostgreSQL", "MongoDB", "Redis", "NoSQL"] },
  { id: "cloud", items: ["AWS (EC2, S3, IAM)", "Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Kubernetes"] },
  { id: "security", items: ["JWT", "OAuth2", "RGPD / GDPR"] },
  { id: "tools", items: ["Git", "Jupyter", "Linux"] },
];

export const technologyCount = new Set(skills.flatMap((c) => c.items)).size;

// Cœur de métier (mis en avant) vs compétences complémentaires (polyvalence)
export const coreSkillIds: SkillCategoryId[] = ["languages", "data", "ai"];
