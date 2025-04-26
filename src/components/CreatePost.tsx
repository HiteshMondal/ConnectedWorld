import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

interface PostInput {
    title: string;
    content: string
}
const createPost = async (post: PostInput) => {
    const {data, error} = await supabase.from('posts').insert([post]);
    if (error) {
        throw error
    }
    return data
}

export const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const {mutate} = useMutation({mutationFn: createPost})    

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        mutate({title, content})
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    }

    return (
        <form onClick={handleSubmit}>
            <div>
              <label>Title</label>
              <input type="text" id="title" required onChange={(event) => setTitle(event.target.value)}/>
            </div>
            <div>
              <label>Content</label>
              <textarea id="content" required rows={6} onChange={(event) => setContent(event.target.value)}/>
            </div>
            <div>
              <label>Upload Image</label>
              <input type="file" id="image" accept="image/*" required onChange={handleFileChange}/>
            </div>
            
            <button type="submit">Create Post</button>
        </form>
    );    
};
