//CSS
import "./styles.css"
//IMG
import ImgBackground from "../../assets/github-logo.png";

import { useState } from 'react'
import ItemList from "../../components/ItemList/ItemList"

const index = () => {

    const [user, setUser] = useState("");
    const [currentUser, setcurrentUser] =  useState(null)
    const [repos, setRespos] =  useState(null)

    const hadleGetData = async () =>{
        const userData = await fetch(`https://api.github.com/users/${user}`);
        const newUser = await userData.json()
    
        if(newUser.name){
            const {avatar_url, name, bio, login} = newUser;
            setcurrentUser({avatar_url, name, bio, login})
        
            const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
            const newRepos = await reposData.json()

            if(newRepos.length){
                setRespos(newRepos)
            }
        }
    }
  return (
    <div className="index">
      <img className="ImgBackground" src={ImgBackground} alt="gitImage" />
      <div className="info">
        <div>
            <input name="usuario" value={user} onChange={e => setUser(e.target.value)} placeholder="@username" />
            <button onClick={hadleGetData}>Buscar</button>
        </div>
        {currentUser?.name ? ( 
        <>
        <div className="perfil">
            <img src={currentUser.avatar_url} alt="imgDoPerfil" className="profile" />
            <div className="textProfile">
                <h3>{currentUser.name}</h3>
                <span>{currentUser.login}</span>
                <p>{currentUser.bio}</p>
            </div>
        </div>
        <hr/>
        </>) : null}
       
        {repos?.length ? (
            <>
            <div>
            <h4 className="repositorio">Repositórios</h4>
            {repos.map(repo=>(
            <ItemList title={repo.name} description={repo.description}/>
            ))}

            </div>
            </>
        ) : null}
        
      </div>
    </div>
  )
}

export default index;
