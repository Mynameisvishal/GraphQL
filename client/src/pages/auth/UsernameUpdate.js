import React,{useState} from 'react'
import AuthForm from '../../components/forms/AuthForm';
import { toast } from 'react-toastify';
import { auth} from '../../firebase';

const UsernameUpdate=()=> {
    const [username,setUsername] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // validation
        if (!username) {
            toast.error('Username is required');
            return;
        }
        try {
            
            let user = auth.currentUser;
            console.log(user);
            console.log("before this");
            if(username){
                await user.updateProfile({
                    displayName: username
                }).then(()=>{
                    toast.success('Username updated successfully');
                });
            }
            
            
            
            // const idTokenResult = await user.getIdTokenResult();
            // dispatch({
            //     type: 'LOGGED_IN_USER',
            //     payload: { email: user.email, token: idTokenResult.token }
            // });
            
            // userCreate();
            // history.push('/');
            
        } catch (error) {
            console.log('username update error', error.message);
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <div>
            {loading ? <h4 className="text-warning">Loading</h4> :<h4>Update Username</h4>}
            <AuthForm
                hideEmailInput="true"
                loading={loading}
                handleSubmit={handleSubmit}
                username={username} 
                setUsername={setUsername}
                ShowUsername="true"
            />
        </div>
    )
}

export default UsernameUpdate
