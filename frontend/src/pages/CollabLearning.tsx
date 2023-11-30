import NavBar from "../components/NavBar"
import { useState } from 'react';

export default function CollabLearning() {

    const target_interests = [
        "gaming", "cooking", "sci-fi", "sports", "music", "programming", "first-person shooters", "painting", "baking", "astronomy", "archery"
    ]

    const target_names = [
        "John", "Mary", "Bob", "Alice", "Jane", "Frank", "Sally", "Jack", "Jill", "Joe", "Sue"
    ]

    interface User {
        name: string;
        interests: string[];
    }

    const [tags, setTags] = useState<string[]>([]);
    const [otherUsers, setOtherUsers] = useState<User[]>([]);
    const [newTag, setNewTag] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleDelete = (tagToDelete: any) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    }

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setNewTag('');
                setErrorMessage('');
            } else if (tags.includes(newTag)) {
                setErrorMessage('You already entered this interest');
            }
        }
    }

    const handleMatchClick = () => {
        if (tags.length === 0) {
            setErrorMessage('Please enter at least one interest');
            return;
        }
        
        const randomNumber = Math.floor(Math.random() * target_names.length) + 1;

        console.log(randomNumber);

        let tempUsers = Array.from(otherUsers);

        for (let i = 0; i < randomNumber; i++) {
            const randomName = target_names[Math.floor(Math.random() * target_names.length)];
            const randomNumberOfInterests = Math.floor(Math.random() * target_interests.length) + 1;
            const randomInterests: string[] = [];
            for (let j = 0; j < randomNumberOfInterests; j++) {
                const randomInterest = target_interests[Math.floor(Math.random() * target_interests.length)];
                if (!randomInterests.includes(randomInterest)) {
                    randomInterests.push(randomInterest);
                }
            }
            const newUser = { name: randomName, interests: randomInterests };
            tempUsers.push(newUser);
        }
        
        setOtherUsers(tempUsers);

        console.log(tempUsers);


    }

    return (
        <div className="v-layout p-10">
            <div className="flex flex-col flex-1">
                <h1>Collaborative Learning</h1>
                <p className="subtext">Find people fluent in your taget language to Chat!</p>
                <p className="subtext">Help them learn a language you know!</p>
                <p className="font-bold pt-10">Interests</p>
                <div className="tags">
                    {tags.length === 0 ? (
                        <p className="subtext">Enter a new interest below and press "Enter"!</p>
                    ) : (
                        tags.map((tag) => (
                            <div key={tag} className="tag">
                                {tag}
                                <span className="delete-tag" onClick={(e) => { e.stopPropagation(); handleDelete(tag); }}> X</span>
                            </div>
                        ))
                    )}
                </div>
                {errorMessage && <p className="text-red-600 font-bold mt-5">{errorMessage}</p>}
                <input className="mt-5" type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={handleAddTag} placeholder="Enter your interest here!" />
                <button className="mt-5 green" onClick={() => handleMatchClick()}>Find Chat Partners!</button>
            </div>
            <NavBar />
        </div>
    )

}