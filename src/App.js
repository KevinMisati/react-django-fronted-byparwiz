import './App.css';
import {useState,useEffect} from 'react'
import ArticleList from "./Components/ArticleList"
import Form from "./Components/Form"
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

function App() {
  const [articles,setArticles] = useState([])
  const [editArticle,setEditArticle] = useState(null)
  const [token,setToken,removeToken] = useCookies(['mytoken'])
    let history = useHistory()
useEffect(() => {
  fetch('http://127.0.0.1:8000/api/articles/', {
    'method':'GET',
    headers:{
      'Content-Type':'applicttion/json',
      'Authorization':`Token ${token['mytoken']}`
    }
  })
  .then (resp =>  resp.json())
  .then(resp => setArticles(resp))
  .catch(error => console.log(error))
},[])

const editButton = (article) => {
  setEditArticle(article)
  
}
const deleteButton =(article) => {
  const new_articles = articles.filter(myarticle => {
    if (myarticle.id === article.id){
      return false
    }
    else{
      return true
    }
  })
  setArticles(new_articles)
}
const logoutBtn = () => {
  removeToken(['mytoken'])
}

 useEffect(() => {
        if (!token['mytoken']){
            history.push('/')
        }
    },[token])
const updatedInformation = (article) => {
  const new_article = articles.map(myarticle => {
    if (myarticle.id === article.id){
      return article
    }
    else {
      return myarticle
    }
  })
  setArticles(new_article)
}

const articleForm = () => {
  setEditArticle({title:"",description:""})
}
const insertedInformation = (article) => {
  const new_articles = [...articles,article]
  setArticles(new_articles)
}


  return (
    <div className="App">
      
      <div className="row">
      <div className= "col">
      <h1>Django react blog app</h1>
      <br />
      </div>
       <div className= "col">
        <button onClick={articleForm} className="btn btn-primary">Insert Article </button>
      </div>
       <div className= "col">
        <button onClick={logoutBtn} className="btn btn-primary">Logout</button>
      </div>
      </div>
      
      <ArticleList deleteButton={deleteButton} editButton={editButton} articles={articles} />
      {editArticle ? <Form insertedInformation={insertedInformation} updatedInformation={updatedInformation} article={editArticle} /> : null }
      
     
    
    </div>
  );
}

export default App;
