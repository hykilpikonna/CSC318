import NavBar from "../components/NavBar"
import Ash from "../assets/img/ash.png"
import C3PO from "../assets/img/c3po.png"
import { useNavigate } from "react-router-dom"
import CharacterBadge from "../components/CharacterBadge"
import { startFictionalChat } from "../logic/sdk"

export default function CharacterSelection() {
    const navigate = useNavigate();

    const characters = [
        { name: 'Ash', image: Ash, alias: 'ash_pokemon'},
        { name: 'C3PO', image: C3PO, alias: 'c3po_starwars'},
        // Add more characters here
    ];

    const handleCharacterClick = (characterName: string, characterImage: string, alias: string) => {
        startFictionalChat(alias).then((sessionId) => {
            console.log(sessionId);
            navigate('/character', { state: { name: characterName, image: characterImage, sessionId: sessionId } });
        })
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="v-layout p-10">
                <h1 className="text-center">Talk With...</h1>
                <div className="flex flex-wrap justify-center gap-3">
                    {characters.map(character => (
                        <CharacterBadge 
                            key={character.name}
                            name={character.name} 
                            image={character.image} 
                            onClick={() => handleCharacterClick(character.name, character.image, character.alias)} 
                        />
                    ))}
                </div>
            </div>
            <NavBar />
        </div>
    )
}