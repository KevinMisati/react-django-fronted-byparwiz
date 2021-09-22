import React from 'react'
import ApiService from "../ApiService"
import {useCookies} from 'react-cookie'

const ArticleList = ({articles,editButton,deleteButton}) => {

    const [token] = useCookies(['mytoken'])


    const editBtn =(article) => {
        editButton(article)
    }
    const deleteBtn = (article) => {
        ApiService.DeleteArticle(article.id,token['mytoken'])
        .then(() => deleteButton(article))
        .catch(error => console.log(error))
    }
    return (
        <div>
            {articles && articles.map(article  => {
        return (
          <div key={article.id}>
          <h2 >{article.title}</h2>
          <p>{article.description}</p>
           

           <div className="row">
                <div className="col-md-1">
                    <button className="btn btn-primary" onClick={() => editBtn(article)} >Update</button>
                </div>
                <div className="col-md-1">
                    <button onClick={() => deleteBtn(article)} className="btn btn-danger" >Delete</button>
                </div>
           
           </div>
           <hr />
          </div>
        )
      })}
        </div>
    )
}

export default ArticleList
