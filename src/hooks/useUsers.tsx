import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { IUser } from "../interfaces/IUser";

const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {

    const getData = async () => {
        setUsers([]);
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
          let {authKey, name, photo, email, minuteIntervalos} = doc.data();
          setUsers(oldUser => [...oldUser, {authKey, name, photo, email, minuteIntervalos, uid: doc.id}]);
      });
    };

    getData();
  }, []);

  return {users};
};

export default useUsers;
