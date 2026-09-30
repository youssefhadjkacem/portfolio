// Données NON traduites des expériences. Textes dans i18n → "experience.items.<id>".
export interface Experience {
  id: string;
  tech: string[];
}

export const experiences: Experience[] = [
  { id: "yonnovia", tech: ["Python", "FastAPI", "NetworkX", "Ollama", "AWS", "MCP", "Odoo"] },
  { id: "lorraine", tech: ["Python", "Blender", "OpenSim", "MuJoCo", "MyoSuite", "Docker"] },
  { id: "fogits", tech: ["Python", "Selenium", "BeautifulSoup", "Odoo", "PostgreSQL"] },
];
