import { useGlobalContext } from "./context";
const Notice = () => {
  const { currentUser } = useGlobalContext();
  if (currentUser) {
    return (
      <div className="flex justify-center">
        <h2 className="text-2xl">You're logged in!</h2>
      </div>
    );
  }
  return null;
};

export default Notice;
