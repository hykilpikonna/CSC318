export const target_interests = [
    "gaming", "cooking", "sci-fi", "sports", "music", "programming", "first-person shooters", "painting", "baking", "astronomy", "archery"
]

export const target_names = [
    "John", "Mary", "Bob", "Alice", "Jane", "Frank", "Sally", "Jack", "Jill", "Joe", "Sue"
]

interface User {
    name: string;
    interests: string[];
}

export function generateFakeUsers(interests: string[]): User[] {
    let fakeUsers = [];
    const randomNumber = Math.floor(Math.random() * target_names.length) + 1;

    for (let i = 0; i < randomNumber; i++) {
        const randomName = target_names[Math.floor(Math.random() * target_names.length)];
        const randomNumberOfInterests = Math.floor(Math.random() * target_interests.length) + 1;
        const randomInterests: string[] = [];
        for (let j = 0; j < 3; j++) {
            const randomInterest = target_interests[Math.floor(Math.random() * target_interests.length)];
            if (!randomInterests.includes(randomInterest)) {
                randomInterests.push(randomInterest);
            }
        }

        // add a random interest from the user's interests
        const randomInterest = interests[Math.floor(Math.random() * interests.length)];
        if (!randomInterests.includes(randomInterest)) {
            randomInterests.push(randomInterest);
        }

        const newUser = { name: randomName, interests: randomInterests };
        fakeUsers.push(newUser);
    }
        
    return fakeUsers;
}