import React from 'react'
import {useNavigate} from 'react-router-dom';
import Updatebutton from '../Buttons/updatebutton'
import VoirButton from '../Buttons/buttonVoir';
import Deletebutton from '../Buttons/deletebutton'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../../hooks/useAuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "../Style/Yesbtn.css"
function UserRow(User){
  const notify = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const { user } = useAuthContext();

  const DeleteUser = async () =>{
    handleClose();
    const reponse = await fetch(process.env.REACT_APP_URL_BASE+"/User", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ 
        id: User.User.id, userID: user?.id,
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notify(json.message);
    }
    if (reponse.ok) {
      notifySuccess(json.message);
      window.location.reload();
    }
  }
  const navigate = useNavigate();

  const Redirect = () =>{
    navigate(`/UpdateUser/${User.User.id}`);
  }
  const RedirectToProfile = () =>{
    navigate(`/Profile/${User.User.id}`);
  }
  const [open,setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <tr className="table-nouveau-ne-ligne">
        <td className="table-patients-td-nom">{User.User.Nom}{' '}{User.User.Prenom}</td>
        <td className="table-patients-td-annee">{User.User.Email}</td>
        <td className="table-patients-td-willaya">{User.User.Telephone}</td>
        <td className="table-patients-td-region">{User.User.Role}</td>
        <td className="table-patients-td-region">{User.User.Centre}</td>
        <td className="btn-column">
          <Updatebutton Redirection={Redirect}/>
        </td>
        {user && user.Role === 'Admin' &&
          <td className="btn-column">
            <Deletebutton DeleteUser={handleClickOpen}/>
          </td>
        }
        <td className="btn-column">
          <VoirButton Redirect={RedirectToProfile}/>
        </td>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmez-vous la suppression de l'utilisateur "}{User.User.Nom}{' '}{User.User.Prenom}{' ?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Si vous supprimer cet utilisateur, il ne pourra pas acceder a la platform.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Annuller</Button>
              <Button onClick={DeleteUser} autoFocus>
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <ToastContainer />
      </tr>
    </>
  )
}

export default UserRow