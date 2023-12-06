export interface Chapter
{
  name: string
  steps: Step[]
}

export interface Step
{
  questions: Question[]
}

export interface _Question
{
  question: string
  type: string
}
export type Question = WrittenQuestion | VocabularyQuestion | VerbalQuestion | VerbalPronunciation | VideoQuestion

export interface WrittenQuestion extends _Question
{
  wordBank: string[]
  expected: string
  type: 'written-question'
}

export interface VocabularyQuestion extends _Question
{
  pronunciation: string
  description: string
  example: string
  type: 'written-vocabulary'
}

export interface VerbalQuestion extends _Question
{
  wordBank: string[]
  expected: string
  translation: string
  url: string
  type: 'verbal-question'
}

export interface VerbalPronunciation extends _Question
{
  translation: string
  type: 'verbal-pronunciation'
}

export interface VideoQuestion extends _Question
{
  clipUrl: string
  description: string
  expected: string
  type: 'video'
}

export const chapters_jp: Chapter[] = [
  {
    name: 'Order food',
    steps: [{
      questions: [

        {
          question: 'What did Yui come to the club meeting for?',
          clipUrl: window.location.origin + "/video/cake.mp4",
          description: "This is a clip from the anime 'K-On'. Yui is a member of the light music club. She came to the club meeting to eat cake.",
          expected: 'ケーキ or cake',
          type: 'video',
        },
        {
          question: 'Translate this sentence: すしをください',
          wordBank: ['I', 'sushi', 'cookies', 'want', 'please', 'give', 'rice', 'some', 'yesterday'],
          expected: 'Sushi please / I want sushi',
          type: "written-question"
        },
        {
          question: '刺身',
          pronunciation: 'さしみ (sashimi)',
          description: 'Sashimi is a Japanese delicacy consisting of fresh raw fish or meat sliced into thin pieces and often eaten with soy sauce.',
          example: '刺身を好きです。 (I like sashimi)',
          type: 'written-vocabulary',
        },
        {
          question: 'What do you hear?',
          wordBank: ['刺身', 'ケーキ', 'の', 'は', 'おいしい', 'おもい', 'すし', '中', 'です'],
          expected: 'ケーキはおいしいです',
          translation: 'Cake is delicious',
          url: window.location.origin + '/audio/jp_1_1_3.mp3',
          type: 'verbal-question',
        },
        {
          question: 'Please say: すしをたくさんあります',
          translation: 'There is a lot of sushi',
          type: 'verbal-pronunciation',
        },
      ]
    },
      {
        questions: [
          {
            // question: "Translate this sentence: Water please",
            // wordBank: ['水', 'を', 'ください', 'おいしい', 'おもい', 'すし', '中', 'です'],
            question: 'Translate this sentence: 水をください',
            wordBank: ['I', 'sushi', 'cookies', 'want', 'please', 'give', 'Water', 'some', 'yesterday'],
            // expected: '水をください',
            expected: 'Water please',
            type: "written-question"
          },
          {
            question: '団子',
            pronunciation: 'だんご (dango)',
            description: 'Dango is a kind of mochi, Japanese dumpling and sweet made from mochiko (rice flour).',
            example: '大きいな団子です。(It is a big dango)',
            type: 'written-vocabulary',
          },
          {
            question: 'What do you hear?',
            wordBank: ['刺身', '水', 'は', 'おいしい', 'おもい', 'すし', '中', 'です'],
            expected: '水です',
            translation: 'It is water',
            url: window.location.origin + '/audio/jp_1_2_3.mp3',
            type: 'verbal-question',
          },
          {
            question: 'Please say: 刺身おください',
            translation: 'Please give me sashimi',
            type: 'verbal-pronunciation',
          },
          {
            question: 'What is the following song about?',
            clipUrl: window.location.origin + "/video/dango.mp4",
            description: "This is the song 'Dango Daikazoku' from the anime 'Clannad'. It is about a family of dango.",
            expected: '団子 or dango',
            type: 'video',
          }
        ]
      }]
  }
]

export const chapters_es: Chapter[] = [
  {
    name: 'Order food',
    steps: [{
      questions: [
        {
          question: "Translate this phrase: Me provoca un helado",
          wordBank: ['I', 'want', 'ice cream', 'an', 'urgent', 'am', 'craving', 'milkshake'],
          expected: 'I want an ice cream',
          type: "written-question"
        },
        {
          question: 'Pastel',
          pronunciation: 'Pastel (pahs-tehl)',
          description: 'Pastel is the Spanish word for "cake". It is a popular dessert in many Spanish-speaking countries, also known as torta.',
          example: 'Vamos a celebrar con un pastel! (Let\'s celebrate with a cake!)',
          type: 'written-vocabulary',
        },
        {
          question: 'What do you hear?',
          wordBank: ['favor', 'ver', 'el', 'menú', 'por', 'Quiero', 'libro', 'risas', 'oler'],
          expected: 'Quiero ver el menú por favor',
          translation: 'I want to see the menu, please',
          url: window.location.origin + '/audio/es_1_1_3.mp3',
          type: 'verbal-question',
        },
        {
          question: 'Please say: Este postre es exquisito',
          translation: 'This dessert is exquisite',
          type: 'verbal-pronunciation',
        },
        {
          question: 'What is the filling of the tequeño?',
          clipUrl: window.location.origin + "/video/tequeños.mp4",
          description: "Tequeños are a popular Venezuelan appetizer. They are made of cheese wrapped in dough and fried.",
          expected: 'Cheese (queso)',
          type: 'video',
        }
      ]
    },
      {
        questions: [
          {
            question: "Translate this phrase: Yo quiero agua por favor",
            wordBank: ['I', 'juice', 'water', 'want', 'please', 'give', 'some', 'now'],
            expected: 'I want water please',
            type: "written-question"
          },
          {
            question: 'Jugo',
            pronunciation: 'Jugo (hoo-goh)',
            description: 'Jugo is the Spanish word for "juice". In some parts of the world, juice is also called zumo.',
            example: 'Me gusta tomar jugo de naranja! (I like to drink orange juice!)',
            type: 'written-vocabulary',
          },
          {
            question: 'What do you hear?',
            wordBank: ['Que', 'Quien', 'tomar', 'yo', 'tú', 'quieres', 'comer', 'de'],
            expected: 'Que quieres de comer',
            translation: 'What do you want to eat?',
            url: window.location.origin + '/audio/es_1_2_3.mp3',
            type: 'verbal-question',
          },
          {
            question: 'Please say: La comida está deliciosa!',
            translation: 'The food is delicious!',
            type: 'verbal-pronunciation',
          },
          {
            question: 'What is the boy going to eat?',
            clipUrl: window.location.origin + "/video/paella.mp4",
            description: "The boy is about to eat paella, a traditional Spanish dish. It is made of rice, seafood, and vegetables.",
            expected: 'Paella',
            type: 'video',
          }
        ]
      }]
  }
]