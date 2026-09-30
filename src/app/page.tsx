import { scanMedia } from "@/lib/scan-media";
import App from "@/components/App";

export default function Page() {
  // Exécuté au build : détecte les médias, photo de profil et CV déposés dans /public
  const manifest = scanMedia();
  return <App manifest={manifest} />;
}
