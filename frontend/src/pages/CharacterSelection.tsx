import NavBar from "../components/NavBar"
import Ash from "../assets/img/ash.png"
import C3PO from "../assets/img/c3po.png"
import { useNavigate } from "react-router-dom"
import CharacterBadge from "../components/CharacterBadge"

export default function CharacterSelection() {
    const navigate = useNavigate();

    const characters = [
        { name: 'Ash', image: Ash },
        { name: 'C3PO', image: C3PO },
        // Add more characters here
    ];

    const handleCharacterClick = (characterName: string, characterImage: string) => {
        navigate('/character', { state: { name: characterName, image: characterImage } });
    }

    return (
        <div >
            <div className="v-layout p-10">
                <h1 className="text-center">Talk With...</h1>
                <div className="grid grid-cols-2 gap-3">
                    {characters.map(character => (
                        <CharacterBadge 
                            key={character.name}
                            name={character.name} 
                            image={character.image} 
                            onClick={() => handleCharacterClick(character.name, character.image)} 
                        />
                    ))}
                </div>
            </div>
            <NavBar />
        </div>
    )
}