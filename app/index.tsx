import { AppAuthInitializer } from "../utils/AppAuthInitializer";
import WelcomeScreen from "./welcome";

export default function index() {
  return (
    <AppAuthInitializer>
      <WelcomeScreen />
    </AppAuthInitializer>
  )
}
