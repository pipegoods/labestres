import {
  Avatar,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthProvider";
import { IUser } from "../interfaces/IUser";

interface Props {
  users: IUser[];
  userReports: string[];
}

const ListUsers = ({ users, userReports }: Props) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [change, setchange] = useState(false);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    setChecked(userReports);
  }, [userReports])

  const handleToggle = (value: string) => () => {
    setchange(true);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const saveChanges = async () => {
    await updateDoc(doc(db, "users", user ? user.uid : ""), {
      userReports: checked,
    }).then((d) => {
      setchange(false);
    });
  };

  return (
    <>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {users
          ? users
              .filter((c) => c.uid !== user?.uid)
              .map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    key={value.uid}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value.uid)}
                        checked={checked.indexOf(value.uid) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value.name}`}
                          src={value.photo}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={value.name}
                        secondary={value.email}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })
          : null}
      </List>
      {change ? (
        <Button onClick={saveChanges} variant="contained">
          Guardar cambios
        </Button>
      ) : null}
    </>
  );
};

export default ListUsers;
