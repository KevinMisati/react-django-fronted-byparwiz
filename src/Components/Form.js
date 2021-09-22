import React,{useState,useEffect} from 'react'
import ApiService from "../ApiService"
import {useCookies} from 'react-cookie'

const Form = ({article,updatedInformation,insertedInformation}) => {
    const [title,setTitle] = useState(article.title)
    const [description,setDescription] = useState(article.description)
    const [token] = useCookies(['mytoken'])

    useEffect(() => {
        setTitle(article.title)
        setDescription(article.description)
    },[article])
    const updateArticle = () => {
        ApiService.UpdateArticle(article.id,{title,description},token['mytoken'])
        .then(resp => updatedInformation(resp))
    }
    const insertArticle = () => {
        ApiService.InsertArticle({title,description},token['mytoken'])
        .then(resp => insertedInformation(resp))
    }
    return (
        <div>
        
            {article ? (
                <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label> 
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" id="title" placeholder="please enter the title" />

                <label htmlFor="description" className="form-label">Description</label> 

                <textarea   onChange={e => setDescription(e.target.value)} rows="5" className="form-control" id="descriprion" value={description}></textarea>
                <br />
                {
                    article.id ? <button onClick={updateArticle} className="btn btn-success">Update</button>: <button onClick={insertArticle} className="btn btn-success">Insert Article</button>
                }
               
                </div>
            ): null}
        </div>
    )
}

export default Form
