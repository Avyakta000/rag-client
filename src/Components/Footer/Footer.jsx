import React, { useContext, useState } from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatContext } from '../../context/ChatContextProvider';
const viteApiUrl = import.meta.env.VITE_API_URL;
const Footer = () => {
    
    //    context
    // addAnswer
    const { addTodo, deleteTodo,setResponse,fileName,setAnswer, } = useContext(ChatContext);
    const [item, setItem] = useState('');
 
    const handleAdd = () => {
        addTodo(item);
        setItem('');
    };

    const handleDelete = () => {
        deleteTodo();
    };

    const [text, setText] = useState("")
    const handleChange = (e) => {
        setText(e.target.value);
        setItem(e.target.value);
    }
    const handleSubmit = async (e) => {
        setAnswer(null)
        setResponse(null)
        e.preventDefault();
        const formData = new FormData()
        formData.append('input_text', text)
        formData.append('file',fileName)

        console.log(text, 'text footer/${file}/')

        try {
            const url = `${viteApiUrl}/ask-questions/`
            console.log(url, 'url')
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                console.log('successful')
                console.log(result, 'result')
                setItem(result.answer)
                setResponse(result.message)
                // addAnswer(item)
                setAnswer(result.answer)


            } else {
                console.log('failed');
                console.log(result,'fdgsrgs')
                setResponse('error occured')
            }
        }
        catch (error) {
            console.error('error:', error);
            console.log(response,'this rennn')
            setResponse(err)
        }
    };








    return (
        <>
            <footer className="footer">
                <form onSubmit={handleSubmit}>

                    <label>
                        Ask your question ?
                    </label>
                    <div className="footer-input">
                        <input onChange={handleChange} className='footer-input-child' type="text" />
                        <button onClick={handleAdd} type='submit'>
                            <FontAwesomeIcon className='footer-send' icon={faPaperPlane} />
                        </button>
                    </div>

                </form>

            </footer>
        </>
    )
}

export default Footer