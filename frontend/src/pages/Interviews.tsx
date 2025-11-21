import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import EditButton from "../UI/EditButton";
import { getUserApplications } from "../api/http";

function Interviews() {
  const { tokenData } = useAuth();
  const { data } = useQuery({
    queryFn: () => getUserApplications(tokenData?.userId || ""),
    queryKey: ["userApplications"],
  });

  const interviews = data?.filter(
    (application) => application.status === "interview"
  );

  return (
    <>
      {interviews?.map((application) => (
        <p key={application._id}>{application.company}</p>
      ))}

      <h2>Your upcoming interviews</h2>
      <div className="">
        <h3 className="bold">🏢 Spotify – Frontend Developer</h3>
        <p>🗓️ Jul 5 – 14:00</p>
        <p>🧪 Technical Interview </p>
        <p>📝 Live coding with React </p>
        <EditButton />
      </div>
    </>
  );
}

export default Interviews;
