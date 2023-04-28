import { useGlobalContext } from "./context";
import PatientProfile from "./PatientProfile";
const Notice = () => {
  const { currentUser } = useGlobalContext();
  if (currentUser) {
    return (
      <div className="flex justify-center">
        <h2 className="text-2xl">You're logged in!</h2>
        <PatientProfile/>
      </div>
    );
  }
  return <div></div>;
};

export default Notice;
