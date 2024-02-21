"use client";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { useAuth } from "@/hooks/useAuth";
import { getSession } from "@/libs/authen";

export default function ProfilePage() {
  // const session = getSession();
  // console.log(session);

  // const router = useRouter();
  // const [data, setData] = useState<any>("nothing");

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   setData(res.data.data._id);
  // };

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
