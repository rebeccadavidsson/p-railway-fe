import ShoppingList from "./ShoppingList";
import { shades } from '../../theme';

function Home() {
  return (
    <div className="max-w-4xl m-auto pb-40 w-full pl-4 pr-4" style={{backgroundColor: shades.neutral[100]}}>
      <ShoppingList />
    </div>
  );
}

export default Home;
